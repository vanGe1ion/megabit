<?php

class Model_Authorisation extends Model{

    public function Login(){

        $login = $_POST["logname"];
        $md5pass = md5($_POST["pass"]);


        $db = Database::getInstance(HOSTNAME, LOGIN, PASSWORD, DBNAME);
        $dbLink = $db->getConnection();
        $querry = Querries::AuthorizeQuerry($login, $md5pass);
        $result = mysqli_query($dbLink, $querry);

        if($result->num_rows){
            $row = mysqli_fetch_array($result);
            $authoredUser = new User($row['login'], $row['password'], $row['permission'], $row['Emp_ID']);
            $errorCode = StatFuncs::ThrowError(0);
        }
        else
            $errorCode = StatFuncs::ThrowError(1);

        return $errorCode;
    }

    public function Logout(){
        setcookie(session_name(), session_id(), time()-60*60*24);
        session_unset();
        session_destroy();
    }
}
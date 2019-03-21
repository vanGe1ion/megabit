<?php

class Model_Authorisation extends Model{

    public function Login(){

        $login = $_POST["logname"];
        $md5pass = md5($_POST["pass"]);


        $querry = Querries::AuthorizeQuerry($login, $md5pass);
        $result = Database::DBRequest($querry);

        if($result->num_rows){
            $row = mysqli_fetch_array($result);
            $authedUser = new User($row['login'], $row['password'], $row['permission'], $row['Emp_ID']);
            $data['errorCode'] = StatFuncs::ThrowError(0);
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(600);

        return $data;
    }


}
<?php

class Model_Authorisation extends Model{

    public function Login(){

        $login = $_POST["logname"];
        $md5pass = md5($_POST["pass"]);


        $querry = Querries::AuthorizeQuerry($login, $md5pass);
        $result = Database::DBRequest($querry);

        if($result->num_rows){
            $row = mysqli_fetch_array($result);
            $authedUser = new User($row['Login'], $row['Password'], $row['Access_ID'], $row['Emp_ID']);
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::WITHOUT_ERRORS);
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::USER_DOES_NOT_EXIST);

        return $data;
    }


}
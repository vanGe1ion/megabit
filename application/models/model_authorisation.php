<?php

class Model_Authorisation extends Model{

    public function Login(){

        $login = $_POST["logname"];
        $md5pass = md5($_POST["pass"]);


        $querry = Queries::SelectAuthorize($login, $md5pass);
        $result = Database::DBRequest($querry);
        $data = new MainDataContainer();

        if(!isset($_SESSION['errorCode']) || $_SESSION['errorCode'] == ErrorCode::WITHOUT_ERRORS) {//todo exception handed
            if ($result->num_rows) {
                $row = mysqli_fetch_array($result);
                $authedUser = new User($row['Login'], $row['Password'], $row['Access_ID'], $row['Emp_ID']);
                $data->errorCode = StatFuncs::ThrowError(ErrorCode::WITHOUT_ERRORS);
            } else
                $data->errorCode = StatFuncs::ThrowError(ErrorCode::USER_DOES_NOT_EXIST);
        }
        else
            $data->errorCode =$_SESSION['errorCode'];

        return $data;
    }


}
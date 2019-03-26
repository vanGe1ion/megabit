<?php


class StatFuncs
{

    public static function LoggedIn (){
        return isset($_SESSION['clearance']) AND $_SESSION['clearance'] < Clearance::UNAUTHORIZED;
    }

    //функция проверки прав прользователя. принимает массив разрешенных классов пользователей и сравнивает с текущим уровнем доступа
    public static function ValidateUsers($userClasses){
        foreach ($userClasses as $value)
            if ($_SESSION['clearance'] == $value)
                return ErrorCode::WITHOUT_ERRORS;

        header("Location: " . SITE_ROOT . "/Error");
        return StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
    }

    public static function IsAdmin (){
        return $_SESSION['clearance'] == Clearance::ADMIN;
    }

    public static function IsPlanner (){
        return $_SESSION['clearance'] == Clearance::PLANNER;
    }

    public static function IsServe (){
        return  $_SESSION['clearance'] == Clearance::SERVE;
    }

    public static function IsUser (){
        return  $_SESSION['clearance'] == Clearance::USER;
    }

    public static function ThrowError($errorCode){
        $_SESSION['errorCode'] = $errorCode;
        return $errorCode;
    }
}
<?php


class StatFuncs
{

    public static function LoggedIn (){
        return isset($_SESSION['accessRights']) AND $_SESSION['accessRights'] < AccessRights::UNAUTHORIZED;
    }

    //функция проверки прав прользователя. принимает массив разрешенных классов пользователей и сравнивает с текущим уровнем доступа
    public static function ValidateUsers($userClasses){
        foreach ($userClasses as $value)
            if ($_SESSION['accessRights'] == $value)
                return ErrorCode::WITHOUT_ERRORS;

        header("Location: " . SITE_ROOT . "/Error");
        return StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
    }

    public static function ThrowError($errorCode){
        $_SESSION['errorCode'] = $errorCode;
        return $errorCode;
    }




    public static function IsAdmin (){
        return $_SESSION['accessRights'] == AccessRights::ADMIN;
    }

    public static function IsPlanner (){
        return $_SESSION['accessRights'] == AccessRights::PLANNER;
    }

    public static function IsServe (){
        return  $_SESSION['accessRights'] == AccessRights::SERVE;
    }

    public static function IsUser (){
        return  $_SESSION['accessRights'] == AccessRights::USER;
    }
}
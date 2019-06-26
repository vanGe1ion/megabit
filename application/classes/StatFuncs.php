<?php


abstract class StatFuncs
{

    //функция возвращает true если пользователь залогинен
    public static function LoggedIn (){
        return isset($_SESSION['accessRights']) AND $_SESSION['accessRights'] < AccessRights::UNAUTHORIZED;
    }

    //функция проверки прав прользователя. принимает массив разрешенных классов пользователей и сравнивает с текущим уровнем доступа
    public static function ValidateUsers($userClasses){
        foreach ($userClasses as $value)
            if ($_SESSION['accessRights'] == $value)
                return ErrorCode::WITHOUT_ERRORS;

        Router::GoOn(Routes::ERRROR);
        return StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
    }

    //функция отправки кода ошибки, который ловится контроллером ошибок
    public static function ThrowError($errorCode){
        $_SESSION['errorCode'] = $errorCode;
        return $errorCode;
    }



    //проверка текущего уровня доступа
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

    public static function IsFrozen (){
        return  $_SESSION['accessRights'] == AccessRights::FROZEN;
    }
}
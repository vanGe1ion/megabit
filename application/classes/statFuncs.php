<?php


class StatFuncs
{

    public static function LoggedIn (){
        return isset($_SESSION['permission']) AND $_SESSION['permission'] < Permission::UNAUTHORIZED;
    }

    public static function IsAdmin (){
        return $_SESSION['permission'] == Permission::ADMIN;
    }

    public static function IsServe (){
        return  $_SESSION['permission'] == Permission::SERVE;
    }

    public static function IsUser (){
        return  $_SESSION['permission'] == Permission::USER;
    }

    public static function ThrowError($errorCode){
        $_SESSION['error'] = $errorCode;
        return $errorCode;
    }
}
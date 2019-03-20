<?php


class StatFuncs
{

    public static function LoggedIn (){
        return isset($_SESSION['permission']) AND $_SESSION['permission'] < Permission::UNAUTHORIZED;
    }

    public static function ThrowError($errorCode){
        $_SESSION['error'] = $errorCode;
        return $errorCode;
    }


}
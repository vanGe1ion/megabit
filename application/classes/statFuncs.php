<?php


class StatFuncs
{

    public static function LoggedIn (){
        return isset($_SESSION['clearance']) AND $_SESSION['clearance'] < Clearance::UNAUTHORIZED;
    }

    public static function IsAdmin (){
        return $_SESSION['clearance'] == Clearance::ADMIN;
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
<?php

class SessionController
{
    public static function SessionCreate(){
        session_start();
    }

    public static function TimeoutControl(){

        //если таймер сессии не установлен, ставим
        if (!isset($_SESSION['sessionStart']))
            $_SESSION['sessionStart'] = time();

        //при истечении времени сессии кидаем ошибку и возвращаем ее код
        if(time() > $_SESSION['sessionStart'] + SESS_LIFETIME)
            return StatFuncs::ThrowError(ErrorCode::SESSION_TIMEOUT);
        //если сессия не истекла обновляем таймер
        else
            $_SESSION['sessionStart'] = time();

        return ErrorCode::WITHOUT_ERRORS;
    }

    public static function SessionDestroy(){
        header("Location: ".SITE_ROOT."/cookie_annihilator.php?sessName=".session_name()."&sessID=".session_id());
        session_unset();
        session_destroy();
    }
}

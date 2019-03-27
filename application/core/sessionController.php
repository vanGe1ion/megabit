<?php


class SessionController
{

    public static function SessionCreate(){

        session_start();

	//если таймер сессии не установлен, ставим
        if (!isset($_SESSION['sessionStart'])) 
            $_SESSION['sessionStart'] = time();

	//при истечении времени сессии кидаем ошибку
        if(time() > $_SESSION['sessionStart'] + SESS_LIFETIME)
            return StatFuncs::ThrowError(ErrorCode::SESSION_TIMEOUT);
        else //обновляем таймер если сессия не истекла
            $_SESSION['sessionStart'] = time(); 

	return ErrorCode::WITHOUT_ERRORS;

    }


    public static function SessionDestroy(){
        header("Location: ".SITE_ROOT."/cookie_logout_crutch.php");
    }

}
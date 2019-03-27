<?php
//самый костыльный костыл, который я только делал
//directed by Guerrilla movement "Costylvania"
//хотя не, не самый


//include "application/core/config.php";
//include "application/classes/errorCode.php";

session_start();

//if(isset($_SESSION['errorCode']) && $_SESSION['errorCode'] == ErrorCode::SESSION_TIMEOUT)
//    header("Location: ".$_SERVER['SITE_ROOT']."/error");
//else
    header("Location: ".$_SERVER['SITE_ROOT']."/authorisation");

setcookie(session_name(), session_id(), time()-60*60*24*3);
session_unset();
session_destroy();

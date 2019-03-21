<?php
//самый костыльный костыл, который я только делал
//directed by Guerrilla movement "Costylvania"

session_start();
setcookie(session_name(), session_id(), time()-60*60*24);
session_unset();
session_destroy();
header("Location: ".$_SERVER['SITE_ROOT']."/Authorisation");
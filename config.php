<?php

//Definitions
define('HOSTNAME', $_SERVER['SERVER_ADDR']);
define('LOGIN', 'root');
define('PASSWORD', '');
define('DBNAME', 'megabit_db');

define('SESS_LIFETIME', 60*60*24);
define('SESS_COOKIE_LIFETIME', 0);

define('SITE_ROOT', $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/");
define('DOC_ROOT', $_SERVER['DOCUMENT_ROOT']."/");
define('SITE_NAME', 'MEGABIT CAFE');




//Config Settings
ini_set('session.gc_maxlifetime', SESS_LIFETIME);
ini_set('session.cookie_lifetime', SESS_COOKIE_LIFETIME);
ini_set('display_errors', 1);
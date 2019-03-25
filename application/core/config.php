<?php

define('HOSTNAME', $_SERVER['SERVER_ADDR']);
define('LOGIN', 'root');
define('PASSWORD', '');
define('DBNAME', 'megabit_db');

define('SESS_LIFETIME', 3600);
define('SESS_COOKIE_LIFETIME', 0);

define('SITE_ROOT', $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']);
define('SITE_NAME', 'MEGABIT CAFE');
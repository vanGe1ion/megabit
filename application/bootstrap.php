<?php

// подключаем файлы ядра
require_once 'core/model.php';
require_once 'core/view.php';
require_once 'core/controller.php';
require_once 'core/database.php';

require_once 'classes/permission.php';
require_once 'classes/querries.php';
require_once 'classes/user.php';
require_once 'classes/employee.php';
require_once 'classes/statFuncs.php';


require_once 'core/route.php';
Route::start(); // запускаем маршрутизатор

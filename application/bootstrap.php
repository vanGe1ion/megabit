<?php

// подключаем файлы ядра
require_once 'core/model.php';
require_once 'core/view.php';
require_once 'core/controller.php';
require_once 'core/database.php';
require_once 'core/sessionController.php';

// подключаем файлы классов
require_once 'classes/querries.php';
require_once 'classes/user.php';
require_once 'classes/employee.php';
require_once 'classes/statFuncs.php';

// подключаем файлы констант
require_once 'classes/errorCode.php';
require_once 'classes/accessRights.php';

require_once 'core/router.php';
Router::StartRouting(); // запускаем маршрутизатор
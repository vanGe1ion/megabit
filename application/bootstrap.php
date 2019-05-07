<?php

//подключаем файлы ядра
//представление данных
require_once 'core/data/tableDataContainer.php';
require_once 'core/data/errorDataContainer.php';
require_once 'core/data/mainDataContainer.php';
//представление MVC
require_once 'core/model.php';
require_once 'core/view.php';
require_once 'core/controller.php';
//управление
require_once 'core/database.php';
require_once 'core/sessionController.php';



// подключаем файлы вспомогательных классов
require_once 'classes/queries.php';
require_once 'classes/statFuncs.php';

// подключаем файлы классов сущностей
require_once 'classes/entities/user.php';
require_once 'classes/entities/employee.php';

// подключаем файлы классов констант
require_once 'classes/enums/errorCode.php';
require_once 'classes/enums/accessRights.php';
require_once 'classes/enums/routes.php';



//подключаем и запускаем роутер
require_once 'core/router.php';
Router::StartRouting();
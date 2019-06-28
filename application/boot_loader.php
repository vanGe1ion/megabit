<?php

//подключаем файлы ядра
//паттерны данных
require_once 'core/data/TableDataContainer.php';
require_once 'core/data/ErrorDataContainer.php';
require_once 'core/data/MainDataContainer.php';
//MVC
require_once 'core/Model.php';
require_once 'core/View.php';
require_once 'core/Controller.php';
require_once 'core/CoreError.php';
//управление
require_once 'core/Database.php';
require_once 'core/SessionController.php';



// подключаем файлы вспомогательных классов
require_once 'classes/Queries.php';
require_once 'classes/StatFuncs.php';

// подключаем файлы классов сущностей
require_once 'classes/entities/User.php';
require_once 'classes/entities/Employee.php';

// подключаем файлы классов констант
require_once 'classes/enums/ErrorCode.php';
require_once 'classes/enums/AccessRights.php';
require_once 'classes/enums/Routes.php';
require_once 'classes/enums/ElementTypes.php';



//подключаем и запускаем роутер
require_once 'core/Router.php';
Router::StartRouting();
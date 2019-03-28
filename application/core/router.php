<?php

/*
Класс-маршрутизатор для определения запрашиваемой страницы.
> цепляет классы контроллеров и моделей;
> создает экземпляры контролеров страниц и вызывает действия этих контроллеров.
*/
class Router
{

	public static function StartRouting()
    {
        SessionController::SessionCreate();
        $route = explode('/', $_SERVER['REQUEST_URI']);

        if(self::GlobalRoutingProtection(strtolower($route[1])) == ErrorCode::WITHOUT_ERRORS)
            self::RouterMain($route);
    }

	static private function RouterMain($route){

        // контроллер и действие по умолчанию
        $controller_name = 'Main';
        $action_name = 'index';
        $parameters = NULL;

        // получаем имя контроллера
        if ( !empty($route[1]) )
        {
            $controller_name = $route[1];
        }

        // получаем имя экшена
        if ( !empty($route[2]) )
        {
            $action_name = $route[2];
        }

        //все роуты после экшена будут считаться его параметрами
        if ( !empty($route[3]) )
        {
            for($i = 3; $i < count($route); ++$i)
                $parameters[$i - 3] = $route[$i];
        }

        // добавляем префиксы
        $model_name = 'Model_'.$controller_name;
        $controller_name = 'Controller_'.$controller_name;
        $action_name = 'action_'.$action_name;

        /*
        echo "Model: $model_name <br>";
        echo "Controller: $controller_name <br>";
        echo "Action: $action_name <br>";
        */

        // подцепляем файл с классом модели (файла модели может и не быть)

        $model_file = strtolower($model_name).'.php';
        $model_path = "application/models/".$model_file;
        if(file_exists($model_path))
        {
            include "application/models/".$model_file;
        }

        // подцепляем файл с классом контроллера
        $controller_file = strtolower($controller_name).'.php';
        $controller_path = "application/controllers/".$controller_file;
        if(file_exists($controller_path))
        {
            include "application/controllers/".$controller_file;
        }
        else
        {
            /*
            правильно было бы кинуть здесь исключение,
            но для упрощения сразу сделаем редирект на страницу 404
            */
            Router::ErrorPage404();
        }

        // создаем контроллер
        $controller = new $controller_name;
        $action = $action_name;

        if(method_exists($controller, $action))
        {
            // вызываем действие контроллера
            $controller->$action($parameters);
        }
        else
        {
            // здесь также разумнее было бы кинуть исключение
            Router::ErrorPage404();
        }

    }

	static private function ErrorPage404()
	{
	    StatFuncs::ThrowError(404);
        header("Location: ".SITE_ROOT."/error");
    }

    //глобальная функция защиты доступа
    static private function GlobalRoutingProtection($controller)
    {
        $errorCode = ErrorCode::WITHOUT_ERRORS;

        if(self::LoggedInProtection($controller) != ErrorCode::WITHOUT_ERRORS)
            $errorCode = ErrorCode::UNAUTHORIZED;
        elseif(StatFuncs::LoggedIn() && self::SessionTimeoutProtection($controller) != ErrorCode::WITHOUT_ERRORS) //обработка времени жизни сессии актуальна только для авторизованных пользователей
            $errorCode = ErrorCode::SESSION_TIMEOUT;
        elseif(self::FrozenProtection($controller) != ErrorCode::WITHOUT_ERRORS)
            $errorCode = ErrorCode::YOU_ARE_FROZEN;

        return $errorCode;
    }

    //функция проверяет залогинен ли пользователь и перенаправляет на форму авторизации если нет
    //возвращает нулевую ошибку если пользователь не залогинен, но на разрешенные контроллеры!!!
    //код UNAUTHORIZED контроллером ошибок не обрабатывается. нужно только для воврата факта ошибки
    static  private function LoggedInProtection($controller)
    {
        if (!StatFuncs::LoggedIn() && $controller != 'authorisation' && $controller != 'error')         //разрешение авторизации и ошибок
        {
            header("Location: ".SITE_ROOT."/authorisation");
            return ErrorCode::UNAUTHORIZED;
        }
	    return ErrorCode::WITHOUT_ERRORS;
    }

    static  private function SessionTimeoutProtection($controller)
    {
        if (SessionController::TimeoutControl() == ErrorCode::SESSION_TIMEOUT)
        {
            //роутинг не в контроллер ошибок - перенаправляем в ошибки
            if($controller != 'error' && $controller != 'authorisation')
            {
                header("Location: " . $_SERVER['SITE_ROOT'] . "/error");
                return ErrorCode::SESSION_TIMEOUT;
            }
            //разрешаем роутинг в контроллер ошибок
        }
        //не таймаут - производим штатный роутинг
        return ErrorCode::WITHOUT_ERRORS;
    }

    //функция паеренаправляет пользователя с замороженной учеткой на контроллер ошибок
    static  private function FrozenProtection($controller)
    {
        if(StatFuncs::IsFrozen() && $controller != 'error' && $controller != 'authorisation' ) {    //разрешение авторизации и ошибок
            header("Location: " . SITE_ROOT . "/error");
            return StatFuncs::ThrowError(ErrorCode::YOU_ARE_FROZEN);
        }

        return ErrorCode::WITHOUT_ERRORS;
    }
    
}



//class Router
//{
//    private $routes;
//
//    public  function __construct()
//    {
//        $routesPath = ROOT.'/config/routes.php';
//        $this->routes = include($routesPath);
//    }
//
//    private function getURI ()
//    {
//        if (!empty($_SERVER['REQUEST_URI'])) {
//            return trim($_SERVER['REQUEST_URI'], '/');
//        }
//    }
//
//    public function run ()
//    {
//        // Получить строку запроса
//        $uri = $this->getURI();
//
//        // Проверить наличие такого запроса в routes.php
//        foreach ($this->routes as $uriPattern => $path) {
//            // Сравниваем $uriPattern  и $uri
//            if (preg_match("~$uriPattern~", $uri)) {
//
//                // Получаем внутренний путь из внешнего согласно правилу
//                $internalRoute = preg_replace("~$uriPattern~", $path, $uri);
//                // Определить какой контроллер
//                // и action обрабатывают запрос
//
//                $segments = explode('/', $internalRoute);
//
//                $controllerName = array_shift($segments).'Controller'; //array_shift выбирает 1-ый елемент и уничтожает его
//                $controllerName = ucfirst($controllerName);
//
//                $actionName = 'action'.ucfirst(array_shift($segments));
//
//                $parameters = $segments; //т.к. после 2-ух array_shift останутся одни параметры, они сюда и запишутся
//
//                // Подключить файл класса-контроллера
//                $controllerFile = ROOT . '/controllers/' .
//                    $controllerName . '.php';
//
//                $internalRoute = preg_replace("~$uriPattern~", $path, $uri);
//
//
//
//                if (file_exists($controllerFile)) {
//                    include_once ($controllerFile);
//                }
//                // Создать обьект, вызвать метод (т.е. action)
//                $controllerObject = new $controllerName;
//                $result = call_user_func_array(array($controllerObject, $actionName), $parameters);
//                if ($result != null) {
//                    break;
//                }
//            }
//        }
//    }
//
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
        $route = explode('/', $_SERVER['REQUEST_URI']);


        if (SessionController::SessionCreate() != ErrorCode::SESSION_TIMEOUT)
        {
            if (Router::LoginProtection($route) == 0)
                Router::RouterMain($route);

        }
        elseif (strtolower($route[1]) == 'error')
        {
            if (Router::LoginProtection($route) == 0)
                Router::RouterMain($route);
        }
        else
            header("Location: ".$_SERVER['SITE_ROOT']."/error");
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

    static private function LoginProtection($route)
    {
        $controller = strtolower($route[1]);
        $ret = 1;

        if (!StatFuncs::LoggedIn() && $controller != 'authorisation' && $controller != 'error') {
            header("Location: ".SITE_ROOT."/Authorisation");
        }
        elseif($_SESSION['accessRights'] == AccessRights::FROZEN && $controller != 'error' && $controller != 'authorisation' ) {
            StatFuncs::ThrowError(ErrorCode::YOU_ARE_FROZEN);
            header("Location: " . SITE_ROOT . "/Error");
        }
        else $ret = 0;

        return $ret;
    }
    
}
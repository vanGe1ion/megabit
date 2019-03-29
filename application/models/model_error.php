<?php
/**
 * Created by PhpStorm.
 * User: ea.kichaev
 * Date: 18.03.2019
 * Time: 16:54
 */

class Model_Error
{

    public function GetError(){
        $errorType = $_SESSION['errorCode'];

        $data = new MainDataContainer();
        $data->pageTitle = 'Ой, какая неприятность';
        $errorData = new ErrorDataContainer();

        switch ($errorType){
            case ErrorCode::USER_DOES_NOT_EXIST:{
                $errorData->title =      'Ошибка входа';
                $errorData->text =       'Пользователя с таким логином и паролем не существует';
                $errorData->button =     'Назад';
                $errorData->link =       Router::FullRoute(Routes::AUTHORISATION);
                break;
            }

            case ErrorCode::BAD_DB_CONNECTION:{
                $errorData->title =      'Ошибка подключения к базе данных';
                $errorData->text =       'Не возможно подключиться к к базе данных '.HOSTNAME;
                $errorData->button =     'Главное меню';
                $errorData->link =       Router::FullRoute(Routes::MAIN);
                break;
            }

            case ErrorCode::EMPTY_DB_RESPONSE:{
                $errorData->title =      'Ошибка чтения базы данных';
                $errorData->text =       'Запрос к базе данных вернул пустой результат ';
                $errorData->button =     'Главное меню';
                $errorData->link =       Router::FullRoute(Routes::MAIN);                   //todo
                break;
            }

            case ErrorCode::FORBIDDEN:{
                $errorData->title =      'Ошибка доступа';
                $errorData->text =       'Не достаточно прав для просмотра этой страницы';
                $errorData->button =     'Главное меню';
                $errorData->link =       Router::FullRoute(Routes::MAIN);
                break;
            }

            case ErrorCode::NOT_FOUND:{
                $errorData->title =      'Ошибка 404';
                $errorData->text =       'Запрашиваемая страница не найдена';
                $errorData->button =     'Главное меню';
                $errorData->link =       Router::FullRoute(Routes::MAIN);
                break;
            }

            case ErrorCode::YOU_ARE_FROZEN:{
                $errorData->title =      'Ошибка доступа';
                $errorData->text =       'Ваша учетная запись была заморожена. Обратитесь к администратору';
                $errorData->button =     'Выйти';
                $errorData->link =       Router::FullRoute(Routes::LOGOUT);
                break;
            }

            case ErrorCode::SESSION_TIMEOUT:{
                $errorData->title =      'Ошибка ожидания';
                $errorData->text =       'Время текущей сессии для пользователя '. $_SESSION['login']. ' истекло. Выполните повторный вход';
                $errorData->button =     'Авторизация';
                $errorData->link =       Router::FullRoute(Routes::LOGOUT);
                break;
            }

            default:{
                $errorData->title =      'Непредвиденная ошибка';
                $errorData->text =       'Обратитесь к разработчику';
                $errorData->button =     'Главное меню';
                $errorData->link =       Router::FullRoute(Routes::MAIN);
                break;
            }
        }

        $data->errorData = $errorData;
        $_SESSION['errorCode'] = 0;

        return $data;
    }


}
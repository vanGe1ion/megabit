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

        $data['pageTitle'] = 'Ой, какая неприятность';

        switch ($errorType){
            case ErrorCode::USER_DOES_NOT_EXIST:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка входа',
                    'text' =>       'Пользователя с таким логином и паролем не существует',
                    'button' =>     'Назад',
                    'link' =>       SITE_ROOT. '/authorisation'
                );
                break;
            }

            case ErrorCode::BAD_DB_CONNECTION:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка чтения базы данных',
                    'text' =>       'Запрос к базе данных вернул пустой результат ',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/main'                   //todo
                );
                break;
            }

            case ErrorCode::FORBIDDEN:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка доступа',
                    'text' =>       'Не достаточно прав для просмотра этой страницы',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/main'
                );
                break;
            }

            case ErrorCode::NOT_FOUND:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка 404',
                    'text' =>       'Запрашиваемая страница не найдена',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/main'
                );
                break;
            }

            case ErrorCode::YOU_ARE_FROZEN:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка доступа',
                    'text' =>       'Ваша учетная запись была заморожена. Обратитесь к администратору',
                    'button' =>     'Выйти',
                    'link' =>       SITE_ROOT.'/authorisation/logout'
                );
                break;
            }

            case ErrorCode::SESSION_TIMEOUT:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка ожидания',
                    'text' =>       'Время текущей сессии для пользователя '. $_SESSION['login']. ' истекло. Выполните повторный вход',
                    'button' =>     'Авторизация',
                    'link' =>       SITE_ROOT.'/authorisation/logout'
                );
                break;
            }

            default:{
                $data['errorData'] = array(
                    'title' =>      'Непредвиденная ошибка',
                    'text' =>       'Обратитесь к разработчику',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/main'
                );
                break;
            }
        }
        $_SESSION['errorCode'] = 0;

        return $data;
    }


}
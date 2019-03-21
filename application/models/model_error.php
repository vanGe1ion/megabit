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
        $errorType = $_SESSION['error'];

        $data['pageTitle'] = 'Ой, какая неприятность';

        switch ($errorType){
            case 600:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка входа',
                    'text' =>       'Пользователя с таким логином и паролем не существует',
                    'button' =>     'Назад',
                    'link' =>       SITE_ROOT. '/Authorisation'
                );
                break;
            }

            case 601:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка чтения базы данных',
                    'text' =>       'Запрос к базе данных вернул пустой результат ',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/Main'                   //todo
                );
                break;
            }

            case 403:{
                $data['errorData'] = array(
                    'title' =>      'Ошибка доступа',
                    'text' =>       'Не достаточно прав для просмотра этой страницы',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/Main'
                );
                break;
            }

            case 404:{
                $data += array(
                    'title' =>      'Ошибка 404',
                    'text' =>       'Запрашиваемая страница не найдена',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/Main'
                );
                break;
            }
            default:{
                $data += array(
                    'title' =>      'Непредвиденная ошибка',
                    'text' =>       'Обратитесь к разработчику',
                    'button' =>     'Главное меню',
                    'link' =>       SITE_ROOT.'/Main'
                );
                break;
            }
        }
        $_SESSION['error'] = 0;

        return $data;
    }


}
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

        $data = array('pageTitle'=>'Ошибка');
        switch ($errorType){
            case 1:{
                $data += array(
                    'title' => 'Ошибка входа',
                    'text' => 'Пользователя с таким логином и паролем не существует',
                    'button' => 'Назад',
                    'link' => $_SERVER['HTTP_ORIGIN']. '/Authorisation'
                );
                break;
            }

            case 404:{
                $data = array(
                    'title' => 'Ошибка 404',
                    'text' => 'Запрашиваемая страница не найдена',
                    'button' => 'Главное меню',
                    'link' => $_SERVER['HTTP_ORIGIN'].'/Main'
                );
                break;
            }
            default:{
                $data += array(
                    'title' => 'Непредвиденная ошибка',
                    'text' => 'Обратитесь к разработчику',
                    'button' => 'Главное меню',
                    'link' => $_SERVER['HTTP_ORIGIN'].'/Main'
                );
                break;
            }
        }
        $_SESSION['error'] = 0;

        return $data;
    }


}
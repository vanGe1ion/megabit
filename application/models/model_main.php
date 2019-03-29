<?php

class Model_main extends Model{

    public function GetMain()
    {
        $data = new MainDataContainer();
        $data->pageTitle = 'Главное меню';

        switch ($_SESSION['accessRights']){
            case AccessRights::ADMIN:{
                $data->mainMenu = array (
                    'Управление базой блюд'             => Router::FullRoute(Routes::DISHBASE),
                    'Управление базой пользователей'    => Router::FullRoute(Routes::USERBASE)
                );
                break;
            }
            case AccessRights::PLANNER:{
                $data->mainMenu = array (
                    'Управление базой блюд'             => Router::FullRoute(Routes::DISHBASE)
                );
                break;
            }
            case AccessRights::SERVE:{
                $data->mainMenu = array (
                    'Монитор очереди'                   => Router::FullRoute(Routes::QUEUEMONITOR)
                );
                break;
            }
            case AccessRights::USER:{
                $data->mainMenu = array (
                    'Управление меню'                   => Router::FullRoute(Routes::USERMENU)
                );
                    break;
            }
            default:{
                //$data->mainMenu = NULL;
            }
        }

        return $data;
    }
}
<?php

class Model_main extends Model{

    public function GetMain()
    {
        $data = new MainDataContainer();
        $data->pageTitle = 'Главное меню';

        switch ($_SESSION['accessRights']){
            case AccessRights::ADMIN:{
                $data->mainMenu = array (
                    'Управление базой пользователей'    => Router::FullRoute(Routes::USERBASE),
                    'Управление базой блюд'             => Router::FullRoute(Routes::DISHBASE),
                    'Планирование меню'                 => Router::FullRoute(Routes::MENUPLANNER),
                    'Монитор очереди'                   => Router::FullRoute(Routes::ADMIN_QUEUEMONITOR),
                    'Заказы'                            => Router::FullRoute(Routes::ADMIN_ORDERS),
                );
                break;
            }
            case AccessRights::PLANNER:{
                $data->mainMenu = array (
                    'Управление базой блюд'             => Router::FullRoute(Routes::DISHBASE),
                    'Планирование меню'                 => Router::FullRoute(Routes::MENUPLANNER),
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
                    'Заказы'                            => Router::FullRoute(Routes::ORDERS)
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
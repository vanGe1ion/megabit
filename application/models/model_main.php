<?php

class Model_main extends Model{

    public function GetMain()
    {
        $data['pageTitle'] = 'Главное меню';

        switch ($_SESSION['clearance']){
            case Clearance::ADMIN:{
                $data['mainMenu'] = array (
                    'Управление базой блюд'             => SITE_ROOT.'/dishbase',
                    'Управление базой пользователей'    => SITE_ROOT.'/userbase'
                );
                break;
            }
            case Clearance::PLANNER:{
                $data['mainMenu'] = array (
                    'Управление базой блюд'             => SITE_ROOT.'/dishbase'
                );
                break;
            }
            case Clearance::SERVE:{
                $data['mainMenu'] = array (
                    'Монитор очереди'                   => SITE_ROOT.'/queuemonitor'
                );
                break;
            }
            case Clearance::USER:{
                $data['mainMenu'] = array (
                    'Управление меню'                   => SITE_ROOT.'/'
                );
                    break;
            }
            default:{
                $data['mainMenu'] = NULL;
            }
        }

        return $data;
    }
}
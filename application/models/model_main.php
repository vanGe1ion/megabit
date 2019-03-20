<?php

class Model_main extends Model{

    public function GetMain()
    {
        $data = array('pageTitle'=>'Главное меню');
        switch ($_SESSION['permission']){
            case Permission::ADMIN:{
                $data['menuButtons'] = array (
                    'Управление базой блюд'=>'dishbase');
                break;
            }
            case Permission::SERVE:{
                $data['menuButtons'] = array (
                    'Управление базой блюд'=>'dishbase');
                break;
            }
            case Permission::USER:{
                $data['menuButtons'] = array (
                    'Управление меню'=>'');
                    break;
            }
            default:{}
        }

        return $data;
    }
}
<?php

class Model_main extends Model{

    public function get_data()
    {
        $data = array('pageTitle'=>'Главное меню');
        switch ($_SESSION['permission']){
            case Permission::ADMIN:{
                $data['menuButtons'] = array (
                    'Управление базой блюд'=>'some1');
                break;
            }
            case Permission::SERVE:{
                $data['menuButtons'] = array (
                    'Управление базой блюд'=>'some1');
                break;
            }
            case Permission::USER:{
                $data['menuButtons'] = array (
                    'Управление меню'=>'some2');
                    break;
            }
            default:{}
        }

        return $data;
    }
}
<?php

class Model_main extends Model{

    public function GetMain()
    {
        $data['pageTitle'] = 'Главное меню';

        switch ($_SESSION['permission']){
            case Permission::ADMIN:{
                $data['mainMenu'] = array (
                    'Управление базой блюд'     => SITE_ROOT.'/dishbase');
                break;
            }
            case Permission::SERVE:{
                $data['mainMenu'] = array (
                    'Управление базой блюд'     => SITE_ROOT.'/dishbase');
                break;
            }
            case Permission::USER:{
                $data['mainMenu'] = array (
                    'Управление меню'           => SITE_ROOT.'/');
                    break;
            }
            default:{
                $data['mainMenu'] = NULL;
            }
        }

        return $data;
    }
}
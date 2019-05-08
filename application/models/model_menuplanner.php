<?php


class Model_MenuPlanner extends Model
{
    public function Calendar(){
        $data = new MainDataContainer();
        $data->pageTitle = 'Планирование меню';
        $data->footerMenu = array(
            'Главное меню' =>   Router::FullRoute(Routes::MAIN)
        );
        return $data;
    }
}
<?php


class Model_MenuPlanner extends Model
{
    public function Calendar(){
        $data = new MainDataContainer();
        $data->pageTitle = 'Планирование меню';
        return $data;
    }
}
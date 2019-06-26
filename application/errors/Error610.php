<?php


class Error610 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка подключения к базе данных';
        $this->text =       'Не возможно подключиться к к базе данных '.DBNAME.' по адресу '.HOSTNAME;
        $this->button =     'Назад';
        $this->link =       Router::FullRoute(Routes::AUTHORISATION);
    }
}
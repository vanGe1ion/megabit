<?php


class Error611 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка чтения базы данных';
        $this->text =       'Некорректный запрос к базе данных';
        $this->button =     'Главное меню';
        $this->link =       Router::FullRoute(Routes::MAIN);
    }
}
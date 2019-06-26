<?php


class Error403 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка доступа';
        $this->text =       'Не достаточно прав для просмотра этой страницы';
        $this->button =     'Главное меню';
        $this->link =       Router::FullRoute(Routes::MAIN);
    }
}
<?php


class Error600 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка входа';
        $this->text =       'Пользователя с таким логином и паролем не существует';
        $this->button =     'Назад';
        $this->link =       Router::FullRoute(Routes::AUTHORISATION);
    }
}
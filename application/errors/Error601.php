<?php


class Error601 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка доступа';
        $this->text =       'Работа Вашей учетной записи была приостановлена. Обратитесь к администратору';
        $this->button =     'Выход';
        $this->link =       Router::FullRoute(Routes::LOGOUT);
    }
}
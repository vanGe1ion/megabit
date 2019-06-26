<?php


class Error603 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка ожидания';
        $this->text =       'Время текущей сессии для пользователя '. $_SESSION['login']. ' истекло. Выполните повторный вход';
        $this->button =     'Авторизация';
        $this->link =       Router::FullRoute(Routes::LOGOUT);
    }
}
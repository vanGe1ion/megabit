<?php


class Error0 extends CoreError
{
    public function __construct() {
        $this->title =      'Непредвиденная ошибка';
        $this->text =       'Обратитесь к разработчику';
        $this->button =     'Главное меню';
        $this->link =       Router::FullRoute(Routes::MAIN);
    }
}
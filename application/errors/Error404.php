<?php


class Error404 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка 404';
        $this->text =       'Запрашиваемая страница не найдена<br><br><img src="/image/hollyhole.png"/>';
        $this->button =     'Главное меню';
        $this->link =       Router::FullRoute(Routes::MAIN);
    }
}
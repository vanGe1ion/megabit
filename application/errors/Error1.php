<?php


class Error1 extends CoreError
{
    public function __construct() {
        $this->title =      'Ошибка?';
        $this->text =       'Эта ошибка не ошибка. Ну или ошибка то, что эта ошибка вообще выскочила. Как вы вообще это сделали!?<br>Из-за вас теперь вселенная коллапсирует...<br><br><img src="/image/collapse.gif"/>';
        $this->button =     'Главное меню';
        $this->link =       Router::FullRoute(Routes::MAIN);
    }
}
<?php



class ErrorDataContainer
{
    //single properties
    public $title =      NULL;//   - заголовок ошибки
    public $text =       NULL;//   - текст ошибки
    public $button =     NULL;//   - текст кнопки
    public $link =       NULL;//   - линк перенаправления со страницы ошибки

    public function __construct(CoreError $errorClass = NULL) {
        if($errorClass) {
            $this->title =  $errorClass->title;
            $this->text =   $errorClass->text;
            $this->button = $errorClass->button;
            $this->link =   $errorClass->link;
        }
    }
}
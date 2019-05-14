<?php

class MainDataContainer
{
    //single properties
    public $pageTitle = NULL;//                                 - название страницы
    public $errorCode = NULL;//                                 - код ошибки


    //array properties
    public $headerMenu = array(/*'label' => 'link', ...*/); //  - кнопки верхнего меню
    public $footerMenu = array(/*'label' => 'link', ...*/); //  - кнопки нижнего меню
    public $mainMenu = array(/*'label' => 'link', ...*/);   //  - кнопки главного меню


    //subcontainers
    public $tableData = NULL;//                                 - табличные данные запроса из бд
    public $errorData = NULL;//                                 - данные обработчика ошибок


    public function __construct()
    {
        $this->tableData = new TableDataContainer();
        $this->errorData = new ErrorDataContainer();
    }


}
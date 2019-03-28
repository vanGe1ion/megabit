<?php


class ViewDataContainer
{
    //single properties
    public $pageTitle = NULL;//                                               - название страницы
    public $errorCode = NULL;//                                               - код ошибки

    //array properties
    public $headerMenu = array(/*$label => $link, ...*/); //                  - кнопки верхнего меню
    public $footerMenu = array(/*$label => $link, ...*/); //                  - кнопки нижнего меню
    public $mainMenu = array(/*$label => $link, ...*/);   //                  - кнопки главного меню
    public $tableData = array(
//        'caption' =>        $tableName,                                     - название таблицы
//        'querryResult' =>   $querryResult = mysqli_query($dbLink, $querry), - результат выполнения запроса
//        'parentKey' =>      &dbRowName                                      - ключевое поле для вывода подтаблицы

//        'headRow' =>        array($dbRowName => $rowCaption, ...),          - шапка таблицы
//        'subTable' =>       array($subtableName => $subtableRootLink, ...)  - кнопки для вывода подтаблиц
    );
    public $errorData = array(
//        'title' =>      $errorTitle,                                        - заголовок ошибки
//        'text' =>       $errorText,                                         - текст ошибки
//        'button' =>     $label,                                             - текст кнопки
//        'link' =>       $link                                               - линк перенаправления со страницы ошибки
    );
}
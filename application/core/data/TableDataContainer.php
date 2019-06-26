<?php



class TableDataContainer
{
    //общие поля
    public $caption =     NULL;
    public $poolName =    NULL;                                                      // - имя контейнера для данных
    public $headRow =     array(/*'dbRowName' => 'rowLabel', ...*/);                 // - шапка таблицы
    public $tableForm =   array(/*'elemName' => 'elemType' ...*/);                   // - информация об елементах формы строки таблицы
    public $querySet =    array(/*'queryType' => 'queryName' ...*/);                 // - набор запросов для работы с таблицей



    //поля основного контейнера
    public $queryResult = NULL;  // - результат выполнения запроса
    public $expands =     array(/*'expNum' => array('label' => 'expTable'), ...*/);  //наборвложенных таблиц



    //поля вложенного контейнера
    public $mainKey =    array(/*'elemName', ...*/);                              // - имена таблиц связанных с таблицей связей

    public function __construct() {}

}
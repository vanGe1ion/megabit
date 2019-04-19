<?php



class TableDataContainer
{
    //single properties
    public $caption =        NULL;// - название таблицы
    public $querryResult =   NULL;// - результат выполнения запроса
    public $parentKey =      NULL;// - ключевое поле для вывода подтаблицы
    public $tableMark =      NULL;


    //array properties
    public $headRow =        array(//- шапка таблицы
        /*'dbRowName' => 'rowLabel', ...*/
    );

    public $subTable =       array(//- кнопки для вывода подтаблиц
        /*'subtableName' => 'subtableRootLink'.'parentTableID', ...*/
    );

    public $adderForm = array();

    public function __construct() {}

}
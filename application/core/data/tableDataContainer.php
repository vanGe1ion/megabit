<?php



class TableDataContainer
{
    //общие поля
    public $caption =        NULL;// - название таблицы
    public $headRow =        array(//- шапка таблицы
        /*'dbRowName' => 'rowLabel', ...*/
    );
    public $tableMark =      array(//- информация для организации асинхронных запросов
        /*'tableMark' => 'dbTable'*/
    );
    public $tableForm = array(//- информация об елементах формы строки таблицы
        /*'elemName' => 'elemType' ...*/
    );


    //поля основного контейнера
    public $querryResult =   NULL;// - результат выполнения запроса
    public $subButtons =       array(//- кнопки для вывода подтаблиц
        /*'subtableName' => 'subtableRootLink'.'parentTableID', ...*/
    );
    public $subTables = array();


    //поля вложенного контейнера
    public $parentKey =      NULL;// - ключевое поле для вывода подтаблицы
    public $rsTables = array();





    public function __construct($subTableCount = NULL) {
        if(isset($subTableCount))
            for($i = 0; $i < $subTableCount; ++$i)
                $this->subTables[$i] = new TableDataContainer();
    }

}
<?php



class TableDataContainer
{

    public $caption =        NULL;// - название таблицы
    public $querryResult =   NULL;// - результат выполнения запроса

    public $headRow =        array(//- шапка таблицы
        /*'dbRowName' => 'rowLabel', ...*/
    );
    public $tableMark =      array(//- информация для организации асинхронных запросов
        /*'tableMark' => 'dbTable'*/
    );
    public $tableForm = array(//- информация об елементах формы строки таблицы
        /*'elemName' => 'elemType' ...*/
    );


    public $subTables = array();

    public $parentKey =      NULL;// - ключевое поле для вывода подтаблицы

    public $subTable =       array(//- кнопки для вывода подтаблиц
        /*'subtableName' => 'subtableRootLink'.'parentTableID', ...*/
    );



    public function __construct($subTableCount = NULL) {
        if(isset($subTableCount))
            for($i = 0; $i < $subTableCount; ++$i)
                $this->subTables = new TableDataContainer();
    }

}
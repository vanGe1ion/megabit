<?php



class TableDataContainer
{
    //общие поля
    public $caption =        NULL;  // - название таблицы
    public $headRow =        array( // - шапка таблицы
        /*'dbRowName' => 'rowLabel', ...*/
    );
    public $tableMark =      array( // - информация для организации асинхронных запросов
        /*'tableMark' => 'TABLE_NAME'*/
    );
    public $tableForm =      array( // - информация об елементах формы строки таблицы
        /*'elemName' => 'elemType' ...*/
    );


    //поля основного контейнера
    public $querryResult =   NULL;  // - результат выполнения запроса
    public $subButtons =     array( // - кнопки для вывода подтаблиц
        /*'subtableName', ...*/
    );
    public $subTables =      array( // - контейнеры вложенных таблиц
        /*'tableDataContainer', ...*/
    );


    //поля вложенного контейнера
    public $parentKey =      NULL;  // - ключевое поле для вывода подтаблицы                        todo переписать subtableselect
    public $rsTables =       array( // - имена таблицб связанных с таблицей связей
        /*'TABLE_NAME', ...*/
    );





    public function __construct($subTableCount = NULL) {
        if(isset($subTableCount))
            for($i = 0; $i < $subTableCount; ++$i)
                $this->subTables[$i] = new TableDataContainer();
    }

}
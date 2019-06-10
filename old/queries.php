<?php

class QueriesOld
{


    //Запрос добавления
    public static function InsertQuery($dbtable, $fields, $vstring){
        return "INSERT INTO $dbtable ($fields) VALUES ($vstring)";
    }

    //Запрос удаления
    public static function DeleteQuery($dbtable, $statement){
        return "DELETE FROM $dbtable WHERE $statement";
    }

    //Запрос редактирования
    public static function UpdateQuery($dbtable, $statement, $vstring){
        return "UPDATE $dbtable SET $vstring WHERE $statement";
    }


    //Запрос содержимого таблицы связи
    public static function RSSelectQuery($fieldList, $tableList, $relationList, $idStatement){
        return "SELECT $fieldList FROM $tableList WHERE $relationList $idStatement";
    }
}
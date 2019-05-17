<?php

class Queries
{

    //Запрос  пользователя
    public static function AuthorizeQuery($login, $md5pass){
        return "SELECT * 
                FROM USER_LIST 
                WHERE Login= '$login' AND Password= '$md5pass'";
    }

    //Запрос данных о сотруднике
    public static function EmpDataQuery($EmpID){
        return "SELECT EMPLOYEERS_LIST.Emp_ID, EMPLOYEERS_LIST.Fullname, EMPLOYEERS_LIST.Department, EMPLOYEERS_LIST.Position, TABLE_LIST.Table_Name, SHIFT.Shift_Name 
                FROM EMPLOYEERS_LIST, TABLE_LIST, SHIFT 
                WHERE EMPLOYEERS_LIST.Table_ID=TABLE_LIST.Table_ID AND EMPLOYEERS_LIST.Shift_ID=SHIFT.Shift_ID AND Emp_ID='$EmpID'";
    }

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

    //Запрос содержимого
    public static function SelectQuery($dbtable, $statement = NULL){
        return "SELECT * FROM $dbtable $statement";
    }

    //Запрос содержимого таблицы связи
    public static function RSSelectQuery($fieldList, $tableList, $relationList, $idStatement){
        return "SELECT $fieldList FROM $tableList WHERE $relationList $idStatement";
    }
}
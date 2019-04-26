<?php

class Querries
{

    //Запрос  пользователя
    public static function AuthorizeQuerry($login, $md5pass){
        return "SELECT * FROM USER_LIST WHERE Login= '$login' AND Password= '$md5pass'";
    }

    //Запрос данных о сотруднике
    public static function EmpDataQuerry($EmpID){
        return "SELECT EMPLOYEERS_LIST.Emp_ID, EMPLOYEERS_LIST.Fullname, EMPLOYEERS_LIST.Department, EMPLOYEERS_LIST.Position, TABLE_LIST.Table_Name, SHIFT.Shift FROM EMPLOYEERS_LIST, TABLE_LIST, SHIFT WHERE EMPLOYEERS_LIST.Table_ID=TABLE_LIST.Table_ID AND EMPLOYEERS_LIST.Shift_ID=SHIFT.Shift_ID AND Emp_ID='$EmpID'";
    }

    //Запрос ингредиентов блюда
    public static function DishIngredientsQuerry($DishID){
        return 'SELECT Dish_Name, Ingredient_Name, Quantity, Measure_Name FROM DISH_INGREDIENTS, MEASURES_LIST, INGREDIENT_LIST, DISH_LIST WHERE DISH_INGREDIENTS.Ingredient_ID=INGREDIENT_LIST.Ingredient_ID AND DISH_INGREDIENTS.Measure_ID=MEASURES_LIST.Measure_ID AND DISH_LIST.Dish_ID=DISH_INGREDIENTS.Dish_ID AND DISH_INGREDIENTS.Dish_ID='.$DishID;
    }

    //Запрос добавления
    public static function InsertQuerry($dbtable, $fields, $vstring){
        return "INSERT INTO $dbtable ($fields) VALUES ($vstring)";
    }

    //Запрос удаления
    public static function DeleteQuerry($dbtable, $statement){
        return "DELETE FROM $dbtable WHERE $statement";
    }

    //Запрос редактирования
    public static function UpdateQuerry($dbtable, $statement, $vstring){
        return "UPDATE $dbtable SET $vstring WHERE $statement";
    }

    //Запрос содержимого
    public static function SelectQuerry($dbtable){
        return "SELECT * FROM $dbtable";
    }

    public static function RSSelectQuerry($fieldList, $tableList, $relationList, $idStatement){
        return "SELECT $fieldList FROM $tableList WHERE $relationList $idStatement";
    }
}
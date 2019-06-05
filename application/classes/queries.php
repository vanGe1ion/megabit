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
                    WHERE EMPLOYEERS_LIST.Table_ID=TABLE_LIST.Table_ID AND EMPLOYEERS_LIST.Shift_ID=SHIFT.Shift_ID 
                    AND Emp_ID='$EmpID'";
    }

    //запрос заказа
    public static function OrderSelectQuery($date, $empID){
        return "SELECT DISH_LIST.Dish_Name, ORDERS_MENU.Count
                    FROM ORDERS_MENU, ORDER_LIST, MENU_LIST, DISH_LIST 
                    WHERE ORDERS_MENU.Order_ID = ORDER_LIST.Order_ID AND ORDERS_MENU.Menu_ID = MENU_LIST.Menu_ID AND ORDERS_MENU.Dish_ID = DISH_LIST.Dish_ID
                    AND ORDER_LIST.Employee_ID = '$empID' AND ORDER_LIST.Date = '$date' AND MENU_LIST.Date = '$date'";
    }


    //запрос контроллеров
    public static function SelectControllers($access){
        return "SELECT CONTROLLER_LIST.Controller_Name AS label, CONTROLLER_LIST.Route AS route
                    FROM ACCESS_CONTROLLER, CONTROLLER_LIST 
                    WHERE ACCESS_CONTROLLER.Controller_ID = CONTROLLER_LIST.Controller_ID 
                    AND ACCESS_CONTROLLER.Access_ID = '$access'";
    }


    //запрос действий контроллера
    public static function SelectActions($contrName, $access){
        return "SELECT ACTION_LIST.Action_Name AS label, ACTION_LIST.Route AS actRoute, CONTROLLER_LIST.Route AS contrRoute 
                FROM CONTROLLER_LIST, ACTION_LIST, CONTROLLER_ACTION, ACCESS_ACTION
                WHERE CONTROLLER_LIST.Controller_ID = CONTROLLER_ACTION.Controller_ID AND CONTROLLER_ACTION.Action_ID = ACTION_LIST.Action_ID AND ACTION_LIST.Action_ID = ACCESS_ACTION.Action_ID 
                AND ACCESS_ACTION.Access_ID = '$access' AND CONTROLLER_LIST.Controller_Name = '$contrName'";
    }


    public static function SelectDishList(){
        return "SELECT DISH_LIST.Dish_ID, DISH_LIST.Dish_Name, DISH_TYPES.Dish_Type_Name, DISH_LIST.Price
            FROM DISH_LIST, DISH_TYPES
            WHERE DISH_TYPES.Dish_Type_ID = DISH_LIST.Dish_Type_ID
            ORDER BY DISH_LIST.Dish_ID";
    }


    public static function SelectDishIngredients($dishID){
        return "SELECT Ingredient_Name, Quantity, Measure_Name 
            FROM DISH_INGREDIENTS, DISH_LIST, INGREDIENT_LIST, MEASURES_LIST 
            WHERE DISH_INGREDIENTS.Dish_ID=DISH_LIST.Dish_ID AND DISH_INGREDIENTS.Ingredient_ID=INGREDIENT_LIST.Ingredient_ID AND DISH_INGREDIENTS.Measure_ID=MEASURES_LIST.Measure_ID 
            AND DISH_INGREDIENTS.Dish_ID = '$dishID'
            ORDER BY DISH_INGREDIENTS.Ingredient_ID";
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
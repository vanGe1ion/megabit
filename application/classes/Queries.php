<?php

abstract class Queries
{
    //Запрос содержимого таблицы без учета связей
    public static function SimpleSelectQuery($tableName){
        return "SELECT * FROM $tableName";
    }


    //Запрос  максимального ID меню
    public static function SelectMaxMenuID(){
        return "SELECT Menu_ID 
                    FROM MENU_LIST 
                    ORDER BY Menu_ID DESC 
                    LIMIT 1";
    }


    //Запрос  блюда
    public static function SelectDishPrice($data){
        return "SELECT Price
                    FROM DISH_LIST
                    WHERE Dish_ID = '$data[id]'";
    }


    //Запрос  пользователя
    public static function SelectAuthorize($login, $md5pass){
        return "SELECT * 
                    FROM USER_LIST 
                    WHERE Login= '$login' AND Password= '$md5pass'";
    }


    //Запрос данных о сотруднике
    public static function SelectEmployer($EmpID){
        return "SELECT EMPLOYEE_LIST.Emp_ID, EMPLOYEE_LIST.Fullname, EMPLOYEE_LIST.Department, EMPLOYEE_LIST.Position, TABLE_LIST.Table_Name, SHIFT_LIST.Shift_Name 
                    FROM EMPLOYEE_LIST, TABLE_LIST, SHIFT_LIST 
                    WHERE EMPLOYEE_LIST.Table_ID=TABLE_LIST.Table_ID AND EMPLOYEE_LIST.Shift_ID=SHIFT_LIST.Shift_ID 
                    AND Emp_ID='$EmpID'";
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
                    FROM CONTROLLER_LIST, ACTION_LIST, ACCESS_ACTION 
                    WHERE CONTROLLER_LIST.Controller_ID = ACTION_LIST.Controller_ID AND ACTION_LIST.Action_ID = ACCESS_ACTION.Action_ID 
                    AND ACCESS_ACTION.Access_ID = '$access' AND CONTROLLER_LIST.Controller_Name = '$contrName'";
    }


    //набор запросов для справочника блюд
    public static function SelectDishList($type = NULL){
        return "SELECT DISH_LIST.Dish_ID, DISH_LIST.Dish_Name, DISH_TYPE_LIST.Dish_Type_Name, DISH_LIST.Price
                    FROM DISH_LIST, DISH_TYPE_LIST
                    WHERE DISH_TYPE_LIST.Dish_Type_ID = DISH_LIST.Dish_Type_ID".(isset($type) ? " AND DISH_LIST.Dish_Type_ID = '$type' " : " ").
                    "ORDER BY DISH_LIST.Dish_ID";
    }

    public static function InsertDishList($data){
        return "INSERT INTO DISH_LIST (Dish_ID, Dish_Name, Dish_Type_ID, Price)
                    VALUES ('$data[id]', '$data[Dish_Name]', '$data[Dish_Type_ID]', '$data[Price]')";
    }

    public static function UpdateDishList($data){
        return "UPDATE DISH_LIST 
                    SET Dish_Name = '$data[Dish_Name]', Dish_Type_ID = '$data[Dish_Type_ID]', Price = '$data[Price]'
                    WHERE Dish_ID = '$data[id]'";
    }

    public static function DeleteDishList($data){
        return "DELETE FROM DISH_LIST
                    WHERE Dish_ID = '$data[id]'";
    }


    //набор запросов для справочника ингредиентов
    public static function SelectIngredientList(){
        return "SELECT *
                    FROM INGREDIENT_LIST
                    ORDER BY Ingredient_ID";
    }

    public static function InsertIngredientList($data){
        return "INSERT INTO INGREDIENT_LIST (Ingredient_ID, Ingredient_Name)
                    VALUES ('$data[id]', '$data[Ingredient_Name]')";
    }

    public static function UpdateIngredientList($data){
        return "UPDATE INGREDIENT_LIST 
                    SET Ingredient_Name = '$data[Ingredient_Name]'
                    WHERE Ingredient_ID = '$data[id]'";
    }

    public static function DeleteIngredientList($data){
        return "DELETE FROM INGREDIENT_LIST
                    WHERE Ingredient_ID = '$data[id]'";
    }


    //набор запросов для справочника типов блюд
    public static function SelectDishTypeList(){
        return "SELECT *
                    FROM DISH_TYPE_LIST
                    ORDER BY Dish_Type_ID";
    }

    public static function InsertDishTypeList($data){
        return "INSERT INTO DISH_TYPE_LIST (Dish_Type_ID, Dish_Type_Name)
                    VALUES ('$data[id]', '$data[Dish_Type_Name]')";
    }

    public static function UpdateDishTypeList($data){
        return "UPDATE DISH_TYPE_LIST 
                    SET Dish_Type_Name = '$data[Dish_Type_Name]'
                    WHERE Dish_Type_ID = '$data[id]'";
    }

    public static function DeleteDishTypeList($data){
        return "DELETE FROM DISH_TYPE_LIST
                    WHERE Dish_Type_ID = '$data[id]'";
    }


    //набор запросов для справочника мер
    public static function SelectMeasureList(){
        return "SELECT *
                    FROM MEASURE_LIST
                    ORDER BY Measure_ID";
    }

    public static function InsertMeasureList($data){
        return "INSERT INTO MEASURE_LIST (Measure_ID, Measure_Name)
                    VALUES ('$data[id]', '$data[Measure_Name]')";
    }

    public static function UpdateMeasureList($data){
        return "UPDATE MEASURE_LIST 
                    SET Measure_Name = '$data[Measure_Name]'
                    WHERE Measure_ID = '$data[id]'";
    }

    public static function DeleteMeasureList($data){
        return "DELETE FROM MEASURE_LIST
                    WHERE Measure_ID = '$data[id]'";
    }


    //набор запросов для ТС блюда - ингредиенты
    public static function SelectDishIngredients($data){
        return "SELECT Ingredient_Name, Quantity, Measure_Name 
                    FROM DISH_INGREDIENTS, DISH_LIST, INGREDIENT_LIST, MEASURE_LIST 
                    WHERE DISH_INGREDIENTS.Dish_ID=DISH_LIST.Dish_ID AND DISH_INGREDIENTS.Ingredient_ID=INGREDIENT_LIST.Ingredient_ID AND DISH_INGREDIENTS.Measure_ID=MEASURE_LIST.Measure_ID 
                    AND DISH_INGREDIENTS.Dish_ID = '$data[parent]'
                    ORDER BY DISH_INGREDIENTS.Ingredient_ID";
    }

    public static function InsertDishIngredients($data){
        return "INSERT INTO DISH_INGREDIENTS (Dish_ID, Ingredient_ID, Quantity, Measure_ID)
                    VALUES ('$data[parent]', '" . $data['field']['Ingredient_ID'] . "', '" . $data['field']['Quantity'] . "', '" . $data['field']['Measure_ID'] . "')";
    }

    public static function UpdateDishIngredients($data){
        return "UPDATE DISH_INGREDIENTS 
                    SET Ingredient_ID = '" . $data['field']['Ingredient_ID'] . "', Quantity = '" . $data['field']['Quantity'] . "', Measure_ID = '" . $data['field']['Measure_ID'] . "'
                    WHERE Dish_ID = '$data[parent]' AND Ingredient_ID = '" . $data['field']['Ingredient_ID'] . "'";
    }

    public static function DeleteDishIngredients($data){
        return "DELETE FROM DISH_INGREDIENTS
                    WHERE Dish_ID = '$data[parent]' AND Ingredient_ID = '" . $data['field']['id'] . "'";
    }


    //набор запросов для справочника меню
    public static function SelectMenuList($data){
        return "SELECT *
                    FROM MENU_LIST
                    WHERE Date = '$data[Date]'";
    }

    public static function InsertMenuList($data){
        return "INSERT INTO MENU_LIST (Menu_ID, Date)
                    VALUES ('$data[id]', '$data[Date]')";
    }

    public static function UpdateMenuList($data){
        return "UPDATE MENU_LIST 
                    SET Date = '$data[Date]'
                    WHERE Menu_ID = '$data[id]'";
    }

    public static function DeleteMenuList($data){
        return "DELETE FROM MENU_LIST
                    WHERE Menu_ID = '$data[id]'";
    }


    //набор запросов для ТС блюда - меню
    public static function SelectDishMenu($data){
        return "SELECT DISH_MENU.Dish_ID, Dish_Name, Dish_Type_ID, Price, Free 
                    FROM DISH_MENU, DISH_LIST
                    WHERE DISH_MENU.Dish_ID=DISH_LIST.Dish_ID 
                    AND DISH_MENU.Menu_ID = '$data[parent]'";
    }

    public static function InsertDishMenu($data){
        return "INSERT INTO DISH_MENU (Menu_ID, Dish_ID, Free)
                    VALUES ('$data[parent]', '" . $data['field']['Dish_ID'] . "', '" . $data['field']['Free'] . "')";
    }

    public static function UpdateDishMenu($data){
        return "UPDATE DISH_MENU 
                    SET Dish_ID = '" . $data['field']['Dish_ID'] . "', Free = '" . $data['field']['Free'] . "'
                    WHERE Menu_ID = '$data[parent]' AND DishID = '" . $data['field']['DishID'] . "'";
    }

    public static function DeleteDishMenu($data){
        return "DELETE FROM DISH_MENU
                    WHERE Menu_ID = '$data[parent]' AND Dish_ID = '" . $data['field']['id'] . "'";
    }

    //запрос заказа
//    public static function OrderSelectQuery($date, $empID){
//        return "SELECT DISH_LIST.Dish_Name, ORDERS_MENU.Count
//                    FROM ORDERS_MENU, ORDER_LIST, MENU_LIST, DISH_LIST
//                    WHERE ORDERS_MENU.Order_ID = ORDER_LIST.Order_ID AND ORDERS_MENU.Menu_ID = MENU_LIST.Menu_ID AND ORDERS_MENU.Dish_ID = DISH_LIST.Dish_ID
//                    AND ORDER_LIST.Employee_ID = '$empID' AND ORDER_LIST.Date = '$date' AND MENU_LIST.Date = '$date'";
//    }
}
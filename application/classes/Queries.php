<?php

abstract class Queries
{
    //особые запросы
    //Запрос содержимого таблицы без учета связей
    public static function SimpleSelect($tableName){
        return "SELECT * FROM $tableName";
    }

    //Запрос меню недели
    public static function SelectMenuOfWeek($data){
        return "SELECT Menu_ID, Date
                    FROM MENU_LIST 
                    WHERE Date >= '$data[leftLimit]' AND Date <= '$data[rightLimit]'
                    ORDER BY Date";
    }

    //Запрос  максимального ID меню
    public static function SelectMaxMenuID(){
        return "SELECT Menu_ID 
                    FROM MENU_LIST 
                    ORDER BY Menu_ID DESC 
                    LIMIT 1";
    }

    //Запрос  максимального ID заказа
    public static function SelectMaxOrderID(){
        return "SELECT Order_ID 
                    FROM ORDER_LIST 
                    ORDER BY Order_ID DESC 
                    LIMIT 1";
    }

    //Запрос  блюда
    public static function SelectDishPrice($data){
        return "SELECT Price
                    FROM DISH_LIST
                    WHERE Dish_ID = '$data[id]'";
    }

    //Запрос  бесплатности
    public static function SelectDishFree($data){
        return "SELECT Dish_ID
                    FROM DISH_MENU, MENU_LIST
                    WHERE DISH_MENU.Menu_ID=MENU_LIST.Menu_ID
                    AND Date = '$data[Date]' AND Free = '1'";
    }


    //Запрос  блюд для заказа
    public static function SelectOrderDishData($data){
        return "SELECT DISH_MENU.Dish_ID, DISH_LIST.Dish_Name, DISH_MENU.Free
                    FROM DISH_MENU, MENU_LIST, DISH_LIST
                    WHERE DISH_MENU.Menu_ID = MENU_LIST.Menu_ID AND DISH_MENU.Dish_ID = DISH_LIST.Dish_ID
                    AND Dish_Type_ID = '$data[Dish_Type_ID]' AND Date = '$data[Date]'";
    }





    //Запрос  пользователя
    public static function SelectAuthorize($login, $md5pass){
        return "SELECT * 
                    FROM USER_LIST 
                    WHERE Login= '$login' AND Password= '$md5pass'";
    }

    //Запрос данных о сотруднике
    public static function SelectEmployer($data){
        return "SELECT Emp_ID, Fullname, Department_Name, Position_Name, Table_Name, Shift_Name, PACS_ID
                    FROM EMPLOYEE_LIST, TABLE_LIST, SHIFT_LIST, DEPARTMENT_LIST, POSITION_LIST
                    WHERE EMPLOYEE_LIST.Table_ID=TABLE_LIST.Table_ID AND EMPLOYEE_LIST.Shift_ID=SHIFT_LIST.Shift_ID AND EMPLOYEE_LIST.Department_ID=DEPARTMENT_LIST.Department_ID AND EMPLOYEE_LIST.Position_ID=POSITION_LIST.Position_ID
                    AND Emp_ID='$data[EmpID]'";
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

    public static function InsertDish($data){
        return "INSERT INTO DISH_LIST (Dish_ID, Dish_Name, Dish_Type_ID, Price)
                    VALUES ('$data[id]', '$data[Dish_Name]', '$data[Dish_Type_ID]', '$data[Price]')";
    }

    public static function UpdateDish($data){
        return "UPDATE DISH_LIST 
                    SET Dish_Name = '$data[Dish_Name]', Dish_Type_ID = '$data[Dish_Type_ID]', Price = '$data[Price]'
                    WHERE Dish_ID = '$data[id]'";
    }

    public static function DeleteDish($data){
        return "DELETE FROM DISH_LIST
                    WHERE Dish_ID = '$data[id]'";
    }





    //набор запросов для справочника ингредиентов
    public static function SelectIngredientList(){
        return "SELECT Ingredient_ID, Ingredient_Name, Ingredient_Type_Name
                    FROM INGREDIENT_LIST, INGREDIENT_TYPE_LIST
                    WHERE INGREDIENT_LIST.Ingredient_Type_ID = INGREDIENT_TYPE_LIST.Ingredient_Type_ID
                    ORDER BY Ingredient_ID";
    }

    public static function InsertIngredient($data){
        return "INSERT INTO INGREDIENT_LIST (Ingredient_ID, Ingredient_Name, Ingredient_Type_ID)
                    VALUES ('$data[id]', '$data[Ingredient_Name]', '$data[Ingredient_Type_ID]')";
    }

    public static function UpdateIngredient($data){
        return "UPDATE INGREDIENT_LIST 
                    SET Ingredient_Name = '$data[Ingredient_Name]', Ingredient_Type_ID = '$data[Ingredient_Type_ID]'
                    WHERE Ingredient_ID = '$data[id]'";
    }

    public static function DeleteIngredient($data){
        return "DELETE FROM INGREDIENT_LIST
                    WHERE Ingredient_ID = '$data[id]'";
    }





    //набор запросов для справочника типов блюд
    public static function SelectDishTypeList(){
        return "SELECT *
                    FROM DISH_TYPE_LIST
                    ORDER BY Dish_Type_ID";
    }

    public static function InsertDishType($data){
        return "INSERT INTO DISH_TYPE_LIST (Dish_Type_ID, Dish_Type_Name)
                    VALUES ('$data[id]', '$data[Dish_Type_Name]')";
    }

    public static function UpdateDishType($data){
        return "UPDATE DISH_TYPE_LIST 
                    SET Dish_Type_Name = '$data[Dish_Type_Name]'
                    WHERE Dish_Type_ID = '$data[id]'";
    }

    public static function DeleteDishType($data){
        return "DELETE FROM DISH_TYPE_LIST
                    WHERE Dish_Type_ID = '$data[id]'";
    }





    //набор запросов для справочника классов ингрелиентов
    public static function SelectIngredientTypeList(){
        return "SELECT *
                    FROM INGREDIENT_TYPE_LIST
                    ORDER BY Ingredient_Type_ID";
    }

    public static function InsertIngredientType($data){
        return "INSERT INTO INGREDIENT_TYPE_LIST (Ingredient_Type_ID, Ingredient_Type_Name)
                    VALUES ('$data[id]', '$data[Ingredient_Type_Name]')";
    }

    public static function UpdateIngredientType($data){
        return "UPDATE INGREDIENT_TYPE_LIST 
                    SET Ingredient_Type_Name = '$data[Ingredient_Type_Name]'
                    WHERE Ingredient_Type_ID = '$data[id]'";
    }

    public static function DeleteIngredientType($data){
        return "DELETE FROM INGREDIENT_TYPE_LIST
                    WHERE Ingredient_Type_ID = '$data[id]'";
    }





    //набор запросов для справочника мер
    public static function SelectMeasureList(){
        return "SELECT *
                    FROM MEASURE_LIST
                    ORDER BY Measure_ID";
    }

    public static function InsertMeasure($data){
        return "INSERT INTO MEASURE_LIST (Measure_ID, Measure_Name)
                    VALUES ('$data[id]', '$data[Measure_Name]')";
    }

    public static function UpdateMeasure($data){
        return "UPDATE MEASURE_LIST 
                    SET Measure_Name = '$data[Measure_Name]'
                    WHERE Measure_ID = '$data[id]'";
    }

    public static function DeleteMeasure($data){
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
    public static function SelectMenu($data){
        return "SELECT *
                    FROM MENU_LIST
                    WHERE Date = '$data[Date]'";
    }

    public static function InsertMenu($data){
        return "INSERT INTO MENU_LIST (Menu_ID, Date)
                    VALUES ('$data[id]', '$data[Date]')";
    }

    public static function UpdateMenu($data){
        return "UPDATE MENU_LIST 
                    SET Date = '$data[Date]'
                    WHERE Menu_ID = '$data[id]'";
    }

    public static function DeleteMenu($data){
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
                    WHERE Menu_ID = '$data[parent]' AND Dish_ID = '" . $data['field']['old_id'] . "'";
    }

    public static function DeleteDishMenu($data){
        return "DELETE FROM DISH_MENU
                    WHERE Menu_ID = '$data[parent]' AND Dish_ID = '" . $data['field']['id'] . "'";
    }





    //набор запросов для справочника заказов
    public static function SelectOrder($data){
        return "SELECT Order_ID, Date
                    FROM ORDER_LIST
                    WHERE Date = '$data[Date]' AND Employee_ID = '$data[Employee_ID]'";
    }

    public static function InsertOrder($data){
        return "INSERT INTO ORDER_LIST (Order_ID, Date, Employee_ID)
                    VALUES ('$data[id]', '$data[Date]', '$data[Employee_ID]')";
    }

    public static function UpdateOrder($data){
        return "UPDATE ORDER_LIST 
                    SET Date = '$data[Date]'
                    WHERE Order_ID = '$data[id]' AND Employee_ID = '$data[Employee_ID]'";
    }

    public static function DeleteOrder($data){
        return "DELETE FROM ORDER_LIST
                    WHERE Order_ID = '$data[id]'";
    }





    //набор запросов для ТС блюда - меню
    public static function SelectOrderMenu($data){
        return "SELECT ORDER_MENU.Dish_ID, Dish_Name, Dish_Type_ID, Price, Count
                    FROM ORDER_MENU, DISH_LIST
                    WHERE ORDER_MENU.Dish_ID=DISH_LIST.Dish_ID 
                    AND ORDER_MENU.Order_ID = '$data[parent]'";
    }

    public static function InsertOrderMenu($data){
        return "INSERT INTO ORDER_MENU (Order_ID, Menu_ID, Dish_ID, Count)
                    VALUES ('$data[parent]', '" . $data['field']['Menu_ID'] . "', '" . $data['field']['Dish_ID'] . "', '" . $data['field']['Count'] . "')";
    }

    public static function UpdateOrderMenu($data){
        return "UPDATE ORDER_MENU 
                    SET Dish_ID = '" . $data['field']['Dish_ID'] . "', Menu_ID = '" . $data['field']['Menu_ID'] . "', Count = '" . $data['field']['Count'] . "'
                    WHERE Order_ID = '$data[parent]' AND Dish_ID = '" . $data['field']['old_id'] . "'";
    }

    public static function DeleteOrderMenu($data){
        return "DELETE FROM ORDER_MENU
                    WHERE Order_ID = '$data[parent]' AND Dish_ID = '" . $data['field']['id'] . "'";
    }




    //набор запросов для монитора очереди
    public static function SelectQueue($data){//'2019-07-29'
        return "SELECT Elem_ID, Order_ID, Emp_ID, Fullname
                    FROM QUEUE, EMPLOYEE_LIST, ORDER_LIST
                    WHERE QUEUE.PACS_ID = EMPLOYEE_LIST.PACS_ID AND EMPLOYEE_LIST.Emp_ID=ORDER_LIST.Employee_ID
                    AND Elem_ID > $data[lastElem] AND ORDER_LIST.Date='$data[Date]'
                    ORDER BY Elem_ID";
    }
//    public static function SelectQueue($data){
//        return "SELECT Elem_ID, Order_ID, Emp_ID, Fullname
//                    FROM QUEUE, EMPLOYEE_LIST, ORDER_LIST
//                    WHERE QUEUE.PACS_ID = EMPLOYEE_LIST.PACS_ID AND EMPLOYEE_LIST.Emp_ID=ORDER_LIST.Employee_ID
//                    AND Elem_ID > $data[lastElem] AND ORDER_LIST.Date='$data[Date]'
//                    ORDER BY Elem_ID";
//    }

    public static function DeleteQueue($data){
        return "DELETE FROM QUEUE
                    WHERE Elem_ID = '$data[id]'";
    }
}
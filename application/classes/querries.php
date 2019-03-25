<?php

class Querries
{

    //Запрос в бд для поиска пользователя
    public static function AuthorizeQuerry($login, $md5pass){
        return "SELECT * FROM USER_LIST WHERE Login= '$login' AND Password= '$md5pass'";
    }

    //Запрос данных о сотруднике
    public static function EmpDataQuerry($EmpID){
        return "SELECT EMPLOYEERS_LIST.Emp_ID, EMPLOYEERS_LIST.Fullname, EMPLOYEERS_LIST.Department, EMPLOYEERS_LIST.Position, TABLE_LIST.Table_Name, SHIFT.Shift FROM EMPLOYEERS_LIST, TABLE_LIST, SHIFT WHERE EMPLOYEERS_LIST.Table_ID=TABLE_LIST.Table_ID AND EMPLOYEERS_LIST.Shift_ID=SHIFT.Shift_ID AND Emp_ID='$EmpID'";
    }

    //Запрос данных о мерах
    public static function MeasureQuerry(){
        return "SELECT * FROM MEASURES_LIST";
    }

    //Запрос данных о типах блюд
    public static function DishTypeQuerry(){
        return "SELECT * FROM DISH_TYPES";
    }

    //Запрос данных об ингредиентах
    public static function IngredientsQuerry(){
        return "SELECT * FROM INGREDIENT_LIST";
    }

    //Запрос данных о блюдах
    public static function DishesQuerry(){
        return "SELECT Dish_ID, Dish_Name, DISH_TYPES.Dish_Type_Name as Dish_Type FROM DISH_LIST inner join DISH_TYPES on DISH_LIST.Dish_Type_ID = DISH_TYPES.Dish_Type_ID";
    }

    //Запрос ингредиентов блюда
    public static function DishIngredientsQuerry($DishID){
        return 'SELECT Dish_Name, Ingredient_Name, Quantity, Measure_Name FROM DISH_INGREDIENTS, MEASURES_LIST, INGREDIENT_LIST, DISH_LIST WHERE DISH_INGREDIENTS.Dish_ID='.$DishID.' and DISH_INGREDIENTS.Ingredient_ID=INGREDIENT_LIST.Ingredient_ID AND DISH_INGREDIENTS.Measure_ID=MEASURES_LIST.Measure_ID AND DISH_LIST.Dish_ID=DISH_INGREDIENTS.Dish_ID';
    }
}


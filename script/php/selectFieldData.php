<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT."application/classes/querries.php";

$select_id = $_POST["select_id"];
$iterator = $_POST["iter"];

$select_name = substr($select_id,0,-2)."Name";
switch ($select_id){
    case "Dish_Type_ID":{
        $resdata = Database::DBRequest(Querries::SelectQuerry("DISH_TYPES"));
        $result = array();
        while($res = mysqli_fetch_array($resdata))
           $result[$res[$select_id]] = $res[$select_name];
        $result["iter"] = $iterator;
        break;
    }
    case "Ingredient_ID":{
        $resdata = Database::DBRequest(Querries::SelectQuerry("INGREDIENT_LIST"));
        $result = array();
        while($res = mysqli_fetch_array($resdata))
            $result[$res[$select_id]] = $res[$select_name];
        break;
    }
    case "Measure_ID":{
        $resdata = Database::DBRequest(Querries::SelectQuerry("MEASURES_LIST"));
        $result = array();
        while($res = mysqli_fetch_array($resdata))
            $result[$res[$select_id]] = $res[$select_name];
        break;
    }
    case "Access_ID":{
        break;
    }
    case "Shift_ID":{
        break;
    }
    case "Table_ID":{
        break;
    }
    default:
        $result = array();
}

echo json_encode($result);
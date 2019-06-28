<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT . "application/core/Database.php";
include_once DOC_ROOT . "application/classes/Queries.php";

$select_id = $_POST["select_id"];
$query = NULL;

$select_name = substr($select_id,0,-2)."Name";
switch ($select_id){
    case "Dish_ID":{$query = "SelectDishList"; break;}
    case "Ingredient_ID":{$query ="SelectIngredientList"; break;}
    case "Dish_Type_ID":{$query = "SelectDishTypeList"; break;}
    case "Measure_ID":{$query = "SelectMeasureList"; break;}
    case "Access_ID":{break;}
    case "Shift_ID":{break;}
    case "Table_ID":{break;}
    default: {};
}
$resdata = Database::DBRequest(isset($_POST["select_sub_id"])?Queries::$query($_POST["select_sub_id"]):Queries::$query());
$result = array();
while($res = mysqli_fetch_array($resdata))
    $result[$res[$select_id]] = $res[$select_name];

echo json_encode($result);
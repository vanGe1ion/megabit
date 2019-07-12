<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT . "application/core/Database.php";
include_once DOC_ROOT . "application/classes/Queries.php";

$data = $_POST["select_data"];
$query = Queries::SelectOrderDishData($data);
$resdata = Database::DBRequest($query);
$result = array();
while($res = mysqli_fetch_array($resdata))
    $result[$res["Dish_ID"]] = array($res["Dish_Name"], $res["Free"]);

echo json_encode($result);
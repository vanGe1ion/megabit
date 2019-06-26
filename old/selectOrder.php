<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT . "application/core/Database.php";
include_once DOC_ROOT . "application/classes/Queries.php";

$empID = $_POST["empID"];
$date = $_POST["date"];

$query = Queries::OrderSelectQuery($date, $empID);
$resdata = Database::DBRequest($query);


$result = array();
while($res = mysqli_fetch_array($resdata)){
    for($i = 0; $i < count($res)/2; ++$i)
        unset($res[$i]);
    array_push($result, $res);
}

echo json_encode($result);
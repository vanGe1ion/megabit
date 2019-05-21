<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT . "application/classes/queries.php";

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
<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT . "application/core/Database.php";
include_once DOC_ROOT . "application/classes/Queries.php";


$queryName = $_POST["queryName"];
$query =Queries::$queryName($_POST["queryData"]);
$resdata = Database::DBRequest($query);


$result = array();
while($res = mysqli_fetch_array($resdata)){
    $rescount = count($res)/2;
    for($i = 0; $i < $rescount; ++$i)
        unset($res[$i]);
    array_push($result, $res);
}


echo json_encode($result);
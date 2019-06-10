<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT . "application/classes/queries.php";


$statement = "";
$dbtable = $_POST["tableName"];
unset($_POST["tableName"]);
if(count($_POST) != 0) {
    $statement = "WHERE ";
    foreach ($_POST as $key => $val)
        $statement .= "$key = '$val' AND ";
}
$statement = substr($statement, 0, -5);


$query = Queries::SimpleSelectQuery($dbtable, $statement);
$resdata = Database::DBRequest($query);


$result = array();
while($res = mysqli_fetch_array($resdata)){
    for($i = 0; $i < count($res)/2; ++$i)
        unset($res[$i]);
    array_push($result, $res);
}


echo json_encode($result);
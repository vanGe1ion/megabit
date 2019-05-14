<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT . "application/classes/queries.php";


$dbtable = $_POST["tableName"];
unset($_POST["tableName"]);
$statement = "WHERE ";
foreach ($_POST as $key => $val)
$statement .= "$key = '$val'";



$query = Queries::SelectQuery($dbtable, $statement);
$resdata = Database::DBRequest($query);


$result = array();
while($res = mysqli_fetch_array($resdata)){
    for($i = 0; $i < count($res)/2; ++$i)
        $result[$i] = $res[$i];
}


echo json_encode($result);
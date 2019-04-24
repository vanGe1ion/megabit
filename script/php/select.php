<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT."application/classes/querries.php";

$dbtable = $_POST['dbtable'];
$fields = $_POST['fields'];

$resdata = Database::DBRequest(Querries::SelectQuerry($dbtable));

$result = array();

while($res = mysqli_fetch_array($resdata)){
    $newfield = array();
    foreach ($fields as $val)
        array_push($newfield, $res[$val]);
    array_push($result, $newfield);
}
echo json_encode($result);
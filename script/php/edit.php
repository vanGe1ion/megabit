<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT."application/classes/querries.php";

$datastring = "";
$dbtable = "";
$tableMark = "";


foreach ($_POST['tableMark'] as $key => $val) {
    $dbtable = $val;
    $tableMark = $key;
}
unset($_POST['tableMark']);


$statement = $tableMark . "_ID = '" . $_POST['id']."'";
if(isset($_POST["subId"]))
    foreach ($_POST["subId"] as $key => $val ){
        $statement .= " AND ". $key . " = '".$val."'";
    }
unset($_POST['subId']);

foreach ($_POST as $key => $val){
    if($key != "id")
        $datastring .= $key ." = '". $val . "', ";
}
$datastring = substr($datastring, 0, -2);


Database::DBRequest(Querries::UpdateQuerry($dbtable, $statement, $datastring));

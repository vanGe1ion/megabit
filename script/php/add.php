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

$fields = $tableMark . "_ID, ";
foreach ($_POST as $key => $val){
    $datastring .= "'" . $val . "', ";
    if($key != "id")
        $fields .= $key . ", ";

}
$datastring = substr($datastring, 0, -2);
$fields = substr($fields, 0, -2);

Database::DBRequest(Querries::InsertQuerry($dbtable, $fields, $datastring));

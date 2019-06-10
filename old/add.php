<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT . "application/classes/queries.php";

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

$result = Database::DBRequest(Queries::InsertQuery($dbtable, $fields, $datastring));
echo $result;
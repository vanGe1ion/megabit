<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT."application/classes/querries.php";

$datastring = "";
$queryName = "Insert".$_POST['tableMark']."Querry";
unset($_POST['tableMark']);
foreach ($_POST as $val){
    $datastring .= "'". $val . "', ";
}
$datastring = substr($datastring, 0, -2);

Database::DBRequest(Querries::$queryName($datastring));

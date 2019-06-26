<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT . "application/core/Database.php";
include_once DOC_ROOT . "application/classes/Queries.php";


$queryName = $_POST["queryName"];
$query =Queries::$queryName($_POST["queryData"]);
$result = Database::DBRequest($query);

echo $result;

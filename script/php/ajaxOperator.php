<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT . "application/classes/queries.php";


$queryName = $_POST["queryName"];
$query =Queries::$queryName($_POST["queryData"]);
$result = Database::DBRequest($query);

echo $result;

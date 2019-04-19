<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT."application/classes/querries.php";

$queryName = "Delete".$_POST['tableMark']."Querry";

Database::DBRequest(Querries::$queryName($_POST['id']));
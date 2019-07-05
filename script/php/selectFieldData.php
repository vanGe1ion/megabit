<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT . "application/core/Database.php";
include_once DOC_ROOT . "application/classes/Queries.php";

$select_id = $_POST["select_id"];
$select_name = substr($select_id,0,-2)."Name";

$query = "Select";
$explode = explode("_", $select_id);
for ($i=0;$i<count($explode)-1; ++$i)
    $query .= $explode[$i];
$query .= "List";

$resdata = Database::DBRequest(isset($_POST["select_sub_id"])?Queries::$query($_POST["select_sub_id"]):Queries::$query());
$result = array();
while($res = mysqli_fetch_array($resdata))
    $result[$res[$select_id]] = $res[$select_name];

echo json_encode($result);
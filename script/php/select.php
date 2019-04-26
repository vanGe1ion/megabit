<?php
require_once $_SERVER['DOCUMENT_ROOT']."/config.php";
include_once DOC_ROOT."application/core/database.php";
include_once DOC_ROOT."application/classes/querries.php";

$subTable = $_POST["subTable"];


$parentKeyId = "";
$parentKeyName = "";
$mainTable = "";
foreach ($subTable['tableMark'] as $parentMark => $mainT){
    $parentKeyId = $parentMark."_ID";
    $parentKeyName = $parentMark."_Name";
    $mainTable = $mainT;
}


$fieldList = $parentKeyName.", ";
foreach ($subTable['headRow'] as $field => $label)
    $fieldList .= $field.", ";
$fieldList = substr($fieldList, 0, -2);


$tableList = $mainTable.", ";
foreach ($subTable['rsTables'] as $tableName)
    $tableList .= $tableName.", ";
$tableList = substr($tableList, 0, -2);


$rstId = array($parentKeyId);
foreach($subTable['tableForm'] as $id => $type)
    if(substr($id, -2, 2) == "ID")
        array_push($rstId, $id);
$relationList = "";
for($i = 0; $i < count($subTable['rsTables']); ++$i) {
    if($relationList !=  "")
        $relationList .= " AND ";
    $relationList .= $mainTable . "." . $rstId[$i] . "=" . $subTable['rsTables'][$i] . "." . $rstId[$i];
}

$idStatement = "";
if(isset($_POST['parent']))
    $idStatement = " AND ".$mainTable.".".$parentKeyId."=".$_POST['parent']['fieldId'];


$query = Querries::RSSelectQuerry($fieldList, $tableList, $relationList, $idStatement);
$resdata = Database::DBRequest($query);


$result = array("");
$iter = 0;
while($res = mysqli_fetch_array($resdata)){
    $newfield = array();
    foreach (explode(", ", $fieldList) as $item)
        $newfield[$item] = $res[$item];
    $result[0] = $newfield[$parentKeyName];
    unset($newfield[$parentKeyName]);
    array_push($result, $newfield);
}


echo json_encode($result);
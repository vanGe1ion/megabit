<?php
//unused in project
include_once $_SERVER['DOCUMENT_ROOT']."/db_config.php";
    $id = mysqli_real_escape_string($mysqli, $_POST['id']);

    $res = mysqli_query($mysqli, "SELECT * FROM users WHERE id='$id'");
    $res = mysqli_fetch_array($res);
    $result = json_encode(array(
                            'id'=>$res["id"],
                            'name'=>$res['name'],
                            'age'=>$res['age'],
                            'email'=>$res['email']
    ));
    echo $result;
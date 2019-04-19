<?php
// including the database connection file
include_once($_SERVER['DOCUMENT_ROOT']."/db_config.php");

$id = mysqli_real_escape_string($mysqli, $_POST['id']);
$name = mysqli_real_escape_string($mysqli, $_POST['name']);
$age = mysqli_real_escape_string($mysqli, $_POST['age']);
$email = mysqli_real_escape_string($mysqli, $_POST['email']);

//updating the table
$result = mysqli_query($mysqli, "UPDATE users SET name='$name',age='$age',email='$email' WHERE id=$id");

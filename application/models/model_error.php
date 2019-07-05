<?php


class Model_Error
{
    public function GetError(){
        require_once "application/classes/factories/Factory_Error.php";
        $errFactory = new Factory_Error($_SESSION['errorCode']);
        $data = new MainDataContainer();
        $data->pageTitle = 'Ой, какая неприятность';
        $data->errorData = new ErrorDataContainer($errFactory->GetError());
        unset($_SESSION['errorCode']);
        return $data;
    }
}
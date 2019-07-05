<?php


class Factory_Error
{
    private $error;

    public function __construct($type){
        if(!isset($type) || !file_exists("application/errors/Error".$type.".php")){
            require_once "application/errors/Error0.php";
            $this->error = new Error0();
        }
        else{
            require_once "application/errors/Error".$type.".php";
            $errorName = "Error".$type;
            $this->error = new $errorName();
        }
    }

    public function GetError(){
        return $this->error;
    }
}
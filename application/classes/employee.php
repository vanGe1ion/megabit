<?php

class Employee
{

    private $fullname = "";
    private $department = "";
    private $job = "";
    private $table = 0;
    private $sitting = 0;
    private $PACS_ID = 0;

    function __construct($fullname, $department, $job, $table, $PACS_ID)
    {
        $this->fullname = $fullname;
        $this->department = $department;
        $this->job = $job;
        $this->table = $table;
        $this->PACS_ID = $PACS_ID;
    }

    public function PrintUserInfo()
    {
        echo "Сотрудник: " . $this->fullname . "<br>";
        echo "Отдел: " . $this->department . "<br>";
        echo "Должность: " . $this->job . "<br>";
        echo "Стол №" . $this->table . "<br>";
    }

    public function GetSitting(){
        return $this->sitting;
    }

    public function GetFullname(){
        return $this->fullname;
    }

    public function SetSitting($sitting){
        $this->sitting = $sitting;
    }
}

?>
<?php

class Employee
{

    private $fullname = "";
    private $department = "";
    private $position = "";
    private $table = 0;
    private $shift = '';
    private $PACS_ID = "";


    function __construct($fullname, $department, $position, $table, $shift, $PACS_ID)
    {
        $this->fullname = $fullname;
        $this->department = $department;
        $this->position = $position;
        $this->table = $table;
        $this->shift = $shift;
        $this->PACS_ID = $PACS_ID;
    }

    public function PrintUserInfo()
    {
        echo "Сотрудник: " . $this->fullname . "<br>";
        echo "Отдел: " . $this->department . "<br>";
        echo "Должность: " . $this->position . "<br>";
        echo "Стол №" . $this->table . "<br>";
    }

    public function GetShift(){
        return $this->shift;
    }

    public function SetShift($shift){
        $this->shift = $shift;
    }

    public function GetFullname(){
        return $this->fullname;
    }

    public function GetPACS(){
        return $this->PACS_ID;
    }
}
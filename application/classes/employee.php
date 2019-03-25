<?php

class Employee
{

    private $fullname = "";
    private $department = "";
    private $job = "";
    private $table = 0;
    private $shift = '';
    private $PACS_ID = 0;

    function __construct($fullname, $department, $job, $table, $shift, $PACS_ID)
    {
        $this->fullname = $fullname;
        $this->department = $department;
        $this->job = $job;
        $this->table = $table;
        $this->shift = $shift;
        $this->PACS_ID = $PACS_ID;
    }

    public function PrintUserInfo()
    {
        echo "Сотрудник: " . $this->fullname . "<br>";
        echo "Отдел: " . $this->department . "<br>";
        echo "Должность: " . $this->job . "<br>";
        echo "Стол №" . $this->table . "<br>";
    }

    public function GetShift(){
        return $this->shift;
    }

    public function SetShift($shift){
        $this->shift = $shift;
    }

    public function GetPACS(){
        return $this->PACS_ID;
    }

    public function GetFullname(){
        return $this->fullname;
    }
}

<?php

class User
{

    private $login = "";
    private $md5pass = "";
    private $permission = Permission::UNAUTHORIZED;
    private $empID = 0;
    private $empData = NULL;

    function __construct($login, $md5pass = "", $permission, $empID)
    {
        $this->login = $login;
        $this->md5pass = $md5pass;
        $this->permission = $permission;
        $this->empID = $empID;

        if ($permission == Permission::USER)
            $this->empData = $this->GetEmpDbData($this->empID);

        //при ловле юзера из сессии записывать туда его снова не надо
        if(!StatFuncs::LoggedIn())
            $this->SessLogin();
    }


    public static function RebuildUser (){
        if (StatFuncs::LoggedIn()){
            $user = new User($_SESSION['login'],"",  $_SESSION['permission'], $_SESSION['empID']);
            return $user;
        }
    }


    public function GetPermission()
    {
        return $this->permission;
    }

    public function GetLogin()
    {
        return $this->login;
    }

    public function PrintEmployee()
    {
        if($this->empData)
            $this->empData->PrintUserInfo();
        else
            echo "No employee data found";
    }

    private function GetEmpDbData($empID): Employee
    {

        $querry = Querries::EmpDataQuerry($empID);
        $result = Database::DBRequest($querry);

        if ($result->num_rows)
            $row = mysqli_fetch_array($result);
        $currentEmp = new Employee($row['FIO'], $row['Department'], $row['Position'], $row['Table_ID'], $row['PACS_ID']);

        return $currentEmp;
    }

    private function SessLogin(){
        $_SESSION['login'] = $this->login;
        $_SESSION['permission'] = $this->permission;
        $_SESSION['empID'] = $this->empID;
        if($_SESSION['empID'])
            $_SESSION['fullname'] = $this->empData->GetFullname();
    }


}
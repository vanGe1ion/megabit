<?php

class Model_Main extends Model{

    public function GetMain()
    {
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'Главное меню';

            $query = Queries::SelectControllers($_SESSION['accessRights']);
            $result = Database::DBRequest($query);
            $mainMenu = array();

            while ($res = mysqli_fetch_array($result)) {
                $mainMenu[$res['label']] = Router::FullRoute($res['route']);
            }
            $data->mainMenu = $mainMenu;
        }
        return $data;
    }
}
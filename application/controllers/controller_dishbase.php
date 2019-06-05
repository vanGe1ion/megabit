<?php


class Controller_DishBase extends Controller
{

    function __construct()
    {
        $this->model = new Model_DishBase();
        $this->view = new View();
        $this->data = new MainDataContainer();
        $this->scriptSet = array();
    }

    function action_index()
    {

        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetNavigation();
            $this->view->Generate('empty_view.php', 'template_view.php', $this->data);
        }
    }


    function action_dishes()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetDishList();
            if ($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->scriptSet = array('tableK1Script.js', 'tableK2Script.js', 'dishBaseScript.js');
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data, $this->scriptSet);
            }

        }
    }



    function action_ingredients()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetIngredientList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->scriptSet = array('tableK1Script.js', 'dishBaseScript.js');
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data, $this->scriptSet);
            }
        }
    }


    function action_dishtypes()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN))) {
            $this->data = $this->model->GetDishTypeList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->scriptSet = array('tableK1Script.js', 'dishBaseScript.js');
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data, $this->scriptSet);
            }
        }
    }

    function action_measures()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN))) {
            $this->data = $this->model->GetMeasureList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->scriptSet = array('tableK1Script.js', 'dishBaseScript.js');
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data, $this->scriptSet);
            }
        }
    }
}
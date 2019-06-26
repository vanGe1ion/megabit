<?php


class Controller_DishBase extends Controller
{

    function __construct()
    {
        $this->model = new Model_DishBase();
        $this->view = new View();
        $this->data = new MainDataContainer();
    }

    function action_index()
    {
        Router::GoOn(Routes::DISHES);
    }


    function action_dishes()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetDishList();
            if ($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data);
            }
        }
    }



    function action_ingredients()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetIngredientList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data);
            }
        }
    }


    function action_dishtypes()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN))) {
            $this->data = $this->model->GetDishTypeList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data);
            }
        }
    }

    function action_measures()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN))) {
            $this->data = $this->model->GetMeasureList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                $this->view->Generate('dishbase_view.php', 'template_view.php', $this->data);
            }
        }
    }
}
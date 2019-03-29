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

        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetNavigation();
            $this->view->Generate('empty_view.php', 'template_view.php', $this->data);
        }
    }

    function action_dishes($params)
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {

            switch ($params){
                case NULL:{
                    $this->data = $this->model->GetDishList();
                    break;
                }
                default:{
                    if (count($params) > 1)//заглушка на количество параметров
                        $this->data->errorCode = StatFuncs::ThrowError(ErrorCode::NOT_FOUND);
                    else
                        $this->data = $this->model->GetDishIngredients($params[0]);
                }
            }

            if ($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else
                $this->view->Generate('table_view.php', 'template_view.php', $this->data);

        }
    }

    function action_ingredients()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->GetIngredientList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else
                $this->view->Generate('table_view.php', 'template_view.php', $this->data);
        }
    }


    function action_dishtypes()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN))) {
            $this->data = $this->model->GetDishTypeList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else
                $this->view->Generate('table_view.php', 'template_view.php', $this->data);
        }
    }

    function action_measures()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN))) {
            $this->data = $this->model->GetMeasureList();
            if($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else
                $this->view->Generate('table_view.php', 'template_view.php', $this->data);
        }
    }
}
<?php


class Controller_DishBase extends Controller
{

    function __construct()
    {
        $this->model = new Model_DishBase();
        $this->view = new View();
    }

    function action_index()
    {

        if (!StatFuncs::ValidateUsers(array(Clearance::ADMIN, Clearance::PLANNER))) {
            $data = $this->model->GetNavigation();
            $this->view->Generate('empty_view.php', 'template_view.php', $data);
        }
    }

    function action_dishes($params)
    {
        if (!StatFuncs::ValidateUsers(array(Clearance::ADMIN, Clearance::PLANNER))) {

            switch ($params){
                case NULL:{
                    $data = $this->model->GetDishList();
                    break;
                }
                default:{
                    if (count($params) > 1)//заглушка на количество параметров
                        $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::NOT_FOUND);
                    else
                        $data = $this->model->GetDishIngredients($params[0]);
                }
            }
//
            if ($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);

        }
    }

    function action_ingredients()
    {
        if (!StatFuncs::ValidateUsers(array(Clearance::ADMIN, Clearance::PLANNER))) {
            $data = $this->model->GetIngredientList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }


    function action_dishtypes()
    {
        if (!StatFuncs::ValidateUsers(array(Clearance::ADMIN))) {
            $data = $this->model->GetDishTypeList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }

    function action_measures()
    {
        if (!StatFuncs::ValidateUsers(array(Clearance::ADMIN))) {
            $data = $this->model->GetMeasureList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }
}
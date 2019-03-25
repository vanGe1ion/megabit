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

        if (StatFuncs::IsUser() || StatFuncs::IsServe()) {
            StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
            header("Location: " . SITE_ROOT . "/Error");
        }
        else {
            $data = $this->model->GetNavigation();
            $this->view->Generate('empty_view.php', 'template_view.php', $data);
        }
    }

    function action_dishes()
    {
        if (StatFuncs::IsUser() || StatFuncs::IsServe()) {
            StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetDishList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }

    function action_ingredients()
    {
        if (StatFuncs::IsUser()) {
            StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetIngredientList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }


    function action_dishtypes()
    {
        if (!StatFuncs::IsAdmin()) {
            StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetDishTypeList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }

    function action_measures()
    {
        if (!StatFuncs::IsAdmin()) {
            StatFuncs::ThrowError(ErrorCode::FORBIDDEN);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetMeasureList();
            if($data['errorCode'] != ErrorCode::WITHOUT_ERRORS)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }
}
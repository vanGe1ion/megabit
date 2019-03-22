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
        if (!StatFuncs::LoggedIn())
            header("Location: " . SITE_ROOT . "/Authorisation");
        elseif (StatFuncs::IsUser()) {
            StatFuncs::ThrowError(403);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
        $data = $this->model->GetNavigation();
        $this->view->Generate('empty_view.php', 'template_view.php', $data);
        }
    }

    function action_dishes()
    {
        if (!StatFuncs::LoggedIn())
            header("Location: " . SITE_ROOT . "/Authorisation");
        elseif (StatFuncs::IsUser()) {
            StatFuncs::ThrowError(403);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetDishList();
            if($data['errorCode'] != 0)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }

    function action_ingredients()
    {
        if (!StatFuncs::LoggedIn())
            header("Location: " . SITE_ROOT . "/Authorisation");
        elseif (StatFuncs::IsUser()) {
            StatFuncs::ThrowError(403);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetIngredientList();
            if($data['errorCode'] != 0)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }


    function action_dishtypes()
    {
        if (!StatFuncs::LoggedIn())
            header("Location: " . SITE_ROOT . "/Authorisation");
        elseif (!StatFuncs::IsAdmin()) {
            StatFuncs::ThrowError(403);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetDishTypeList();
            if($data['errorCode'] != 0)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }

    function action_measures()
    {
        if (!StatFuncs::LoggedIn())
            header("Location: " . SITE_ROOT . "/Authorisation");
        elseif (!StatFuncs::IsAdmin()) {
            StatFuncs::ThrowError(403);
            header("Location: " . SITE_ROOT . "/Error");
        } else {
            $data = $this->model->GetMeasureList();
            if($data['errorCode'] != 0)
                header("Location: " . SITE_ROOT . "/Error");
            else
                $this->view->Generate('table_view.php', 'template_view.php', $data);
        }
    }
}
<?php


class controller_Authorisation extends Controller
{
    function __construct()
    {
        $this->model = new Model_Authorisation();
        $this->view = new View();
    }

    function action_index()
    {
        if (StatFuncs::LoggedIn())
            header("Location: ".$_SERVER['HTTP_ORIGIN']."/Main");
        else
            $this->view->Generate('authorisation_view.php', 'template_view.php', array('pageTitle' => 'Авторизация'));
    }

    function action_login()
    {
        if (!StatFuncs::LoggedIn())
            $err = $this->model->Login();

        if ($err != 0)
            header("Location: ".$_SERVER['HTTP_ORIGIN']."/error");
        else
            header("Location: ".$_SERVER['HTTP_ORIGIN']."/Main");
    }


    function action_logout()
    {
        $this->model->Logout();
        header("Location: ".$_SERVER['HTTP_ORIGIN']."/Authorisation");
    }
}
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
            header("Location: ".SITE_ROOT."/Main");
        else
            $data['pageTitle'] = 'Авторизация';
            $this->view->Generate('authorisation_view.php', 'template_view.php', $data);
    }

    function action_login()
    {
        $data='';
        if (!StatFuncs::LoggedIn())
            $data = $this->model->Login();

        if ($data['errorCode'] != 0)
            header("Location: ".SITE_ROOT."/error");
        else
            header("Location: ".SITE_ROOT."/Main");
    }


    function action_logout()
    {
        header("Location: ".SITE_ROOT."/cookie_logout_crutch.php");
    }
}
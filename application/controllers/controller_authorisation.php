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
            $this->view->Generate('authorisation_view.php', 'template_view.php', array('pageTitle' => 'Авторизация'));
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
        $this->model->Logout();
        header("Location: ".SITE_ROOT."/Authorisation");
    }
}
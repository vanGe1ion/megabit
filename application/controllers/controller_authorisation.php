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
            header("Location: ".SITE_ROOT."/main");
        else
            $data['pageTitle'] = 'Авторизация';
            $this->view->Generate('authorisation_view.php', 'template_view.php', $data);
    }

    function action_login()
    {
        $data='';
        if (!StatFuncs::LoggedIn())
            $data = $this->model->Login();

        if (isset($data['errorCode']) && $data['errorCode'] == ErrorCode::WITHOUT_ERRORS)
            header("Location: ".SITE_ROOT."/main");
        else
            header("Location: ".SITE_ROOT."/error");
    }


    function action_logout()
    {
        SessionController::SessionDestroy();
    }
}
<?php


class controller_Authorisation extends Controller
{
    function __construct()
    {
        $this->model = new Model_Authorisation();
        $this->view = new View();
        $this->data = new MainDataContainer();
    }

    function action_index()
    {
        if (StatFuncs::LoggedIn())
            Router::GoOn(Routes::MAIN);
        else
            $this->data->pageTitle = 'Авторизация';
            $this->view->Generate('authorisation_view.php', 'template_view.php', $this->data);
    }

    function action_login()
    {
        if (!StatFuncs::LoggedIn())
            $this->data = $this->model->Login();

        if ($this->data->errorCode == ErrorCode::WITHOUT_ERRORS)//isset($data['errorCode']) &&
            Router::GoOn(Routes::MAIN);
        else
            Router::GoOn(Routes::ERRROR);
    }


    function action_logout()
    {
        SessionController::SessionDestroy();
    }
}
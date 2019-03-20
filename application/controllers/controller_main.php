<?php

class Controller_Main extends Controller
{
    function __construct()
    {
        $this->model = new Model_Main();
        $this->view = new View();
    }

	function action_index()
	{
        if (StatFuncs::LoggedIn()) {
            $data = $this->model->get_data();
            $this->view->Generate('main_view.php', 'template_view.php', $data);
        }
        else
            header("Location: ".$_SERVER['HTTP_ORIGIN']."/Authorisation");
    }
}
<?php

class Controller_Main extends Controller
{
    function __construct()
    {
        $this->model = new Model_Main();
        $this->view = new View();
        $this->data = new MainDataContainer();
        $this->scriptSet = array();
    }

	function action_index()
	{
            $this->data = $this->model->GetMain();
            $this->view->Generate('main_view.php', 'template_view.php', $this->data);
    }
}
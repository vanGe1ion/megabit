<?php

class Controller_Main extends Controller
{
    function __construct()
    {
        $this->model = new Model_Main();
        $this->data = new MainDataContainer();
    }

	function action_index()
	{
            $this->data = $this->model->GetMain();
        View::Generate('main_view.php', 'template_view.php', $this->data);
    }
}
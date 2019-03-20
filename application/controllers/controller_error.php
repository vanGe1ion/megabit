<?php

class Controller_Error extends Controller
{

    public function __construct()
    {
        $this->model = new Model_Error();
        $this->view = new View();
    }

    function action_index()
	{
	    $data = $this->model->GetError();
		$this->view->Generate('error_view.php', 'template_view.php', $data);
	}

}

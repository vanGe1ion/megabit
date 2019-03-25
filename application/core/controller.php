<?php

class Controller {
	
	public $model;
	public $view;
    public $errors = 1;
	
	function __construct()
    {
        $this->view = new View();
    }

    // действие (action), вызываемое по умолчанию
	function action_index()
	{
		// todo	
	}
}

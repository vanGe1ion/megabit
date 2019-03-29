<?php

class Controller {
	
	public $model;
	public $view;
	public $data;

	
	function __construct()
    {
        $this->view = new View();
        $this->data = new MainDataContainer();
    }

    // действие (action), вызываемое по умолчанию
	function action_index()
	{
		// todo	
	}
}
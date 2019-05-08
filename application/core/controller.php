<?php

class Controller {
	
	public $model;
	public $view;
	public $data;
    public $scriptSet;

	
	function __construct()
    {
        $this->view = new View();
        $this->data = new MainDataContainer();
        $this->scriptSet =  array();
    }

    // действие (action), вызываемое по умолчанию
	function action_index()
	{
		// todo	
	}
}
<?php

abstract class Controller {
	
	public $model;
	public $view;
	public $data;

	
	public function __construct()
    {
        $this->view = new View();
        $this->data = new MainDataContainer();
    }

    // действие (action), вызываемое по умолчанию
	abstract public function action_index();
}
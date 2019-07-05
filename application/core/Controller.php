<?php

abstract class Controller {
	
	public $model;
	public $data;

	
	public function __construct()
    {
        $this->data = new MainDataContainer();
    }

    // действие (action), вызываемое по умолчанию
	abstract public function action_index();
}
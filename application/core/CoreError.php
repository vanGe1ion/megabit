<?php


abstract class CoreError
{
    public $title;
    public $text;
    public $button;
    public $link;

    abstract public function __construct();
}
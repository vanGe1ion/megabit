<?php


class Controller_Orders extends Controller
{
    function __construct()
    {
        $this->model = new Model_Orders();
        $this->view = new View();
        $this->data = new MainDataContainer();
        $this->scriptSet = array();
    }

    function action_index()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::USER))) {
            $this->data = $this->model->Orders();
            $this->scriptSet = array('tableScript.js', "ordersScript.js");
            $this->view->Generate('todayorder_view.php', 'template_view.php', $this->data, $this->scriptSet);
        }
    }

    function action_new()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::USER))) {
            $this->data = $this->model->Orders(true);
            $this->scriptSet = array('', "ordersScript.js");
            $this->view->Generate('neworders_view.php', 'template_view.php', $this->data, $this->scriptSet);
        }
    }
}
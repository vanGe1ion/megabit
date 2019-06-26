<?php


class Controller_Orders extends Controller
{
    function __construct()
    {
        $this->model = new Model_Orders();
        $this->view = new View();
        $this->data = new MainDataContainer();
    }

    function action_index()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER, AccessRights::USER))) {
            $this->data = $this->model->Orders();
            $this->view->Generate('order_view.php', 'template_view.php', $this->data);
        }
    }
}
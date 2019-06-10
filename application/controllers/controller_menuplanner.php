<?php


class Controller_MenuPlanner extends Controller
{
    function __construct()
    {
        $this->model = new Model_MenuPlanner();
        $this->view = new View();
        $this->data = new MainDataContainer();
    }

    function action_index()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->MenuPlanner();
            $this->view->Generate('menuplanner_view.php', 'template_view.php', $this->data);
        }
    }
}
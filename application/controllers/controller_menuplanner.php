<?php


class Controller_MenuPlanner extends Controller
{
    function __construct()
    {
        $this->model = new Model_MenuPlanner();
        $this->view = new View();
        $this->data = new MainDataContainer();
        $this->scriptSet = array();
    }

    function action_index()
    {
        if (!StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->Calendar();
            $this->scriptSet = array('tableScript.js', "planOrderScript.js");
            $this->view->Generate('menuplanner_view.php', 'template_view.php', $this->data, $this->scriptSet);
        }
    }
}
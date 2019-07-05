<?php


class Controller_MenuPlanner extends Controller
{
    function __construct()
    {
        $this->model = new Model_MenuPlanner();
        $this->data = new MainDataContainer();
    }

    function action_index()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::PLANNER))) {
            $this->data = $this->model->MenuPlanner();
            if ($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else
                View::Generate('menu_orders_view.php', 'template_view.php', $this->data);
        }
    }
}
<?php


class Controller_QueueMonitor extends Controller
{
    function __construct()
    {
        $this->model = new Model_QueueMonitor();
        $this->data = new MainDataContainer();
    }

    function action_index()
    {
        if (StatFuncs::ValidateUsers(array(AccessRights::ADMIN, AccessRights::SERVE))) {
            $this->data = $this->model->Monitor();
            if ($this->data->errorCode != ErrorCode::WITHOUT_ERRORS)
                Router::GoOn(Routes::ERRROR);
            else {
                View::Generate('queuemonitor_view.php', 'template_view.php', $this->data);
            }
        }
    }
}
<?php


class Model_QueueMonitor extends Model
{
    public function Monitor(){
        $query = Queries::SelectQueue(array("lastElem" => 0, "Date" => date("Y-n-j")));
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();

        {

            $data->pageTitle = 'Монитор очереди';
            $data->footerMenu = array(
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );
            $data->scripts = array(
                "queueMonitorScript.js"
            );

            if($queryResult){
                $tableData = new TableDataContainer();
                {
                    $tableData->queryResult =   $queryResult;

                    $tableData->querySet =      array(
                        'create' =>                 '',
                        'read' =>                   'SelectQueue',
                        'update' =>                 '',
                        'delete' =>                 'DeleteQueue',
                    );

                    $dish_orders_exp = new TableDataContainer();
                    {
                        $dish_orders_exp->querySet =   array(
                            'create' =>                 '',
                            'read' =>                   '',
                            'update' =>                 '',
                            'delete' =>                 'DeleteOrder',
                        );
                    }

                    $tableData->expands = array(
                        0 =>                    array('Заказ' => $dish_orders_exp)
                    );
                }


                $data->tableData = $tableData;
                $data->errorCode = StatFuncs::ThrowError(ErrorCode::WITHOUT_ERRORS);
            } else
                $data->errorCode = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        }
        return $data;
    }

}
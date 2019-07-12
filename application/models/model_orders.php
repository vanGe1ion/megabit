<?php


class Model_Orders extends Model
{
    public function Orders(){
        $query = Queries::SelectDishTypeList();
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();

        {

            $data->pageTitle = 'Заказы';
            $data->footerMenu = array(
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );
            $data->scripts = array(
                "ordersScript.js"
            );

            if($queryResult){
                $tableData = new TableDataContainer();
                {
                    $tableData->poolName =      "ordersPool";
                    $tableData->queryResult =   $queryResult;

                    $tableData->tableForm =     array(
                        "Date" =>                   ElementTypes::DATE
                    );
                    $tableData->querySet =      array(
                        'create' =>                 'InsertOrder',
                        'read' =>                   'SelectOrder',
                        'update' =>                 'UpdateOrder',
                        'delete' =>                 'DeleteOrder',
                    );


                    $dish_orders_exp = new TableDataContainer();
                    {
                        $dish_orders_exp->poolName =   "menuOrderPool";

                        $dish_orders_exp->headRow =    array(
                            'Dish_Name' =>              'Блюдо',
                            'Price' =>                  'Цена',
                            'Count' =>                  'Кол-во'
                        );
                        $dish_orders_exp->tableForm =  array(
                            "Dish_ID" =>                ElementTypes::ORDERSELECT,
                            "Price" =>                  ElementTypes::PRICE,
                            "Count" =>                  ElementTypes::COUNT
                        );
                        $dish_orders_exp->querySet =   array(
                            'create' =>                 'InsertOrderMenu',
                            'read' =>                   'SelectOrderMenu',
                            'update' =>                 'UpdateOrderMenu',
                            'delete' =>                 'DeleteOrderMenu',
                        );
                        $dish_orders_exp->mainKey =    array(
                            "Order_ID"
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
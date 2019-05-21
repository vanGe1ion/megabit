<?php


class Model_Orders extends Model
{

    public function GetTodayNavigation(){
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'Заказ на сегодня';
            $data->headerMenu = array(
                'Оформить' => Router::FullRoute(Routes::NEW_ORDERS)
            );
            $data->footerMenu = array(
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );
        }
        return $data;
    }

    public function GetNewNavigation(){
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'Оформление заказов';

            $data->footerMenu = array(
                'На сегодня' => Router::FullRoute(Routes::ORDERS),
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );
        }
        return $data;
    }

    public function Orders($new = NULL){
        $data = new MainDataContainer();


        if($new)
            $data = $this->GetNewNavigation();
        else
            $data = $this->GetTodayNavigation();


        $tableData = new TableDataContainer(1);
        {
            $tableData->tableMark =     array("Order" => "ORDER_LIST");
            $tableData->tableForm =     array("Employee_ID" => "number", "Date" => "date");

            //$tableData->subButtons =    array();

            $orders_menu_sub = new TableDataContainer();
            {
                $orders_menu_sub->headRow =    array(
                    'Dish_Name' =>      'Блюдо',
                    'Count' =>          'Количество'
                );

                //$orders_menu_sub->tableMark =     array("Order" => "ORDERS_MENU");
                $orders_menu_sub->tableForm =     array("Dish_ID" => "select", "Count" => "number");

                //$orders_menu_sub->rsTables =      array("ORDER_LIST", "MENU_LIST", "DISH_LIST");
            }

            $tableData->subTables[0] = $orders_menu_sub;
        }

        $data->tableData = $tableData;


        return $data;
    }

}
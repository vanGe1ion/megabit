<?php


class Model_Orders extends Model
{
    public function Orders(){
        $data = new MainDataContainer();
        $data->pageTitle = 'Заказ на сегодня';
        $data->footerMenu = array(
            'Главное меню' => Router::FullRoute(Routes::MAIN)
        );


        $tableData = new TableDataContainer();
        {
           
            $tableData->tableForm =     array("Employee_ID" => "number", "Date" => "date");

            $orders_menu_exp = new TableDataContainer();
            {
                $orders_menu_exp->headRow =    array(
                    'Dish_Name' =>      'Блюдо',
                    'Count' =>          'Количество'
                );

                $orders_menu_exp->tableForm =     array("Dish_ID" => "select", "Count" => "number");
            }

            $tableData->expands = array(
                0 => array('Заказы' => $orders_menu_exp)
            );
        }

        $data->tableData = $tableData;


        return $data;
    }

}
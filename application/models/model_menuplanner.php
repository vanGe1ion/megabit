<?php


class Model_MenuPlanner extends Model
{
    public function MenuPlanner(){
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'Планирование меню';
            $data->footerMenu = array(
                'Блюда' => Router::FullRoute(Routes::DISHES),
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );

            $tableData = new TableDataContainer(1);
            {
                $tableData->tableMark =     array("Menu" => "MENU_LIST");
                $tableData->tableForm =     array("Date" => "date");

                $tableData->subButtons =      array();

                $dish_menu_sub = new TableDataContainer();
                {
                    $dish_menu_sub->headRow =    array(
                        'Dish_Name' =>      'Блюдо',
                        'Price' =>          'Цена'
                    );

                    $dish_menu_sub->tableMark =     array("Menu" => "DISH_MENU");
                    $dish_menu_sub->tableForm =     array("Dish_ID" => "select", "Price" => "number");

                    $dish_menu_sub->rsTables =      array("MENU_LIST", "DISH_LIST");
                }

                $tableData->subTables[0] = $dish_menu_sub;
            }

            $data->tableData = $tableData;
        }
        return $data;
    }
}
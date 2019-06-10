<?php


class Model_MenuPlanner extends Model
{
    public function MenuPlanner(){
        $data = new MainDataContainer();
        {
            $data->pageTitle =      'Планирование меню';
            $data->scripts = array(
                "tableK1Script.js",
                "tableK2Script.js",
                "menuPlannerScript.js"
            );
            $data->footerMenu = array(
                'Список блюд' =>        Router::FullRoute(Routes::DISHES),
                'Главное меню' =>       Router::FullRoute(Routes::MAIN)
            );

            $tableData = new TableDataContainer();
            {
                $tableData->poolName =      "menuPlanPool";

                $tableData->tableForm =     array(
                    "Date" =>                   "date"
                );
                $tableData->querySet =      array(
                    'create' =>                 '',
                    'read' =>                   '',
                    'update' =>                 '',
                    'delete' =>                 '',
                );


                $dish_menu_exp = new TableDataContainer();
                {
                    $dish_menu_exp->poolName =   "dishMenuPool";

                    $dish_menu_exp->headRow =    array(
                        'Dish_Name' =>              'Блюдо'
                    );
                    $dish_menu_exp->tableForm =  array(
                        "Dish_ID" =>                "select",
                        "Free" =>                   "checkbox",
                        "Price" =>                  "number"
                    );
                    $dish_menu_exp->querySet =   array(
                        'create' =>                 '',
                        'read' =>                   '',
                        'update' =>                 '',
                        'delete' =>                 '',
                    );
                    $dish_menu_exp->mainKey =    array(
                        "Menu_ID"
                    );

                }

                $tableData->expands = array(
                    0 =>                        array('Меню' => $dish_menu_exp)
                );
            }

            $data->tableData = $tableData;
        }
        return $data;
    }
}
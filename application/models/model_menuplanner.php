<?php


class Model_MenuPlanner extends Model
{
    public function MenuPlanner(){
        $query = Queries::SelectDishTypeList();
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();


        {
            $data->pageTitle =      'Планирование меню';
            $data->scripts = array(
                "menuPlannerScript.js"
            );
            $data->footerMenu = array(
                'База блюд' =>          Router::FullRoute(Routes::DISHBASE),
                'Главное меню' =>       Router::FullRoute(Routes::MAIN)
            );

            if($queryResult){
                $tableData = new TableDataContainer();
                {
                    $tableData->poolName =      "menuPool";
                    $tableData->queryResult =   $queryResult;

                    $tableData->tableForm =     array(
                        "Date" =>                   ElementTypes::DATE
                    );
                    $tableData->querySet =      array(
                        'create' =>                 'InsertMenuList',
                        'read' =>                   'SelectMenuList',
                        'update' =>                 'UpdateMenuList',
                        'delete' =>                 'DeleteMenuList',
                    );


                    $dish_menu_exp = new TableDataContainer();
                    {
                        $dish_menu_exp->poolName =   "dishMenuPool";

                        $dish_menu_exp->headRow =    array(
                            'Dish_Name' =>              'Блюдо'
                        );
                        $dish_menu_exp->tableForm =  array(
                            "Dish_ID" =>                ElementTypes::SELECT,
                            "Price" =>                  ElementTypes::PRICE,
                            "Free" =>                   ElementTypes::FREE
                        );
                        $dish_menu_exp->querySet =   array(
                            'create' =>                 'InsertDishMenu',
                            'read' =>                   'SelectDishMenu',
                            'update' =>                 'UpdateDishMenu',
                            'delete' =>                 'DeleteDishMenu',
                        );
                        $dish_menu_exp->mainKey =    array(
                            "Menu_ID"
                        );

                    }

                    $tableData->expands = array(
                        0 =>                    array('Меню' => $dish_menu_exp)
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
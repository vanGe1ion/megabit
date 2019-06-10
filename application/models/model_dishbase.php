<?php


class Model_DishBase
{

    public function GetNavigation()
    {
        $data = new MainDataContainer();
        {
            $data->pageTitle =      'База блюд';

            $data->scripts =        array(
                'tableK1Script.js',
                'dishBaseScript.js'
            );

            $query = Queries::SelectActions($data->pageTitle, $_SESSION['accessRights']);
            $result = Database::DBRequest($query);
            $headerMenu = array();

            while ($res = mysqli_fetch_array($result)) {
                $headerMenu[$res['label']] = Router::FullRoute($res['contrRoute'] . '/' . $res['actRoute']);
            }
            $data->headerMenu = $headerMenu;

            $data->footerMenu = array(
                'Планирование' =>       Router::FullRoute(Routes::MENUPLANNER),                                      //todo
                'Главное меню' =>       Router::FullRoute(Routes::MAIN)
            );
        }
        return $data;
    }


    public function GetDishList()
    {
        $query = Queries::SelectDishList();
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {
                $tableData->caption =       "Список блюд";
                $tableData->poolName =      "dishPool";
                $tableData->queryResult =   $queryResult;
                $tableData->headRow =       array(
                    'Dish_ID' =>                '№',
                    'Dish_Name' =>              'Название блюда',
                    'Dish_Type_Name' =>         'Тип блюда',
                    'Price' =>                  'Цена'
                );
                $tableData->querySet =      array(
                    'create' =>                 'InsertDishList',
                    'read' =>                   '',
                    'update' =>                 'UpdateDishList',
                    'delete' =>                 'DeleteDishList',
                );
                $tableData->tableForm =     array(
                    "Dish_Name" =>              "text",
                    "Dish_Type_ID" =>           "select",
                    'Price' =>                  'number'
                );


                $dish_ing_exp = new TableDataContainer();
                {
                    $dish_ing_exp->caption =    "Ингредиенты: ";
                    $dish_ing_exp->poolName =   "dishIngredientsPool";
                    $dish_ing_exp->headRow =    array(
                        'Ingredient_Name' =>        'Ингредиент',
                        'Quantity' =>               'Количество',
                        'Measure_Name' =>           'Ед.Измерения'
                    );
                    $dish_ing_exp->querySet =      array(
                        'create' =>                 'InsertDishIngredients',
                        'read' =>                   'SelectDishIngredients',
                        'update' =>                 'UpdateDishIngredients',
                        'delete' =>                 'DeleteDishIngredients',
                    );
                    $dish_ing_exp->tableForm =  array(
                        "Ingredient_ID" =>          "select",
                        "Quantity" =>               "number",
                        "Measure_ID" =>             "select"
                    );
                    $dish_ing_exp->mainKey =   array(
                        "Dish_ID"
                    );
                }

                $tableData->expands = array(
                    0 => array('Ингредиенты' => $dish_ing_exp)
                );
            }

            $data = $this->GetNavigation();
            array_push($data->scripts, 'tableK2Script.js');
            $data->tableData = $tableData;
        } else
            $data->errorCode = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }


    public function GetIngredientList()
    {
        $query = Queries::SelectIngredientList();
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {
                $tableData->caption =       "Ингредиенты";
                $tableData->poolName =      "ingredientPool";
                $tableData->queryResult =   $queryResult;
                $tableData->headRow =       array(
                    'Ingredient_ID' =>          '№',
                    'Ingredient_Name' =>        'Ингредиент'
                );
                $tableData->querySet =      array(
                    'create' =>                 'InsertIngredientList',
                    'read' =>                   '',
                    'update' =>                 'UpdateIngredientList',
                    'delete' =>                 'DeleteIngredientList',
                );
                $tableData->tableForm =     array(
                    "Ingredient_Name" =>        "text"
                );
            }

            $data = $this->GetNavigation();
            $data->tableData = $tableData;
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }


    public function GetDishTypeList()
    {
        $query = Queries::SelectDishTypeList();
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =       "Типы блюд";
                $tableData->poolName =      "dishTypePool";
                $tableData->queryResult =   $queryResult;

                $tableData->headRow =       array(
                    'Dish_Type_ID' =>           '№',
                    'Dish_Type_Name' =>         'Тип блюда'
                );
                $tableData->querySet =      array(
                    'create' =>                 'InsertDishTypeList',
                    'read' =>                   '',
                    'update' =>                 'UpdateDishTypeList',
                    'delete' =>                 'DeleteDishTypeList',
                );
                $tableData->tableForm =     array(
                    "Dish_Type_Name" =>         "text"
                );
            }
            $data = $this->GetNavigation();
            $data->tableData = $tableData;
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }


    public function GetMeasureList()
    {
        $query = Queries::SelectMeasureList();
        $queryResult = Database::DBRequest($query);
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =       "Ед. измерения";
                $tableData->poolName =      "measurePool";
                $tableData->queryResult =   $queryResult;

                $tableData->headRow =       array(
                    'Measure_ID' =>             '№',
                    'Measure_Name' =>           'Ед. измерения'
                );
                $tableData->querySet =      array(
                    'create' =>                 'InsertMeasureList',
                    'read' =>                   '',
                    'update' =>                 'UpdateMeasureList',
                    'delete' =>                 'DeleteMeasureList',
                );
                $tableData->tableForm =     array(
                    "Measure_Name" =>           "text"
                );
            }
            $data = $this->GetNavigation();
            $data->tableData = $tableData;
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }
}
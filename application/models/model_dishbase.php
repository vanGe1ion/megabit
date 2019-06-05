<?php


class Model_DishBase
{

    public function GetNavigation()
    {
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'База блюд';

            $query = Queries::SelectActions($data->pageTitle, $_SESSION['accessRights']);
            $result = Database::DBRequest($query);
            $headerMenu = array();

            while ($res = mysqli_fetch_array($result)) {
                $headerMenu[$res['label']] = Router::FullRoute($res['contrRoute'] . '/' . $res['actRoute']);
            }
            $data->headerMenu = $headerMenu;

            $data->footerMenu = array(
                'Планирование' => Router::FullRoute(Routes::MENUPLANNER),                                      //todo
                'Главное меню' => Router::FullRoute(Routes::MAIN)
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
                $tableData->tempData =      "dishTemp";
                $tableData->queryResult =   $queryResult;
                $tableData->headRow =       array(
                    'Dish_ID' =>                '№',
                    'Dish_Name' =>              'Название блюда',
                    'Dish_Type_Name' =>         'Тип блюда',
                    'Price' =>                  'Цена'
                );
                $tableData->querySet =      array(
                    'create' =>                 '',
                    'read' =>                   '',
                    'update' =>                 '',
                    'delete' =>                 '',
                );
                $tableData->tableForm =     array(
                    "Dish_Name" =>              "text",
                    "Dish_Type_ID" =>           "select",
                    'Price' =>                  'number'
                );


                $dish_ing_exp = new TableDataContainer();
                {
                    $dish_ing_exp->caption =    "Ингредиенты: ";
                    $dish_ing_exp->tempData =   "dishIngredientsTemp";
                    $dish_ing_exp->headRow =    array(
                        'Ingredient_Name' =>        'Ингредиент',
                        'Quantity' =>               'Количество',
                        'Measure_Name' =>           'Ед.Измерения'
                    );
                    $dish_ing_exp->querySet =      array(
                        'create' =>                 '',
                        'read' =>                   'SelectDishIngredients',
                        'update' =>                 '',
                        'delete' =>                 '',
                    );
                    $dish_ing_exp->tableForm =  array(
                        "Ingredient_ID" =>          "select",
                        "Quantity" =>               "number",
                        "Measure_ID" =>             "select"
                    );
                    $dish_ing_exp->mainKey =   array(
                        "Dish_ID"
                    );


//                    $dish_ing_exp->expands = array(
//                        0 => array('sommersby' => new TableDataContainer())                                                             //todo delete
//                    );
                }

                $tableData->expands = array(
                    0 => array('Ингредиенты' => $dish_ing_exp)
                );
            }

            $data = $this->GetNavigation();
            $data->tableData = $tableData;
        } else
            $data->errorCode = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }


    public function GetIngredientList()
    {
        $query = Queries::SelectQuery("INGREDIENT_LIST");
        $queryResult = Database::DBRequest($query." ORDER BY Ingredient_ID");
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =        "Ингредиенты";
                $tableData->queryResult =   $queryResult;
                $tableData->tableMark =      array("Ingredient" => "INGREDIENT_LIST");

                $tableData->headRow =        array(
                    'Ingredient_ID' =>          '№',
                    'Ingredient_Name' =>        'Ингредиент'
                );
                $tableData->tableForm = array("Ingredient_Name" => "text");
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
        $query = Queries::SelectQuery("DISH_TYPES");
        $queryResult = Database::DBRequest($query." ORDER BY Dish_Type_ID");
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =        "Типы блюд";
                $tableData->queryResult =   $queryResult;
                $tableData->tableMark =      array("Dish_Type" => "DISH_TYPES");

                $tableData->headRow =        array(
                    'Dish_Type_ID' =>           '№',
                    'Dish_Type_Name' =>         'Тип блюда'
                );

                $tableData->tableForm = array("Dish_Type_Name" => "text");
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
        $query = Queries::SelectQuery("MEASURES_LIST");
        $queryResult = Database::DBRequest($query." ORDER BY Measure_ID");
        $data = new MainDataContainer();

        if ($queryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =       "Ед. измерения";
                $tableData->queryResult =  $queryResult;
                $tableData->tableMark =     array("Measure" => "MEASURES_LIST");

                $tableData->headRow =       array(
                    'Measure_ID' =>             '№',
                    'Measure_Name' =>           'Ед. измерения'
                );

                $tableData->tableForm = array("Measure_Name" => "text");
            }
            $data = $this->GetNavigation();
            $data->tableData = $tableData;
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }

//    public function GetDishIngredients($dishID)                                                                               todo
//    {
//        $querry = Queries::DishIngredientsQuery($dishID);
//        $querryResult = Database::DBRequest($querry);
//        $data = new MainDataContainer();
//
//        if ($querryResult != NULL) {
//            $tableData = new TableDataContainer();
//            {
//
//                $tableData->caption =       "Ингредиенты для блюда: ";
//                $tableData->parentKey =     'Dish_Name';
//                $tableData->querryResult =  $querryResult;
//
//                $tableData->headRow =       array(
//                    'Ingredient_Name' =>        'Ингредиент',
//                    'Quantity' =>               'Количество',
//                    'Measure_Name' =>           'Ед.Измерения'
//                );
//            }
//            $data = $this->GetNavigation();
//            $data->footerMenu += array('Назад' =>Router::FullRoute(Routes::DISHES));
//            $data->tableData = $tableData;
//        } else
//            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);
//
//        return $data;
//    }


}
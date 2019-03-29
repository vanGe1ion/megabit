<?php


class Model_DishBase
{

    public function GetNavigation()
    {
        $data = new MainDataContainer();
        $data->pageTitle = 'База блюд';

        switch ($_SESSION['accessRights']) {
            case AccessRights::ADMIN:
                {
                    $data->headerMenu = array(
                        'Блюда' =>          Router::FullRoute(Routes::DISHES),
                        'Ингредиенты' =>    Router::FullRoute(Routes::INGREDIENTS),
                        'Типы блюд' =>      Router::FullRoute(Routes::DISHTYPES),
                        'Ед. измерения' =>  Router::FullRoute(Routes::MEASURES)
                    );
                    break;
                }
            case AccessRights::PLANNER:
                {
                    $data->headerMenu = array(
                        'Блюда' =>          Router::FullRoute(Routes::DISHES),
                        'Ингредиенты' =>    Router::FullRoute(Routes::INGREDIENTS)
                    );
                    break;
                }

            default:
                {
                    //$data->headerMenu = NULL;
                }
        }

        $data->footerMenu = array(
            'Главное меню' =>   Router::FullRoute(Routes::MAIN)
        );

        return $data;
    }


    public function GetDishList()
    {
        $querry = Querries::DishesQuerry();
        $querryResult = Database::DBRequest($querry);
        $data = new MainDataContainer();

        if ($querryResult != NULL) {//$querryResult->num_rows
            $tableData = new TableDataContainer();//array(
            {
                $tableData->caption = "Блюда";
                $tableData->querryResult = $querryResult;
                $tableData->headRow = array(
                    'Dish_ID' => '№',
                    'Dish_Name' => 'Название блюда',
                    'Dish_Type' => 'Тип блюда'
                );

                $tableData->subTable = array(
                    'Ингредиенты' => Router::FullRoute(Routes::DISHES)     //./'Dish_ID'
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
        $querry = Querries::IngredientsQuerry();
        $querryResult = Database::DBRequest($querry);
        $data = new MainDataContainer();

        if ($querryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =        "Ингредиенты";
                $tableData->querryResult =   $querryResult;

                $tableData->headRow =        array(
                    'Ingredient_ID' =>          '№',
                    'Ingredient_Name' =>        'Ингредиент'
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
        $querry = Querries::DishTypeQuerry();
        $querryResult = Database::DBRequest($querry);
        $data = new MainDataContainer();

        if ($querryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =        "Типы блюд";
                $tableData->querryResult =   $querryResult;

                $tableData->headRow =        array(
                    'Dish_Type_ID' =>           '№',
                    'Dish_Type_Name' =>         'Тип блюда'
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
        $querry = Querries::MeasureQuerry();
        $querryResult = Database::DBRequest($querry);
        $data = new MainDataContainer();

        if ($querryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =       "Ед. измерения";
                $tableData->querryResult =  $querryResult;

                $tableData->headRow =       array(
                    'Measure_ID' =>             '№',
                    'Measure_Name' =>           'Ед. измерения'
                );
            }
            $data = $this->GetNavigation();
            $data->tableData = $tableData;
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }

    public function GetDishIngredients($dishID)
    {
        $querry = Querries::DishIngredientsQuerry($dishID);
        $querryResult = Database::DBRequest($querry);
        $data = new MainDataContainer();

        if ($querryResult != NULL) {
            $tableData = new TableDataContainer();
            {

                $tableData->caption =       "Ингредиенты для блюда: ";
                $tableData->parentKey =     'Dish_Name';
                $tableData->querryResult =  $querryResult;

                $tableData->headRow =       array(
                    'Ingredient_Name' =>        'Ингредиент',
                    'Quantity' =>               'Количество',
                    'Measure_Name' =>           'Ед.Измерения'
                );
            }
            $data = $this->GetNavigation();
            $data->footerMenu += array('Назад' =>Router::FullRoute(Routes::DISHES));
            $data->tableData = $tableData;
        } else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::EMPTY_DB_RESPONSE);

        return $data;
    }


}
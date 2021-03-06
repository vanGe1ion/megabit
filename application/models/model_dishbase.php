<?php


class Model_DishBase
{

    public function GetNavigation()
    {
        $data['pageTitle'] = 'База блюд';

        switch ($_SESSION['clearance']) {
            case Clearance::ADMIN:
                {
                    $data['headerMenu'] = array(
                        'Блюда' =>          SITE_ROOT.'/dishbase/dishes',
                        'Ингредиенты' =>    SITE_ROOT.'/dishbase/ingredients',
                        'Типы блюд' =>      SITE_ROOT.'/dishbase/dishtypes',
                        'Ед. измерения' =>  SITE_ROOT.'/dishbase/measures'
                    );
                    break;
                }
            case Clearance::PLANNER:
                {
                    $data['headerMenu'] = array(
                        'Блюда' =>          SITE_ROOT.'/dishbase/dishes',
                        'Ингредиенты' =>    SITE_ROOT.'/dishbase/ingredients',
                    );
                    break;
                }

            default:
                {
                    $data['headerMenu'] = NULL;
                }
        }

        $data['footerMenu'] = array(
            'Главное меню' =>   SITE_ROOT.'/Main'
        );

        return $data;
    }


    public function GetDishList()
    {
        $querry = Querries::DishesQuerry();
        $querryResult = Database::DBRequest($querry);

        if ($querryResult->num_rows) {
            $data = $this->GetNavigation();
            $data['tableData'] = array(

                'caption' =>        "Блюда",
                'querryResult' =>   $querryResult,
                'headRow' =>        array(
                    'Dish_ID' =>        '№',
                    'Dish_Name' =>      'Название блюда',
                    'Dish_Type' =>      'Тип блюда'
                ),

                'subTable' => array(
                    'Ингредиенты' =>    SITE_ROOT . '/dishbase/dishes/'     //.'Dish_ID'
                )
            );
        } else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::BAD_DB_CONNECTION);

        return $data;
    }


    public function GetIngredientList()
    {
        $querry = Querries::IngredientsQuerry();
        $querryResult = Database::DBRequest($querry);

        if ($querryResult->num_rows) {
            $data = $this->GetNavigation();
            $data['tableData'] = array(

                'caption' =>        "Ингредиенты",
                'querryResult' =>   $querryResult,

                'headRow' =>        array(
                    'Ingredient_ID' =>      '№',
                    'Ingredient_Name' =>    'Ингредиент'
                )
            );
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::BAD_DB_CONNECTION);

        return $data;
    }

    public function GetDishTypeList()
    {
        $querry = Querries::DishTypeQuerry();
        $querryResult = Database::DBRequest($querry);

        if ($querryResult->num_rows) {
            $data = $this->GetNavigation();
            $data['tableData'] = array(

                'caption' =>        "Типы блюд",
                'querryResult' =>   $querryResult,

                'headRow' =>        array(
                    'Dish_Type_ID' =>      '№',
                    'Dish_Type_Name' =>    'Тип блюда'
                )
            );
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::BAD_DB_CONNECTION);

        return $data;
    }


    public function GetMeasureList()
    {
        $querry = Querries::MeasureQuerry();
        $querryResult = Database::DBRequest($querry);

        if ($querryResult->num_rows) {
            $data = $this->GetNavigation();
            $data['tableData'] = array(

                'caption' =>        "Ед. измерения",
                'querryResult' =>   $querryResult,

                'headRow' =>        array(
                    'Measure_ID' =>      '№',
                    'Measure_Name' =>    'Ед. измерения'
                )
            );
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::BAD_DB_CONNECTION);

        return $data;
    }

    public function GetDishIngredients($dishID)
    {
        $querry = Querries::DishIngredientsQuerry($dishID);
        $querryResult = Database::DBRequest($querry);

        if ($querryResult->num_rows) {
            $data = $this->GetNavigation();
            $data['footerMenu'] += array('Назад' => SITE_ROOT.'/dishbase/dishes');

            $data['tableData'] = array(

                'caption' => "Ингредиенты для блюда: ",
                'parentKey' => 'Dish_Name',
                'querryResult' => $querryResult,

                'headRow' => array(
                    'Ingredient_Name' => 'Ингредиент',
                    'Quantity' => 'Количество',
                    'Measure_Name' => 'Ед.Измерения'
                )
            );
        } else
            $data['errorCode'] = StatFuncs::ThrowError(ErrorCode::BAD_DB_CONNECTION);

        return $data;
    }


}
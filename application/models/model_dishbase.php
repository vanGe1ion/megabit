<?php


class Model_DishBase
{

    public function GetNavigation()
    {
        $data['pageTitle'] = 'База блюд';

        switch ($_SESSION['permission']) {
            case Permission::ADMIN:
                {
                    $data['headerMenu'] = array(
                        'Блюда' =>          SITE_ROOT.'/Dishbase/dishes',
                        'Ингредиенты' =>    SITE_ROOT.'/Dishbase/ingredients',
                        'Типы блюд' =>      SITE_ROOT.'/Dishbase/dishtypes',
                        'Ед. измерения' =>  SITE_ROOT.'/Dishbase/measures'
                    );
                    break;
                }
            case Permission::SERVE:
                {
                    $data['headerMenu'] = array(
                        'Блюда' =>          SITE_ROOT.'/Dishbase/dishes',
                        'Ингредиенты' =>    SITE_ROOT.'/Dishbase/ingredients',
                    );
                    break;
                }

            default:
                {
                    $data['headerMenu'] = NULL;
                }
        }

        $data['footerMenu'] = array(
            'Главное меню' =>   SITE_ROOT.'/Main');

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
            $data['errorCode'] = StatFuncs::ThrowError(601);

    return $data;
    }


}
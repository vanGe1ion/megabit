<?php


class Model_DishBase
{

    public function GetNavigation()
    {
        $data = array('pageTitle'=>'База блюд');
        switch ($_SESSION['permission']) {
            case Permission::ADMIN:
                {
                    $data['headerMenu'] = array(
                        'Блюда' => 'Dishbase/dishes',
                        'Ингредиенты' => 'Dishbase/ingredients',
                        'Типы блюд' => 'Dishbase/dishtypes',
                        'Ед. измерения' => 'Dishbase/measures'
                    );
                    break;
                }
            case Permission::SERVE:
                {
                    $data['headerMenu'] = array(
                        'Блюда' => 'Dishbase/dishes',
                        'Ингредиенты' => 'Dishbase/ingredients',
                    );
                    break;
                }

            default:
                {
                }
        }

        $data['footerMenu'] = array(
            'Главное меню' => 'Main');

        return $data;
    }


    public function GetIngredientList()
    {
        $db = Database::getInstance(HOSTNAME, LOGIN, PASSWORD, DBNAME);
        $dbLink = $db->getConnection();
        $querry = Querries::IngredientsQuerry();
        $querryResult = mysqli_query($dbLink, $querry);

        if ($querryResult->num_rows) {
            $data = $this->GetNavigation();
            $data['tableData'] = array(
                'headRow' => array('Ingredient_ID' => '№', 'Ingredient_Name' => 'Ингредиент'),
                'querryResult' => $querryResult,
                'caption' => "Ингредиенты"
            );
        }
        else
            $data['errorCode'] = StatFuncs::ThrowError(601);

    return $data;
    }


}
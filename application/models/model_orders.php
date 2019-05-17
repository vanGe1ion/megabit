<?php


class Model_Orders extends Model
{
    public function TodayOrder(){
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'Заказ на сегодня';
            $data->headerMenu = array(
                'Оформить' => Router::FullRoute(Routes::NEW_ORDERS)
            );
            $data->footerMenu = array(
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );

        }
        return $data;
    }

    public function NewOrder(){
        $data = new MainDataContainer();
        {
            $data->pageTitle = 'Оформление заказов';
            $data->headerMenu = array(
                'Оформить' => Router::FullRoute(Routes::NEW_ORDERS)
            );
            $data->footerMenu = array(
                'На сегодня' => Router::FullRoute(Routes::ORDERS),
                'Главное меню' => Router::FullRoute(Routes::MAIN)
            );

        }
        return $data;
    }
}
-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 01 2019 г., 15:51
-- Версия сервера: 5.7.20-log
-- Версия PHP: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `megabit_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ACCESS_ACTION`
--

CREATE TABLE `ACCESS_ACTION` (
  `Access_ID` int(11) NOT NULL,
  `Action_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ACCESS_ACTION`
--

INSERT INTO `ACCESS_ACTION` (`Access_ID`, `Action_ID`) VALUES
(0, 3),
(0, 4),
(0, 5),
(0, 6),
(0, 7),
(1, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `ACCESS_CONTROLLER`
--

CREATE TABLE `ACCESS_CONTROLLER` (
  `Access_ID` int(11) NOT NULL,
  `Controller_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ACCESS_CONTROLLER`
--

INSERT INTO `ACCESS_CONTROLLER` (`Access_ID`, `Controller_ID`) VALUES
(0, 4),
(0, 5),
(0, 6),
(0, 7),
(0, 8),
(1, 4),
(1, 5),
(2, 8),
(3, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `ACESS_RIGHT_LIST`
--

CREATE TABLE `ACESS_RIGHT_LIST` (
  `Access_ID` int(11) NOT NULL,
  `Access_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ACESS_RIGHT_LIST`
--

INSERT INTO `ACESS_RIGHT_LIST` (`Access_ID`, `Access_Name`) VALUES
(0, 'Администратор'),
(1, 'Планировщик'),
(2, 'Персонал'),
(3, 'Сотрудник'),
(4, 'Приостановлен');

-- --------------------------------------------------------

--
-- Структура таблицы `ACTION_LIST`
--

CREATE TABLE `ACTION_LIST` (
  `Action_ID` int(11) NOT NULL,
  `Action_Name` varchar(50) NOT NULL,
  `Route` varchar(30) NOT NULL,
  `Controller_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ACTION_LIST`
--

INSERT INTO `ACTION_LIST` (`Action_ID`, `Action_Name`, `Route`, `Controller_ID`) VALUES
(1, 'Вход', 'login', 2),
(2, 'Выход', 'logout', 2),
(3, 'Список блюд', 'dishes', 4),
(4, 'Ингредиенты', 'ingredients', 4),
(5, 'Типы блюд', 'dishtypes', 4),
(6, 'Типы ингр.', 'ingredienttypes', 4),
(7, 'Ед. измерения', 'measures', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `CONTROLLER_LIST`
--

CREATE TABLE `CONTROLLER_LIST` (
  `Controller_ID` int(11) NOT NULL,
  `Controller_Name` varchar(50) NOT NULL,
  `Route` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `CONTROLLER_LIST`
--

INSERT INTO `CONTROLLER_LIST` (`Controller_ID`, `Controller_Name`, `Route`) VALUES
(1, 'Главное меню', 'main'),
(2, 'Авторизация', 'authorisation'),
(3, 'Ошибка', 'error'),
(4, 'База блюд', 'dishbase'),
(5, 'Планирование меню', 'menuplanner'),
(6, 'Заказы', 'orders'),
(7, 'База пользователей', 'userbase'),
(8, 'Монитор очереди', 'queuemonitor');

-- --------------------------------------------------------

--
-- Структура таблицы `DEPARTMENT_LIST`
--

CREATE TABLE `DEPARTMENT_LIST` (
  `Department_ID` int(11) NOT NULL,
  `Department_Name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DEPARTMENT_LIST`
--

INSERT INTO `DEPARTMENT_LIST` (`Department_ID`, `Department_Name`) VALUES
(1, 'НИОКР'),
(2, 'отдел 2'),
(3, 'отдел 3'),
(4, 'отдел 4'),
(5, 'отдел 5');

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_INGREDIENTS`
--

CREATE TABLE `DISH_INGREDIENTS` (
  `Dish_ID` int(11) NOT NULL,
  `Ingredient_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Measure_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DISH_INGREDIENTS`
--

INSERT INTO `DISH_INGREDIENTS` (`Dish_ID`, `Ingredient_ID`, `Quantity`, `Measure_ID`) VALUES
(1, 1, 1, 2),
(1, 7, 10, 1),
(2, 1, 0, 2),
(2, 6, 17, 1),
(2, 7, 20, 1),
(3, 1, 1, 1),
(3, 2, 2, 1),
(3, 3, 0, 1),
(3, 4, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_LIST`
--

CREATE TABLE `DISH_LIST` (
  `Dish_ID` int(11) NOT NULL,
  `Dish_Name` varchar(20) NOT NULL,
  `Dish_Type_ID` int(11) NOT NULL,
  `Price` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DISH_LIST`
--

INSERT INTO `DISH_LIST` (`Dish_ID`, `Dish_Name`, `Dish_Type_ID`, `Price`) VALUES
(1, 'Грибной супп', 1, 20),
(2, 'Куриный суп', 1, 30),
(3, 'Салат Цезарь', 3, 45),
(4, 'Венегрет', 3, 40),
(5, 'Гречневая каша', 2, 50),
(6, 'Макароны', 2, 45),
(7, 'Кофе', 4, 20),
(8, 'Чай', 4, 15);

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_MENU`
--

CREATE TABLE `DISH_MENU` (
  `Menu_ID` int(11) NOT NULL,
  `Dish_ID` int(11) NOT NULL,
  `Free` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DISH_MENU`
--

INSERT INTO `DISH_MENU` (`Menu_ID`, `Dish_ID`, `Free`) VALUES
(2, 1, 1),
(2, 2, 0),
(2, 3, 0),
(2, 4, 1),
(2, 5, 1),
(2, 6, 0),
(2, 7, 1),
(2, 8, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_TYPE_LIST`
--

CREATE TABLE `DISH_TYPE_LIST` (
  `Dish_Type_ID` int(11) NOT NULL,
  `Dish_Type_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DISH_TYPE_LIST`
--

INSERT INTO `DISH_TYPE_LIST` (`Dish_Type_ID`, `Dish_Type_Name`) VALUES
(2, 'Второе'),
(5, 'Выпечка'),
(4, 'Напиток'),
(1, 'Первое'),
(3, 'Салат');

-- --------------------------------------------------------

--
-- Структура таблицы `EMPLOYEE_LIST`
--

CREATE TABLE `EMPLOYEE_LIST` (
  `Emp_ID` int(11) NOT NULL,
  `Fullname` varchar(30) NOT NULL,
  `Department_ID` int(11) NOT NULL,
  `Position_ID` int(11) NOT NULL,
  `Table_ID` tinyint(4) NOT NULL,
  `Shift_ID` tinyint(4) NOT NULL,
  `PACS_ID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `EMPLOYEE_LIST`
--

INSERT INTO `EMPLOYEE_LIST` (`Emp_ID`, `Fullname`, `Department_ID`, `Position_ID`, `Table_ID`, `Shift_ID`, `PACS_ID`) VALUES
(1, 'Кичаев Евгений Андреевич', 1, 1, 9, 2, '000038C4699B'),
(2, 'Иванов Иван Иванович', 2, 2, 9, 1, '000038C4D331'),
(3, 'Сидоров Дмитрий Петрович', 3, 3, 9, 2, '12343'),
(4, 'Петров Петр Сидорович', 4, 4, 9, 1, '0003384F5422'),
(5, 'Захаров Захар Захарович', 5, 5, 9, 1, '000038C48183');

-- --------------------------------------------------------

--
-- Структура таблицы `INGREDIENT_LIST`
--

CREATE TABLE `INGREDIENT_LIST` (
  `Ingredient_ID` int(11) NOT NULL,
  `Ingredient_Name` varchar(20) NOT NULL,
  `Ingredient_Type_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `INGREDIENT_LIST`
--

INSERT INTO `INGREDIENT_LIST` (`Ingredient_ID`, `Ingredient_Name`, `Ingredient_Type_ID`) VALUES
(1, 'Томат', 1),
(2, 'Лист салата', 1),
(3, 'Майонез', 2),
(4, 'Яйцо', 2),
(5, 'Шампиньоны', 1),
(6, 'Мясо курицы', 2),
(7, 'Картофель', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `INGREDIENT_TYPE_LIST`
--

CREATE TABLE `INGREDIENT_TYPE_LIST` (
  `Ingredient_Type_ID` int(11) NOT NULL,
  `Ingredient_Type_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `INGREDIENT_TYPE_LIST`
--

INSERT INTO `INGREDIENT_TYPE_LIST` (`Ingredient_Type_ID`, `Ingredient_Type_Name`) VALUES
(1, 'Класс 1'),
(2, 'Класс 2');

-- --------------------------------------------------------

--
-- Структура таблицы `MEASURE_LIST`
--

CREATE TABLE `MEASURE_LIST` (
  `Measure_ID` int(11) NOT NULL,
  `Measure_Name` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `MEASURE_LIST`
--

INSERT INTO `MEASURE_LIST` (`Measure_ID`, `Measure_Name`) VALUES
(1, 'г'),
(2, 'л'),
(3, 'шт');

-- --------------------------------------------------------

--
-- Структура таблицы `MENU_LIST`
--

CREATE TABLE `MENU_LIST` (
  `Menu_ID` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `MENU_LIST`
--

INSERT INTO `MENU_LIST` (`Menu_ID`, `Date`) VALUES
(2, '2019-07-29');

-- --------------------------------------------------------

--
-- Структура таблицы `ORDER_LIST`
--

CREATE TABLE `ORDER_LIST` (
  `Order_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Employee_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ORDER_LIST`
--

INSERT INTO `ORDER_LIST` (`Order_ID`, `Date`, `Employee_ID`) VALUES
(6, '2019-07-29', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `ORDER_MENU`
--

CREATE TABLE `ORDER_MENU` (
  `Order_ID` int(11) NOT NULL,
  `Menu_ID` int(11) NOT NULL,
  `Dish_ID` int(11) NOT NULL,
  `Count` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ORDER_MENU`
--

INSERT INTO `ORDER_MENU` (`Order_ID`, `Menu_ID`, `Dish_ID`, `Count`) VALUES
(6, 2, 1, 1),
(6, 2, 2, 2),
(6, 2, 3, 1),
(6, 2, 4, 4),
(6, 2, 5, 1),
(6, 2, 6, 1),
(6, 2, 7, 1),
(6, 2, 8, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `POSITION_LIST`
--

CREATE TABLE `POSITION_LIST` (
  `Position_ID` int(11) NOT NULL,
  `Position_Name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `POSITION_LIST`
--

INSERT INTO `POSITION_LIST` (`Position_ID`, `Position_Name`) VALUES
(2, 'должность 2'),
(3, 'должность 3'),
(4, 'должность 4'),
(5, 'должность 5'),
(1, 'Инженер-программист');

-- --------------------------------------------------------

--
-- Структура таблицы `QUEUE`
--

CREATE TABLE `QUEUE` (
  `Elem_ID` int(11) NOT NULL,
  `PACS_ID` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `SHIFT_LIST`
--

CREATE TABLE `SHIFT_LIST` (
  `Shift_ID` tinyint(11) NOT NULL,
  `Shift_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `SHIFT_LIST`
--

INSERT INTO `SHIFT_LIST` (`Shift_ID`, `Shift_Name`) VALUES
(1, 'I'),
(2, 'II');

-- --------------------------------------------------------

--
-- Структура таблицы `TABLE_LIST`
--

CREATE TABLE `TABLE_LIST` (
  `Table_ID` tinyint(4) NOT NULL,
  `Table_Name` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `TABLE_LIST`
--

INSERT INTO `TABLE_LIST` (`Table_ID`, `Table_Name`) VALUES
(9, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `USER_LIST`
--

CREATE TABLE `USER_LIST` (
  `User_ID` int(11) NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Access_ID` int(11) NOT NULL,
  `Emp_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `USER_LIST`
--

INSERT INTO `USER_LIST` (`User_ID`, `Login`, `Password`, `Access_ID`, `Emp_ID`) VALUES
(1, 'admin', '202cb962ac59075b964b07152d234b70', 0, 1),
(2, 'planner', '202cb962ac59075b964b07152d234b70', 1, 2),
(3, 'serve', '202cb962ac59075b964b07152d234b70', 2, 3),
(4, 'user', '202cb962ac59075b964b07152d234b70', 3, 4),
(5, 'frozen', '202cb962ac59075b964b07152d234b70', 4, 5);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ACCESS_ACTION`
--
ALTER TABLE `ACCESS_ACTION`
  ADD PRIMARY KEY (`Access_ID`,`Action_ID`),
  ADD KEY `Access_ID` (`Access_ID`),
  ADD KEY `Action_ID` (`Action_ID`);

--
-- Индексы таблицы `ACCESS_CONTROLLER`
--
ALTER TABLE `ACCESS_CONTROLLER`
  ADD PRIMARY KEY (`Access_ID`,`Controller_ID`),
  ADD KEY `Access_ID` (`Access_ID`),
  ADD KEY `Route_ID` (`Controller_ID`);

--
-- Индексы таблицы `ACESS_RIGHT_LIST`
--
ALTER TABLE `ACESS_RIGHT_LIST`
  ADD PRIMARY KEY (`Access_ID`);

--
-- Индексы таблицы `ACTION_LIST`
--
ALTER TABLE `ACTION_LIST`
  ADD PRIMARY KEY (`Action_ID`),
  ADD KEY `Controller_ID` (`Controller_ID`);

--
-- Индексы таблицы `CONTROLLER_LIST`
--
ALTER TABLE `CONTROLLER_LIST`
  ADD PRIMARY KEY (`Controller_ID`);

--
-- Индексы таблицы `DEPARTMENT_LIST`
--
ALTER TABLE `DEPARTMENT_LIST`
  ADD PRIMARY KEY (`Department_ID`),
  ADD UNIQUE KEY `DEPARTMENT_LIST_Department_Name_uindex` (`Department_Name`);

--
-- Индексы таблицы `DISH_INGREDIENTS`
--
ALTER TABLE `DISH_INGREDIENTS`
  ADD PRIMARY KEY (`Dish_ID`,`Ingredient_ID`),
  ADD KEY `Dish_ID` (`Dish_ID`),
  ADD KEY `dish_ingredients_ibfk_4` (`Ingredient_ID`),
  ADD KEY `dish_ingredients_ibfk_3` (`Measure_ID`);

--
-- Индексы таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  ADD PRIMARY KEY (`Dish_ID`),
  ADD UNIQUE KEY `Dish_Name` (`Dish_Name`),
  ADD KEY `Dish_Type_ID` (`Dish_Type_ID`);

--
-- Индексы таблицы `DISH_MENU`
--
ALTER TABLE `DISH_MENU`
  ADD PRIMARY KEY (`Menu_ID`,`Dish_ID`),
  ADD KEY `dish_menu_ibfk_2` (`Dish_ID`);

--
-- Индексы таблицы `DISH_TYPE_LIST`
--
ALTER TABLE `DISH_TYPE_LIST`
  ADD PRIMARY KEY (`Dish_Type_ID`),
  ADD UNIQUE KEY `Dish_Type_Name` (`Dish_Type_Name`);

--
-- Индексы таблицы `EMPLOYEE_LIST`
--
ALTER TABLE `EMPLOYEE_LIST`
  ADD PRIMARY KEY (`Emp_ID`),
  ADD KEY `Table_ID` (`Table_ID`),
  ADD KEY `Shift_ID` (`Shift_ID`),
  ADD KEY `Department_ID` (`Department_ID`),
  ADD KEY `Position_ID` (`Position_ID`),
  ADD KEY `PACS_ID` (`PACS_ID`);

--
-- Индексы таблицы `INGREDIENT_LIST`
--
ALTER TABLE `INGREDIENT_LIST`
  ADD PRIMARY KEY (`Ingredient_ID`),
  ADD UNIQUE KEY `Ingredient_Name` (`Ingredient_Name`),
  ADD KEY `Ingredient_Type_ID` (`Ingredient_Type_ID`);

--
-- Индексы таблицы `INGREDIENT_TYPE_LIST`
--
ALTER TABLE `INGREDIENT_TYPE_LIST`
  ADD PRIMARY KEY (`Ingredient_Type_ID`),
  ADD UNIQUE KEY `Ingredient_Type_Name` (`Ingredient_Type_Name`);

--
-- Индексы таблицы `MEASURE_LIST`
--
ALTER TABLE `MEASURE_LIST`
  ADD PRIMARY KEY (`Measure_ID`),
  ADD UNIQUE KEY `Measure_Name` (`Measure_Name`);

--
-- Индексы таблицы `MENU_LIST`
--
ALTER TABLE `MENU_LIST`
  ADD PRIMARY KEY (`Menu_ID`),
  ADD UNIQUE KEY `Date` (`Date`);

--
-- Индексы таблицы `ORDER_LIST`
--
ALTER TABLE `ORDER_LIST`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Индексы таблицы `ORDER_MENU`
--
ALTER TABLE `ORDER_MENU`
  ADD PRIMARY KEY (`Order_ID`,`Menu_ID`,`Dish_ID`),
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `Menu_ID` (`Menu_ID`,`Dish_ID`);

--
-- Индексы таблицы `POSITION_LIST`
--
ALTER TABLE `POSITION_LIST`
  ADD PRIMARY KEY (`Position_ID`),
  ADD UNIQUE KEY `POSITION_LIST_Position_Name_uindex` (`Position_Name`);

--
-- Индексы таблицы `QUEUE`
--
ALTER TABLE `QUEUE`
  ADD PRIMARY KEY (`Elem_ID`),
  ADD KEY `PACS_ID` (`PACS_ID`) USING BTREE;

--
-- Индексы таблицы `SHIFT_LIST`
--
ALTER TABLE `SHIFT_LIST`
  ADD PRIMARY KEY (`Shift_ID`);

--
-- Индексы таблицы `TABLE_LIST`
--
ALTER TABLE `TABLE_LIST`
  ADD PRIMARY KEY (`Table_ID`);

--
-- Индексы таблицы `USER_LIST`
--
ALTER TABLE `USER_LIST`
  ADD PRIMARY KEY (`User_ID`),
  ADD KEY `Clearance_ID` (`Access_ID`),
  ADD KEY `Emp_ID` (`Emp_ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `ACTION_LIST`
--
ALTER TABLE `ACTION_LIST`
  MODIFY `Action_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `CONTROLLER_LIST`
--
ALTER TABLE `CONTROLLER_LIST`
  MODIFY `Controller_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `DEPARTMENT_LIST`
--
ALTER TABLE `DEPARTMENT_LIST`
  MODIFY `Department_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  MODIFY `Dish_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `EMPLOYEE_LIST`
--
ALTER TABLE `EMPLOYEE_LIST`
  MODIFY `Emp_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `INGREDIENT_LIST`
--
ALTER TABLE `INGREDIENT_LIST`
  MODIFY `Ingredient_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `INGREDIENT_TYPE_LIST`
--
ALTER TABLE `INGREDIENT_TYPE_LIST`
  MODIFY `Ingredient_Type_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `MENU_LIST`
--
ALTER TABLE `MENU_LIST`
  MODIFY `Menu_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `ORDER_LIST`
--
ALTER TABLE `ORDER_LIST`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `POSITION_LIST`
--
ALTER TABLE `POSITION_LIST`
  MODIFY `Position_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `QUEUE`
--
ALTER TABLE `QUEUE`
  MODIFY `Elem_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `SHIFT_LIST`
--
ALTER TABLE `SHIFT_LIST`
  MODIFY `Shift_ID` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `USER_LIST`
--
ALTER TABLE `USER_LIST`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `ACCESS_ACTION`
--
ALTER TABLE `ACCESS_ACTION`
  ADD CONSTRAINT `access_action_ibfk_1` FOREIGN KEY (`Access_ID`) REFERENCES `ACESS_RIGHT_LIST` (`Access_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `access_action_ibfk_2` FOREIGN KEY (`Action_ID`) REFERENCES `ACTION_LIST` (`Action_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `ACCESS_CONTROLLER`
--
ALTER TABLE `ACCESS_CONTROLLER`
  ADD CONSTRAINT `access_controller_ibfk_1` FOREIGN KEY (`Access_ID`) REFERENCES `ACESS_RIGHT_LIST` (`Access_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `access_controller_ibfk_2` FOREIGN KEY (`Controller_ID`) REFERENCES `CONTROLLER_LIST` (`Controller_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `ACTION_LIST`
--
ALTER TABLE `ACTION_LIST`
  ADD CONSTRAINT `action_list_ibfk_1` FOREIGN KEY (`Controller_ID`) REFERENCES `CONTROLLER_LIST` (`Controller_ID`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `DISH_INGREDIENTS`
--
ALTER TABLE `DISH_INGREDIENTS`
  ADD CONSTRAINT `dish_ingredients_ibfk_3` FOREIGN KEY (`Measure_ID`) REFERENCES `MEASURE_LIST` (`Measure_ID`),
  ADD CONSTRAINT `dish_ingredients_ibfk_4` FOREIGN KEY (`Ingredient_ID`) REFERENCES `INGREDIENT_LIST` (`Ingredient_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dish_ingredients_ibfk_5` FOREIGN KEY (`Dish_ID`) REFERENCES `DISH_LIST` (`Dish_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  ADD CONSTRAINT `dish_list_ibfk_1` FOREIGN KEY (`Dish_Type_ID`) REFERENCES `DISH_TYPE_LIST` (`Dish_Type_ID`);

--
-- Ограничения внешнего ключа таблицы `DISH_MENU`
--
ALTER TABLE `DISH_MENU`
  ADD CONSTRAINT `dish_menu_ibfk_1` FOREIGN KEY (`Menu_ID`) REFERENCES `MENU_LIST` (`Menu_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dish_menu_ibfk_2` FOREIGN KEY (`Dish_ID`) REFERENCES `DISH_LIST` (`Dish_ID`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `EMPLOYEE_LIST`
--
ALTER TABLE `EMPLOYEE_LIST`
  ADD CONSTRAINT `employee_list_ibfk_1` FOREIGN KEY (`Table_ID`) REFERENCES `TABLE_LIST` (`Table_ID`),
  ADD CONSTRAINT `employee_list_ibfk_2` FOREIGN KEY (`Shift_ID`) REFERENCES `SHIFT_LIST` (`Shift_ID`),
  ADD CONSTRAINT `employee_list_ibfk_3` FOREIGN KEY (`Department_ID`) REFERENCES `DEPARTMENT_LIST` (`Department_ID`),
  ADD CONSTRAINT `employee_list_ibfk_4` FOREIGN KEY (`Position_ID`) REFERENCES `POSITION_LIST` (`Position_ID`);

--
-- Ограничения внешнего ключа таблицы `INGREDIENT_LIST`
--
ALTER TABLE `INGREDIENT_LIST`
  ADD CONSTRAINT `ingredient_list_ibfk_1` FOREIGN KEY (`Ingredient_Type_ID`) REFERENCES `INGREDIENT_TYPE_LIST` (`Ingredient_Type_ID`);

--
-- Ограничения внешнего ключа таблицы `ORDER_LIST`
--
ALTER TABLE `ORDER_LIST`
  ADD CONSTRAINT `order_list_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEE_LIST` (`Emp_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `ORDER_MENU`
--
ALTER TABLE `ORDER_MENU`
  ADD CONSTRAINT `order_menu_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `ORDER_LIST` (`Order_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_menu_ibfk_2` FOREIGN KEY (`Menu_ID`,`Dish_ID`) REFERENCES `DISH_MENU` (`Menu_ID`, `Dish_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `QUEUE`
--
ALTER TABLE `QUEUE`
  ADD CONSTRAINT `queue_ibfk_1` FOREIGN KEY (`PACS_ID`) REFERENCES `EMPLOYEE_LIST` (`PACS_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `USER_LIST`
--
ALTER TABLE `USER_LIST`
  ADD CONSTRAINT `user_list_ibfk_1` FOREIGN KEY (`Access_ID`) REFERENCES `ACESS_RIGHT_LIST` (`Access_ID`),
  ADD CONSTRAINT `user_list_ibfk_2` FOREIGN KEY (`Emp_ID`) REFERENCES `EMPLOYEE_LIST` (`Emp_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

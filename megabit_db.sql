-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 26 2019 г., 16:49
-- Версия сервера: 5.6.38-log
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
-- Структура таблицы `CLEARANCE`
--

CREATE TABLE `CLEARANCE` (
  `Clearance_ID` int(11) NOT NULL,
  `Clearance_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `CLEARANCE`
--

INSERT INTO `CLEARANCE` (`Clearance_ID`, `Clearance_Name`) VALUES
(0, 'Администратор'),
(1, 'Планировщик'),
(2, 'Персонал'),
(3, 'Сотрудник'),
(4, 'Приостановлен');

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
(1, 5, 2, 3),
(1, 7, 10, 1),
(2, 6, 20, 1),
(2, 7, 15, 1),
(3, 1, 10, 1),
(3, 2, 2, 3),
(3, 3, 12, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_LIST`
--

CREATE TABLE `DISH_LIST` (
  `Dish_ID` int(11) NOT NULL,
  `Dish_Name` varchar(20) NOT NULL,
  `Dish_Type_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DISH_LIST`
--

INSERT INTO `DISH_LIST` (`Dish_ID`, `Dish_Name`, `Dish_Type_ID`) VALUES
(1, 'Грибной суп', 1),
(2, 'Куриный суп', 1),
(3, 'Салат Цезарь', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_MENU`
--

CREATE TABLE `DISH_MENU` (
  `Menu_ID` int(11) NOT NULL,
  `Dish_ID` int(11) NOT NULL,
  `Price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `DISH_TYPES`
--

CREATE TABLE `DISH_TYPES` (
  `Dish_Type_ID` int(11) NOT NULL,
  `Dish_Type_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `DISH_TYPES`
--

INSERT INTO `DISH_TYPES` (`Dish_Type_ID`, `Dish_Type_Name`) VALUES
(1, 'Первое'),
(2, 'Второе'),
(3, 'Салат'),
(4, 'Напиток');

-- --------------------------------------------------------

--
-- Структура таблицы `EMPLOYEERS_LIST`
--

CREATE TABLE `EMPLOYEERS_LIST` (
  `Emp_ID` int(11) NOT NULL,
  `Fullname` varchar(30) NOT NULL,
  `Department` varchar(20) NOT NULL,
  `Position` varchar(20) NOT NULL,
  `Table_ID` tinyint(4) NOT NULL,
  `Shift_ID` tinyint(4) NOT NULL,
  `PACS_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `EMPLOYEERS_LIST`
--

INSERT INTO `EMPLOYEERS_LIST` (`Emp_ID`, `Fullname`, `Department`, `Position`, `Table_ID`, `Shift_ID`, `PACS_ID`) VALUES
(1, 'Кичаев Евгений Андреевич', 'НИОКР', 'Инженер-программист', 9, 2, 12345);

-- --------------------------------------------------------

--
-- Структура таблицы `INGREDIENT_LIST`
--

CREATE TABLE `INGREDIENT_LIST` (
  `Ingredient_ID` int(11) NOT NULL,
  `Ingredient_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `INGREDIENT_LIST`
--

INSERT INTO `INGREDIENT_LIST` (`Ingredient_ID`, `Ingredient_Name`) VALUES
(1, 'Томат'),
(2, 'Лист салата'),
(3, 'Майонез'),
(4, 'Яйцо'),
(5, 'Шампиньоны'),
(6, 'Мясо курицы'),
(7, 'Картофель');

-- --------------------------------------------------------

--
-- Структура таблицы `MEASURES_LIST`
--

CREATE TABLE `MEASURES_LIST` (
  `Measure_ID` int(11) NOT NULL,
  `Measure_Name` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `MEASURES_LIST`
--

INSERT INTO `MEASURES_LIST` (`Measure_ID`, `Measure_Name`) VALUES
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

-- --------------------------------------------------------

--
-- Структура таблицы `ORDERS_MENU`
--

CREATE TABLE `ORDERS_MENU` (
  `Order_ID` int(11) NOT NULL,
  `Menu_ID` int(11) NOT NULL,
  `Dish_ID` int(11) NOT NULL,
  `Count` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `ORDER_LIST`
--

CREATE TABLE `ORDER_LIST` (
  `Order_ID` int(11) NOT NULL,
  `Employee_ID` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `SHIFT`
--

CREATE TABLE `SHIFT` (
  `Shift_ID` tinyint(11) NOT NULL,
  `Shift` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `SHIFT`
--

INSERT INTO `SHIFT` (`Shift_ID`, `Shift`) VALUES
(1, 'Смена №1'),
(2, 'Смена №2');

-- --------------------------------------------------------

--
-- Структура таблицы `TABLE_LIST`
--

CREATE TABLE `TABLE_LIST` (
  `Table_id` tinyint(4) NOT NULL,
  `Table_Name` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `TABLE_LIST`
--

INSERT INTO `TABLE_LIST` (`Table_id`, `Table_Name`) VALUES
(9, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `USER_LIST`
--

CREATE TABLE `USER_LIST` (
  `User_ID` int(11) NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Clearance_ID` int(11) NOT NULL,
  `Emp_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `USER_LIST`
--

INSERT INTO `USER_LIST` (`User_ID`, `Login`, `Password`, `Clearance_ID`, `Emp_ID`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 0, NULL),
(2, 'ea.kichaev', '202cb962ac59075b964b07152d234b70', 3, 1),
(3, 'planner', '0273b494d66af726729c3817b9e194e3', 1, NULL),
(4, 'serve', '20cc39187933346eee8108ec76a2f796', 2, NULL),
(5, 'frozen', '202cb962ac59075b964b07152d234b70', 4, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `CLEARANCE`
--
ALTER TABLE `CLEARANCE`
  ADD PRIMARY KEY (`Clearance_ID`);

--
-- Индексы таблицы `DISH_INGREDIENTS`
--
ALTER TABLE `DISH_INGREDIENTS`
  ADD KEY `dish_ingredients_ibfk_1` (`Dish_ID`),
  ADD KEY `dish_ingredients_ibfk_3` (`Measure_ID`),
  ADD KEY `dish_ingredients_ibfk_4` (`Ingredient_ID`);

--
-- Индексы таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  ADD PRIMARY KEY (`Dish_ID`),
  ADD KEY `Dish_Type_ID` (`Dish_Type_ID`);

--
-- Индексы таблицы `DISH_MENU`
--
ALTER TABLE `DISH_MENU`
  ADD KEY `Menu_ID` (`Menu_ID`),
  ADD KEY `Dish_ID` (`Dish_ID`);

--
-- Индексы таблицы `DISH_TYPES`
--
ALTER TABLE `DISH_TYPES`
  ADD PRIMARY KEY (`Dish_Type_ID`);

--
-- Индексы таблицы `EMPLOYEERS_LIST`
--
ALTER TABLE `EMPLOYEERS_LIST`
  ADD PRIMARY KEY (`Emp_ID`),
  ADD KEY `Table_ID` (`Table_ID`),
  ADD KEY `Shift_ID` (`Shift_ID`);

--
-- Индексы таблицы `INGREDIENT_LIST`
--
ALTER TABLE `INGREDIENT_LIST`
  ADD PRIMARY KEY (`Ingredient_ID`);

--
-- Индексы таблицы `MEASURES_LIST`
--
ALTER TABLE `MEASURES_LIST`
  ADD PRIMARY KEY (`Measure_ID`);

--
-- Индексы таблицы `MENU_LIST`
--
ALTER TABLE `MENU_LIST`
  ADD PRIMARY KEY (`Menu_ID`);

--
-- Индексы таблицы `ORDERS_MENU`
--
ALTER TABLE `ORDERS_MENU`
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `Menu_ID` (`Menu_ID`);

--
-- Индексы таблицы `ORDER_LIST`
--
ALTER TABLE `ORDER_LIST`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Индексы таблицы `SHIFT`
--
ALTER TABLE `SHIFT`
  ADD PRIMARY KEY (`Shift_ID`);

--
-- Индексы таблицы `TABLE_LIST`
--
ALTER TABLE `TABLE_LIST`
  ADD PRIMARY KEY (`Table_id`);

--
-- Индексы таблицы `USER_LIST`
--
ALTER TABLE `USER_LIST`
  ADD PRIMARY KEY (`User_ID`),
  ADD KEY `Clearance_ID` (`Clearance_ID`),
  ADD KEY `Emp_ID` (`Emp_ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  MODIFY `Dish_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `EMPLOYEERS_LIST`
--
ALTER TABLE `EMPLOYEERS_LIST`
  MODIFY `Emp_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `INGREDIENT_LIST`
--
ALTER TABLE `INGREDIENT_LIST`
  MODIFY `Ingredient_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `MENU_LIST`
--
ALTER TABLE `MENU_LIST`
  MODIFY `Menu_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `ORDER_LIST`
--
ALTER TABLE `ORDER_LIST`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `SHIFT`
--
ALTER TABLE `SHIFT`
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
-- Ограничения внешнего ключа таблицы `DISH_INGREDIENTS`
--
ALTER TABLE `DISH_INGREDIENTS`
  ADD CONSTRAINT `dish_ingredients_ibfk_1` FOREIGN KEY (`Dish_ID`) REFERENCES `DISH_LIST` (`Dish_ID`),
  ADD CONSTRAINT `dish_ingredients_ibfk_3` FOREIGN KEY (`Measure_ID`) REFERENCES `MEASURES_LIST` (`Measure_ID`),
  ADD CONSTRAINT `dish_ingredients_ibfk_4` FOREIGN KEY (`Ingredient_ID`) REFERENCES `INGREDIENT_LIST` (`Ingredient_ID`);

--
-- Ограничения внешнего ключа таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  ADD CONSTRAINT `dish_list_ibfk_2` FOREIGN KEY (`Dish_Type_ID`) REFERENCES `DISH_TYPES` (`Dish_Type_ID`);

--
-- Ограничения внешнего ключа таблицы `DISH_MENU`
--
ALTER TABLE `DISH_MENU`
  ADD CONSTRAINT `dish_menu_ibfk_1` FOREIGN KEY (`Menu_ID`) REFERENCES `MENU_LIST` (`Menu_ID`),
  ADD CONSTRAINT `dish_menu_ibfk_2` FOREIGN KEY (`Dish_ID`) REFERENCES `DISH_LIST` (`Dish_ID`);

--
-- Ограничения внешнего ключа таблицы `EMPLOYEERS_LIST`
--
ALTER TABLE `EMPLOYEERS_LIST`
  ADD CONSTRAINT `employeers_list_ibfk_1` FOREIGN KEY (`Table_ID`) REFERENCES `TABLE_LIST` (`Table_id`),
  ADD CONSTRAINT `employeers_list_ibfk_2` FOREIGN KEY (`Shift_ID`) REFERENCES `SHIFT` (`Shift_ID`);

--
-- Ограничения внешнего ключа таблицы `ORDERS_MENU`
--
ALTER TABLE `ORDERS_MENU`
  ADD CONSTRAINT `orders_menu_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `ORDER_LIST` (`Order_ID`),
  ADD CONSTRAINT `orders_menu_ibfk_2` FOREIGN KEY (`Menu_ID`) REFERENCES `MENU_LIST` (`Menu_ID`);

--
-- Ограничения внешнего ключа таблицы `ORDER_LIST`
--
ALTER TABLE `ORDER_LIST`
  ADD CONSTRAINT `order_list_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEERS_LIST` (`Emp_ID`);

--
-- Ограничения внешнего ключа таблицы `USER_LIST`
--
ALTER TABLE `USER_LIST`
  ADD CONSTRAINT `user_list_ibfk_1` FOREIGN KEY (`Clearance_ID`) REFERENCES `CLEARANCE` (`Clearance_ID`),
  ADD CONSTRAINT `user_list_ibfk_2` FOREIGN KEY (`Emp_ID`) REFERENCES `EMPLOYEERS_LIST` (`Emp_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

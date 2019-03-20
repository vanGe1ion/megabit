-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 14 2019 г., 11:28
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
-- База данных: `rest`
--

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
  `FIO` varchar(30) NOT NULL,
  `Department` varchar(20) NOT NULL,
  `Position` varchar(20) NOT NULL,
  `Table_ID` tinyint(4) NOT NULL,
  `Sitting` tinyint(4) NOT NULL,
  `PACS_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `EMPLOYEERS_LIST`
--

INSERT INTO `EMPLOYEERS_LIST` (`Emp_ID`, `FIO`, `Department`, `Position`, `Table_ID`, `Sitting`, `PACS_ID`) VALUES
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
-- Структура таблицы `MENU_WEEK`
--

CREATE TABLE `MENU_WEEK` (
  `Dish_ID` int(11) NOT NULL,
  `MOption` tinyint(4) NOT NULL,
  `Date` date NOT NULL,
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `ORDER_EMP_DATE`
--

CREATE TABLE `ORDER_EMP_DATE` (
  `Emp_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `MOption` tinyint(4) NOT NULL,
  `Dish_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `TABLE_LIST`
--

CREATE TABLE `TABLE_LIST` (
  `Table_id` tinyint(4) NOT NULL,
  `Capacity` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `TABLE_LIST`
--

INSERT INTO `TABLE_LIST` (`Table_id`, `Capacity`) VALUES
(9, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `USER`
--

CREATE TABLE `USER` (
  `login` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `permission` tinyint(1) NOT NULL,
  `Emp_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `USER`
--

INSERT INTO `USER` (`login`, `password`, `permission`, `Emp_ID`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 0, NULL),
('ea.kichaev', '202cb962ac59075b964b07152d234b70', 2, 1),
('serve', '20cc39187933346eee8108ec76a2f796', 1, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `DISH_INGREDIENTS`
--
ALTER TABLE `DISH_INGREDIENTS`
  ADD PRIMARY KEY (`Dish_ID`,`Ingredient_ID`),
  ADD KEY `Measure_ID` (`Measure_ID`),
  ADD KEY `Ingredient_ID` (`Ingredient_ID`),
  ADD KEY `Dish_ID` (`Dish_ID`);

--
-- Индексы таблицы `DISH_LIST`
--
ALTER TABLE `DISH_LIST`
  ADD PRIMARY KEY (`Dish_ID`),
  ADD KEY `Dish_Type_ID` (`Dish_Type_ID`);

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
  ADD KEY `Table_ID` (`Table_ID`);

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
-- Индексы таблицы `MENU_WEEK`
--
ALTER TABLE `MENU_WEEK`
  ADD PRIMARY KEY (`Dish_ID`,`MOption`,`Date`),
  ADD KEY `Dish_ID` (`Dish_ID`),
  ADD KEY `Date` (`Date`),
  ADD KEY `MOption` (`MOption`);

--
-- Индексы таблицы `ORDER_EMP_DATE`
--
ALTER TABLE `ORDER_EMP_DATE`
  ADD PRIMARY KEY (`Emp_ID`,`Date`,`MOption`),
  ADD KEY `Dish_ID` (`Dish_ID`),
  ADD KEY `Emp_ID` (`Emp_ID`),
  ADD KEY `Date` (`Date`),
  ADD KEY `MOption` (`MOption`);

--
-- Индексы таблицы `TABLE_LIST`
--
ALTER TABLE `TABLE_LIST`
  ADD PRIMARY KEY (`Table_id`);

--
-- Индексы таблицы `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`login`),
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
-- Ограничения внешнего ключа таблицы `EMPLOYEERS_LIST`
--
ALTER TABLE `EMPLOYEERS_LIST`
  ADD CONSTRAINT `employeers_list_ibfk_1` FOREIGN KEY (`Table_ID`) REFERENCES `TABLE_LIST` (`Table_id`);

--
-- Ограничения внешнего ключа таблицы `MENU_WEEK`
--
ALTER TABLE `MENU_WEEK`
  ADD CONSTRAINT `menu_week_ibfk_4` FOREIGN KEY (`Dish_ID`) REFERENCES `DISH_LIST` (`Dish_ID`);

--
-- Ограничения внешнего ключа таблицы `ORDER_EMP_DATE`
--
ALTER TABLE `ORDER_EMP_DATE`
  ADD CONSTRAINT `order_emp_date_ibfk_1` FOREIGN KEY (`Emp_ID`) REFERENCES `EMPLOYEERS_LIST` (`Emp_ID`),
  ADD CONSTRAINT `order_emp_date_ibfk_2` FOREIGN KEY (`Dish_ID`) REFERENCES `MENU_WEEK` (`Dish_ID`),
  ADD CONSTRAINT `order_emp_date_ibfk_3` FOREIGN KEY (`MOption`) REFERENCES `MENU_WEEK` (`MOption`),
  ADD CONSTRAINT `order_emp_date_ibfk_4` FOREIGN KEY (`Date`) REFERENCES `MENU_WEEK` (`Date`);

--
-- Ограничения внешнего ключа таблицы `USER`
--
ALTER TABLE `USER`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Emp_ID`) REFERENCES `EMPLOYEERS_LIST` (`Emp_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

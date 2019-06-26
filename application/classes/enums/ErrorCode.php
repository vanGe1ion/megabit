<?php


abstract class ErrorCode
{
    //необрабатываемы в обычном случае ошибки
    const UNEXPECTED_ERROR = 0;
    const WITHOUT_ERRORS = 1;
    const UNAUTHORIZED = 401;

    //доступ
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;

    //пользовательские
    const USER_DOES_NOT_EXIST = 600;
    const YOU_ARE_FROZEN = 601;
    const SESSION_TIMEOUT = 603;

    //база данных
    const BAD_DB_CONNECTION = 610;
    const EMPTY_DB_RESPONSE = 611;
}
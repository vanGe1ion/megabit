<?php


class ErrorCode
{
    const UNEXPECTED_ERROR = 999;
    const WITHOUT_ERRORS = 0;

    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;

    const USER_DOES_NOT_EXIST = 600;
    const YOU_ARE_FROZEN = 601;
    const SESSION_TIMEOUT = 603;

    const EMPTY_DB_RESPONSE = 610;
    const BAD_DB_CONNECTION = 611;


}
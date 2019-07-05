<?php

 //Mysql database class - only one connection alowed

class Database {

    private $_connection;
    private static $_instance; //The single instance



    /*
    Get an instance of the Database
    @return Instance
    */
    private static function getInstance() {
        if(!self::$_instance) { // If no instance then make one
            self::$_instance = new self();
        }
        return self::$_instance;
    }



    // Constructor
    private function __construct() {
        try {
            $this->_connection = mysqli_connect(HOSTNAME, LOGIN, PASSWORD, DBNAME);
        }
        catch(Exception $e){
            StatFuncs::ThrowError(ErrorCode::BAD_DB_CONNECTION);
            Router::GoOn(Routes::ERRROR);
            die();
        }
    }



    // Magic method clone is empty to prevent duplication of connection
    private function __clone() { }


    //query execution
    public static function DBRequest($querry){
        $db = self::getInstance();
        $dbLink = $db->_connection;
        $querryResult = mysqli_query($dbLink, $querry);

        return $querryResult;
    }
}
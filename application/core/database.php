<?php
/*
* Mysql database class - only one connection alowed
*/
class Database {

    private $_connection;
    private static $_instance; //The single instance



    /*
    Get an instance of the Database
    @return Instance
    */
    public static function getInstance($HOSTNAME, $LOGIN, $PASSWORD, $DBNAME) {
        if(!self::$_instance) { // If no instance then make one
            self::$_instance = new self($HOSTNAME, $LOGIN, $PASSWORD, $DBNAME);
        }
        return self::$_instance;
    }



    // Constructor
    private function __construct($HOSTNAME, $LOGIN, $PASSWORD, $DBNAME) {
        $this->_connection = new mysqli($HOSTNAME, $LOGIN, $PASSWORD, $DBNAME);

        // Error handling
        if(mysqli_connect_error()) {
            trigger_error("Failed to connect to MySQL: " . mysqli_connect_error(),E_USER_ERROR);
        }
    }



    // Magic method clone is empty to prevent duplication of connection
    private function __clone() { }



//    // Get mysqli connection
//    public function getConnection() {
//        return $this->_connection;
//    }



    //query execution
    public static function DBRequest($querry){
        $db = Database::getInstance(HOSTNAME, LOGIN, PASSWORD, DBNAME);
        $dbLink = $db->_connection;
        $querryResult = mysqli_query($dbLink, $querry);

        return $querryResult;
    }
}
?>
<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');  // default XAMPP username
define('DB_PASSWORD', '');      // default XAMPP password is blank
define('DB_NAME', 'portfolio_db');

// Create database connection
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . $conn->connect_error);
}
?>
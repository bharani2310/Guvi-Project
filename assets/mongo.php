<?php

$databseConn = new MongoDB\Client("mongodb://localhost:27017");

if ($databseConn) {
    // echo "Connected to MongoDB successfully";
} else {
    // echo "Failed to connect to MongoDB";
}

$mydb = $databseConn->PhpMongo;

$userCollection = $mydb->Users;


?>
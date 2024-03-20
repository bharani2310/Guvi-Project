<?php

require_once(__DIR__ . './../assets/vendor/autoload.php');
require_once(__DIR__ . './../assets/redis.php');



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $var = $redis->get($email);
    $ans=unserialize($var);
    echo json_encode($ans);
} 
    else {
        echo "No Document found.";
    }
    
    
    
    
   


?>


<?php

require_once(__DIR__ . './../assets/vendor/autoload.php');
require_once(__DIR__ . './../assets/mongo.php');
require_once(__DIR__ . './../assets/mysql.php');
require_once(__DIR__ . './../assets/redis.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $checkEmailQuery = "SELECT * FROM users WHERE email = '$email' and password='$password' " ;
    $result = $conn->query($checkEmailQuery);

    if ($result->num_rows > 0) {


        if ($redis->exists($email)) {
            $userDataSerialized = $redis->get($email);
            $userData = unserialize($userDataSerialized);
            echo json_encode($userData);
        }

        else{
            $data = array(
                "Email" => $email,
            );
        
            $find = $userCollection->findOne($data);
        
            if ($find) {
                $userDataSerialized = serialize($find);
                $redis->set($email, $userDataSerialized);
                $var = $redis->get($email);
                $ans = unserialize($var);
                echo json_encode($ans);
            }
             else {
                http_response_code(401);
            }
        }
    }    
    else {
        http_response_code(401);
    }
    
    $conn->close();
}

?>

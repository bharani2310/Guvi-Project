<?php

require_once(__DIR__ . './../assets/vendor/autoload.php');
require_once(__DIR__ . './../assets/mongo.php');
require_once(__DIR__ . './../assets/mysql.php');



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $checkEmailQuery = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmailQuery);


    if ($result->num_rows > 0) {
        http_response_code(401);
        echo '';
    } else {
        $insertSql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
        
        if ($conn->query($insertSql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $insertSql . "<br>" . $conn->error;
        }

		$name = $_POST['username'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $date = $_POST['date']; 


		$data = array(
			"Firstname" => $name,
			"Email" => $email,
			"Phonenumber" => $phone,
            "DOB"=>$date
		);

		$insert = $userCollection->insertOne($data);

		if ($insert->getInsertedCount() > 0) {
			echo "Document inserted successfully!";
		} else {
			echo "Error inserting data: " . $insert->getMessage();
		}
    }
    $conn->close();
}

?>


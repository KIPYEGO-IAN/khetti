<?php

$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "BAHARI";

//REGISTRATION

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["register"])) {
    $firstname = $_POST["Firstname"];
    $username = $_POST["Username"];
    $email = $_POST["Email"];
    $password = $_POST["Password"];

    $sql = "INSERT INTO `register` (`Firstname`, `Username`, `Email`, `Password`) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $firstname, $username, $email, $password);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    $loginUsername = $_POST["Username"];
    $loginPassword = $_POST["Password"];

    $sql = "SELECT * FROM `register` WHERE `Username` = ? AND `Password` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $loginUsername, $loginPassword);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        echo "Login successful!";
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
}

//LOGIN

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        header("Location: index.html");
        exit();
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
}

//ORDERS

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $food = $_POST["food"];
    $quantity = $_POST["quantity"];
    $orderDate = $_POST["orderr-date"];
    $time = $_POST["time"];
    $message = $_POST["message"];

    $sql = "INSERT INTO orders (name, phone, food, quantity, order_date, time, message) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $name, $phone, $food, $quantity, $orderDate, $time, $message);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Order placed successfully!";
    } else {
        echo "Error placing order: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();

?>

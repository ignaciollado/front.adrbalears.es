<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once 'conectar_a_bbdd.php';

mysqli_query($conn, "SET NAMES 'utf8'");
$orderID = $_GET['orderID'];
$newState = $_GET['newState'];

$postedData = file_get_contents("php://input");
$request = json_decode($postedData, TRUE);

$sql = "UPDATE design_dep_orders SET order_state = '$newState' WHERE id = " .$orderID;
$result = mysqli_query($conn, $sql);

mysqli_close($conn);
echo $result;
header('Content-Type: application/json');
?>
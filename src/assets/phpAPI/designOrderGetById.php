<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once 'conectar_a_bbdd.php';

mysqli_query($conn, "SET NAMES 'utf8'");
$orderID = $_GET['orderID'];
$sql = "SELECT * FROM design_dep_orders WHERE id = " .$orderID. " Order by id";
$result = mysqli_query($conn, $sql);

while($orderDetail = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    $vec[] = $orderDetail;
}

$cad = json_encode($vec);
mysqli_close($conn);
echo $cad;
header('Content-Type: application/json');
?>
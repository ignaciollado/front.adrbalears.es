<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once 'conectar_a_bbdd.php';

mysqli_query($conn, "SET NAMES 'utf8'");
$resource = $_GET['resource'];

$sql = "SELECT * FROM 
            booking_service 
            WHERE (fromDate >= CURRENT_DATE() AND resourceBooked = '$resource')
            ORDER by fromDate ASC";

$result = mysqli_query($conn, $sql);
while($resourcesBooked = mysqli_fetch_array($result, MYSQLI_ASSOC)){
  $vec[] = $resourcesBooked;
}

$cad = json_encode($vec);
mysqli_close($conn);
echo $cad;
header('Content-Type: application/json');
?>
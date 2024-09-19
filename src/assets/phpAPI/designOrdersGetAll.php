<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once 'conectar_a_bbdd.php';

mysqli_query($conn, "SET NAMES 'utf8'");

$sql = "SELECT id as position, order_date as orderDate, order_state as orderState, agency, contact_name as contactPerson, 
        contact_mail as contactMail, contact_phone as contactPhone,
        work_type as workType, description
                FROM design_dep_orders  ORDER BY order_date DESC";

$result = mysqli_query($conn, $sql);

while($consumptions = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    $vec[] = $consumptions;
}

$cad = json_encode($vec);
mysqli_close($conn);
echo $cad;
header('Content-Type: application/json');
?>
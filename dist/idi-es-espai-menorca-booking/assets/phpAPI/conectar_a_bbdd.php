﻿<?php

$mysqlhost = '127.0.0.1';
$username = 'front_';
$password = 'cKjfX010#]9#';
$dbname = 'front_adrbalears_generlly';

// Crear la conexión

$conn = mysqli_connect($mysqlhost, $username, $password, $dbname);

// Comprobar si se ha conectado correctamente.

if (!$conn) {

    die("failed connection: " . mysqli_connect_error());

}
// Change character set to utf8
mysqli_set_charset($conn,"utf8");
// echo "Connected successfully";
return $conn;

// mysqli_close($conn);
?>
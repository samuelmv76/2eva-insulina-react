<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Content-Type: application/json; charset=utf-8');

$conexion = mysqli_connect("localhost:3307", "usuario_standard", "", "DiabetesDB");
mysqli_set_charset($conexion, "utf8");

if (!$conexion) {
    echo json_encode(["error" => mysqli_connect_error()]);
    exit;
}
?>
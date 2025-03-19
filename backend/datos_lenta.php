<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once 'conexion.php';

// Lee el parámetro ?mes=YYYY-MM
$mes = isset($_GET['mes']) ? $_GET['mes'] : date('Y-m');

// Consulta para obtener (día, valor de lenta)
$sql = "SELECT 
          DAY(fecha) AS dia, 
          lenta
        FROM control_glucosa
        WHERE DATE_FORMAT(fecha, '%Y-%m') = '$mes'
        ORDER BY fecha ASC";

$resultado = mysqli_query($conexion, $sql);

if (!$resultado) {
    echo json_encode(['error' => mysqli_error($conexion)]);
    exit;
}

// Construimos un array con los datos
$datos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = [
        'dia'   => $fila['dia'],   // Día numérico (1..31)
        'lenta' => $fila['lenta']  // Valor de lenta
    ];
}

// Devolvemos en formato JSON
echo json_encode($datos);

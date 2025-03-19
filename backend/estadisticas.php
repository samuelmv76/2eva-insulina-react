<?php
// Muestra errores en desarrollo (opcional)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// La respuesta será JSON
header('Content-Type: application/json');

// Incluye tu archivo de conexión
require_once 'conexion.php';

// Lee el parámetro GET ?mes=YYYY-MM, o usa el mes actual si no se envía
$mes = isset($_GET['mes']) ? $_GET['mes'] : date('Y-m');

// Consulta para calcular estadísticas de la columna "lenta"
$sql = "SELECT 
          AVG(lenta) AS media,
          MIN(lenta) AS minima,
          MAX(lenta) AS maxima
        FROM control_glucosa
        WHERE DATE_FORMAT(fecha, '%Y-%m') = '$mes'";

// Ejecutamos la consulta
$resultado = mysqli_query($conexion, $sql);

// Si falla la consulta, mostramos el error
if (!$resultado) {
    echo json_encode(['error' => mysqli_error($conexion)]);
    exit;
}

// Si la consulta es correcta y hay al menos 1 fila
if (mysqli_num_rows($resultado) > 0) {
    $fila = mysqli_fetch_assoc($resultado);

    // Evitar advertencia de "round() a null"
    $media = $fila['media'] !== null ? round($fila['media'], 2) : 0;
    $minima = $fila['minima'] ?? 0;
    $maxima = $fila['maxima'] ?? 0;

    echo json_encode([
        'media'  => $media,
        'minima' => $minima,
        'maxima' => $maxima
    ]);
} else {
    // Si no hay datos para ese mes
    echo json_encode(['media' => 0, 'minima' => 0, 'maxima' => 0]);
}

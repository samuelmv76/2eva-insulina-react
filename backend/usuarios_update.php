<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($_GET['id_usu'])) {
        echo json_encode(["error" => "No se especificó id_usu para actualizar"]);
        exit;
    }
    $id_usu = intval($_GET['id_usu']);
    
    if (empty($data['contra']) || empty($data['nombre']) || empty($data['apellidos']) || empty($data['fecha_nacimiento'])) {
        echo json_encode(["error" => "Faltan datos para actualizar"]);
        exit;
    }
    
    $contra = password_hash($data['contra'], PASSWORD_DEFAULT);
    $nombre = mysqli_real_escape_string($conexion, $data['nombre']);
    $apellidos = mysqli_real_escape_string($conexion, $data['apellidos']);
    $fecha_nacimiento = mysqli_real_escape_string($conexion, $data['fecha_nacimiento']);
    
    $sql = "UPDATE USUARIO 
            SET contra='$contra', 
                nombre='$nombre', 
                apellidos='$apellidos', 
                fecha_nacimiento='$fecha_nacimiento' 
            WHERE id_usu=$id_usu";
    
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["msg" => "Usuario actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error SQL: " . mysqli_error($conexion)]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}

mysqli_close($conexion);
?>

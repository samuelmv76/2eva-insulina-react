<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

switch ($_SERVER['REQUEST_METHOD']) {
    // Leer usuarios
    case 'GET':
        $res = mysqli_query($conexion, "SELECT id_usu, usuario, nombre, apellidos, fecha_nacimiento FROM USUARIO");
        if (!$res) {
            echo json_encode(["error" => mysqli_error($conexion)]);
            exit;
        }
        echo json_encode(mysqli_fetch_all($res, MYSQLI_ASSOC));
        break;

    // Crear usuario
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['usuario']) || empty($data['contra']) || empty($data['nombre']) || empty($data['apellidos']) || empty($data['fecha_nacimiento'])) {
            echo json_encode(["error" => "Faltan datos para crear usuario"]);
            exit;
        }
        $usuario = mysqli_real_escape_string($conexion, $data['usuario']);
        $contra = password_hash($data['contra'], PASSWORD_DEFAULT);
        $nombre = mysqli_real_escape_string($conexion, $data['nombre']);
        $apellidos = mysqli_real_escape_string($conexion, $data['apellidos']);
        $fecha_nacimiento = mysqli_real_escape_string($conexion, $data['fecha_nacimiento']);

        $insert = "INSERT INTO USUARIO(usuario, contra, nombre, apellidos, fecha_nacimiento) 
                   VALUES('$usuario','$contra','$nombre','$apellidos','$fecha_nacimiento')";
        if (mysqli_query($conexion, $insert)) {
            echo json_encode(["msg" => "Usuario creado correctamente"]);
        } else {
            echo json_encode(["error" => "Error SQL: " . mysqli_error($conexion)]);
        }
        break;

    // Eliminar usuario
    case 'DELETE':
        if (isset($_GET['usuario'])) {
            $usuario = mysqli_real_escape_string($conexion, $_GET['usuario']);
            mysqli_query($conexion, "DELETE FROM USUARIO WHERE usuario='$usuario'");
            echo json_encode(["msg" => "Usuario eliminado"]);
        } else {
            echo json_encode(["error" => "No se especificó el usuario a eliminar"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["msg" => "Método no permitido"]);
        break;
}

mysqli_close($conexion);
?>

<?php

require_once('../../../dll/php/conexionBD.php');

extract($_POST);
extract($_GET);

$salida = "{failure:true}";

//$consultaSql = "
//    SELECT  R.ID_RUTA, R.NOMBRE
//    FROM RUTAS R, RUTA_HORA RH
//    WHERE R.ID_RUTA = RH.ID_RUTA
//    AND RH.HORA = '" . $hora . "'
//    AND R.TIPO = '" . $op . "'
//    ";

$consultaSql = "
            SELECT ID_RUTA,NOMBRE
            FROM rutas
            WHERE TIPO = '" . $op . "'
            ORDER BY NOMBRE
            ";

consulta($consultaSql);
$resulset = variasFilas();

$salida = "{\"rutas\": [";
//htmlentities
for ($i = 0; $i < count($resulset); $i++) {
    $fila = $resulset[$i];
    $salida .= "{
            \"id\":\"" . $fila["ID_RUTA"] . "\",
            \"name\":\"" . utf8_encode($fila["NOMBRE"]) . "\"
        }";
    if ($i != count($resulset) - 1) {
        $salida .= ",";
    }
}

$salida .="]}";

echo $salida;
?>
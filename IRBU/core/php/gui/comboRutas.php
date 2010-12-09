<?php

require_once('../../../dll/php/conexionBD.php');

extract($_GET);

$salida = "{failure:true}";

//$consultaSql = "
//            SELECT R.ID_RUTA, R.NOMBRE
//            FROM RECORRIDO_RUTA R_R, RUTAS R
//            WHERE ID_RECORRIDO='" . $id_rec . "' AND R_R.ID_RUTA = R.ID_RUTA AND R_R.ID_RUTA IN (
//              SELECT RID.ID_RUTA
//              FROM RUTAS RID
//              WHERE RID.TIPO = '" . $op . "'
//            )
//            ";

$consultaSql = "
            SELECT ID_RUTA,NOMBRE
            FROM rutas
            WHERE TIPO = '".$op."'
            ";

consulta($consultaSql);
$resulset = variasFilas();

$salida = "{\"rutas\": [";

for ($i = 0; $i < count($resulset); $i++) {
    $fila = $resulset[$i];
    $salida .= "{
            \"id\":\"" . $fila["ID_RUTA"] . "\",
            \"name\":\"" . htmlentities($fila["NOMBRE"]) . "\"
        }";
    if ($i != count($resulset) - 1) {
        $salida .= ",";
    }
}

$salida .="]}";

echo $salida;
?>
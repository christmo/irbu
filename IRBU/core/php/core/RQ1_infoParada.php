<?php

session_start();
require_once('../../../dll/php/conexionBD.php');
extract($_GET);

$consultaSql = "SELECT RU.TIPO, RU.NOMBRE, R.HORA
                FROM RUTA_HORA R, (
                      SELECT ID_RUTA
                      FROM RUTA_PARADA
                      WHERE ID_PARADA = $idparada
                  ) H, RUTAS RU
                WHERE R.ID_RUTA = H.ID_RUTA AND H.ID_RUTA = RU.ID_RUTA";

$resulset = consultaJSON($consultaSql);
$arr = array();
while ($obj = mysql_fetch_object($resulset))
    $arr[] = $obj;
echo '' . json_encode($arr) . '';

?>
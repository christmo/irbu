<?php

require_once('../../../dll/php/conexionBD.php');

extract($_POST);
extract($_GET);

/**
 * TODO: Cambiar la consulta de prueba para los recorridos de los buses UTPL
 */
//$consultaSql ="SELECT LONGITUD,LATITUD FROM rastreosatelital.recorridos r where id='20101213' and id_empresa='CV' and n_unidad=57";
$consultaSql ="SELECT LON,LAT FROM COORDENADAS_GPS WHERE ID_RUTA = ".$id_ruta." ORDER BY ORDEN ASC";

consulta($consultaSql);
$resulset = variasFilas();

$salida = "{failure:true}";
$datos = "";

if (count($resulset) >= 1) {

    for ($i = 0; $i < count($resulset); $i++) {

        $fila = $resulset[$i];

        $datos .= $fila["LON"] . "%" . $fila["LAT"] . "#";
    }

    $salida = "{success:true,datos: { coordenadas: '$datos' }}";
}

echo $salida;

?>

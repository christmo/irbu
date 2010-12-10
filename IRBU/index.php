<?php ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>IRBU</title>
        <link rel="shortcut icon" href="img/taxi.png" type="image/x-icon" />

        <!--Maquetacion-->
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
        <!--Ext-JS-->
        <link rel="stylesheet" type="text/css" href="css/ext-js/resources/css/ext-all.css" />
        <!--OpenLayers-->
        <link rel='stylesheet' type='text/css' href='dll/js/openlayers/theme/default/style.css'/>

        <?php
        /**
         * Comprobar si se conecta con IE o con otro navegador ya que el cargado
         * de las librerias tiene que ser diferencte y el mapa tambien es diferente
         */
        if (strstr($_SERVER["HTTP_USER_AGENT"], "MSIE")) {
            //Primero cargar OSM en IE
            echo "<script language='javascript' type='text/javascript' src='dll/js/osm/OpenStreetMap.js'></script>";
            echo "<script language='javascript' type='text/javascript' src='dll/js/mapa_ie.js'></script>";
            //Segundo cargar OpenLayers en IE
            echo "<script language='javascript' type='text/javascript' src='dll/js/openlayers/lib/OpenLayers.js'></script>";
        } else {
            //Primero cargar cargar OpenLayers en otros navegadores
            echo "<script language='javascript' type='text/javascript' src='dll/js/openlayers/lib/OpenLayers.js'></script>";
            //Segundo cargar OSM en otros navegadores
            echo "<script language='javascript' type='text/javascript' src='dll/js/osm/OpenStreetMap.js'></script>";
            echo "<script language='javascript' type='text/javascript' src='dll/js/mapa.js'></script>";
        }
        ?>

    </head>

    <body onload="init()">
        <div id="map">
        </div>

    </body>
    <script type="text/javascript" src="dll/js/ext-js/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="dll/js/ext-js/ext-all.js"></script>
    <script type="text/javascript" src="core/js/gui/contenedorPrincipal.js"></script>
    <!--Ventanas-->
    <script type="text/javascript" src="core/js/gui/ventanaBuscarRutas.js"></script>
    <script type="text/javascript" src="core/js/gui/ventanaLocalizarParadaHora.js"></script>
    <!-- spinner -->
    <link rel="stylesheet" type="text/css" href="dll/js/ext-js/ux/spinner/Spinner.css"/>
    <script language="javascript" type="text/javascript" src="dll/js/ext-js/ux/spinner/Spinner.js"></script>
    <script language="javascript" type="text/javascript" src="dll/js/ext-js/ux/spinner/SpinnerStrategy.js"></script>
</html>


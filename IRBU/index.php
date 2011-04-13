<?php
require_once('core/php/core/navegadores.php');
$navegador = validarNavegador();

if (!$navegador) {
    /**
     * Si el navegador no es valido se va a la pagina de descargar...
     */
    echo "<script>location.href='navegador.php'</script>";
}
?>
<!DOCTYPE HTML>
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
            echo "<script type='text/javascript' src='dll/js/osm/OpenStreetMap.js'></script>\n";
            //Segundo cargar OpenLayers en IE
            echo "\t<script type='text/javascript' src='dll/js/openlayers/lib/OpenLayers.js'></script>\n";
            echo "\t<script type='text/javascript' src='dll/js/mapa_ie.js'></script>\n";
        } else {
            //Primero cargar cargar OpenLayers en otros navegadores
            echo "<script type='text/javascript' src='dll/js/openlayers/lib/OpenLayers.js'></script>\n";
            //Segundo cargar OSM en otros navegadores
            echo "\t<script type='text/javascript' src='dll/js/osm/OpenStreetMap.js'></script>\n";
            echo "\t<script type='text/javascript' src='dll/js/mapa.js'></script>\n";
        }
        ?>

    </head>

    <body onload="init()">
        <div id="map" >
        </div>
        <div style="position: absolute; bottom: 0px; right: 0px;" >
            <a href='http://www.kradac.com'>
            <img alt="www.kradac.com"  src='img/datap/credits.png'/>
            </a>
        </div>        
    </body>

    <script type="text/javascript" src="dll/js/ext-js/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="dll/js/ext-js/ext-all.js"></script>
    <script type="text/javascript" src="core/js/gui/contenedorPrincipal.js"></script>
    <!--Ventanas-->
    <script type="text/javascript" src="core/js/gui/ventanaBuscarRutas.js"></script>
    <script type="text/javascript" src="core/js/gui/ventanaLocalizarParadaHora.js"></script>

    <script type="text/javascript" src="core/js/gui/RQ1_POPUP.js"></script>

    <!-- RQ 2 -->
    <script type="text/javascript" src="core/js/core/RQ2_TrazarRuta.js"></script>
    <script type="text/javascript" src="core/js/core/LimpiarCapas.js"></script>

    <!--  RQ 3  -->
    <script type="text/javascript" src="dll/js/action_popup_paradas.js"></script>
    <script type="text/javascript" src="core/js/gui/RQ3_busqueda_aprox.js"></script>
    <script type="text/javascript" src="core/js/core/RQ3_AreaBusqueda.js"></script>

    <!-- spinner -->
    <link rel="stylesheet" type="text/css" href="dll/js/ext-js/ux/spinner/Spinner.css"/>
    <script type="text/javascript" src="dll/js/ext-js/ux/spinner/Spinner.js"></script>
    <script type="text/javascript" src="dll/js/ext-js/ux/spinner/SpinnerStrategy.js"></script>

    <!--  RQ1 TRATAMIENTO DE IMAGENES  -->
    <script type="text/javascript" src="dll/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="dll/js/jquery/jquery.lightbox-0.5.js"></script>
    <link rel="stylesheet" type="text/css" href="css/jquery.lightbox-0.5.css" media="screen" />
    <script type='text/javascript'>
        $(function() {
            $('.photo').lightBox();
        });
    </script>
</html>


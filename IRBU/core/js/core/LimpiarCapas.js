/*
 * Permite limpiar todas las capas que haya utilizado en las busquedas
 */

/**
 * Limpiar las capas de Trazado de Rutas y las de Paradas para que quede
 * nuevamente el mapa listo para recivir nuevas consultas
 */
function limpiarCapas(){
    limpiarCapaRecorridos();
    limpiarCapaParadas();
}

/**
 * Limpia la capa de Recorridos, solo el trazado de las rutas de los buses
 */
function limpiarCapaRecorridos(){
    lienzoRecorridos.removeAllFeatures();
    removerMarcas();
}

/**
 * Limpia la capa de las Paradas, los puntos de paradas de los Buses
 */
function limpiarCapaParadas(){
    lienzoParadas.removeAllFeatures();
}

/**
 * Quita las marcas de inicio y de fin de recorrido
 */
function removerMarcas(){
    markerInicioFin.clearMarkers();
}

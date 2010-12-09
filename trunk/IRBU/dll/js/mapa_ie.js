
var map;

// coordenadas para centrar Loja
var lat = - 3.9912;
var lon = - 79.20733;
var zoom = 13;

function init(){

    // Mapa
    map = new OpenLayers.Map('map',
    {
        controls : [],
        displayProjection : new OpenLayers.Projection( "EPSG:4326" ),
        projection : new OpenLayers.Projection( "EPSG:4326" ),
        units : 'm',
        numZoomLevels : 19,
        maxResolution : 'auto'
    });

    layer = new OpenLayers.Layer.OSM( "Mapa de Loja");
    map.addLayer(layer);
    nav = new OpenLayers.Control.Navigation({
        'zoomWheelEnabled': true
    });
    map.addControl(nav);

    layerSwitch = new OpenLayers.Control.LayerSwitcher();
    map.addControl(layerSwitch);

    mousePosition = new OpenLayers.Control.MousePosition();
    map.addControl(mousePosition);

    movimientoTeclado = new OpenLayers.Control.KeyboardDefaults();
    map.addControl(movimientoTeclado);

    barraZoom = new OpenLayers.Control.PanZoomBar();
    map.addControl(barraZoom);

    map.setCenter(
        new OpenLayers.LonLat(lon,  lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()), zoom
        );
}


var map;

// coordenadas para centrar Loja
var lat = - 3.9912;
var lon = - 79.20733;
var zoom = 15;

function init(){

        //Limitar navegabilidad en el mapa
    var extent = new OpenLayers.Bounds();
    extent.extend(new OpenLayers.LonLat(-79.24441,-3.93400  ));
    extent.extend(new OpenLayers.LonLat(-79.18123,-4.04600));
    extent.transform( new OpenLayers.Projection( "EPSG:4326" ),
        new OpenLayers.Projection( "EPSG:900913" ));

    // Mapa
    map = new OpenLayers.Map('map',
    {
        controls : [],
        restrictedExtent : extent,
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


var map;

// coordenadas para centrar Loja
var lat = - 3.9912;
var lon = - 79.20733;
var zoom = 13;

function init(){

    // Mapa
    map = new OpenLayers.Map( "map", {
        controls : [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.MousePosition(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.KeyboardDefaults(),
        new OpenLayers.Control.LayerSwitcher(),
        ],
        maxExtent : new OpenLayers.Bounds( - 79.23381, - 3.96749, - 79.17630, - 4.00457 ),
        displayProjection : new OpenLayers.Projection( "EPSG:4326" ),
        projection : new OpenLayers.Projection( "EPSG:4326" ),
        units : 'm',
        numZoomLevels : 19,
        maxResolution : 'auto'
    });

    // Mapa sobre el que se trabaja
    map.addLayer( new OpenLayers.Layer.OSM.Mapnik( "Loja Map" ) );


    // Centrar el Mapa
    var lonLat = new OpenLayers.LonLat( lon, lat ).transform( new OpenLayers.Projection( "EPSG:4326" ),
        map.getProjectionObject() );
    map.setCenter ( lonLat, zoom );

}

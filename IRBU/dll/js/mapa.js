
var map;

// coordenadas para centrar Loja
var lat = - 3.9912;
var lon = - 79.20733;
var zoom = 15;
var lienzoParadas;
var capturarPosicion;

function init(){
    
    capturarPosicion = false;
    
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        defaultHandlerOptions: {
            'single': true,
            'double': false,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': false
        },

        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(this, {
                'click': this.trigger
            }, this.handlerOptions);
        },

        trigger: function(e) {        
            //Capturar Punto de Referencia
            if (capturarPosicion) {
                var coord = map.getLonLatFromViewPortPx(e.xy);
                var aux =  new OpenLayers.Geometry.Point( coord.lon, coord.lat );
                aux.transform( new OpenLayers.Projection( "EPSG:900913" ),
                    new OpenLayers.Projection( "EPSG:4326" ) );
                xpos = aux.x;
                ypos = aux.y;
                capturarPosicion = false;
                RQ3_getWin();
            }
        }
    });

    //Limitar navegabilidad en el mapa
    var extent = new OpenLayers.Bounds();
    extent.extend(new OpenLayers.LonLat(-79.24441,-3.93400  ));
    extent.extend(new OpenLayers.LonLat(-79.18123,-4.04600));
    extent.transform( new OpenLayers.Projection( "EPSG:4326" ),
        new OpenLayers.Projection( "EPSG:900913" ));

    // Mapa
    map = new OpenLayers.Map( "map", {
        controls : [
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.KeyboardDefaults(),
        ],
        restrictedExtent : extent,
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

    //Envento click sobre el mapa
    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate();

    //Restringe la posibilidad de hacer zoom mas alla
    //de la zona de Loja
    map.events.register('zoomend', this, function() {
        if (map.getZoom() < 13)
        {
            map.zoomTo(13);
        }
    });

    cargarCapas();   
}

/**
 * Capas sobre el Mapa
 */
function cargarCapas() {
    var stylePuntos = new OpenLayers.StyleMap( {
        fillOpacity : 0.7,
        pointRadius: 9,
        idBD : "${idBD}",
        label: "${idBD}",
        lat : "${lat}",
        lon : "${lon}",
        dir : " ${dir}",
        ref : "${ref}",
        img : "${img}",
        fontColor: "white",
        fillColor: "#003DF5", //black
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.7,
        fontSize: "12px",
        fontFamily: "Courier New, monospace",
        fontWeight: "bold"
    }
    );

    lienzoParadas = new OpenLayers.Layer.Vector('Points', {
        styleMap: stylePuntos
    });

    map.addLayer(lienzoParadas);

    //Comportamiento de los Elementos de la Capa
    selectFeatures = new OpenLayers.Control.SelectFeature(
        [ lienzoParadas ],
        {
            clickout: true,
            toggle: false,
            multiple: false,
            hover : false,
            onSelect : function(feature){
                selectParada( feature );
            },
            onUnselect : function(feature){
                unselectParada( feature );
            }
        }
        );

    map.addControl( selectFeatures );
    selectFeatures.activate();

}

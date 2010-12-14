/**
 * Dibujar las paradas dependiendo de las coordenadas que se envien
 */
function dibujarParadas(coordPuntos){
    lienzoParadas.removeAllFeatures();
    var features = new Array();

    //Recuperar posiciones del recorrido
    var fil = coordPuntos.split("#");

    for ( i=0; i<fil.length-1; i++ ) {

        var col = fil[i].split("%");
        var pt = new OpenLayers.Geometry.Point(col[1],col[2]);
        pt.transform( new OpenLayers.Projection( "EPSG:4326" ),
            new OpenLayers.Projection( "EPSG:900913" ) );

        //puntosRuta.push(pt);

        var puntoMap = new OpenLayers.Feature.Vector( pt, {
            idBD : col[0],
            lat : col[2],
            lon : col[1],
            dir : col[3],
            ref : col[4],
            img : col[5],
            poppedup : false
        });

        features.push(puntoMap);
    }
    
    lienzoParadas.addFeatures(features);
}
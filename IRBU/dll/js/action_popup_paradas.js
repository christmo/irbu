//Direccion de Imagen por Defecto
var Default_Img = 'img/default_parada.jpg';

/**
 * Comportamiento de Selección
 */
function selectParada( feature ) {

    var dir = feature.attributes.dir;
    var ref = feature.attributes.ref;
    var img = feature.attributes.img;
    if (!img) {
        //no tiene imagen
        img = Default_Img;
    }
//style='position: absolute;'
    var contenidoPopUp = "<div id='popid'  >"+dir+"<br /><center><a href='" + img + "' title='"+dir+"'><img src='"+img+"' width='100' height='75'/></a></center>"+ref+"</div>";

    var popup =
    new OpenLayers.Popup.AnchoredBubble( null,
        new OpenLayers.LonLat( feature.geometry.x, feature.geometry.y ),
        new OpenLayers.Size(120,130),
        contenidoPopUp,
        null,
        true,
        function () {
            onCloseParada( feature )
        }
        );

    popup.setBackgroundColor('#C8C8C8 '); // fondo
    feature.popup = popup;
    feature.attributes.poppedup = true;
    map.addPopup( popup );

    //El evento necesita ser sobrescrito debido
    //a que el objeto(img) es puesto dinamicamente
    $(function() {
        $('a').lightBox();
    });


}

/**
 * Comportamiento de Deselección
 */
function unselectParada( feature ) {
    map.removePopup( feature.popup );
    feature.popup.destroy();
    feature.attributes.poppedup = false;
    feature.popup = null;
}

/**
 * Comportamiento de Cerrar PopUp
 */
function onCloseParada( feature ) {
    selectFeatures.unselect( feature );
}
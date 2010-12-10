/*
 * Permite desplegar la venta para buscar la ruta de los buses de la UTPL
 */

var contLocParadas;
var winLocParadaHorSec;
var urlRutas = phpComboRutas+"?op=B";

Ext.onReady(function(){

    contLocParadas = new Ext.FormPanel({
        labelAlign: 'top',
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        labelWidth:60,
        width: 500,

        items: [{
            columnWidth:1,
            layout: 'form',
            items: [{
                xtype: 'radiogroup',
                fieldLabel: 'Tipo de recorrido',
                items: [
                {
                    boxLabel: 'Baja de la UTPL',
                    name: 'rbTipo',
                    inputValue: 'B',
                    listeners: {
                        check: function (ctl, val) {
                            recargarComboRutasParadas();
                        }
                    }
                },{
                    boxLabel: 'Sube a la UTPL',
                    name: 'rbTipo',
                    inputValue: 'R',
                    listeners: {
                        check: function (ctl, val) {
                            recargarComboRutasParadas();
                        }
                    }
                },{
                    boxLabel: 'Sube y baja de la UTPL',
                    name: 'rbTipo',
                    inputValue: 'BR',
                    listeners: {
                        check: function (ctl, val) {
                            recargarComboRutasParadas();
                        }
                    }
                }
                ]
            }
            ]
        },{
            layout:'column',
            items:[{
                columnWidth:.25,
                layout: 'form',
                bodyStyle:'padding:0px 0px 0px 5px',
                items: [
                new Ext.ux.form.Spinner(
                {
                    fieldLabel: 'Hora de Recorrido',
                    name: 'hora',
                    value: '06:00',
                    strategy: new Ext.ux.form.Spinner.TimeStrategy({
                        minValue:'06:30',
                        maxValue:'21:00',
                        incrementValue: 30
                    }),
                    allowBlank:false,
                    emptyText:'Hora de recorrido...',
                    anchor:'98%'
                })
                ]
            },{
                columnWidth:.75,
                layout: 'form',
                items: [
                comboRutas
                ]
            }]
        }
        ],

        buttons: [{
            text: 'Graficar Paradas',
            handler: function() {
                contLocParadas.getForm().submit({
                    //url : 'php/monitoreo/datosRutaGpsSof.php',
                    method:'POST',
                    waitMsg : 'Comprobando Datos...',
                    failure: function (form, action) {
                        Ext.MessageBox.show({
                            title: 'Error...',
                            msg: 'No hay un trazo posible en estas fechas y horas...',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    },
                    success: function (form, action) {
                        var resultado = Ext.util.JSON.decode(action.response.responseText);

                        // dibujar la ruta en el mapa
                        // generarTrazado(resultado.datos.coordenadas);
                        lienzosRecorridoHistorico(resultado.datos.coordenadas);

                        //Limpia los datos del formulario y lo oculta
                        limpiar_datos_paradas();
                    }
                });
            }
        },{
            text: 'Cancelar',
            handler: limpiar_datos_paradas
        }]
    });
});

function recargarComboRutasParadas(){
    comboRutas.reset();
    var radioTipo =  contLocParadas.getForm().getValues()['rbTipo'];
    urlRutas = phpComboRutas +"?op="+ radioTipo; 
    storeRutas.proxy.conn.url = urlRutas;
    storeRutas.load();
}

/* oculta la venta y limpia los datos no guardados */
function limpiar_datos_paradas(){
    contLocParadas.getForm().reset();
    winLocParadaHorSec.hide();
}

/**
* Obtine el id y el nombre del conductor de una unodad
*/
//var storeRecorridos = new Ext.data.JsonStore({
//    autoDestroy: true,
//    url: 'core/php/gui/comboRecorridos.php',
//    root: 'recorridos',
//    fields: ['id', 'name'],
//    failure: function (form, action) {
//        Ext.MessageBox.show({
//            title: 'Error...',
//            msg: 'No a ingresado correctamente vuelva a ingresar al sistema...',
//            buttons: Ext.MessageBox.OK,
//            icon: Ext.MessageBox.ERROR
//        });
//    }
//});

/**
* Generar Combo Recorridos
*/
//var comboRecorridos = new Ext.form.ComboBox({
//    store: storeRecorridos,
//    fieldLabel: 'Recorridos',
//    hiddenName: 'idRecorridos',
//    valueField: 'id',
//    displayField: 'name',
//    typeAhead: true,
//    mode: 'remote',
//    triggerAction: 'all',
//    emptyText:'Seleccionar recorrido...',
//    allowBlank:false,
//    resizable:true,
//    minListWidth:300,
//    selectOnFocus:true,
//    width: 227,
//    listeners: {
//        change: function (ctl, val) {
//            //var baja =  contLocParadas.getForm().getValues()['rbTipo'];
//            recargarComboRutasParadas();
//        //alert('cambio');
//        }
//    }
//});

/**
* Obtine el id y el nombre del conductor de una unodad
*/
var storeRutas = new Ext.data.JsonStore({
    autoDestroy: true,
    url: urlRutas,
    root: 'rutas',
    fields: ['id', 'name'],
    failure: function (form, action) {
        Ext.MessageBox.show({
            title: 'Error...',
            msg: 'No a ingresado correctamente vuelva a ingresar al sistema...',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }
});

// Custom rendering Template
var resultadoTplRutas = new Ext.XTemplate(
    '<tpl for="."><div class="search-item">',
    //'<h3><span>{id}</span></h3>',
    '{name}',
    '</div></tpl>'
    );

/**
* Carga el combo con las rutas segun el recorrido
*/
var comboRutas = new Ext.form.ComboBox({
    store: storeRutas,
    fieldLabel: 'Rutas',
    hiddenName: 'idRutas',
    valueField: 'id',
    displayField: 'name',
    typeAhead: true,
    mode: 'local',
    triggerAction: 'all',
    tpl: resultadoTplRutas,
    itemSelector: 'div.search-item',
    emptyText:'Seleccionar ruta...',
    allowBlank:false,
    resizable:true,
    minListWidth:300,
    selectOnFocus:true,
    width: 340
});

/**
* Muestra la ventana para buscar una ruta
* @return NO retorna valor
*/
function ventanaLocalizarParadaHora(){
    if(!winLocParadaHorSec){
        winLocParadaHorSec = new Ext.Window({
            layout:'fit',
            title:'Buscar paradas por hora y sector',
            resizable : false,
            width:500,
            height:180,
            closeAction:'hide',
            plain: false,
            items: [contLocParadas]
        });
    }
    winLocParadaHorSec.show(this);
}

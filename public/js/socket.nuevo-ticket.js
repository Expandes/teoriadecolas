//===========================================
// JS CLIENTE for: nuevo-ticket.html
//===========================================


//Comando para establecer la comunicación


var socket = io();

label = $('#lblNuevoTicket');


socket.on('connect', function() {

    console.log('Cliente: Conectado al servidor');

});

//Escuchar información de desconexión
socket.on('disconnect', function() {

    console.log('Cliente: Perdimos conexión con el servidor');

});


//listener estadoActual

socket.on('estadoActual', function(resp) {

    label.text(resp.actual);

});


//Listener para el botón 

$('button').on('click', function() {

    //null: no envía ningún argumento
    //function(siguienteTicket): Si se recoge la respuesta del servidor
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});
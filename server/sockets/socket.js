//===========================================
// SERVIDOR: SOCKETS 
//===========================================



const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();



//==============================
// INICIA CONEXIÓN
//==============================

io.on('connection', (client) => {


    // data viene null

    //==============================
    // Servidor escucha 'siguienteTicket'
    //==============================

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log('El siguiente ticket es: ', siguiente);


        callback(siguiente);

        client.broadcast.emit('ultimos4', {

            ultimos4: ticketControl.getUltimos4()

        });



    });


    console.log('Usuario conectado');

    //==============================
    // Servidor emite 'estadoActual'
    //==============================

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    //==============================
    // Servidor escucha 'atenderTicket'
    //==============================

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'EL escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);


        //Actualizar, notificar cambios en los últimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })

    });




    //==============================
    // Servidor escucha desconexión cliente
    //==============================

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });



});
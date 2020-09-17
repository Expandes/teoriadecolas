//===========================================
// SERVIDOR: CLASS  llama: socket.js
//===========================================


const fs = require('fs');


class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}




class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //tickets pendientes de revisión
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        //Reinicia el conteo cada día

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;


        } else {

            this.reiniciarConteo();

        }
    }


    //Método para siguiente ticket y grabar

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }



    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }


    getUltimos4() {

        return this.ultimos4;

    }



    atenderTicket(escritorio) {

        //Si está vacio el array, no hay tickets
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //Número primer ticket pendiente
        //Para evitar un conflicto con javascript
        let numeroTicket = this.tickets[0].numero;

        //eliminar primer elemento para ubicarlo en el lugar de "ultimos4"
        this.tickets.shift();


        //Nueva instancia de ticket que si se atenderá 
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Se agrega en la primera ubicación
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el último
        }

        console.log('Ultimos 4');

        console.log(this.ultimos4);


        this.grabarArchivo();

        return atenderTicket;


    }




    //Método para reiniciar el conteo diario

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }



    //Método para grabar el json convertido primero a string
    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let JsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', JsonDataString);


    }

}




module.exports = {

    TicketControl

}
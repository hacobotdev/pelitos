const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios'; 
        this.authPath = '/api/auth';
        this.aparatoPath = '/api/aparato';

        // Connect to DB
        this.dbConnect();

        // Middlewares
        this.middlewares(0);

        // Rutas de aplicación 
        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        // CORS Policy
        this.app.use(cors());

        // Body Parsing
        this.app.use(express.json());

        // Public Directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.aparatoPath, require('../routes/aparato'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
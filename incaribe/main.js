/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json 
app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./controllers/index'));

let options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};

let mongodbUri = `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

mongoose.connect(mongodbUri, options);
let conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    // Wait for the database connection to establish, then start the app.
    app.listen(config.PORT, () => {
        console.log("Ejecutando en el puerto " + config.PORT);
    });
});
 */
/* prueba rabia lo borramos para usar la de arriba  */

'use strict'

var mongoose = require('mongoose');
var router = require('./controllers/manager');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/SGP', (err, res) =>{
	if (err) {
		throw err;
	}else{
		console.log("La conexion a la base de datos esta corriendo correctamente...");
		
		router.listen(port, function(){

			console.log("Servidor de la API listening at http://localhost:" + port);

		});

	}	

});
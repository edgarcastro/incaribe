const express = require('express');
const Project = require('../models/Project');
var bodyParser = require('body-parser');
var user_routes = require('../routes/user');
var project_routes = require('../routes/project');

const router = express();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


//Rutas
/* edgar tus rutas las mande a la carpeta routes, mira el archivo project para que veas */

//configurar cabeceras http
router.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, X-XSRF-TOKEN');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

router.use('', user_routes);
router.use('', project_routes);


module.exports = router;
const express = require('express');

const router = express.Router();

//Añade los controladores
router.use('/manager', require('./manager')); 

module.exports = router;
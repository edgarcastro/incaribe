'use strict'

var express = require('express');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart= require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

var ProjectController = require('../controllers/project');

api.get('/probando-controlador', ProjectController.pruebas);
api.get('/projects',md_auth.ensureAuth, ProjectController.getProjects);
api.get('/projects/:id', md_auth.ensureAuth, ProjectController.getProject);
api.post('/projects', md_auth.ensureAuth, ProjectController.saveProject);
api.put('/projects/:id', md_auth.ensureAuth, ProjectController.editProject);
api.delete('/projects/:id', md_auth.ensureAuth, ProjectController.deleteProject);

module.exports = api;
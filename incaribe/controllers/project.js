'use strict'

var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt');
const Project = require('../models/Project');

function pruebas(req, res){
	res.status(200).send({
		message: 'Probando una acción del controlador de usuario en el api'
	});
}

function getProjects(req, res){
    Project.find({
        //conditions
    }, {
        //projection
    }, (err, projects) => {
        if (err) {
            res.json({
                'error': true,
                'errorMesseage': err
            });
        } else {
            res.json({
                'error': false,
                'projects': projects
            });
        }
    });
}

function getProject(req, res){
    if (req.params.id) {
        Project.findById(req.params.id, {
            //projection
        }, (err, project) => {
            if (err) {
                res.json({
                    'error': true,
                    'errorMesseage': err
                });
            } else {
                res.json({
                    'error': false,
                    'project': project
                });
            }
        });
    } else {
        res.json({
            'error': true,
            'errorMesseage': 'NOT PARAMS'
        });
    }
}

function saveProject(req, res){
    if (req.body.project) {
        let p = new Project(req.body.project);
        p.save((err, project, numAffected) => {
            if (err) {
                res.json({
                    'error': true,
                    'errorMesseage': err
                });
            } else {
                res.json({
                    'error': false,
                    'project': p
                });
            }
        });
    } else {
        res.json({
            'error': true,
            'errorMesseage': 'NOT PARAMS'
        });
    }
}

function editProject(req, res){
    if (req.params.id && req.body.project) {
        Project.findByIdAndUpdate(req.params.id, req.body.project, {
            'new': true
        }, (err, project) => {
            if (err) {
                res.json({
                    'error': true,
                    'errorMesseage': err
                });
            } else {
                res.json({
                    'error': false,
                    'project': project
                });
            }
        });
    } else {
        res.json({
            'error': true,
            'errorMesseage': 'NOT PARAMS'
        });
    }
}

function deleteProject(req, res){
    if (req.params.id) {
        Project.findByIdAndRemove(req.params.id, {
            'new': false
        }, (err, project) => {
            if (err) {
                res.json({
                    'error': true,
                    'errorMesseage': err
                });
            } else {
                res.json({
                    'error': false,
                    'project': project
                });
            }
        });
    } else {
        res.json({
            'error': true,
            'errorMesseage': 'NOT PARAMS'
        });
    }
}
module.exports = {
	pruebas,
    getProjects,
    getProject,
    saveProject,
    editProject,
    deleteProject
};
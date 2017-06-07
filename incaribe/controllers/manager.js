const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

router.get('/projects', (req, res) => {
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
});

router.get('/projects/:id', (req, res) => {
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
});

router.post('/projects', (req, res) => {
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
});

router.put('/projects/:id', (req, res) => {
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
});

router.delete('/projects/:id', (req, res) => {
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
});

module.exports = router;
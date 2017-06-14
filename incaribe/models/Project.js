const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    'name': {
        'type': String,
        'required': true
    },
    'director': {
        'type': Schema.Types.ObjectId
    },
    'startDate': {
        'type': Date,
        'required': true
    },
    'endDate': {
        'type': Date
    },
    'task': {
        'type': []
    },
    'materials': {
        'type': []
    },
    'equipments': {
        'type': []
    },
    'comments': {
        'type': []
    }
});

module.exports = mongoose.model('Project', projectSchema);
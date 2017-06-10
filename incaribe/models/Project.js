const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({
    'des': String,
    'cost': Number
});

const equipmentsSchema = new Schema({
    'des': String,
    'status': Boolean,
    'cost': Number
})

const taskSchema = new Schema({
            'name': String,
            'manger': String,
            'start': Date,
            'end': Date,
            '_before': Schema.Types.ObjectId,
            '_next': Schema.Types.ObjectId,
            'materials': [materialSchema],
            'equipements': [equipmentsSchema], 
            'comments' : [{'des':String, 'status':Boolean}]               
        });

const activitySchema = new Schema({
    'name': String,
    'start': Date,
    'end': Date,
    '_before': Schema.Types.ObjectId,
    'next': Schema.Types.ObjectId,
    'task': [taskSchema]
});

const projectSchema = new Schema({
    'name': {
        'type': String,
    '   required': true
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
    'activity':[activitySchema]
});

module.exports = mongoose.model('Project', projectSchema);
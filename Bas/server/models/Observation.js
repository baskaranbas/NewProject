var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('node-mongoose-validator');

var observationSchema = new Schema({

    resourceType: { type: String, default: 'Observation' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    name: { type: String, default: null},
    status: { type: String, required: true }

},{timestamps: true});

observationSchema.path('name').validate(validator.isAlpha(), 'Please Provide valid alphabets');
observationSchema.path('name').validate(validator.isLength(3,[25]), 'Should be between 3 and 25');

var observationDetails = mongoose.model('observation', observationSchema, 'observation');
module.exports = observationDetails;


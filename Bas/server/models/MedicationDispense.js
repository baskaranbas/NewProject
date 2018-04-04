var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var validator = require('node-mongoose-validator');

var medicationDispenseSchema = new Schema({
    
    resourceType: { type: String, default: 'MedicationDispense' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    image: {
        contentType: { type: String, default: null },
        data: { type: String, default: null }
    },
    strength: { type: String, default: null },
    type: { type: String, default: null },
    status: { type: String, default: null },
    active: { type: Boolean, default: true },
    name: { type: String, required: true},
    supportingInformation: [{
        maxStrength: { type: String, required: true },
        description: { type: String, required: true },
        safety: { type: String, required: true },
        effect: { type: String, required: true }
    }],
    manufacturer: {
        reference: { type: String, required: true }
    }
}, {timestamps: true});


medicationDispenseSchema.path('name').validate(validator.isAlpha(), 'Please Provide valid alphabets');

medicationDispenseSchema.path('name').validate(validator.isLength(3,[25]), 'Should be between 3 and 25');

var medicationDispenseDetails = mongoose.model('medicationDispense', medicationDispenseSchema, 'medicationDispense');
module.exports = medicationDispenseDetails;
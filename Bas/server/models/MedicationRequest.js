var  mongoose = require('mongoose');
var Schema = mongoose.Schema;


var medicationRequestSchema = new Schema({

    resourceType: { type: String, default: 'MedicationRequest' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    medicationReference: {
        id: { type: Schema.Types.ObjectId, ref: 'MedicationDispense' }
    },
    strength : { type: String, default: null },
    performer: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' }
    },
    practitioner: {
        id: { type: Schema.Types.ObjectId, ref: 'Practitioner' }
    },
    category: { type: String, default: null },
    device: [{
        id: { type: Schema.Types.ObjectId, ref: 'Device' }
    }],
    identifier: {
        use: { type: String, default: null },
        system: { type: String, default: null },
        value: { type: String, default: null }
    },
    status: { type: String, default: null },
    dosageInstruction: [{
        timing: { type: String, default: null }
    }]
},{timestamps: true});

var medicationRequestDetail = mongoose.model('medciationRequest', medicationRequestSchema, 'medicationRequest');
module.exports = medicationRequestDetail;
var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var appointmentSchema = new Schema({

    resourceType: { type: String, default: 'Appointment' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    identifier: [{
        system: { type: String, default: null },
        value: { type: String, default: null }
    }],
    active: { type: Boolean, default: true },
    status: { type: String, default: null },
    performer: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' }
    },
    practitioner: {
        id: { type: Schema.Types.ObjectId, ref: 'Practitioner' }
    },
    timing: { type: Date, default: null }
}, { timestamps: true });

appointmentSchema.plugin(uniqueValidator);

var appointmentDetails = mongoose.model('appointment', appointmentSchema, 'appointment');
module.exports = appointmentDetails;
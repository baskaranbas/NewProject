var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');
var validator = require('node-mongoose-validator');

var deviceSchema = new Schema({

    resourceType: { type: String, default: 'Device' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    udi: {
        firmwareId: { type: String, required: true },
        firmwareDate: { type: Date, required: true },
        firmwareUpdateDate: { type: Date, required: true },
        entryType: { type: String, required: true },
        name: { type: String, required: true },
        macAddress: { type: String, required: true, unique: true }

    },
    active: { type: Boolean, default: true },
    type: { type: String, enum:['SMARTHALER','TURBOHALER','ELIPTA','DISKUS','SEEBRINEOHALER','SPIRIVACOMBO','RESPIMAT'], required: true },
    color: { type: String, default: null },
    manufactureDate: { type: Date, default: null },
    status: { type: String, default: null },
    manufacturer: { type: String, default: null },

    owner: {
        id: { type: Schema.Types.ObjectId, ref: 'Organization' }
    }


}, { timestamps: true });

//deviceSchema.plugin(uniqueValidator);

//deviceSchema.path('udi.firmwareId').validate(validator.isAlpha(), 'Please Provide valid alphabets');

deviceSchema.path('udi.firmwareId').validate(validator.isLength(3, [25]), 'Should be between 3 and 25');

var deviceDetails = mongoose.model('device', deviceSchema, 'device');
module.exports = deviceDetails;

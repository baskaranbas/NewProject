var  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var doseRegisterMasterSchema = new Schema({
    resourceType: { type: String, default: 'DoseRegisterMaster' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    period: { type: String, default: null },
    nextRun: { type: Date, default: null },
    medicationRequestId: {
        id: { type: Schema.Types.ObjectId, ref: 'MedicationRequest' }
    }

},{timestamps: true});

var doseRegisterMasterDetails = mongoose.model('doseRegisterMaster', doseRegisterMasterSchema, 'doseRegisterMaster');
module.exports = doseRegisterMasterDetails;
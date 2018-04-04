var  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var medicationStatementSchema = new Schema({

    resourceType: { type: String, default: 'MedicationStatement' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active : { type: Boolean, default: true },
    status : { type: String, default: null },
    type : { type: String, default: 'SCHEDULED' },
    performer : {
        id : { type: Schema.Types.ObjectId, ref: 'Person' }
    },
    doseId : {
        id : { type: Schema.Types.ObjectId, ref: 'MedicationRequest' }
    },
    medicationRequest : {
        id : { type: Schema.Types.ObjectId, ref: 'MedicationRequest' }
    },
    effectiveDateTime : { type: Date, default: null},
    onTimeConformance : {
        shake : { type: Boolean, default: null },
        exhale1 : { type: Boolean, default: null },
        inhale : { type: Boolean, default: null },
        press : { type: Boolean, default: null },
        holdBreath : { type: Boolean, default: null },
        exhale2 : { type: Boolean, default: null }
    },
    derivedFrom : {
        inhalerTechniqueConformance : { type: Boolean, default: null },
        puffQuantity : { type: String, default: null },
        doseQuantityConformance : { type: Boolean, default: null },
        scheduledDoseTime : { type: Date, default: null },
        calculatedScores : { type: Number, default: null }
    }
},{timestamps: true});

var medicationStatementDetails = mongoose.model('medicationStatement',medicationStatementSchema,'medicationStatement');
module.exports = medicationStatementDetails;

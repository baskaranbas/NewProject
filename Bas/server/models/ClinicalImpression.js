var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var clinicalImpressionSchema = new Schema({
    resourceType: { type: String, default: 'ClinicalImpression' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    status: { type: String, default: 'DRAFT' },
    problem: [{
        trigger: { type: Schema.Types.ObjectId, ref: 'AllergyIntolerance' }
    }],
    finding: [{
        itemReference: { type: Schema.Types.ObjectId, ref: 'Condition' }
    }],
    performer: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' }
    }

}, { timestamps: true });


var clinicalImpressionDetails = mongoose.model('clinicalImpression', clinicalImpressionSchema, 'clinicalImpression');
module.exports = clinicalImpressionDetails;
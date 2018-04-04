var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var conditionSchema = new Schema({
    resourceType: { type: String, default: 'Condition' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    clinicalStatus: { type: String, default: 'ACTIVE'  },
    verificationStatus: { type: String, default: 'CONFIRMED'},
    type: {
        symptom: {
            name: { type: String, required: true ,unique : true }
        }
    }

}, {timestamps: true});

conditionSchema.plugin(uniqueValidator);
var conditionDetails = mongoose.model('condition', conditionSchema, 'condition');
module.exports = conditionDetails;
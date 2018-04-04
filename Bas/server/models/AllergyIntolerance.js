var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('node-mongoose-validator');

var allergyIntoleranceSchema = new Schema({

    resourceType: { type: String, default: 'AllergyIntolerance' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    clinicalStatus: { type: String, default: 'ACTIVE'  },
    verificationStatus: { type: String, default: 'CONFIRMED'},
    type: {
        trigger: {
            name: { type: String, required:true,unique : true}
        }
    },
    category: { type: String, default: 'Environment' }
},{ timestamps: true });

allergyIntoleranceSchema.path('type.trigger.name').validate(validator.isAlpha(), 'Please Provide valid alphabets');

allergyIntoleranceSchema.plugin(uniqueValidator);
var allergyIntoleranceDetails = mongoose.model('allergyIntolerance', allergyIntoleranceSchema, 'allergyIntolerance');
module.exports = allergyIntoleranceDetails;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('node-mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');


var organizationSchema = new Schema({

    resourceType: { type: String, default: 'Organization' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    telecom: [
        {
            system: { type: String, default: null },
            value: { type: String, required: true, unique:true, maxLength: 40, minLength: 8 },
            use: { type: String, default: null }
        },
        {
            system: { type: String, default: null },
            value: { type: String, required: true, unique:true, maxLength: 40, minLength: 8 },
            use: { type: String, default: null }
        }
    ],
    address: [{
        country: { type: String, required: true },
        use: { type: String, required: true },
        line: [{ type: String, required: true }],
        state: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true }
    }],
    endpoint: [{
        reference: { type: String, default: null }
    }],
    identifier: [{
        system: { type: String, default: null },
        value: { type: String, default: null }
    }],
    type: { type: String, required: true }
}, { timestamps: true });

organizationSchema.plugin(uniqueValidator);


var organizationDetail = mongoose.model('organization', organizationSchema, 'organization');
module.exports = organizationDetail;
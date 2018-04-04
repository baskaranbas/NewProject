var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var practitionerSchema = new Schema({

    resourceType: { type: String, default: 'Practitioner' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    name: {
        use: { type: String, required: true },
        family: { type: String, required: true },
        given: [
            { type: String, default: null },
            { type: String, default: null }
        ]
    },
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
    gender: { type: String, required: true },
    photo: {
        contentType: { type: String, default: null },
        data: { type: String, default: null }
    },
    birthDate: { type: Date, required: true },
    address: {
        use: { type: String, required: true },
        line: [{ type: String, required: true }],
        state: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    type: { type: String, default: 'PRACTITIONER' },
    identifier: [{
        system: { type: String, default: null },
        value: { type: String, default: null }
    }],
    qualification: [{
        identifier: [{
            system: { type: String, default: null },
            value: { type: String, default: null }
        }],
        code: {
            coding: [{
                system: { type: String, default: null },
                code: { type: String, default: null },
                display: { type: String, default: null }
            }],
            text: { type: String, default: null }
        },
        period: {
            start: { type: String, default: null }
        }
    }],
    issuer: {
        display: { type: String, default: null }
    },
    managingOrganization: {
        id: { type: Schema.Types.ObjectId, ref: 'Organization' }
    }
},{timestamps: true});

practitionerSchema.plugin(uniqueValidator);

var practitionerDetails = mongoose.model('practitioner', practitionerSchema, 'practitioner');
module.exports = practitionerDetails;
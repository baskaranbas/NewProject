var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var personSchema = new Schema({

    resourceType: { type: String, default: 'Person' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    identifier: [{
        use: { type: String, default: null },
        coding: [{
            system: { type: String, default: null },
            code: { type: String, default: null }
        }]
    }],
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
            value: { type: String,   maxLength: 40, minLength: 8 },
            use: { type: String, default: null }
        }
    ],
    gender: { type: String, required: true },
    birthDate: { type: String, required: true },
    address: [
        {
            use: { type: String, default: null },
            line: [{ type: String, default: null }],
            city: { type: String},
            state: { type: String, default: null },
            country: { type: String},
            postalCode: { type: String, default: null }
        }
    ],
    active: { type: Boolean, default: true },
    link: [
        {
            target: { type: Schema.Types.ObjectId, ref: 'Person' }
        }
    ],
    photo: {
        contentType: { type: String, default: null },
        data: { type: String, default: null }
    },
    type: { type: String, required: true },
    status: { type: String, default: null },
    contact: [
        {
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
                    value: { type: String,   maxLength: 40, minLength: 8 }
                }
            ],
            address: {
                use: { type: String, default: null },
                line: [{ type: String, default: null }],
                state: { type: String, default: null },
                city: { type: String, default: null },
                country: { type: String, default: null },
                postalCode: { type: String, default: null }
            },
            gender: { type: String, required: true }
        }
    ],
    generalPractitioner: [{
        id: { type: Schema.Types.ObjectId, ref: 'Practitioner' }
    }],
    preference: { type: Schema.Types.ObjectId, ref: 'Preference' }
    
}, { timestamps: true });

personSchema.plugin(uniqueValidator);

var personDetails = mongoose.model('person', personSchema, 'person');
module.exports = personDetails;

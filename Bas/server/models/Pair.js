var  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pairSchema = Schema({
    resourceType: { type: String, default: 'Pair' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    performer: {
        id: { type: String, default: null }
    },
    practitioner: {
        id: { type: String, default: null },
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String },
        code:{ type: String },
        photo: {
            contentType: { type: String, default: null },
            data: { type: String, default: null }
        },
        share: { type: Boolean, default: true }
    },
    status: { type: String, default: null }
},{timestamps: true});

var pairDetails = mongoose.model('pair', pairSchema, 'pair');
module.exports = pairDetails;
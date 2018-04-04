var  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contactRelationshipSchema = new Schema({
    resourceType: { type: String, default: 'ContactRelationship' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    performer: { type: Schema.Types.ObjectId, ref: 'Person' },
    friend: { type: Schema.Types.ObjectId, ref: 'Person' },
    status: { type: String, default: 'CONNECTED'}
}, {timestamps: true});


var contactRelationshipDetails = mongoose.model('contactRelationship', contactRelationshipSchema, 'contactRelationship');
module.exports = contactRelationshipDetails;
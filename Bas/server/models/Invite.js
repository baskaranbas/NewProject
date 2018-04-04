var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var inviteSchema = new Schema({
    resourceType: { type: String, default: 'Invite' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    performer: { type: Schema.Types.ObjectId, ref: 'Person' },
    friend: {
        email: { type: String, default: null },
        firstName: { type: String, default: null },
        lastName: { type: String, default: null },
        phone: { type: String, default: null }
    },
    shareDetail :  { type: Boolean, default: false },
     
    code: { type: Number, unique: true } 
},{ timestamps: true });

inviteSchema.plugin(uniqueValidator);
var inviteDetails = mongoose.model('invite', inviteSchema, 'invite');
module.exports = inviteDetails;
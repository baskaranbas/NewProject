var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var groupSchema = new Schema({

    resourceType: { type: String, default: 'Group' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    performer: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' }
    },
    device:{
        id:{ type: Schema.Types.ObjectId, ref: 'Device' }
    }
}, { timestamps: true });


var groupDetails = mongoose.model('group', groupSchema, 'group');
module.exports = groupDetails;


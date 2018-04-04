var  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var careTeamSchema = new Schema({

    resourceType: { type: String, default: 'CareTeam' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    active: { type: Boolean, default: true },
    status: { type: String, default: null },
    performer: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' }
    },
    practitioner: {
        id: { type: Schema.Types.ObjectId, ref: 'Practitioner' }
    }
}, { timestamps: true });

var careTeamDetails = mongoose.model('careTeam', careTeamSchema, 'careTeam');
module.exports = careTeamDetails;
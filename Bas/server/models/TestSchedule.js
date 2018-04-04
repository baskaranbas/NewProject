var  mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testScheduleSchema = new Schema({

    resourceType: { type: String, default: 'TestSchedule' },
    text: {
        status: { type: String, default: null },
        div: { type: String, default: null }
    },
    performer : {
        id : { type: Schema.Types.ObjectId, ref: 'Person' }
    },
    name : {
        id : { type: Schema.Types.ObjectId, ref: 'Observation' }
    },
    interval : { type: String, default: null },
    active : { type: Boolean, default: true }
},{timestamps: true});

var testScheduleDetails = mongoose.model('testSchedule',testScheduleSchema,'testSchedule');
module.exports = testScheduleDetails;
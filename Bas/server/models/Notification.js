var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var notificationSchema = new Schema({

    performer: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' },
        deviceId: { type: String, default: null }
    },

    friend: {
        id: { type: Schema.Types.ObjectId, ref: 'Person' },
        deviceId: { type: String, default: null },
        title: { type: String, default: null },
        text: { type: String, default: null },
        shareDetail: { type: Boolean, default: false }
    },
    active: { type: Boolean, default: true }
}, { timestamps: true });
var notificationDetails = mongoose.model('notification', notificationSchema, 'notification');
module.exports = notificationDetails;
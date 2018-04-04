var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var preferenceSchema = Schema({
    resourceType: { type: String, default: 'Preference' },
    active: { type: Boolean, default: true },
    performer: { type: Schema.Types.ObjectId, ref: 'Person' },

    medicationRemainder: {
        maxPerMed: { type: String, default: null },
        snooze: { type: String, default: null },
        popupNotification: { type: String, default: null },
        popupOnLastRemainder: { type: String, default: null },
        showMedName: { type: String, default: null },
        shakeToTake: { type: String, default: null },
        morning: {
            enable: { type: Boolean, default: null },
            time: { type: String, default: null }
        },
        evening: {
            enable : { type: String, default: null },
            time : { type: String, default: null}
        }
    },
    notification : {
        sound : { type: Boolean, default: null },
        vibrate : { type: Boolean, default: null },
        led : { type: Boolean, default: null },
        needEmail : { type: Boolean, default: null }
    },
    avatar: {
        image: { type: String, default: null },
        color: { type: String, default: null }
    },
    theme: { type: String, default: null }

}, { timestamps: true });

var preferenceDetails = mongoose.model('preference', preferenceSchema, 'preference');
module.exports = preferenceDetails;

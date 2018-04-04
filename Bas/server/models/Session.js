var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

var sessionSchema = new Schema({

    resourceType: { type: String, default: 'Session' },
    email: { type: String, unique: true , required: true },
    password: { type: String },
    userId: { type: String },
    userType: { type: String, required: true },
    active: { type: Boolean, default: true },
    lastLoggedIn: { type: String, default: null },
    xid: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date }
});

/**
 * Password hash middleware.
 */
sessionSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
sessionSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
sessionSchema.plugin(uniqueValidator);
var sessionDetails = mongoose.model('session', sessionSchema, 'session');
module.exports = sessionDetails;
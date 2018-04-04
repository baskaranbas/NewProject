var Session = require('../models/Session');
const bcrypt = require('bcrypt-nodejs');

/**
 * change password of person
 * @param active
 * @param callback
 * @returns callback to sessionController
 */
module.exports.changePassword = (sessionData, callback) => {
    var resolvedPassword = {
        password: bcrypt.hashSync(sessionData.newPassword)
    };
    Session.findOne({ email: sessionData.email.toLowerCase() }, (err, user) => {
        if (err) { callback({ message: 'Error, no user found' }); }
        
        if (user == null) {
            callback({ message: 'Email not found.' });
        } else {
            user.comparePassword(sessionData.oldPassword, (err, isMatch) => {
                if (err) { callback({ message: 'Error, Invalid password' }); }
                if (isMatch) {
                    Session.findByIdAndUpdate({ _id: user._id }, {
                        $set: resolvedPassword
                    }, { upsert: true, new: true }, function (err, data) {
                        if (err) {
                            callback({ message: 'Error, while changing password' });
                        } else {
                            callback({ message: 'Password changed successfully', data });
                        }
                    });
                } else {
                    callback({ message: 'Invalid Password ' });
                }
            });
        }
    });

};




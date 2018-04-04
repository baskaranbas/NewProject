var sessionDao = require('../dao/sessionDao');

/**
 * change password of person
 * @param active
 * @param callback
 * @returns callback to sessionController
 */
module.exports.changePassword = (sessionData, callback) => {
    sessionDao.changePassword(sessionData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};




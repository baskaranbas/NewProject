var Preference = require('../models/Preference');
var Session = require('../models/Session');

/**
 * update a preference
 * @param preferenceData
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.postPreference = (preferenceData, incomingXid, callback) => {
    var preference = new Preference(preferenceData);
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            if (result.xid === incomingXid) {
                preference.save(function (err, data) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(data);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * update a preference
 * @param preferenceData
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.updatePreference = (id, preferenceData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Preference.findByIdAndUpdate({ _id: id }, { $set: preferenceData }
                    , { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(result);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};



/**
 * update a preference
 * @param preferenceData
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.updatePreferenceByPersonId = (id, preferenceData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Preference.findOneAndUpdate({ 'performer': id }, { $set: preferenceData }
                    , { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(result);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get preference by Id
 * @param preferenceId
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.getpreferenceById = (preferenceId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Preference.findById(preferenceId, function (err, output) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(output);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get preference by person Id
 * @param preferenceId
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.getpreferenceByPersonId = (personId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Preference.findOne({ 'performer': personId }, function (err, output) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(output);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

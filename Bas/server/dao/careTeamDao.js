var CareTeam = require('../models/CareTeam');
var Person = require('../models/Person');
var Practitioner = require('../models/Practitioner');
var Session = require('../models/Session');


/**
 * Create a careTeam
 * @param careTeamData
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.postCareTeam = (careTeamData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON' || result.userType === 'ADMIN') {
                var careTeam = new CareTeam(careTeamData);
                careTeam.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(careTeam);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};


/**
 * Get careTeam by Id
 * @param careTeamId
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamById = (careTeamId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON' || result.userType === 'ADMIN') {
                CareTeam.findById(careTeamId)
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
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
 * Get careTeam by Id
 * @param careTeamId
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamByPatientId = (careTeamId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON' || result.userType === 'ADMIN') {
                CareTeam.find({ 'performer.id': careTeamId })
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
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
 * Update careTeam by Id
 * @param id
 * @param careTeamData
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.updateCareTeamById = (id, careTeamData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON' || result.userType === 'ADMIN') {
                CareTeam.findOneAndUpdate({ _id: id },
                    {
                        $set: careTeamData
                    }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
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
 * Get all careTeam
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getAllCareTeam = (incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON' || result.userType === 'ADMIN') {
                CareTeam.find()
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
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
 * Get all careTeam by Active
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamByActive = (active, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'ADMIN') {
                CareTeam.find({ active: active })
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
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
 * Get all careTeam by practitioner id
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamByPractitionerId = (practitionerId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'ADMIN'||result.userType === 'PRACTITIONER') {
                CareTeam.find({ 'practitioner.id' : practitionerId })
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
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




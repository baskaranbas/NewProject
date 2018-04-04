var Patient = require('../models/Person');
var Session = require('../models/Session');

/**
 * Create a Patient
 * @param PatientData
 * @param callback
 * @returns callback to PatientController
 */
module.exports.postPatient = (patientData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'ADMIN' || result.userType === 'PRACTITIONER') {
                var patient = new Patient(patientData);
                var dataForSession = {
                    email: patientData.telecom[0].value,
                    userType: patientData.type,
                    password: patientData.password,
                    lastLoggedIn: new Date()
                };
                patient.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        var session = new Session(dataForSession);
                        session.save(function () { });
                        callback(patient);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};


/**
 * Get Patient by Id
 * @param PatientId
 * @param callback
 * @returns callback to PatientController
 */
module.exports.getPatientById = (patientId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'ADMIN' || result.userType === 'PRACTITIONER' || result.userType === 'PERSON') {
                Patient.findOne({ _id: patientId, type: 'PATIENT' }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        if (result == null) {
                            result = { message: 'id doesn\'t exist' };
                        }
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
 * Update Patient by Id
 * @param id
 * @param PatientData
 * @param callback
 * @returns callback to PatientController
 */
module.exports.updatePatientById = (id, patientData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'ADMIN' || result.userType === 'PRACTITIONER' || result.userType === 'PERSON') {
                Patient.findOneAndUpdate({ _id: id  },
                    {
                        $set: patientData
                    }, { upsert: true, new: true, runValidators: true,context: 'query' }, function (err, result) {
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
 * Get all Patient
 * @param callback
 * @returns callback to PatientController
 */
module.exports.getAllPatient = (incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'ADMIN' || result.userType === 'PERSON') {
                Patient.find({ type: 'PATIENT' }, function (err, result) {
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
 * Get Patient by Name
 * @param patientName
 * @param callback
 * @returns callback to PatientController
 */
module.exports.getPatientByName = (patientName, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'ADMIN' || result.userType === 'PERSON') {
                Patient.findOne({ 'name.given': patientName, type: 'PATIENT' }, function (err, result) {
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
 * Get Patient by Active
 * @param active
 * @param callback
 * @returns callback to PatientController
 */
module.exports.getPatientByActive = (active, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'ADMIN' || result.userType === 'PERSON') {
                Patient.findOne({ active: active, type: 'PATIENT' }, function (err, result) {
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
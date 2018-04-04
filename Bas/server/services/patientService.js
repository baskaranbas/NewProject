var patientDao = require('../dao/patientDao');

/**
 * Create a Patient
 * @param PatientData
 * @param callback
 * @returns callback to PatientController
 */
module.exports.postPatient = (patientData, incomingToken, callback) => {
    patientDao.postPatient(patientData, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    patientDao.getPatientById(patientId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    patientDao.updatePatientById(id, patientData, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all Patient
 * @param callback
 * @returns callback to PatientController
 */
module.exports.getAllPatient = (incomingToken, callback) => {
    patientDao.getAllPatient(incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    patientDao.getPatientByName(patientName, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    patientDao.getPatientByActive(active, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
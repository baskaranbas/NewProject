var medicationRequestDao = require('../dao/medciationRequestDao');


/**
 * Create a medicationRequest
 * @param medicationRequestData
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.postMedicationRequest = (medicationRequestData, incomingXid, callback) => {
    medicationRequestDao.postMedicationRequest(medicationRequestData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};



/**
 * Get medicationRequest by Id
 * @param medicationRequestId
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestById = (medicationRequestId, incomingXid, callback) => {
    medicationRequestDao.getMedicationRequestById(medicationRequestId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update medicationRequest by Id
 * @param id
 * @param medicationRequestData
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.updateMedicationRequestById = (id, medicationRequestData, incomingXid, callback) => {
    medicationRequestDao.updateMedicationRequestById(id, medicationRequestData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Get medicationRequest by patientId
 * @param patientId
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestsByPatientID = (patientId, incomingXid, callback) => {
    medicationRequestDao.getMedicationRequestsByPatientID(patientId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all medicationRequest
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getAllMedicationRequest = (callback) => {
    medicationRequestDao.getAllMedicationRequest(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Get all medicationRequest
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestByActive = (active, callback) => {

    medicationRequestDao.getMedicationRequestByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get medicationRequest by medicationDispenseId and performerId
 * @param medicationDispenseId
 * @param patientId
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestByMedicationDispenseIdAndPatientId = (medicationDispenseId, patientId, incomingXid, callback) => {
    medicationRequestDao.getMedicationRequestByMedicationDispenseIdAndPatientId(medicationDispenseId, patientId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


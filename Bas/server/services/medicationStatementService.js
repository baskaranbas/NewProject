var medicationStatementDao = require('../dao/medicationStatementDao');

/**
 * Create a medicationStatement
 * @param medicationStatementData
 * @param callback
 * @returns callback to medicationStatementController
 */
module.exports.postMedicationStatement = (medicationStatementData, incomingXid, callback) => {
    medicationStatementDao.postMedicationStatement(medicationStatementData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get MedicationStatement by Id
 * @param medicationStatementId
 * @param callback
 * @returns callback to MedicationStatementController
 */
module.exports.getMedicationStatementById = (medicationStatementId, incomingXid, callback) => {
    medicationStatementDao.getMedicationStatementById(medicationStatementId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get MedicationStatement by Id
 * @param medicationStatementId
 * @param callback
 * @returns callback to MedicationStatementController
 */
module.exports.getAllMedicationStatement = (callback) => {

    medicationStatementDao.getAllMedicationStatement(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update MedicationStatement by Id
 * @param id
 * @param medicationStatementData
 * @param callback
 * @returns callback to medicationStatementController
 */
module.exports.updateMedicationStatementById = (id, medicationStatementData, incomingXid, callback) => {
    medicationStatementDao.updateMedicationStatementById(id, medicationStatementData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Get MedicationStatement by patient Id
 * @param medicationStatementId
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementOfPatient = (id, incomingXid, callback) => {
    medicationStatementDao.getMedicationStatementOfPatient(id, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get MedicationStatement by Active
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementByActive = (active, callback) => {

    medicationStatementDao.getMedicationStatementByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get MedicationStatement by Patient Id and on Date
 * @param medicationStatementId 
 * @param patientId 
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementOfPatientOnDate = (id, date, incomingXid, callback) => {
    medicationStatementDao.getMedicationStatementOfPatientOnDate(id, date, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get MedicationStatement by Patient Id and between Dates
 * @param medicationStatementId 
 * @param patientId 
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementOfPatientBetweenDates = (id, startDate, endDate, incomingXid, callback) => {
    medicationStatementDao.getMedicationStatementOfPatientBetweenDates(id, startDate, endDate, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get MedicationStatement by medicationRequestId and performerId
 * @param medicationRequestId
 * @param patientId
 * @param callback
 * @returns callback to MedicationStatementController
 */
module.exports.getMedicationStatementByPatientIdAndMedicationRequestId = (medicationRequestId, patientId, incomingXid, callback) => {
    medicationStatementDao.getMedicationStatementByPatientIdAndMedicationRequestId(medicationRequestId, patientId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
var clinicalImpressionDao = require('../dao/clinicalImpressionDao');


/**
 * Create a ClinicalImpression
 * @param ClinicalImpressionData
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.postClinicalImpression = (clinicalImpressionData, incomingXid, callback) => {
    clinicalImpressionDao.postClinicalImpression(clinicalImpressionData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get ClinicalImpression by Id
 * @param ClinicalImpressionId
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getClinicalImpressionById = (clinicalImpressionId, incomingXid, callback) => {
    clinicalImpressionDao.getClinicalImpressionById(clinicalImpressionId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Update ClinicalImpression by Id
 * @param id
 * @param ClinicalImpressionData
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.updateClinicalImpressionById = (id, clinicalImpressionData, incomingXid, callback) => {
    clinicalImpressionDao.updateClinicalImpressionById(id, clinicalImpressionData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get ClinicalImpression by patient Id
 * @param id
 * @param ClinicalImpressionData
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getClinicalImpressionByPatientId = (patientId, incomingXid, callback) => {
    clinicalImpressionDao.getClinicalImpressionByPatientId(patientId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all ClinicalImpression
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getAllClinicalImpression = (callback) => {
    clinicalImpressionDao.getAllClinicalImpression(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all ClinicalImpression By Active
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getClinicalImpressionByActive = (active, callback) => {
    clinicalImpressionDao.getClinicalImpressionByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


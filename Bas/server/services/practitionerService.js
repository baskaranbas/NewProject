var practitionerDao = require('../dao/practitionerDao');


/**
 * Create a practitioner
 * @param practitionerData
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.postPractitioner = (practitionerData, callback) => {
    practitionerDao.postPractitioner(practitionerData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get practitioner by Id
 * @param practitionerId
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getPractitionerById = (practitionerId, incomingXid, callback) => {
    practitionerDao.getPractitionerById(practitionerId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update practitioner by Id
 * @param id
 * @param practitionerData
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.updatePractitionerById = (id, practitionerData, incomingXid, callback) => {
    practitionerDao.updatePractitionerById(id,practitionerData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all practitioner
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getAllPractitioner = (incomingXid, callback) => {
    practitionerDao.getAllPractitioner( incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get practitioner by name
 * @param practitionerName
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getPractitionerByName = (practitionerName, incomingXid, callback) => {
    practitionerDao.getPractitionerByName(practitionerName, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};



/**
 * Get practitioner by Active
 * @param active
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getPractitionerByActive = (active, incomingXid, callback) => {
    practitionerDao.getPractitionerByActive(active, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * send request to Practitioner
 * @param patient phone number
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.sendPairRequestToPractitioner = (senderId, pairRequest, incomingXid, callback) => {
    practitionerDao.sendPairRequestToPractitioner(senderId, pairRequest, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * view request sent to patient
 * @param practitioner id
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.viewSentPairRequests = (practitionerId, incomingXid, callback) => {
    practitionerDao.viewSentPairRequests(practitionerId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


var observationDao = require('../dao/observationDao');


/**
 * Create a observation
 * @param observationData
 * @param callback
 * @returns callback to observationController
 */
module.exports.postObservation = (observationData, callback) => {

    observationDao.postObservation(observationData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get observation by Id
 * @param observationId
 * @param callback
 * @returns callback to observationController
 */
module.exports.getObservationById = (observationId, callback) => {
    observationDao.getObservationById(observationId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update observation by Id
 * @param id
 * @param observationData
 * @param callback
 * @returns callback to observationController
 */
module.exports.updateObservationById = (id, observationData, callback) => {

    observationDao.updateObservationById(id, observationData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all observation
 * @param callback
 * @returns callback to observationController
 */
module.exports.getAllObservation = (callback) => {
    observationDao.getAllObservation(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get observation by Name
 * @param observationName
 * @param callback
 * @returns callback to observationController
 */
module.exports.getObservationByName = (observationName, callback) => {

    observationDao.getObservationByName(observationName, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get observation by Active
 * @param callback
 * @returns callback to observationController
 */
module.exports.getObservationByActive = (active, callback) => {

    observationDao.getObservationByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


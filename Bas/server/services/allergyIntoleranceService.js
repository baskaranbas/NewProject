var allergyIntoleranceDao = require('../dao/allergyIntoleranceDao');

/**
 * Create a allergyIntolerance
 * @param allergyIntoleranceData
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.postAllergyIntolerance = (allergyIntoleranceData, callback) => {
    allergyIntoleranceDao.postAllergyIntolerance(allergyIntoleranceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get allergyIntolerance by Id
 * @param allergyIntoleranceId
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.getAllergyIntoleranceById = (allergyIntoleranceId, callback) => {
    allergyIntoleranceDao.getAllergyIntoleranceById(allergyIntoleranceId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update allergyIntolerance by Id
 * @param id
 * @param allergyIntoleranceData
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.updateAllergyIntoleranceById = (id, allergyIntoleranceData, callback) => {
    allergyIntoleranceDao.updateAllergyIntoleranceById(id, allergyIntoleranceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all allergyIntolerance
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.getAllAllergyIntolerance = (callback) => {
    allergyIntoleranceDao.getAllAllergyIntolerance(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get allergyIntolerance by name
 * @param allergyIntoleranceName
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.getAllergyIntoleranceByName = (allergyIntoleranceName, callback) => {
    allergyIntoleranceDao.getAllergyIntoleranceByName(allergyIntoleranceName, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get allergyIntolerance by Active
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.getAllergyIntoleranceByActive = (active, callback) => {
    allergyIntoleranceDao.getAllergyIntoleranceByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


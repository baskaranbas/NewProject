var medicationDispenseDao = require('../dao/medicationDispenseDao');


/**
 * Create a medicationdispense
 * @param medicationDispenseData
 * @param callback
 * @returns callback to medicationDispenseController
 */

module.exports.postMedicationDispense = (medicationDispenseData, callback) => {
    medicationDispenseDao.postMedicationDispense(medicationDispenseData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
* Get medciationDispense by Id
* @param medicationDispenseId
* @param callback
* @returns callback to medciationDispenseController
*/
module.exports.getMedicationDispenseById = (medicationDispenseId, callback) => {
    medicationDispenseDao.getMedicationDispenseById(medicationDispenseId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update medciationDispense by Id
 * @param id
 * @param medicationDispenseData
 * @param callback
 * @returns callback to medciationDispenseController
 */
module.exports.updateMedicationDispenseById = (id, medicationDispenseData, callback) => {
    medicationDispenseDao.updateMedicationDispenseById(id, medicationDispenseData,  function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all medicationDispense
 * @param callback
 * @returns callback to medicationDispenseController
 */
module.exports.getAllMedicationDispense = (callback) => {
    medicationDispenseDao.getAllMedicationDispense(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all medicationDispense By Name
 * @param callback
 * @returns callback to medicationDispenseController
 */
module.exports.getMedicationDispenseByName = (medicationDispenseName, callback) => {
    medicationDispenseDao.getMedicationDispenseByName(medicationDispenseName, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all medicationDispense By Active
 * @param callback
 * @returns callback to medicationDispenseController
 */
module.exports.getMedicationDispenseByActive = (active, callback) => {
    medicationDispenseDao.getMedicationDispenseByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

module.exports.updateDispenceImage = (dispenceId, file, callback) => {
    medicationDispenseDao.updateDispenceImage(dispenceId, file,  function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


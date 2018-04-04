var testScheduleDao = require('../dao/testScheduleDao');

/**
 * Create a testSchedule
 * @param testScheduleData
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.postTestSchedule = (testScheduleData, incomingXid, callback) => {
    testScheduleDao.postTestSchedule(testScheduleData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Get testSchedule by Id
 * @param testScheduleId
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.getTestScheduleById = (testScheduleId, incomingXid, callback) => {
    testScheduleDao.getTestScheduleById(testScheduleId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get testSchedule by active
 * @param active
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.getTestScheduleByActive = (active, incomingXid, callback) => {
    testScheduleDao.getTestScheduleByActive(active, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update testSchedule by Id
 * @param id
 * @param testScheduleData
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.updateTestScheduleById = (id, testScheduleData, incomingXid, callback) => {
    testScheduleDao.updateTestScheduleById(id, testScheduleData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Get all testSchedule
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.getAllTestSchedule = (incomingXid, callback) => {
    testScheduleDao.getAllTestSchedule(incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

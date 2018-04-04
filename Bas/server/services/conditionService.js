var conditionDao = require('../dao/conditionDao');


/**
 * Create a condition
 * @param conditionData
 * @param callback
 * @returns callback to conditionController
 */
module.exports.postCondition = (conditionData, callback) => {
    conditionDao.postCondition(conditionData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get condition by Id
 * @param conditionId
 * @param callback
 * @returns callback to conditionController
 */
module.exports.getConditionById = (conditionId, callback) => {

    conditionDao.getConditionById(conditionId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update condition by Id
 * @param id
 * @param conditionData
 * @param callback
 * @returns callback to conditionController
 */
module.exports.updateConditionById = (id, conditionData, callback) => {

    conditionDao.updateConditionById(id, conditionData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all condition
 * @param callback
 * @returns callback to conditionController
 */
module.exports.getAllCondition = (callback) => {
    conditionDao.getAllCondition(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get condition by Name
 * @param conditionName
 * @param callback
 * @returns callback to conditionController
 */
module.exports.getConditionByName = (conditionName, callback) => {

    conditionDao.getConditionByName(conditionName, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Get condition by Active
 * @param callback
 * @returns callback to conditionController
 */
module.exports.getConditionByActive = (active, callback) => {

    conditionDao.getConditionByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

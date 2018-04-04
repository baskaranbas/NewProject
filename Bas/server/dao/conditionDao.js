var Condition = require('../models/Condition');


/**
 * Create a condition
 * @param conditionData
 * @param callback
 * @returns callback to conditionController
 */
module.exports.postCondition = (conditionData, callback) => {

    var condition = new Condition(conditionData);
    condition.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(condition);
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

    Condition.findById(conditionId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result == null) {
                result = { message: 'id doesn\'t exist' };
            }
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

    Condition.findOneAndUpdate({ _id: id },
        {
            $set: conditionData
        }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
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
    Condition.find(function (err, result) {
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

    Condition.find({ 'type.symptom.name': conditionName }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length == 0) {
                callback({ message: 'No Name ia Found' });
            } else {
                callback(result);
            }
        }
    });

};

/**
 * Get condition by Active
 * @param callback
 * @returns callback to conditionController
 */
module.exports.getConditionByActive = (active, callback) => {

    Condition.find({ active: active }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });

};


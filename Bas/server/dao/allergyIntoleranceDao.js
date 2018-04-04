var AllergyIntolerance = require('../models/AllergyIntolerance');

/**
 * Create a allergyIntolerance
 * @param allergyIntoleranceData
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.postAllergyIntolerance = (allergyIntoleranceData, callback) => {
    var allergyIntolerance = new AllergyIntolerance(allergyIntoleranceData);
    allergyIntolerance.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(allergyIntolerance);
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
    AllergyIntolerance.findById(allergyIntoleranceId, function (err, result) {
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
    AllergyIntolerance.findOneAndUpdate({ _id: id },
        {
            $set: allergyIntoleranceData
        }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
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
    AllergyIntolerance.find(function (err, result) {
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
    AllergyIntolerance.find({ 'type.trigger.name': allergyIntoleranceName }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length == 0) {
                callback({ message: 'No name is matched' });
            } else {
                callback(result);
            }
        }
    });

};

/**
 * Get allergyIntolerance by Active
 * @param callback
 * @returns callback to allergyIntoleranceController
 */
module.exports.getAllergyIntoleranceByActive = (active, callback) => {
    AllergyIntolerance.find({ 'active': active }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });

};




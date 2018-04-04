var Observation = require('../models/Observation');


/**
 * Create a observation
 * @param observationData
 * @param callback
 * @returns callback to observationController
 */
module.exports.postObservation = (observationData, callback) => {

    var observation = new Observation(observationData);
    observation.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(observation);
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

    Observation.findById(observationId, function (err, result) {
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

    Observation.findOneAndUpdate({ _id: id  },
        {
            $set: observationData
        }, { upsert: true, new: true , runValidators: true, context: 'query' }, function (err, result) {
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
    Observation.find(function (err, result) {
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

    Observation.find({ name: observationName }, function (err, result) {
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

    Observation.find({ active: active }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });

};


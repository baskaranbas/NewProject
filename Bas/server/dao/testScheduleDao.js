var TestSchedule = require('../models/TestSchedule');
var Person = require('../models/Person');
var Observation = require('../models/Observation');
var Session = require('../models/Session');

/**
 * Create a testSchedule
 * @param testScheduleData
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.postTestSchedule = (testScheduleData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else  {
            if (result.userType === 'PATIENT'||result.userType === 'PERSON'||result.userType === 'ADMIN') {
                var testSchedule = new TestSchedule(testScheduleData);
                testSchedule.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(testSchedule);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get testSchedule by Id
 * @param testScheduleId
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.getTestScheduleById = (testScheduleId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else  {
            if (result.userType === 'PATIENT'||result.userType === 'PERSON'||result.userType === 'ADMIN') {
                TestSchedule.findById(testScheduleId)
                    .populate([{ path: 'name.id', model: Observation },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get testSchedule by active
 * @param active
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.getTestScheduleByActive = (active, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else  {
            if (result.userType === 'PATIENT'||result.userType === 'PERSON'||result.userType === 'ADMIN') {
                TestSchedule.find({ active: active })
                    .populate([{ path: 'name.id', model: Observation },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
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
module.exports.updateTestScheduleById = (id, testScheduleData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else  {
            if (result.userType === 'PATIENT'||result.userType === 'PERSON'||result.userType === 'ADMIN') {
                TestSchedule.findOneAndUpdate({ _id: id },
                    {
                        $set: testScheduleData
                    }, { upsert: true, new: true,runValidators: true,context: 'query'}, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(result);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};
/**
 * Get all testSchedule
 * @param callback
 * @returns callback to testScheduleController
 */
module.exports.getAllTestSchedule = (incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else  {
            if (result.userType === 'PATIENT'||result.userType === 'PERSON'||result.userType === 'ADMIN') {
                TestSchedule.find()
                    .populate([{ path: 'name.id', model: Observation },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};


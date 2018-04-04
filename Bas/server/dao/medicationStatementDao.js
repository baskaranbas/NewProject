var MedicationStatement = require('../models/MedicationStatement');
var MedicationRequest = require('../models/MedicationRequest');
var Person = require('../models/Person');
var Session = require('../models/Session');
var moment = require('moment');

/**
 * Create a medicationStatement
 * @param medicationStatementData
 * @param callback
 * @returns callback to medicationStatementController
 */
module.exports.postMedicationStatement = (medicationStatementData ,incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        } else {
            if (result.xid === incomingXid) {
                var medicationStatement = new MedicationStatement(medicationStatementData);
                medicationStatement.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(medicationStatement);
                    }
                });

            }
            else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get MedicationStatement by Id
 * @param medicationStatementId
 * @param callback
 * @returns callback to MedicationStatementController
 */
module.exports.getMedicationStatementById = (medicationStatementId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) { callback(err); } if (result === null) { callback({ message: 'Error in authenticating xid' }); } else {
            if (result.xid === incomingXid) {
                MedicationStatement.findById(medicationStatementId)
                    .populate([{ path: 'performer.id', model: Person },
                    { path: 'doseId.id', model: MedicationRequest },
                    { path: 'medicationRequest.id', model: MedicationRequest }
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
 * Get MedicationStatement by Id
 * @param medicationStatementId
 * @param callback
 * @returns callback to MedicationStatementController
 */
module.exports.getAllMedicationStatement = (callback) => {

    MedicationStatement.find()
        .populate([{ path: 'performer.id', model: Person },
        { path: 'doseId.id', model: MedicationRequest },
        { path: 'medicationRequest.id', model: MedicationRequest }
        ])
        .exec(function (err, output) {
            if (err) {
                callback(err);
            } else {
                callback(output);
            }
        });
};

/**
 * Update MedicationStatement by Id
 * @param id
 * @param medicationStatementData
 * @param callback
 * @returns callback to medicationStatementController
 */
module.exports.updateMedicationStatementById = (id, medicationStatementData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) { callback(err); } if (result === null) { callback({ message: 'Error in authenticating xid' }); } else {
            if (result.xid === incomingXid) {
                MedicationStatement.findOneAndUpdate({ _id: id },
                    {
                        $set: medicationStatementData
                    }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
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
 * Get MedicationStatement by patient Id
 * @param medicationStatementId
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementOfPatient = (id, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        } else {
            if (result.xid === incomingXid) {
                MedicationStatement.find({ 'performer.id': id })
                    .populate([{ path: 'performer.id', model: Person },
                    { path: 'doseId.id', model: MedicationRequest },
                    { path: 'medicationRequest.id', model: MedicationRequest }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            }
        }
    });
};
/**
 * Get MedicationStatement by Active
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementByActive = (active, callback) => {

    MedicationStatement.find({ active: active })
        .populate([{ path: 'performer.id', model: Person },
        { path: 'doseId.id', model: MedicationRequest },
        { path: 'medicationRequest.id', model: MedicationRequest }
        ])
        .exec(function (err, output) {
            if (err) {
                callback(err);
            } else {
                callback(output);
            }
        });

};
/**
 * Get MedicationStatement by Patient Id and on Date
 * @param medicationStatementId 
 * @param patientId 
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementOfPatientOnDate = (id, date, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) { callback(err); } if (result === null) { callback({ message: 'Error in authenticating xid' }); } else {
            if (result.xid === incomingXid) {
                var endingDate = moment(date).add(1, 'days');
                MedicationStatement.find({
                    'performer.id': id,
                    'effectiveDateTime': { '$gte': date, '$lte': endingDate }
                })
                    .populate([{ path: 'performer.id', model: Person },
                    { path: 'doseId.id', model: MedicationRequest },
                    { path: 'medicationRequest.id', model: MedicationRequest }
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
 * Get MedicationStatement by Patient Id and between Dates
 * @param medicationStatementId 
 * @param patientId 
 * @param callback
 * @returns callback to medciationStatementController
 */
module.exports.getMedicationStatementOfPatientBetweenDates = (id, startDate, endDate, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) { callback(err); } if (result === null) { callback({ message: 'Error in authenticating xid' }); } else {
            if (result.xid === incomingXid) {
                MedicationStatement.find({
                    'performer.id': id,
                    'effectiveDateTime': { '$gte': startDate, '$lte': endDate }
                })
                    .populate([{ path: 'performer.id', model: Person },
                    { path: 'doseId.id', model: MedicationRequest },
                    { path: 'medicationRequest.id', model: MedicationRequest }
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
 * Get MedicationStatement by medicationRequestId and performerId
 * @param medicationRequestId
 * @param patientId
 * @param callback
 * @returns callback to MedicationStatementController
 */
module.exports.getMedicationStatementByPatientIdAndMedicationRequestId = (medicationRequestId, patientId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) { callback(err); } if (result === null) { callback({ message: 'Error in authenticating xid' }); } else {
            if (result.xid === incomingXid) {
                MedicationStatement.find({ 'performer.id': patientId, 'medicationRequest.id': medicationRequestId })
                    .populate([{ path: 'performer.id', model: Person },
                    { path: 'doseId.id', model: MedicationRequest },
                    { path: 'medicationRequest.id', model: MedicationRequest }
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
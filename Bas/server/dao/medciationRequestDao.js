var MedicationRequest = require('../models/MedicationRequest');
var Person = require('../models/Person');
var Practitioner = require('../models/Practitioner');
var Device = require('../models/Device');
var Session = require('../models/Session');
var MedicationDispense = require('../models/MedicationDispense');


/**
 * Create a medicationRequest
 * @param medicationRequestData
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.postMedicationRequest = (medicationRequestData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                var personId = medicationRequestData.performer.id;
                var updatingPersonToPatient = {
                    type: 'PATIENT',
                    resourceType: 'Patient'
                };
                var medicationRequest = new MedicationRequest(medicationRequestData);
                medicationRequest.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        updatePersonToPatient(personId, updatingPersonToPatient);
                        callback(medicationRequest);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Async function for updating person to patient when he adds a Medication Request
 * @param medicationRequestId
 * @param callback
 * @returns background update in database
 */
function updatePersonToPatient(personId, updatingPersonToPatient) {
    Person.findOneAndUpdate({ _id: personId },
        {
            $set: updatingPersonToPatient
        }, { upsert: true, new: true, runValidators: true, context: 'query' }, function () {
        });
}

/**
 * Get medicationRequest by Id
 * @param medicationRequestId
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestById = (medicationRequestId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                MedicationRequest.findById(medicationRequestId)
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person },
                    { path: 'device.id', model: Device },
                    { path: 'medicationReference.id', model: MedicationDispense }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            if (output == null) {
                                output = { message: 'id doesn\'t exist' };
                            }
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
 * Update medicationRequest by Id
 * @param id
 * @param medicationRequestData
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.updateMedicationRequestById = (id, medicationRequestData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                MedicationRequest.findOneAndUpdate({ _id: id },
                    {
                        $set: medicationRequestData
                    }, { upsert: true, new: true }, function (err, result) {
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
 * Get medicationRequest by patientId
 * @param patientId
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestsByPatientID = (patientId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                MedicationRequest.find({ 'performer.id': patientId , active : true})
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    // { path: 'performer.id', model: Person },
                    { path: 'device.id', model: Device },
                    { path: 'medicationReference.id', model: MedicationDispense }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            // if (output == null || output.length == 0) {
                            //     output = { message: 'Medication request doesn\'t exist for this person yet' };
                            // }
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
 * Get all medicationRequest
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getAllMedicationRequest = (callback) => {
    MedicationRequest.find()
        .populate([{ path: 'practitioner.id', model: Practitioner },
        { path: 'performer.id', model: Person },
        { path: 'device.id', model: Device },
        { path: 'medicationReference.id', model: MedicationDispense }
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
 * Get all medicationRequest
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestByActive = (active, callback) => {

    MedicationRequest.find({ active: active })
        .populate([{ path: 'practitioner.id', model: Practitioner },
        { path: 'performer.id', model: Person },
        { path: 'device.id', model: Device },
        { path: 'medicationReference.id', model: MedicationDispense }
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
 * Get medicationRequest by medicationDispenseId and performerId
 * @param medicationDispenseId
 * @param patientId
 * @param callback
 * @returns callback to medicationRequestController
 */
module.exports.getMedicationRequestByMedicationDispenseIdAndPatientId = (medicationDispenseId, patientId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                MedicationRequest.find({ 'performer.id': patientId, 'medicationReference.id': medicationDispenseId })
                    .populate([{ path: 'practitioner.id', model: Practitioner },
                    { path: 'performer.id', model: Person },
                    { path: 'device.id', model: Device },
                    { path: 'medicationReference.id', model: MedicationDispense }
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


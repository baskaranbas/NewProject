var Appointment = require('../models/Appointment');
var Person = require('../models/Person');
var Practitioner = require('../models/Practitioner');
var Session = require('../models/Session');

/**
 * Create a appointment
 * @param appointmentData
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.postAppointment = (appointmentData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON'||result.userType === 'ADMIN') {
                appointmentData.status = 'PENDING';
                var appointment = new Appointment(appointmentData);
                appointment.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(appointment);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get appointment by Id
 * @param appointmentId
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.getAppointmentById = (appointmentId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON'||result.userType === 'ADMIN') {
                Appointment.findById(appointmentId)
                    .populate([{ path: 'practitioner.id', model: Practitioner },
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
 * Update appointment by Id
 * @param id
 * @param appointmentData
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.updateAppointmentById = (id, appointmentData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON'||result.userType === 'ADMIN') {
                Appointment.findByIdAndUpdate({ _id: id },
                    {
                        $set: appointmentData
                    }, { upsert: true, new: true ,runValidators: true,context: 'query'}, function (err, result) {
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
 * Get all appointment
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.getAllAppointment = (incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON'||result.userType === 'ADMIN') {
                Appointment.find()
                    .populate([{ path: 'practitioner.id', model: Practitioner },
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
 * view Appoinment By PatientId 
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.viewAppoinmentByPatientId = (performerId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON'||result.userType === 'ADMIN') {
                Appointment.find({ 'performer.id': performerId }, function (err, result) {
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
 * view Appoinment By PractitionerIdId 
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.viewAppoinmentByPractitionerId = (PractitionerId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PATIENT' || result.userType === 'PERSON'||result.userType === 'ADMIN'||result.userType === 'PRACTITIONER') {

                Appointment.find({ 'practitioner.id': PractitionerId }, function (err, result) {
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



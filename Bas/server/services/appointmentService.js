var appointmentDao = require('../dao/appointmentDao');

/**
 * Create a appointment
 * @param appointmentData
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.postAppointment = (appointmentData, incomingToken, callback) => {
    appointmentDao.postAppointment(appointmentData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    appointmentDao.getAppointmentById(appointmentId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    appointmentDao.updateAppointmentById(id, appointmentData, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all appointment
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.getAllAppointment = (incomingToken, callback) => {
    appointmentDao.getAllAppointment(incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * view Appoinment By PatientId 
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.viewAppoinmentByPatientId = (performerId, incomingToken, callback) => {
    appointmentDao.viewAppoinmentByPatientId(performerId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * view Appoinment By PractitionerIdId 
 * @param callback
 * @returns callback to appointmentController
 */
module.exports.viewAppoinmentByPractitionerId = (PractitionerId, incomingToken, callback) => {
    appointmentDao.viewAppoinmentByPractitionerId(PractitionerId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

var appointmentService = require('../services/appointmentService');
var auditLog = require('audit-log');

/**
 * Create a appointment
 * @param req
 * @param res
 * @posts data to appointmentService
 */
module.exports.postAppointment = (req, res) => {
    var appointmentData = req.body;
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    appointmentService.postAppointment(appointmentData, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('The appointment', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The appointment', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get appointment by Id
 * @param req
 * @param res
 * @posts appointmentId to appointmentService
 */
module.exports.getAppointmentById = (req, res) => {
    var appointmentId = req.param('id');
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    appointmentService.getAppointmentById(appointmentId, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(appointmentId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(appointmentId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update appointment by Id
 * @param req
 * @param res
 * @posts appointmentId to appointmentService
 */
module.exports.updateAppointmentById = (req, res) => {

    req.assert('status', 'Status is not valid').isAlpha();
    const errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors);
    } else {
        var id = req.param('id');
        var appointmentData = req.body;
        var resolve = req.get('Authorization');
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        appointmentService.updateAppointmentById(id, appointmentData, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(id, 'could not be updated', new Date(), '', '', err);
                res.status(500).send(err);
            } else if (data.errors) {
                res.status(400).send(data.errors);
            } else {
                auditLog.logEvent(id, 'was updated successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get all appointment 
 * @param req
 * @param res
 */
module.exports.getAllAppointment = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    appointmentService.getAllAppointment(incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('All appointment data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All appointment data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * view Appoinment By PatientId 
 * @param req
 * @param res
 */
module.exports.viewAppoinmentByPatientId = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var performerId = req.param('id');
    if (performerId == '') {
        res.status(200).send({ message: 'Enter the Valid id' });
    } else {
        appointmentService.viewAppoinmentByPatientId(performerId, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(performerId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(performerId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};



/**
 * view Appoinment By PractitionerId 
 * @param req
 * @param res
 */
module.exports.viewAppoinmentByPractitionerId = (req, res) => {
    var PractitionerId = req.param('id');
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    appointmentService.viewAppoinmentByPractitionerId(PractitionerId, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(PractitionerId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(PractitionerId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


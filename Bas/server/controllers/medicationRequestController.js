var medicationRequestService = require('../services/medciationRequestService');
var auditLog = require('audit-log');

/**
 * Create a medicationRequest
 * @param req
 * @param res
 * @posts data to medicationRequestService
 */
module.exports.postMedicationRequest = (req, res) => {
    var incomingXid = req.get('xid');
    var medicationRequestData = req.body;
    medicationRequestService.postMedicationRequest(medicationRequestData, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The Medication Request', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The Medication Request', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get medicationRequest by Id
 * @param req
 * @param res
 * @posts medicationRequestId to medicationRequestService
 */
module.exports.getMedicationRequestById = (req, res) => {
    var incomingXid = req.get('xid');
    var medicationRequestId = req.param('id');
    if (medicationRequestId == '') {
        res.status(500).send({ message: 'Id is empty' });
    } else {
        medicationRequestService.getMedicationRequestById(medicationRequestId, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent(medicationRequestId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(medicationRequestId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update medicationRequest by Id
 * @param req
 * @param res
 * @posts personId to medicationRequestService
 */
module.exports.updateMedicationRequestById = (req, res) => {
    var incomingXid = req.get('xid');
    var id = req.param('id');
    var medicationRequestData = req.body;
    medicationRequestService.updateMedicationRequestById(id, medicationRequestData, incomingXid, function (data, err) {
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
};

/**
 * Get medicationRequest by patientId
 * @param req
 * @param res
 * @posts patientId to medicationRequestService
 */
module.exports.getMedicationRequestsByPatientID = (req, res) => {
    var incomingXid = req.get('xid');
    var patientId = req.param('patientId');
    if (patientId == '' || patientId == undefined ) {
        res.status(500).send({ message: 'Id is empty' });
    } else {
        medicationRequestService.getMedicationRequestsByPatientID(patientId, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent('The Medication Request', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(data.id, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get all medicationRequest
 * @param req
 * @param res
 */
module.exports.getAllMedicationRequest = (req, res) => {
    medicationRequestService.getAllMedicationRequest( function (data, err) {
        if (err) {
            auditLog.logEvent('All Medication Request data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Medication Request data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all medicationRequest By Active
 * @param req
 * @param res
 */
module.exports.getMedicationRequestByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        medicationRequestService.getMedicationRequestByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Medication Request data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Medication Request data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get medicationRequest by medicationDispenseId and performerId
 * @param req
 * @param res
 * @posts medicationDispenseId and performerId to medicationRequestService
 */
module.exports.getMedicationRequestByMedicationDispenseIdAndPatientId = (req, res) => {
    var incomingXid = req.get('xid');
    var medicationDispenseId = req.param('medicationId');
    var patientId = req.param('patientId');
    medicationRequestService.getMedicationRequestByMedicationDispenseIdAndPatientId(medicationDispenseId, patientId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('Medication Request data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Medication Request data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


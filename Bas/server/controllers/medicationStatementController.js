var medicationStatementService = require('../services/medicationStatementService');
var auditLog = require('audit-log');

/**
 * Create a medicationStatement
 * @param req
 * @param res
 * @posts data to medicationStatementService
 */
module.exports.postMedicationStatement = (req, res) => {
    var incomingXid = req.get('xid');
    var medicationStatementData = req.body;
    medicationStatementService.postMedicationStatement(medicationStatementData, incomingXid, function (data, err) {
        if (err) {
            // return err;
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            // return data;
            res.status(200).send(data);
        }
    });
};

/**
 * Get medicationStatement by Id
 * @param req
 * @param res
 * @posts medicationStatementId to medicationStatementService
 */
module.exports.getMedicationStatementById = (req, res) => {
    var incomingXid = req.get('xid');
    var medicationStatementId = req.param('id');
    medicationStatementService.getMedicationStatementById(medicationStatementId,incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(medicationStatementId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(medicationStatementId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * Get all medicationStatement
 * @param req
 * @param res
 * @posts request to medicationStatementService
 */
module.exports.getAllMedicationStatement = (req, res) => {
    medicationStatementService.getAllMedicationStatement(function (data, err) {
        if (err) {
            auditLog.logEvent('All MedicationStatements', 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All MedicationStatements', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update person by Id
 * @param req
 * @param res
 * @posts incoming personId to medicationStatementService
 */
module.exports.updateMedicationStatementById = (req, res) => {
    var incomingXid = req.get('xid');
    var id = req.param('id');
    var medicationStatementData = req.body;
    medicationStatementService.updateMedicationStatementById(id, medicationStatementData, incomingXid, function (data, err) {
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
 * Get all MedicationStatements of patient 
 * @param req
 * @param res
 */
module.exports.getMedicationStatementOfPatient = (req, res) => {
    var incomingXid = req.get('xid');
    var id = req.param('id');
    medicationStatementService.getMedicationStatementOfPatient(id, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The Medication Statement', 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(id, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all MedicationStatements of patient on date
 * @param req
 * @param res
 */
module.exports.getMedicationStatementOfPatientOnDate = (req, res) => {
    var incomingXid = req.get('xid');
    var id = req.param('id');
    var date = req.param('date');
    medicationStatementService.getMedicationStatementOfPatientOnDate(id, date, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The Medication Statement', 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(id, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all MedicationStatements of patient between dates
 * @param req
 * @param res
 */
module.exports.getMedicationStatementOfPatientBetweenDates = (req, res) => {
    var incomingXid = req.get('xid');
    var id = req.param('id');
    var startDate = req.param('startDate');
    var endDate = req.param('endDate');
    medicationStatementService.getMedicationStatementOfPatientBetweenDates(id, startDate, endDate, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The Medication Statement', 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(id, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all MedicationStatements By Active 
 * @param req
 * @param res
 */
module.exports.getMedicationStatementByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        medicationStatementService.getMedicationStatementByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Medication Statement', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Medication Statement', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get medicationStatement by medicationRequestId and patientId
 * @param req
 * @param res
 * @posts medicationRequestId and patientId to medicationStatementService
 */
module.exports.getMedicationStatementByPatientIdAndMedicationRequestId = (req, res) => {
    var incomingXid = req.get('xid');
    var medicationRequestId = req.param('medicationId');
    var patientId = req.param('patientId');
    medicationStatementService.getMedicationStatementByPatientIdAndMedicationRequestId(medicationRequestId, patientId, incomingXid, function (err, data) {
        if (err) {
            auditLog.logEvent('Medication Statement', 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Medication Statement', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};
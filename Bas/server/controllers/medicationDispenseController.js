var medicationDispenseService = require('../services/medicationDispenseService');
var auditLog = require('audit-log');

/**
 * Create a medicationDispense
 * @param req
 * @param res
 * @posts data to medicationDispenseService
 */
module.exports.postMedicationDispense = (req, res) => {
    var medicationDispenseData = req.body;
    medicationDispenseService.postMedicationDispense(medicationDispenseData, function (data, err) {
        if (err) {
            auditLog.logEvent(medicationDispenseData.name, 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent(medicationDispenseData.name, 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });

};

/**
 * Get medicationDipense by Id
 * @param req
 * @param res
 * @posts incoming medicationDispenseId to medicationDispenseService
 */
module.exports.getMedicationDispenseById = (req, res) => {
    var medicationDispenseId = req.param('id');
    medicationDispenseService.getMedicationDispenseById(medicationDispenseId, function (data, err) {
        if (err) {
            auditLog.logEvent(medicationDispenseId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(medicationDispenseId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update medciationDipense by Id
 * @param req
 * @param res
 * @posts incoming medicationDispenseId to medicationService
 */
module.exports.updateMedicationDispenseById = (req, res) => {
    var id = req.param('id');
    var medicationDispenseData = req.body;
    medicationDispenseService.updateMedicationDispenseById(id, medicationDispenseData, function (data, err) {
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
 * Get all medicationDispense 
 * @param req
 * @param res
 */
module.exports.getAllMedicationDispense = (req, res) => {
    medicationDispenseService.getAllMedicationDispense(function (data, err) {
        if (err) {
            auditLog.logEvent('All Medication Dispense data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Medication Dispense data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all medicationDispense By Name
 * @param req
 * @param res
 */
module.exports.getMedicationDispenseByName = (req, res) => {
    var medicationDipenseName = req.param('name');
    medicationDispenseService.getMedicationDispenseByName(medicationDipenseName, function (data, err) {
        if (err) {
            auditLog.logEvent('Medication Dispense data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Medication Dispense data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all medicationDispense By Active
 * @param req
 * @param res
 */
module.exports.getMedicationDispenseByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        medicationDispenseService.getMedicationDispenseByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Medication Dispense data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Medication Dispense data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};


/**
 * Update person image
 * @param req
 * @param res
 */
module.exports.updateDispenceImage = (req, res) => {
    var dispenceId = req.param('id');
    var file = req.files;
    medicationDispenseService.updateDispenceImage(dispenceId, file, function (data, err) {
        if (err) {
            auditLog.logEvent('Image', 'could not be updated', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Image', 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};
var observationService = require('../services/observationService');
var auditLog = require('audit-log');

/**
 * Create a observation
 * @param req
 * @param res
 * @posts data to observationService
 */
module.exports.postObservation = (req, res) => {

    var observationData = req.body;
    observationService.postObservation(observationData, function (data, err) {
        if (err) {
            auditLog.logEvent(observationData.name, 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent(observationData.name, 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get observation by Id
 * @param req
 * @param res
 * @posts observationId to observationService
 */
module.exports.getObservationById = (req, res) => {

    var observationId = req.param('id');
    observationService.getObservationById(observationId, function (data, err) {
        if (err) {
            auditLog.logEvent(observationId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(observationId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update observation by Id
 * @param req
 * @param res
 * @posts observationId to observationService
 */
module.exports.updateObservationById = (req, res) => {

    var id = req.param('id');
    var observationData = req.body;
    observationService.updateObservationById(id, observationData, function (data, err) {
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
 * Get all observation 
 * @param req
 * @param res
 */
module.exports.getAllObservation = (req, res) => {
    observationService.getAllObservation(function (data, err) {
        if (err) {
            auditLog.logEvent('All observation data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All observation data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * Get observation by Name
 * @param req
 * @param res
 * @posts observationName to observationService
 */
module.exports.getObservationByName = (req, res) => {

    var observationName = req.param('name');
    if (observationName == '') {
        res.status(200).send({ message: 'No value is provided, Accepts Valid Name' });
    }
    else {
        observationService.getObservationByName(observationName, function (data, err) {
            if (err) {
                auditLog.logEvent(observationName, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(observationName, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};


/**
 * Get observation by Active
 * @param req
 * @param res
 * @posts observationName to observationService
 */
module.exports.getObservationByActive = (req, res) => {

    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        observationService.getObservationByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Observation', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Observation', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

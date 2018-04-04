var clinicalImpressionService = require('../services/clinicalImpressionService');
var auditLog = require('audit-log');

/**
 * Create a ClinicalImpression
 * @param req
 * @param res
 * @posts data to ClinicalImpressionService
 */

module.exports.postClinicalImpression = (req, res) => {

    
    var incomingXid = req.get('xid');
    var ClinicalImpressionData = req.body;
    clinicalImpressionService.postClinicalImpression(ClinicalImpressionData, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The Clinical Impression', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        }
        else {
            auditLog.logEvent('The Clinical Impression', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });

};



/**
 * Get ClinicalImpression by Id
 * @param req
 * @param res
 * @posts ClinicalImpressionId to ClinicalImpressionService
 */
module.exports.getClinicalImpressionById = (req, res) => {
    var incomingXid = req.get('xid');
    var ClinicalImpressionId = req.param('id');
    clinicalImpressionService.getClinicalImpressionById(ClinicalImpressionId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(ClinicalImpressionId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(ClinicalImpressionId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update ClinicalImpression by Id
 * @param req
 * @param res
 * @posts ClinicalImpressionId to ClinicalImpressionService
 */
module.exports.updateClinicalImpressionById = (req, res) => {

    var incomingXid = req.get('xid');
    var id = req.param('id');
    var ClinicalImpressionData = req.body;
    if (id != '') {
        clinicalImpressionService.updateClinicalImpressionById(id, ClinicalImpressionData, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent(id, 'could not be updated', new Date(), '', '', err);
                res.status(500).send(err);
            } 
            else {
                auditLog.logEvent(id, 'was updated successfully', new Date());
                res.status(200).send(data);
            }
        });
    } else {
        res.status(200).send({ message: 'Error is Id Empty' });
    }

};

/**
 * Get ClinicalImpression by patient Id
 * @param req
 * @param res
 * @posts ClinicalImpressionId to ClinicalImpressionService
 */
module.exports.getClinicalImpressionByPatientId = (req, res) => {
    var incomingXid = req.get('xid');
    var patientId = req.param('id');
    if (patientId != '') {
        clinicalImpressionService.getClinicalImpressionByPatientId(patientId, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent('The Clinical Impression', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(patientId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    } else {
        res.status(200).send({ message: 'Patient Id is Empty' });
    }
};

/**
 * Get all ClinicalImpression 
 * @param req
 * @param res
 */
module.exports.getAllClinicalImpression = (req, res) => {
    clinicalImpressionService.getAllClinicalImpression(function (data, err) {
        if (err) {
            auditLog.logEvent('All Clinical Impression data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Clinical Impression data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all ClinicalImpression By active 
 * @param req
 * @param res
 */
module.exports.getClinicalImpressionByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        clinicalImpressionService.getClinicalImpressionByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Clinical Impression data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Clinical Impression data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};
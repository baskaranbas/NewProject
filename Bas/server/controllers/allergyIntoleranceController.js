var allergyIntoleranceService = require('../services/allergyIntoleranceService');
var auditLog = require('audit-log');

/**
 * Create a allergyIntolerance
 * @param req
 * @param res
 * @posts data to allergyIntoleranceService
 */
module.exports.postAllergyIntolerance = (req, res) => {

    
    var allergyIntoleranceData = req.body;
    allergyIntoleranceService.postAllergyIntolerance(allergyIntoleranceData, function (data, err) {
        if (err) {
            auditLog.logEvent(allergyIntoleranceData.type.trigger.name, 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        }
        else {
            auditLog.logEvent(allergyIntoleranceData.type.trigger.name, 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
    
};

/**
 * Get allergyIntolerance by Id
 * @param req
 * @param res
 * @posts allergyIntoleranceId to allergyIntoleranceService
 */
module.exports.getAllergyIntoleranceById = (req, res) => {
    var allergyIntoleranceId = req.param('id');
    allergyIntoleranceService.getAllergyIntoleranceById(allergyIntoleranceId, function (data, err) {
        if (err) {
            auditLog.logEvent(allergyIntoleranceId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(allergyIntoleranceId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update allergyIntolerance by Id
 * @param req
 * @param res
 * @posts allergyIntoleranceId to allergyIntoleranceService
 */
module.exports.updateAllergyIntoleranceById = (req, res) => {
    
    var id = req.param('id');
    var allergyIntoleranceData = req.body;
    allergyIntoleranceService.updateAllergyIntoleranceById(id, allergyIntoleranceData, function (data, err) {
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
 * Get all allergyIntolerance 
 * @param req
 * @param res
 */
module.exports.getAllAllergyIntolerance = (req, res) => {
    allergyIntoleranceService.getAllAllergyIntolerance(function (data, err) {
        if (err) {
            auditLog.logEvent('All Allergy data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Allergy data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get allergyIntolerance by Name
 * @param req
 * @param res
 * @posts allergyIntoleranceName to allergyIntoleranceService
 */
module.exports.getAllergyIntoleranceByName = (req, res) => {
    var allergyIntoleranceName = req.param('name');
    if (allergyIntoleranceName == '') {
        res.status(200).send({ message: 'No value is provided, Accepts Valid Name' });
    }
    else {
        allergyIntoleranceService.getAllergyIntoleranceByName(allergyIntoleranceName, function (data, err) {
            if (err) {
                auditLog.logEvent(allergyIntoleranceName, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(allergyIntoleranceName, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }

};

/**
 * Get allergyIntolerance by active
 * @param req
 * @param res
 * @posts null to allergyIntoleranceService
 */
module.exports.getAllergyIntoleranceByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        allergyIntoleranceService.getAllergyIntoleranceByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('AllergyIntolerance', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('AllergyIntolerance', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

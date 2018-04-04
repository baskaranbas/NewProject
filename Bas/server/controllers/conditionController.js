var conditionService = require('../services/conditionService');
var auditLog = require('audit-log');

/**
 * Create a condition
 * @param req
 * @param res
 * @posts data to conditionService
 */
module.exports.postCondition = (req, res) => {

    req.assert('type.symptom.name', 'Name is not valid').isAlpha();
    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {

        var conditionData = req.body;
        conditionService.postCondition(conditionData, function (data, err) {
            if (err) {
                auditLog.logEvent('The Condition', 'could not be added', new Date(), '', '', err);
                res.status(500).send(err);
            }

            else {
                auditLog.logEvent(conditionData.type.symptom.name, 'was added successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get condition by Id
 * @param req
 * @param res
 * @posts conditionId to conditionService
 */
module.exports.getConditionById = (req, res) => {

    var conditionId = req.param('id');
    if (conditionId == '') {
        res.status(500).send({ message: 'id is empty' });
    } else {
        conditionService.getConditionById(conditionId, function (data, err) {
            if (err) {
                auditLog.logEvent(conditionId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(conditionId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update condition by Id
 * @param req
 * @param res
 * @posts conditionId to conditionService
 */
module.exports.updateConditionById = (req, res) => {
    req.assert('type.symptom.name', 'Name is not valid').isAlpha();
    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {

        var id = req.param('id');
        var conditionData = req.body;
        conditionService.updateConditionById(id, conditionData, function (data, err) {
            if (err) {
                auditLog.logEvent(id, 'could not be updated', new Date(), '', '', err);
                res.status(500).send(err);
            }
            else {
                auditLog.logEvent(id, 'was updated successfully', new Date());
                res.status(200).send(data);
            }
        });
    }

};

/**
 * Get all condition 
 * @param req
 * @param res
 */
module.exports.getAllCondition = (req, res) => {
    conditionService.getAllCondition(function (data, err) {
        if (err) {
            auditLog.logEvent('All Condition data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Condition data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get condition by name
 * @param req
 * @param res
 * @posts conditionId to conditionService
 */
module.exports.getConditionByName = (req, res) => {
    var conditionName = req.param('name');
    if (conditionName == '') {
        res.status(200).send({ message: 'No value is provided, Accepts Valid Name' });
    }
    else {
        conditionService.getConditionByName(conditionName, function (data, err) {
            if (err) {
                auditLog.logEvent(conditionName, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(conditionName, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get condition by active
 * @param req
 * @param res
 */
module.exports.getConditionByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        conditionService.getConditionByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Condition', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Condition', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};
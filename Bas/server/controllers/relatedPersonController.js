var relatedPersonService = require('../services/relatedPersonService');
var Person = require('../models/Person');
var auditLog = require('audit-log');

/**
 * Create a relatedPerson
 * @param req
 * @param res
 * @posts data to relatedPersonService
 */
module.exports.postRelatedPerson = (req, res) => {

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var incomingXid = req.get('xid');
        var guardianId = req.param('gid');
        var relatedPersonData = req.body;
        relatedPersonService.postRelatedPerson(relatedPersonData, guardianId, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent(relatedPersonData.name.given, 'could not be added', new Date(), '', '', err);
                res.status(500).send(err);
            } else if (data.errors) {
                res.status(400).send(data.errors);
            }
            else {
                auditLog.logEvent(relatedPersonData.name.given, 'was added successfully', new Date());
                asyncUpdatePatientLink(data._id, guardianId);
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get person model data async 
 * @param asyncDataForPerson
 * @returns updates person data
 */

function asyncUpdatePatientLink(rid, gid) {
    if (rid != undefined) {
        Person.update({ _id: gid }, { $push: { 'link': { 'target': rid } } }, function () {
        });
    }
}

/**
 * Get relatedPerson by Id
 * @param req
 * @param res
 * @posts relatedPersonId to relatedPersonService
 */
module.exports.getRelatedPersonById = (req, res) => {
    var incomingXid = req.get('xid');
    var relatedPersonId = req.param('id');
    if (relatedPersonId == '') {
        res.status(200).send({ message: 'No value is provided, Accepts Valid Name' });
    } else {
        relatedPersonService.getRelatedPersonById(relatedPersonId, incomingXid, function ( data, err) {
            if (err) {
                auditLog.logEvent(relatedPersonId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(relatedPersonId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update relatedPerson by Id
 * @param req
 * @param res
 * @posts relatedPersonId to relatedPersonService
 */
module.exports.updateRelatedPersonById = (req, res) => {

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var id = req.param('id');
        var relatedPersonData = req.body;
        var incomingXid = req.get('xid');
        relatedPersonService.updateRelatedPersonById(id, relatedPersonData, incomingXid, function (data, err) {
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
 * Get all person 
 * @param req
 * @param res
 */
module.exports.getAllRelatedPerson = (req, res) => {
    
    relatedPersonService.getAllRelatedPerson(function (data, err) {
        if (err) {
            auditLog.logEvent('All Related Person data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Related Person data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get relatedPerson by Name
 * @param req
 * @param res
 * @posts relatedPersonName to relatedPersonService
 */
module.exports.getRelatedPersonByName = (req, res) => {
    var incomingXid = req.get('xid');
    
    var relatedPersonName = req.param('name');
    relatedPersonService.getRelatedPersonByName(relatedPersonName, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(relatedPersonName, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(relatedPersonName, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get relatedPerson by Active
 * @param req
 * @param res
 */
module.exports.getRelatedPersonByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        relatedPersonService.getRelatedPersonByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('RelatedPerson', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('RelatedPerson', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

var organizationService = require('../services/organizationService');
var auditLog = require('audit-log');

/**
 * Create a organization
 * @param req
 * @param res
 * @posts data to organizationService
 */
module.exports.postOrganization = (req, res) => {
    var organizationData = req.body; 
    organizationService.postOrganization(organizationData, function (data, err) {
        if (err) {
            auditLog.logEvent(organizationData.name, 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent(organizationData.name, 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get organization by Id
 * @param req
 * @param res
 * @posts organizationId to organizationService
 */
module.exports.getOrganizationById = (req, res) => {
    // var resolve = req.get('Authorization');
    // var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var organizationId = req.param('id');
    if (organizationId == '' || organizationId == null ) {
        res.status(500).send({ message: 'Id is empty' });
    }
    else {
        organizationService.getOrganizationById(organizationId, function (data, err) {
            if (err) {
                auditLog.logEvent(organizationId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(organizationId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update organization by Id
 * @param req
 * @param res
 * @posts organizationId to organizationService
 */
module.exports.updateOrganizationById = (req, res) => {
    // var resolve = req.get('Authorization');
    // var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var id = req.param('id');
    var organizationData = req.body;
    organizationService.updateOrganizationById(id, organizationData, function (data, err) {
        if (err) {
            auditLog.logEvent(id, 'could not be updated', new Date(), '', '', err);
            res.status(200).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        } else {
            auditLog.logEvent(id, 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all organization 
 * @param req
 * @param res
 */
module.exports.getAllOrganization = (req, res) => {
    // var resolve = req.get('Authorization');
    // var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    organizationService.getAllOrganization(function (data, err) {
        if (err) {
            auditLog.logEvent('All Organization data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Organization data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get organization by Name
 * @param req
 * @param res
 * @posts organizationName to organizationService
 */
module.exports.getOrganizationByName = (req, res) => {
    // var resolve = req.get('Authorization');
    // var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var organizationName = req.param('name');
    organizationService.getOrganizationByName(organizationName, function (data, err) {
        if (err) {
            auditLog.logEvent(organizationName, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(organizationName, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get organization by Active
 * @param req
 * @param res
 */
module.exports.getOrganizationByActive = (req, res) => {
    // var resolve = req.get('Authorization');
    // var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.status(200).send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        organizationService.getOrganizationByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Organization', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Organization', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};


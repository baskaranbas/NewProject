var practitionerService = require('../services/practitionerService');
var auditLog = require('audit-log');

/**
 * Create a practitioner
 * @param req
 * @param res
 * @posts data to practitionerService
 */
module.exports.postPractitioner = (req, res) => {

    req.assert('telecom[0].value', 'Phone Number is not valid').isNumeric();
    req.assert('telecom[1].value', 'Email is not valid').isEmail();
    req.assert('name.given[0]', 'Name is not valid').isAlpha();
    req.assert('name.given[1]', 'Name is not valid').isAlpha();

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var practitionerData = req.body;
        practitionerService.postPractitioner(practitionerData, function (data, err) {
            if (err) {
                auditLog.logEvent(practitionerData.name.given, 'could not be added', new Date(), '', '', err);
                res.status(500).send(err);
            } else if (data.errors) {
                res.status(400).send(data.errors);
            }
            else {
                auditLog.logEvent(practitionerData.name.given, 'was added successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get practitioner by Id
 * @param req
 * @param res
 * @posts practitionerId to practitionerService
 */
module.exports.getPractitionerById = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var practitionerId = req.param('id');
    if (practitionerId == '') {
        res.status(500).send({ message: 'Id is empty' });
    } else {
        practitionerService.getPractitionerById(practitionerId, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(practitionerId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(practitionerId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update practitioner by Id
 * @param req
 * @param res
 * @posts practitionerId to practitionerService
 */
module.exports.updatePractitionerById = (req, res) => {

    req.assert('telecom[0].value', 'Phone Number is not valid').isNumeric();
    req.assert('telecom[1].value', 'Email is not valid').isEmail();
    req.assert('name.given[0]', 'Name is not valid').isAlpha();
    req.assert('name.given[1]', 'Name is not valid').isAlpha();

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var id = req.param('id');
        var practitionerData = req.body;
        var resolve = req.get('Authorization');
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        practitionerService.updatePractitionerById(id, practitionerData, incomingToken, function (data, err) {
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
 * Get all practitioner
 * @param req
 * @param res
 */
module.exports.getAllPractitioner = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    practitionerService.getAllPractitioner(incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('All practitioner data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All practitioner data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get practitioner by Name
 * @param req
 * @param res
 * @posts practitionerName to practitionerService
 */
module.exports.getPractitionerByName = (req, res) => {
    var practitionerName = req.param('name');
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    if (practitionerName == '') {
        res.status(200).send({ message: 'No value is provided, Accepts Valid Name' });
    }
    else {
        practitionerService.getPractitionerByName(practitionerName, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(practitionerName, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(practitionerName, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get practitioner by Active
 * @param req
 * @param res
 */
module.exports.getPractitionerByActive = (req, res) => {
    var active = req.param('active');
    var resolve = req.get('Authorization');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        practitionerService.getPractitionerByActive(active, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent('Practitioners', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Practitioners', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};


/**
 * Send Pair request to patient
 * @param req
 * @param res
 * @posts phone number to practitionerService
 */
module.exports.sendPairRequestToPractitioner = (req, res) => {
    var pairRequest = req.body;
    var resolve = req.get('Authorization');
    var senderId = req.param('id');
    if (senderId == '') {
        res.status(500).send({ message: 'patient id is empty' });
    } else {
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        practitionerService.sendPairRequestToPractitioner(senderId, pairRequest, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent('The person', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(data.practitioner.email, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * View Pair request sent to patient
 * @param req
 * @param res
 * @posts phone number to practitionerService
 */
module.exports.viewSentPairRequests = (req, res) => {
    var practitionerId = req.param('pracId');
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    practitionerService.viewSentPairRequests(practitionerId, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('Pair request list ', 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(data._id, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


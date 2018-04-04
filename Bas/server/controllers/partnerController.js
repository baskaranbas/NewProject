var partnerService = require('../services/partnerService');
var auditLog = require('audit-log');

/**
 * Create a partner
 * @param req
 * @param res
 * @posts partnerData and type to partnerService
 */
module.exports.postPartner = (req, res) => {

    // req.assert('telecom[0].value', 'Phone Number is not valid').isNumeric();
    req.assert('telecom[0].value', 'Email is not valid').isEmail();
    req.assert('name.given[0]', 'Name is not valid').isAlpha();
    req.assert('name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[0]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].telecom[0].value', 'Phone Number is not valid').isNumeric();
    // req.assert('contact[0].telecom[1].value', 'Email is not valid').isEmail();

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var partnerData = req.body;
        partnerService.postPartner(partnerData, function (data, err) {
            if (err) {
                auditLog.logEvent(partnerData.name.given, 'could not be added', new Date(), '', '', err);
                res.status(500).send(err);
            } else if (data.errors) {
                res.status(400).send(data.errors);
            }
            else {
                auditLog.logEvent(partnerData.name.given, 'was added successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get partner by Id
 * @param req
 * @param res
 * @posts partnerId to partnerService
 */
module.exports.getPartnerById = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var partnerId = req.param('id');
    if (partnerId == '') {
        res.status(500).send({ message: 'Id is empty' });
    } else {
        partnerService.getPartnerById(partnerId, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(partnerId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(partnerId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update partner by Id
 * @param req
 * @param res
 * @posts partnerId to partnerService
 */
module.exports.updatePartnerById = (req, res) => {

    // req.assert('telecom[0].value', 'Phone Number is not valid').isNumeric();
    req.assert('telecom[0].value', 'Email is not valid').isEmail();
    req.assert('name.given[0]', 'Name is not valid').isAlpha();
    req.assert('name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[0]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].telecom[0].value', 'Phone Number is not valid').isNumeric();
    // req.assert('contact[0].telecom[1].value', 'Email is not valid').isEmail();

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var resolve = req.get('Authorization');
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        var id = req.param('id');
        var partnerData = req.body;
        partnerService.updatePartnerById(id, partnerData, incomingToken, function (data, err) {
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
 * Get all Partner 
 * @param req
 * @param res
 */
module.exports.getAllPartner = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    partnerService.getAllPartner(incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('All Partner data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Partner data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get partner by Name
 * @param req
 * @param res
 * @posts partnerName to partnerService
 */
module.exports.getPartnerByName = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var partnerName = req.param('name');
    partnerService.getPartnerByName(partnerName, incomingToken, function (err, data) {
        if (err) {
            auditLog.logEvent(partnerName, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(partnerName, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get partner by Active
 * @param req
 * @param res
 */
module.exports.getPartnerByActive = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        partnerService.getPartnerByActive(active, incomingToken, function (err, data) {
            if (err) {
                auditLog.logEvent('Partner', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Partner', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};
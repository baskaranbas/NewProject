var personService = require('../services/personService');
var auditLog = require('audit-log');
var emailConfig = require('../configuration/emailConfig');
const nodemailer = require('nodemailer');

/**
 * Create a person
 * @param req
 * @param res
 * @posts data to personService
 */
module.exports.postPerson = (req, res) => {

    req.assert('telecom[0].value', 'Email is not valid').isEmail();

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var personData = req.body;
        personService.postPerson(personData, function (data, err) {
            if (err) {
                auditLog.logEvent(personData.name.given, 'could not be added', new Date(), '', '', err);
                res.status(500).send(err);
            } else if (data.errors) {
                res.status(400).send(data.errors);
            }
            else {
                auditLog.logEvent(personData.name.given, 'was added successfully', new Date());
                res.status(200).send(data);

                const transporter = nodemailer.createTransport({
                    service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                    auth: {
                        user: emailConfig.SERVICE_EMAIL,
                        pass: emailConfig.SERVICE_EMAIL_PASSWORD
                    }
                });
                const mailOptions = {
                    to: data.email,
                    from: emailConfig.EMAIL_FROM,
                    subject: 'Welcome to Aerobit Family',
                    text: `Hello,\n\n Welcome to Aerobit HealthCare Asthma Platform  ${data.email}.\n You're registered to our site successfully`
                };
                transporter.sendMail(mailOptions)
                    .then(() => {
                    });
            }
        });
    }
};

/**
 * Get person by Id
 * @param req
 * @param res
 * @posts personId to personService
 */
module.exports.getPersonById = (req, res) => {
    var incomingXid = req.get('xid');
    var personId = req.param('id');
    personService.getPersonById(personId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(personId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(personId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update person by Id
 * @param req
 * @param res
 * @posts personId to personService
 */
module.exports.updatePersonById = (req, res) => {

    req.assert('telecom[0].value', 'Email is not valid').isEmail();

    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var incomingXid = req.get('xid');
        var id = req.param('id');
        var personData = req.body;
        personService.updatePersonById(id, personData, incomingXid, function (data, err) {
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
module.exports.getAllPerson = (req, res) => {
    personService.getAllPerson(function (data, err) {
        if (err) {
            auditLog.logEvent('All Person data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Person data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * Get all related persons of guardian 
 * @param req
 * @param res
 */
module.exports.getAllRelatedPersonOfGuardian = (req, res) => {
    var incomingXid = req.get('xid');
    var guardianId = req.param('gid');
    personService.getAllRelatedPersonOfGuardian(guardianId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('All Person data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Person data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * Pair Or UnPair Practitioner Request
 * @param req
 * @param res
 */
module.exports.viewPairOrUnPairPractitionerRequest = (req, res) => {
    var incomingXid = req.get('xid');
    var personId = req.param('id');
    personService.viewPairOrUnPairPractitionerRequest(personId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('All Person data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Person data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Accept/Decline Practitioner Request
 * @param req
 * @param res
 */
module.exports.acceptOrDeclinePairRequest = (req, res) => {
    var incomingXid = req.get('xid');
    var personId = req.param('pid');
    var practitionerId = req.param('pracId');
    var status = req.param('status');
    personService.acceptOrDeclinePairRequest(personId, practitionerId, status, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('Error in acceptance', ' on ', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Pairing', 'was made successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get person by Name
 * @param req
 * @param res
 * @posts personName to personService
 */
module.exports.getPersonByName = (req, res) => {
    var incomingXid = req.get('xid');
    var personName = req.param('name');
    personService.getPersonByName(personName, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(personName, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(personName, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get person by Active
 * @param req
 * @param res
 */
module.exports.getPersonByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        personService.getPersonByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Persons', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Persons', 'was retrieved successfully', new Date());
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
module.exports.updatePersonImage = (req, res) => {
    var incomingXid = req.get('xid');
    var personId = req.param('id');
    var file = req.files;
    personService.updatePersonImage(personId, file, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('Image', 'could not be updated', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Image', 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};



/**
 * Image Upload
 * @param req
 * @param res
 */
module.exports.imageUpload = (req, res) => {
    var incomingXid = req.get('xid');
    var file = req.files;
    personService.imageUpload(file, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('Image', 'could not be updated', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Image', 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Create and Send friend invite code
 * @param req
 * @param res
 */
module.exports.createAndSendFriendInviteCode = (req, res) => {


    req.assert('email', 'Email is not valid').isEmail();
    req.assert('phone', 'Phone  No is not valid').isNumeric();
    req.assert('shareDetail', 'ShareDetails is not valid').isBoolean();


    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var data = req.body;
        var incomingXid = req.get('xid');
        personService.createAndSendFriendInviteCode(data, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent('Image', 'could not be updated', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Image', 'was updated successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};



/**
 * accept Friend Code
 * @param req
 * @param res
 */
module.exports.acceptFriendCode = (req, res) => {

    req.assert('email', 'Email is not valid').isEmail();
    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var data = req.body;
        var incomingXid = req.get('xid');
        if (incomingXid!= undefined) {
            personService.acceptFriendCode(data, incomingXid, function (data, err) {
                if (err) {
                    auditLog.logEvent('Image', 'could not be updated', new Date(), '', '', err);
                    res.status(500).send(err);
                } else {
                    auditLog.logEvent('Image', 'was updated successfully', new Date());
                    res.status(200).send(data);
                }
            });
        } else {
            res.status(200).send({ message: 'id not is provided' });
        }
    }
};


/**
 * Get all friends of person
 * @param req
 * @param res
 */
module.exports.getAllFriendsOfPerson = (req, res) => {
    var id = req.param('id');
    var incomingXid = req.get('xid');
    personService.getAllFriendsOfPerson(id, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('Image', 'could not be updated', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('Image', 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};


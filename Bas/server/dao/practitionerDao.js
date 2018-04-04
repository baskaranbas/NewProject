var Practitioner = require('../models/Practitioner');
var Pair = require('../models/Pair');
var Session = require('../models/Session');
var Organization = require('../models/Organization');
const nodemailer = require('nodemailer');
var emailConfig = require('../configuration/emailConfig');
var request = require('request');
var clientConfig = require('../configuration/clientConfig');

/**
 * Create a practitioner
 * @param practitionerData
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.postPractitioner = (practitionerData, callback) => {

    var practitioner = new Practitioner(practitionerData);
    var dataForSession = {
        email: practitionerData.telecom[1].value,
        userType: 'PRACTITIONER',
        password: practitionerData.password,
        lastLoggedIn: new Date()
    };

    practitioner.save(function (err) {
        if (err) {
            callback(err);
        } else {
            dataForSession.userId = practitioner._id;
            var session = new Session(dataForSession);
            session.save(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    var options = {
                        method: clientConfig.method,
                        url: clientConfig.url,
                        headers: clientConfig.headers,
                        body: clientConfig.body
                    };
                    request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        var parsedData = JSON.parse(body);
                        var resolvingData = {
                            userToken: parsedData.access_token
                        };

                        Session.findOneAndUpdate({ _id: result._id }, {
                            $set: resolvingData
                        }, { upsert: true }, function (err, data) { }
                        );
                        // return the information including token as JSON
                        callback({ userId: practitioner._id, auth: true, token: parsedData.access_token, expires_in: parsedData.expires_in, token_type: parsedData.token_type });
                    });
                }
            });
        }
    });
};

/**
 * Get practitioner by Id
 * @param practitionerId
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getPractitionerById = (practitionerId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PRACTITIONER' || result.userType === 'ADMIN') {
                Practitioner.findOne({ _id: practitionerId, type: 'PRACTITIONER' })
                    .populate([{ path: 'managingOrganization.id', model: Organization }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            if (output == null) {
                                output = { message: 'id doesn\'t exist' };
                            }
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Update practitioner by Id
 * @param id
 * @param practitionerData
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.updatePractitionerById = (id, practitionerData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PRACTITIONER' || result.userType === 'ADMIN') {
                Practitioner.findOneAndUpdate({ _id: id },
                    {
                        $set: practitionerData
                    }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(result);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get all practitioner
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getAllPractitioner = (incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PRACTITIONER' || result.userType === 'ADMIN') {
                Practitioner.find({ type: 'PRACTITIONER' })
                    .populate([{ path: 'managingOrganization.id', model: Organization }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get practitioner by name
 * @param practitionerName
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getPractitionerByName = (practitionerName, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PRACTITIONER' || result.userType === 'ADMIN') {
                Practitioner.find({ 'name.given': practitionerName, type: 'PRACTITIONER' })
                    .populate([{ path: 'managingOrganization.id', model: Organization }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            if (output.length == 0) {

                                callback({ message: 'No name is matched' });

                            } else {
                                callback(output);
                            }
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};



/**
 * Get practitioner by Active
 * @param active
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.getPractitionerByActive = (active, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PRACTITIONER' || result.userType === 'ADMIN') {
                Practitioner.find({ active: active, type: 'PRACTITIONER' })
                    .populate([{ path: 'managingOrganization.id', model: Organization }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};
/**
 * send request to Practitioner
 * @param patient phone number
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.sendPairRequestToPractitioner = (senderId, pairRequest, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PERSON' || result.userType === 'PATIENT' || result.userType === 'ADMIN') {
                var email = pairRequest.email;
                const code = Math.floor(100000 + Math.random() * 900000);
                var generatedCode = code;
                var patientId = senderId;
                Practitioner.findOne({ 'telecom.value': email }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        var resolvingData = {
                            'performer.id': patientId,
                            code: generatedCode,
                            'practitioner': result._id
                        };
                        var pair = new Pair(resolvingData);
                        pair.save(function (err) {
                            if (err) {
                                callback(err);
                            } else {
                                const transporter = nodemailer.createTransport({
                                    service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                                    auth: {
                                        user: emailConfig.SERVICE_EMAIL,
                                        pass: emailConfig.SERVICE_EMAIL_PASSWORD
                                    }
                                });
                                const mailOptions = {
                                    to: email,
                                    from: emailConfig.EMAIL_FROM,
                                    subject: 'New Pair Request',
                                    text: `This is your code ${code}`
                                };
                                transporter.sendMail(mailOptions)
                                    .then(() => {
                                        callback(pair);
                                    });
                            }
                        });
                    }
                });

            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * view request sent to patient
 * @param practitioner id
 * @param callback
 * @returns callback to practitionerController
 */
module.exports.viewSentPairRequests = (practitionerId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'PRACTITIONER' || result.userType === 'ADMIN') {
                Pair.find({ 'practitioner.id': practitionerId }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(result);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};



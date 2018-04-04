var Partner = require('../models/Person');
var Session = require('../models/Session');
var clientConfig = require('../configuration/clientConfig');
var request = require('request');

/**
 * Create a partner
 * @param partnerData
 * @param callback
 * @param type
 * @returns callback to partnerController
 */
module.exports.postPartner = (partnerData, callback) => {
    var partner = new Partner(partnerData);
    var dataForSession = {
        email: partnerData.telecom[0].value,
        userType: 'PARTNER',
        password: partnerData.password,
        lastLoggedIn: new Date()
    };
    Partner.findOne({ 'telecom.value': partnerData.telecom[0].value }, function (err, data) {
        if (err) {
            callback(err);
        } else
            if (data.telecom[0].value === partnerData.telecom[0].value) {
                callback({ message: 'Email already exists' });
            }
            else {
                partner.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        dataForSession.userId = partner._id;
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
                                    }, { upsert: true, runValidators: true, context: 'query' }, function (err, data) { }
                                    );
                                    // return the information including token as JSON
                                    callback({ userId: partner._id, auth: true, token: parsedData.access_token, expires_in: parsedData.expires_in, token_type: parsedData.token_type });
                                });
                            }
                        });
                    }

                });
            }
    });
};


/**
 * Get partner by Id
 * @param partnerId
 * @param callback
 * @returns callback to partnerController
 */
module.exports.getPartnerById = (partnerId, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'ADMIN' || result.userType === 'PARTNER') {
                Partner.findOne({ _id: partnerId, type: 'PARTNER' }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        if (result == null) {
                            result = { message: 'id doesn\'t exist' };
                        }
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
 * Update partner by Id
 * @param id
 * @param partnerData
 * @param callback
 * @returns callback to partnerController
 */
module.exports.updatePartnerById = (id, partnerData, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'ADMIN' || result.userType === 'PARTNER') {
                Partner.findOneAndUpdate({ _id: id },
                    {
                        $set: partnerData
                    }, { upsert: true, new: true }, function (err, result) {
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
 * Get all Partner
 * @param callback
 * @returns callback to PartnerController
 */
module.exports.getAllPartner = (incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userType === 'ADMIN' || result.userType === 'PARTNER') {
                Partner.find({ type: 'PARTNER' }, function (err, result) {
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
 * Get partner by Name
 * @param partnerName
 * @param callback
 * @returns callback to partnerController
 */
module.exports.getPartnerByName = (partnerName, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            if (result.userType === 'ADMIN' || result.userType === 'PARTNER') {
                Partner.findOne({ 'name.given': partnerName, type: 'PARTNER' }, function (err, result) {
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
 * Get partner by Active
 * @param active
 * @param callback
 * @returns callback to partnerController
 */
module.exports.getPartnerByActive = (active, incomingToken, callback) => {
    Session.findOne({ userToken: incomingToken }, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            if (result.userType === 'ADMIN') {
                Partner.find({ active: active, type: 'PARTNER' }, function (err, result) {
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
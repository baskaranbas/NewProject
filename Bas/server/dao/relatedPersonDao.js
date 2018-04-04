var RelatedPerson = require('../models/Person');
var Session = require('../models/Session');
var Preference = require('../models/Preference');


/**
 * Create a relatedPerson
 * @param relatedPersonData
 * @param callback
 * @param guardianId 
 * @param incomingXid 
 * @returns callback to relatedPersonController
 */
module.exports.postRelatedPerson = (relatedPersonData, guardianId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result === null) {
                callback({ message: 'Error in authenticating x-id' });
            }
            else {
                if (result.userId != guardianId) {
                    callback({ message: 'You are not a guardian, to add a family member' });
                }
                else {
                    if (result.xid === incomingXid) {
                        relatedPersonData.type = 'PATIENT';
                        relatedPersonData.resourceType = 'Patient';
                        var relatedPerson = new RelatedPerson(relatedPersonData);
                        relatedPerson.save(function (err) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(relatedPerson);
                            }
                        });
                    } else {
                        callback({ message: 'You are not authorized to access this API' });
                    }
                }
            }
        }
    });
};

/**
 * Get relatedPerson by Id
 * @param relatedPersonId
 * @param callback
 * @returns callback to relatedPersonController
 */
module.exports.getRelatedPersonById = (relatedPersonId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                RelatedPerson.findOne({ _id: relatedPersonId }, function (err, result) {
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
 * Update relatedPerson by Id
 * @param id
 * @param relatedPersonData
 * @param callback
 * @returns callback to relatedPersonController
 */
module.exports.updateRelatedPersonById = (id, relatedPersonData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                RelatedPerson.findOneAndUpdate({ _id: id },
                    {
                        $set: relatedPersonData
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
 * Get all RelatedPerson
 * @param callback
 * @returns callback to relatedPersonController
 */
module.exports.getAllRelatedPerson = (callback) => {

    RelatedPerson.find({ type: 'PATIENT' }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });

};

/**
 * Get relatedPerson by Name
 * @param relatedPersonName
 * @param callback
 * @returns callback to relatedPersonController
 */
module.exports.getRelatedPersonByName = (relatedPersonName, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                RelatedPerson.find({ 'name.given': relatedPersonName }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        if (result.length == 0) {
                            callback({ message: 'No name is matched' });
                        } else {
                            callback(result);
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
 * Get relatedPerson by Active
 * @param active
 * @param callback
 * @returns callback to relatedPersonController
 */
module.exports.getRelatedPersonByActive = (active, callback) => {
    RelatedPerson.find({ active: active }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
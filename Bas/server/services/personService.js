var personDao = require('../dao/personDao');

/**
 * Create a person
 * @param personData
 * @param callback
 * @returns callback to personController
 */
module.exports.postPerson = (personData, callback) => {
    personDao.postPerson(personData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get person by Id
 * @param personId
 * @param callback
 * @returns callback to personController
 */
module.exports.getPersonById = (personId, incomingXid, callback) => {
    personDao.getPersonById(personId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
/**
 * Update person by Id
 * @param id
 * @param personData
 * @param callback
 * @returns callback to personController
 */
module.exports.updatePersonById = (id, personData, incomingXid, callback) => {
    personDao.updatePersonById(id, personData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all Person
 * @param callback
 * @returns callback to personController
 */
module.exports.getAllPerson = (callback) => {

    personDao.getAllPerson(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get All RelatedPerson Of Guardian
 * @param callback
 * @returns callback to personController
 */
module.exports.getAllRelatedPersonOfGuardian = (guardianId, incomingXid, callback) => {
    personDao.getAllRelatedPersonOfGuardian(guardianId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * View pair request of practitoner
 * @param callback
 * @returns callback to personController
 */
module.exports.viewPairOrUnPairPractitionerRequest = (personId, incomingXid, callback) => {
    personDao.viewPairOrUnPairPractitionerRequest(personId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Accept/Decline pair request of practitoner
 * @param callback
 * @returns callback to personController
 */
module.exports.acceptOrDeclinePairRequest = (personId, practitionerId, status, incomingXid, callback) => {
    personDao.acceptOrDeclinePairRequest(personId, practitionerId, status, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get person by Name
 * @param personName
 * @param callback
 * @returns callback to personController
 */
module.exports.getPersonByName = (personName, incomingXid, callback) => {
    personDao.getPersonByName(personName, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get person by active
 * @param active
 * @param callback
 * @returns callback to personController
 */
module.exports.getPersonByActive = (active, callback) => {

    personDao.getPersonByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * update Person Image
 * @param file
 * @param personId
 * @param callback
 * @returns callback to personController
 */

module.exports.updatePersonImage = (personId, file, incomingXid, callback) => {
    personDao.updatePersonImage(personId, file, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Create And Send Friend Invite Code
 * @param active
 * @param callback
 * @returns callback to personController
 */
module.exports.createAndSendFriendInviteCode = (data, incomingXid, callback) => {
    personDao.createAndSendFriendInviteCode(data, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};



/**
 * accept Friend Code
 * @param data
 * @param callback
 * @returns callback to personController
 */
module.exports.acceptFriendCode = (data, incomingXid, callback) => {
    personDao.acceptFriendCode(data, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};



/**
 * Get all friends of person
 * @param id
 * @param callback
 * @returns callback to personController
 */
module.exports.getAllFriendsOfPerson = (id, incomingXid, callback) => {

    personDao.getAllFriendsOfPerson(id, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
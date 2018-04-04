var relatedPersonDao = require('../dao/relatedPersonDao');


/**
 * Create a relatedPerson
 * @param relatedPersonData
 * @param callback
 * @param guardianId 
 * @param incomingXid 
 * @returns callback to relatedPersonController
 */
module.exports.postRelatedPerson = (relatedPersonData, guardianId, incomingXid, callback) => {
    relatedPersonDao.postRelatedPerson(relatedPersonData, guardianId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    relatedPersonDao.getRelatedPersonById(relatedPersonId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    relatedPersonDao.updateRelatedPersonById(id, relatedPersonData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all RelatedPerson
 * @param callback
 * @returns callback to relatedPersonController
 */
module.exports.getAllRelatedPerson = (callback) => {

    relatedPersonDao.getAllRelatedPerson(function (err, result) {
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
    relatedPersonDao.getRelatedPersonByName(relatedPersonName, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    relatedPersonDao.getRelatedPersonByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
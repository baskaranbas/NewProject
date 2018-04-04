var preferenceDao = require('../dao/preferenceDao');


/**
 * post a preference
 * @param preferenceData
 * @param callback
 * @posts data to preferenceService
 */
module.exports.postPreference =(preferenceData, incomingXid, callback) =>{
    preferenceDao.postPreference(preferenceData, incomingXid, function(err, result){
        if(err){
            callback(err);
        }else{
            callback(result);
        }
    });
};

/**
 * update a preference
 * @param preferenceData
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.updatePreference = (id, preferenceData, incomingXid, callback) => {
    preferenceDao.updatePreference(id, preferenceData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * update a preference
* @param preferenceData
* @param callback
* @returns callback to preferenceController
*/
module.exports.updatePreferenceByPersonId = (id, preferenceData, incomingXid, callback) => {
    preferenceDao.updatePreferenceByPersonId(id, preferenceData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get preference by Id
 * @param preferenceId
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.getpreferenceById = (preferenceId, incomingXid, callback) => {
    preferenceDao.getpreferenceById(preferenceId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get preference by Id
 * @param preferenceId
 * @param callback
 * @returns callback to preferenceController
 */
module.exports.getpreferenceByPersonId = (personId, incomingXid, callback) => {
    preferenceDao.getpreferenceByPersonId(personId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


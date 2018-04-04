var careTeamDao = require('../dao/careTeamDao');


/**
 * Create a careTeam
 * @param careTeamData
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.postCareTeam = (careTeamData, incomingToken, callback) => {
    careTeamDao.postCareTeam(careTeamData, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get careTeam by Id
 * @param careTeamId
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamById = (careTeamId, incomingToken, callback) => {
    careTeamDao.getCareTeamById(careTeamId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get careTeam by Id
 * @param careTeamId
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamByPatientId = (careTeamId, incomingToken, callback) => {
    careTeamDao.getCareTeamByPatientId(careTeamId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};




/**
 * Update careTeam by Id
 * @param id
 * @param careTeamData
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.updateCareTeamById = (id, careTeamData, incomingToken, callback) => {
    careTeamDao.updateCareTeamById(id, careTeamData, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all careTeam
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getAllCareTeam = (incomingToken, callback) => {
    careTeamDao.getAllCareTeam(incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all careTeam by Active
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamByActive = (active, incomingToken, callback) => {
    careTeamDao.getCareTeamByActive(active, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all careTeam by practitioner id
 * @param callback
 * @returns callback to careTeamController
 */
module.exports.getCareTeamByPractitionerId = (practitionerId, incomingToken, callback) => {
    careTeamDao.getCareTeamByPractitionerId(practitionerId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};




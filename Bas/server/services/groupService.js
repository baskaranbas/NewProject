var groupDao = require('../dao/groupDao');



/**
 * Create a group
 * @param groupData
 * @param callback
 * @returns callback to groupController
 */
module.exports.postGroup = (groupData, incomingXid, callback) => {
    groupDao.postGroup(groupData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get group by Id
 * @param groupId
 * @param callback
 * @returns callback to groupController
 */
module.exports.getGroupById = (groupId, incomingXid, callback) => {
    groupDao.getGroupById(groupId, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Update group by Id
 * @param id
 * @param groupData
 * @param callback
 * @returns callback to groupController
 */
module.exports.updateGroupById = (id, groupData, incomingXid, callback) => {
    groupDao.updateGroupById(id, groupData, incomingXid, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get group by personId Id
 * @param personId
 * @param callback
 * @returns callback to groupController
 */
module.exports.getGroupByPersonId = (personId, incomingXid, callback) => {
    groupDao.getGroupByPersonId(personId, incomingXid, function (err, result) {
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
module.exports.getAllGroup = (callback) => {
    groupDao.getAllGroup(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all Person by Active
 * @param callback
 * @returns callback to personController
 */
module.exports.getGroupByActive = (active, callback) => {
    groupDao.getGroupByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};



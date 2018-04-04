var organizationDao = require('../dao/organizationDao');


/**
 * Create a organization
 * @param organizationData
 * @param callback
 * @returns callback to organizationController
 */
module.exports.postOrganization = (organizationData, callback) => {
    organizationDao.postOrganization(organizationData,  function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get organization by Id
 * @param organizationId
 * @param callback
 * @returns callback to organizationController
 */
module.exports.getOrganizationById = (organizationId, callback) => {
    organizationDao.getOrganizationById(organizationId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Update organization by Id
 * @param id
 * @param organizationData
 * @param callback
 * @returns callback to organizationController
 */
module.exports.updateOrganizationById = (id, organizationData, callback) => {
    organizationDao.updateOrganizationById(id, organizationData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all organization
 * @param callback
 * @returns callback to organizationController
 */
module.exports.getAllOrganization = (callback) => {
    organizationDao.getAllOrganization(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get organization by Name
 * @param organizationName
 * @param callback
 * @returns callback to organizationController
 */
module.exports.getOrganizationByName = (organizationName, callback) => {
    organizationDao.getOrganizationByName(organizationName, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get organization by Active
 * @param active
 * @param callback
 * @returns callback to organizationController
 */
module.exports.getOrganizationByActive = (active, callback) => {
    organizationDao.getOrganizationByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

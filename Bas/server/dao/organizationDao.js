var Organization = require('../models/Organization');
var Session = require('../models/Session');


/**
 * Create a organization
 * @param organizationData
 * @param callback
 * @returns callback to organizationController
 */
module.exports.postOrganization = (organizationData, callback) => {

    var organization = new Organization(organizationData);
    organization.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(organization);
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
    Organization.findById(organizationId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result == null) {
                callback({ message: 'id doesn\'t exist' });
            } else {
                callback(result);
            }
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
    Organization.findOneAndUpdate({ _id: id },
        {
            $set: organizationData
        }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
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
    Organization.find(function (err, result) {
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
    Organization.find({ name: organizationName }, function (err, result) {
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
    Organization.find({ active: active }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });

};

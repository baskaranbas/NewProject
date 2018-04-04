var partnerDao = require('../dao/partnerDao');

/**
 * Create a partner
 * @param partnerData
 * @param callback
 * @param type
 * @returns callback to partnerController
 */
module.exports.postPartner = (partnerData, callback) => {
    partnerDao.postPartner(partnerData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    partnerDao.getPartnerById(partnerId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    partnerDao.updatePartnerById(id, partnerData, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all Partner
 * @param callback
 * @returns callback to PartnerController
 */
module.exports.getAllPartner = (incomingToken, callback) => {
    partnerDao.getAllPartner(incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    partnerDao.getPartnerByName(partnerName, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
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
    partnerDao.getPartnerByActive(active, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

var dashboardDao = require('../dao/dashboardDao');

/**
 * Get dashboard content by person id
 * @param personId
 * @param callback
 * @returns callback to dashboardController
 */
module.exports.getDashboardData = (personId, incomingToken, callback) => {
    dashboardDao.getDashboardData(personId, incomingToken, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

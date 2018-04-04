var dashboardService = require('../services/dashboardService');
var auditLog = require('audit-log');


/**
 * Get dashboard data by Id
 * @param req
 * @param res
 * @posts person id to dashboardService
 */
module.exports.getDashboardData = (req, res) => {
    var incomingXid = req.get('xid');
    var personId = req.param('id');
    dashboardService.getDashboardData(personId,incomingXid,function (data, err) {
        if (err) {
            auditLog.logEvent(personId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(personId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};
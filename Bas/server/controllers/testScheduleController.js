var testScheduleService = require('../services/testScheduleService');
var auditLog = require('audit-log');

/**
 * Create a testSchedule
 * @param req
 * @param res
 * @posts data to testScheduleService
 */
module.exports.postTestSchedule = (req, res) => {
    var testScheduleData = req.body;
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    testScheduleService.postTestSchedule(testScheduleData, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('The Test Schedule', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The Test Schedule', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get testSchedule by Id
 * @param req
 * @param res
 * @posts testScheduleId to testScheduleService
 */
module.exports.getTestScheduleById = (req, res) => {
    var testScheduleId = req.param('id');
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    testScheduleService.getTestScheduleById(testScheduleId, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(testScheduleId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(testScheduleId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update testSchedule by Id
 * @param req
 * @param res
 * @posts testScheduleId to testScheduleService
 */
module.exports.updateTestScheduleById = (req, res) => {
    var id = req.param('id');
    var testScheduleData = req.body;
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    testScheduleService.updateTestScheduleById(id, testScheduleData, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(id, 'could not be updated', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        } else {
            auditLog.logEvent(id, 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all testSchedule 
 * @param req
 * @param res
 */
module.exports.getAllTestSchedule = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    testScheduleService.getAllTestSchedule(incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('All Test Schedule data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Test Schedule data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all testSchedule By Active
 * @param req
 * @param res
 */
module.exports.getTestScheduleByActive = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        testScheduleService.getTestScheduleByActive(active, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent('Test Schedule data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Test Schedule data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

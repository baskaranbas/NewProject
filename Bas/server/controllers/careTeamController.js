var careTeamService = require('../services/careTeamService');
var auditLog = require('audit-log');

/**
 * Create a careTeam
 * @param req
 * @param res
 * @posts data to careTeamService
 */
module.exports.postCareTeam = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var careTeamData = req.body;
    careTeamService.postCareTeam(careTeamData, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('The Care Team', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The Care Team', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get careTeam by Id
 * @param req
 * @param res
 * @posts careTeamId to careTeamService
 */
module.exports.getCareTeamById = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var careTeamId = req.param('id');
    careTeamService.getCareTeamById(careTeamId, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(careTeamId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(careTeamId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update careTeam by Id
 * @param req
 * @param res
 * @posts careTeamId to careTeamService
 */
module.exports.updateCareTeamById = (req, res) => {
    var id = req.param('id');
    var careTeamData = req.body;
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    careTeamService.updateCareTeamById(id, careTeamData, incomingToken, function (data, err) {
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
 * Get all careTeam
 * @param req
 * @param res
 */
module.exports.getAllCareTeam = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    careTeamService.getAllCareTeam(incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('All Care Team data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Care Team data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * Get all careTeam by active
 * @param req
 * @param res
 */
module.exports.getCareTeamByActive = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        careTeamService.getCareTeamByActive(active, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent('Care Team data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Care Team data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};



/**
 * Get careTeam by Id
 * @param req
 * @param res
 * @posts careTeamId to careTeamService
 */
module.exports.getCareTeamByPatientId = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var patientId = req.param('id');
    careTeamService.getCareTeamByPatientId(patientId, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(patientId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(patientId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};
/**
 * Get all careTeam by practitioner id
 * @param req
 * @param res
 */
module.exports.getCareTeamByPractitionerId = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var practitionerId = req.param('id');
    if (practitionerId == '') {
        res.send({ message: 'Please provide valid inputs, Accepts valid id' });
    } else {
        careTeamService.getCareTeamByPractitionerId(practitionerId, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent('Care Team data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Care Team data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

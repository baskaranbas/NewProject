var preferenceService = require('../services/preferenceService');
var auditLog = require('audit-log');

/**
 * post a preference
 * @param req
 * @param res
 * @posts data to preferenceService
 */
module.exports.postPreference = (req, res) =>{
    var incomingXid = req.get('xid');
    var preferenceData =req.body;
    preferenceService.postPreference(preferenceData, incomingXid, function(data, err){
        if(err){
            auditLog.logEvent('The preference', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        }else if(data.errors){
            res.status(400).send(data.errors);
        }else{
            auditLog.logEvent('The preference', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};
/**
 * update a preference
 * @param req
 * @param res
 * @posts data to preferenceService
 */
module.exports.updatePreference = (req, res) => {
    var incomingXid = req.get('xid');
    var preferenceData = req.body;
    var id = req.param('id');
    preferenceService.updatePreference(id, preferenceData, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The preference', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The preference', 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * update a preference
 * @param req
 * @param res
 * @posts data to preferenceService
 */
module.exports.updatePreferenceByPersonId = (req, res) => {
    var incomingXid = req.get('xid');
    var preferenceData = req.body;
    var id = req.param('id');
    preferenceService.updatePreferenceByPersonId(id, preferenceData, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The preference', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The preference', 'was updated successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get preference by Id
 * @param req
 * @param res
 * @posts preferenceId to preferenceService
 */
module.exports.getpreferenceById = (req, res) => {
    var incomingXid = req.get('xid');
    
    var preferenceId = req.param('id');
    preferenceService.getpreferenceById(preferenceId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(preferenceId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(preferenceId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};


/**
 * Get preference by person Id
 * @param req
 * @param res
 * @posts preferenceId to preferenceService
 */
module.exports.getpreferenceByPersonId = (req, res) => {
    var incomingXid = req.get('xid');
    var personId = req.param('id');
    preferenceService.getpreferenceByPersonId(personId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(personId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(personId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

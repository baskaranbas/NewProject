var groupService = require('../services/groupService');
var auditLog = require('audit-log');

/**
 * Create a group
 * @param req
 * @param res
 * @posts data to groupService
 */
module.exports.postGroup = (req, res) => {
    var incomingXid = req.get('xid');
    
    var groupData = req.body;
    groupService.postGroup(groupData, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent('The Group', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The Group', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get group by Id
 * @param req
 * @param res
 * @posts groupId to groupService
 */
module.exports.getGroupById = (req, res) => {
    var incomingXid = req.get('xid');
    
    var groupId = req.param('id');
    groupService.getGroupById(groupId, incomingXid, function (data, err) {
        if (err) {
            auditLog.logEvent(groupId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(groupId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update group by Id
 * @param req
 * @param res
 * @posts groupId, groupData to groupService
 */
module.exports.updateGroupById = (req, res) => {
    var incomingXid = req.get('xid');
    
    var id = req.param('id');
    var groupData = req.body;
    groupService.updateGroupById(id, groupData, incomingXid, function (data, err) {
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
 * Get group by personId
 * @param req
 * @param res
 * @posts groupId to groupService
 */
module.exports.getGroupByPersonId = (req, res) => {
    var incomingXid = req.get('xid');
    
    var personId = req.param('id');
    if (personId == '') {
        res.status(500).send({ message: 'PersonId is empty' });
    } else {
        groupService.getGroupByPersonId(personId, incomingXid, function (data, err) {
            if (err) {
                auditLog.logEvent('The Group', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(data.id, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Get all group 
 * @param req
 * @param res
 */
module.exports.getAllGroup = (req, res) => {
    groupService.getAllGroup(function (data, err) {
        if (err) {
            auditLog.logEvent('All Group data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Group data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all group By Active 
 * @param req
 * @param res
 */
module.exports.getGroupByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        groupService.getGroupByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Group data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Group data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};
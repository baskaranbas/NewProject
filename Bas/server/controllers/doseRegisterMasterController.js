var doseRegisterMasterService = require('../services/doseRegisterMasterService');
var auditLog = require('audit-log');

/**
 * Create a doseRegisterMaster
 * @param req
 * @param res
 * @posts data to doseRegisterMasterService
 */
module.exports.postDoseRegisterMaster = (req, res) => {
    var doseRegisterMasterData = req.body;
    doseRegisterMasterService.postDoseRegisterMaster(doseRegisterMasterData, function (data, err) {
        if (err) {
            auditLog.logEvent('The DoseRegisterMaster', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            auditLog.logEvent('The DoseRegisterMaster', 'was added successfully', new Date());
            res.status(200).send(data);
        }
    });
};




/**
 * Get doseRegisterMaster by Id
 * @param req
 * @param res
 * @posts doseRegisterMasterId to doseRegisterMasterService
 */
module.exports.getDoseRegisterMasterById = (req, res) => {
    var doseRegisterMasterId = req.param('id');
    doseRegisterMasterService.getDoseRegisterMasterById(doseRegisterMasterId, function (data, err) {
        if (err) {
            auditLog.logEvent(doseRegisterMasterId, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(doseRegisterMasterId, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Update doseRegisterMaster by Id
 * @param req
 * @param res
 * @posts doseRegisterMasterId to doseRegisterMasterService
 */
module.exports.updateDoseRegisterMasterById = (req, res) => {
    var id = req.param('id');
    var doseRegisterMasterData = req.body;
    doseRegisterMasterService.updateDoseRegisterMasterById(id, doseRegisterMasterData, function (data, err) {
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
 * Get all doseRegisterMaster 
 * @param req
 * @param res
 */
module.exports.getAllDoseRegisterMaster = (req, res) => {
    doseRegisterMasterService.getAllDoseRegisterMaster(function (data, err) {
        if (err) {
            auditLog.logEvent('All DoseRegisterMaster data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All DoseRegisterMaster data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all doseRegisterMaster 
 * @param req
 * @param res
 */
module.exports.generateDoseRegisterMaster = (req, res) => {
    //console.log("isndie of conteol")
    doseRegisterMasterService.generateDoseRegisterMaster(function (data, err) {
        if (err) {
            auditLog.logEvent('All DoseRegisterMaster data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All DoseRegisterMaster data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get all doseRegisterMaster By Active
 * @param req
 * @param res
 */
module.exports.getDoseRegisterMasterByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        doseRegisterMasterService.getDoseRegisterMasterByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('DoseRegisterMaster data', 'was not retrieved successfully', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('DoseRegisterMaster data', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

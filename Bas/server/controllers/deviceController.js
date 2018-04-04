var deviceService = require('../services/deviceService');
var auditLog = require('audit-log');
var Group = require('../models/Group');

/**
 * Create a device
 * @param req
 * @param res
 * @posts data to deviceService
 */
module.exports.postDevice = (req, res) => {

    var deviceData = req.body;
    deviceService.postDevice(deviceData, function (data, err) {
        if (err) {
            auditLog.logEvent('device', 'could not be added', new Date(), '', '', err);
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send({ message: 'Invalid Device Type' });
        }
            else {
            res.status(200).send(data);
        }
    });
};

    /**
     * Get device by Id
     * @param req
     * @param res
     * @posts deviceId to deviceService
     */
module.exports.getDeviceById = (req, res) => {
    var deviceId = req.param('id');
    if(deviceId == ''){
        res.status(400).send({message:'Device Id Not Provided'});
    }else{
        deviceService.getDeviceById(deviceId, function (data, err) {
            if (err) {
                auditLog.logEvent(deviceId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(deviceId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

    /**
     * Update device by Id
     * @param req
     * @param res
     * @posts deviceId to deviceService
     */
module.exports.updateDeviceById = (req, res) => {
    var id = req.param('id');
    var deviceData = req.body;
    if(id == ''){
        res.status(200).send({message:'Device id Not provided'});
    }else{
        deviceService.updateDeviceById(id, deviceData, function (data, err) {
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
    }
};

    /**
     * Get all device 
     * @param req
     * @param res
     */
module.exports.getAllDevice = (req, res) => {
    deviceService.getAllDevice(function (data, err) {
        if (err) {
            auditLog.logEvent('All Device data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Device data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

    /**
     * Get device by Name
     * @param req
     * @param res
     * @posts deviceName to deviceService
     */
module.exports.getDeviceByName = (req, res) => {
    var deviceName = req.param('name');
    if (deviceName == '') {
        res.status(200).send({ message: 'No value is provided, Accepts Valid Name' });
    }
    else {
        deviceService.getDeviceByName(deviceName, function (data, err) {
            if (err) {
                auditLog.logEvent(deviceName, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(deviceName, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

    /**
     * Get device by Active
     * @param req
     * @param res
     */
module.exports.getDeviceByActive = (req, res) => {
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.status(400).send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        deviceService.getDeviceByActive(active, function (data, err) {
            if (err) {
                auditLog.logEvent('Device', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Device', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

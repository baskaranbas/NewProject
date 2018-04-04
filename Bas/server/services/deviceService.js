var deviceDao = require('../dao/deviceDao');


/**
 * Create a device
 * @param deviceData
 * @param callback
 * @returns callback to deviceController
 */
module.exports.postDevice = (deviceData,  callback) => {
    deviceDao.postDevice(deviceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get device by Id
 * @param deviceId
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getDeviceById = (deviceId, callback) => {
    deviceDao.getDeviceById(deviceId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update device by Id
 * @param id
 * @param deviceData
 * @param callback
 * @returns callback to personController
 */
module.exports.updateDeviceById = (id, deviceData, callback) => {
    deviceDao.updateDeviceById(id, deviceData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all device
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getAllDevice = (callback) => {
    deviceDao.getAllDevice(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get device by Name
 * @param deviceName
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getDeviceByName = (deviceName, callback) => {
    deviceDao.getDeviceByName(deviceName, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get device by Active
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getDeviceByActive = (active, callback) => {
    deviceDao.getDeviceByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
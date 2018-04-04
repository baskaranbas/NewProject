var Device = require('../models/Device');
var Session = require('../models/Session');


/**
 * Create a device
 * @param deviceData
 * @param callback
 * @returns callback to deviceController
 */
module.exports.postDevice = (deviceData, callback) => {
    if (deviceData.udi.macAddress != '') {
        if (deviceData.owner.id != '') {
            Device.findOne({ 'udi.macAddress': deviceData.udi.macAddress }, function (err, result) {
                if (err) {
                    callback(err);
                } else if (result == null) {
                    var device = new Device(deviceData);
                    device.save(function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(device);
                        }
                    });
                }
                else {
                    callback({ message: 'Mac Address Already Exist' });
                }
            });
        } else {
            callback({ message: 'You are not provide Owner Id' });
        }
    } else {
        callback({ message: 'You are not give Mac Address' });
    }

};

/**
 * Get device by Id
 * @param deviceId
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getDeviceById = (deviceId, callback) => {
    Device.findById(deviceId, function (err, result) {
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
    Device.find({ _id: id }, function (err, result) {
        if (result._id === id) {
            Device.findOneAndUpdate({ _id: id },
                {
                    $set: deviceData
                }, { upsert: true, new: true, runValidators: true }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(result);
                    }
                });
        } else {
            callback({ mesage: 'Device Id Not Found' });
        }
    });
};

/**
 * Get all device
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getAllDevice = (callback) => {
    Device.find({}, function (err, output) {
        if (err) {
            callback(err);
        } else {
            callback(output);
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
    Device.find({ 'udi.name': deviceName }, function (err, output) {
        if (err) {
            callback(err);
        } else {
            callback(output);
        }
    });

};

/**
 * Get device by Active
 * @param callback
 * @returns callback to deviceController
 */
module.exports.getDeviceByActive = (active, callback) => {
    Device.find({ active: active }, function (err, output) {
        if (err) {
            callback(err);
        } else {
            callback(output);
        }
    });
};
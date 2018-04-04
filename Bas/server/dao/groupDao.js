var Group = require('../models/Group');
var Person = require('../models/Person');
var Device = require('../models/Device');
var Session = require('../models/Session');



/**
 * Create a group
 * @param groupData
 * @param callback
 * @returns callback to groupController
 */
module.exports.postGroup = (groupData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userId === groupData.performer.id) {
                Device.findOne({ 'udi.macAddress': groupData.macAddress }, function (err, deviceResult) {
                    if (err) {
                        callback(err);
                    }
                    if (deviceResult === null || deviceResult === '') {
                        callback({ message: 'MacAddress Not Found' });
                    } else {
                        Group.findOne({ 'device.id': deviceResult._id }, function (err, data) {
                            if (err) {
                                callback(err);
                            }
                            if (data === null || data === '') {
                                groupData['device.id'] = deviceResult._id;
                                var group = new Group(groupData);
                                group.save(function (err, groupResult) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        var deviceData = {
                                            status: 'Activated'
                                        };
                                        Device.findOneAndUpdate({ _id: deviceResult._id }, { $set: deviceData }, { upsert: true, new: true, runValidators: true, context: 'query' },
                                            function (err) {
                                                if (err) {
                                                    callback(err);
                                                } else {
                                                    Group.find({ _id: groupResult._id })
                                                    .populate([
                                                        { path: 'device.id', model: Device },
                                                        { path: 'performer.id', model: Person }])
                                                    .exec(function (err, secondData) {
                                                        if (err) {
                                                            callback(err)
                                                        }
                                                        else {
                                                            callback(secondData);
                                                        }
                                                    })
                                                }
                                            });
                                    }
                                });
                            }
                            else if (data.active === false) {
                                groupData['device.id'] = deviceResult._id;
                                Group.findOneAndUpdate({ _id: data._id }, { $set: groupData }, { upsert: true, runValidators: true, new: true, context: 'query' },
                                    function (err, groupResult) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            var deviceData = {
                                                status: 'Activated'
                                            };
                                            Device.findOneAndUpdate({ _id: deviceResult._id }, { $set: deviceData }, { upsert: true, new: true, runValidators: true, context: 'query' },
                                                function (err) {
                                                    if (err) {
                                                        callback(err);
                                                    } else {
                                                        Group.find({ _id: groupResult._id })
                                                        .populate([
                                                            { path: 'device.id', model: Device },
                                                            { path: 'performer.id', model: Person }])
                                                        .exec(function (err, secondData) {
                                                            if (err) {
                                                                callback(err)
                                                            }
                                                            else {
                                                                callback(secondData);
                                                            }
                                                        })
                                                    }
                                                });
                                        }
                                    });

                            } else {
                                callback({ message: 'Device is already tagged to someone' });
                            }
                        });
                    }
                });
            }
            else {
                callback({ message: 'You are not authorized to access this API' });

            }
        }
    });
};

/**
 * Get group by Id
 * @param groupId
 * @param callback
 * @returns callback to groupController
 */
module.exports.getGroupById = (groupId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Group.findById(groupId)
                    .populate([{ path: 'device.id', model: Device },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Update group by Id
 * @param id
 * @param groupData
 * @param callback
 * @returns callback to groupController
 */
module.exports.updateGroupById = (id, groupData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Group.findOneAndUpdate({ _id: id },
                    {
                        $set: groupData
                    }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            Group.find({ _id: result._id })
                            .populate([
                                { path: 'device.id', model: Device },
                                { path: 'performer.id', model: Person }])
                            .exec(function (err, secondData) {
                                if (err) {
                                    callback(err)
                                }
                                else {
                                    callback(secondData);
                                }
                            })
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get group by personId Id
 * @param personId
 * @param callback
 * @returns callback to groupController
 */
module.exports.getGroupByPersonId = (personId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.userId === personId) {
                Group.find({ 'performer.id': personId, active: true })
                    .populate([{ path: 'device.id', model: Device },
                    { path: 'performer.id', model: Person }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {

                            if (output == null || output.length == 0) {
                                output = { message: 'No device found' };
                            }
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get all Person
 * @param callback
 * @returns callback to personController
 */
module.exports.getAllGroup = (callback) => {
    Group.find()
        .populate([{ path: 'device.id', model: Device },
        { path: 'performer.id', model: Person }
        ])
        .exec(function (err, output) {
            if (err) {
                callback(err);
            } else {
                callback(output);
            }
        });
};

/**
 * Get all Person by Active
 * @param callback
 * @returns callback to personController
 */
module.exports.getGroupByActive = (active, callback) => {
    Group.find({ active: active })
        .populate([{ path: 'device.id', model: Device },
        { path: 'performer.id', model: Person }
        ])
        .exec(function (err, output) {
            if (err) {
                callback(err);
            } else {
                callback(output);
            }
        });
};



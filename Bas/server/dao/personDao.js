var Person = require('../models/Person');
var Pair = require('../models/Pair');
var Notification = require('../models/Notification');
var Session = require('../models/Session');
var CareTeam = require('../models/CareTeam');
var Preference = require('../models/Preference');
var ContactRelationship = require('../models/ContactRelationship');
var Invite = require('../models/Invite');
const async = require('async');
let image, imageName;
const jwt = require('jsonwebtoken');
var fs = require('fs');
const AWS = require('aws-sdk');
var s3Config = require('../configuration/s3Config');
var randomize = require('randomatic');
const bucketName = s3Config.bucketName;

AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey
});


const s3 = new AWS.S3({ region: s3Config.region });

/**
 * Create a person
 * @param personData
 * @param callback
 * @returns callback to personController
 */
module.exports.postPerson = (personData, callback) => {
    var person = new Person(personData);
    var uniqueUserEmail = personData.telecom[0].value.toLowerCase();
    var xid = jwt.sign({ id: uniqueUserEmail }, 'AEROBIT', {
        expiresIn: '2h'
    });
    var dataForSession = {
        email: personData.telecom[0].value.toLowerCase(),
        userType: 'PERSON',
        password: personData.password,
        lastLoggedIn: new Date(),
        xid: xid
    };
    Person.findOne({ 'telecom.value': personData.telecom[0].value.toLowerCase() }, function (err, data) {
        if (err) {
            callback(err);
        } else
            if (!data || data.telecom[0].value.toLowerCase() == !personData.telecom[0].value.toLowerCase()) {
                person.save(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        dataForSession.userId = person._id;
                        var session = new Session(dataForSession);
                        session.save(function (err, result) {
                            if (err) {
                                callback(err);
                            } else {
                                var notificationObject = {
                                    'performer.id': result.userId,
                                    'performer.deviceId': personData.deviceId
                                };
                                var notification = new Notification(notificationObject);
                                notification.save(function (err, data) {
                                    if(err){
                                        callback(err);
                                    }else{
                                        callback(result);
                                    }

                                });
                            }
                        });
                    }
                });
            }
            else if (data.telecom[0].value.toLowerCase() === personData.telecom[0].value.toLowerCase()) {
                callback({ message: 'Email already exists' });
            } else {
                callback({ message: 'Error while signing up' });
            }
    });
};

/**
 * Get person by Id
 * @param personId
 * @param callback
 * @returns callback to personController
 */
module.exports.getPersonById = (personId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Person.findOne({ _id: personId })
                    .populate([{ path: 'link.target', model: Person }
                        , { path: 'preference', model: Preference }])
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
 * Update person by Id
 * @param id
 * @param personData
 * @param callback
 * @returns callback to personController
 */
module.exports.updatePersonById = (id, personData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Person.findOneAndUpdate({ _id: id },
                    {
                        $set: personData
                    }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(result);
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
module.exports.getAllPerson = (callback) => {

    Person.find({ type: 'PERSON' })
        .populate([{ path: 'link.target.id', model: Person }
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
 * Get All RelatedPerson Of Guardian
 * @param callback
 * @returns callback to personController
 */
module.exports.getAllRelatedPersonOfGuardian = (guardianId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                var relatedPersons = [];
                Person.findOne({ _id: guardianId }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        if (result) {
                            for (var i = 0; i < result.link.length; i++) {
                                relatedPersons.push(result.link[i].target);
                            }
                            Person.find({ _id: { $in: relatedPersons }, active: true }, function (err, data) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(data);
                                }
                            });
                        } else {
                            callback({ message: 'No link found' });
                        }
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};



/**
 * View pair request of practitoner
 * @param callback
 * @returns callback to personController
 */
module.exports.viewPairOrUnPairPractitionerRequest = (personId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Pair.find({ 'performer.id': personId }, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(result);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Accept/Decline pair request of practitoner
 * @param callback
 * @returns callback to personController
 */
module.exports.acceptOrDeclinePairRequest = (personId, practitionerId, status, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Pair.findOne({ 'performer.id': personId, 'practitioner.id': practitionerId }, function (err, data) {
                    var pairId = data._id;
                    if (err) {
                        callback(err);
                    } else {
                        if (status == 'DECLINE') {
                            var resolvingStatus = {
                                status: 'DECLINED'
                            };
                            Pair.update({ 'performer.id': data.performer.id, 'practitioner.id': data.performer.id },
                                {
                                    $set: resolvingStatus
                                }, { upsert: true, new: true }, function (err) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback({ message: 'Declined pair request successfully' });
                                    }
                                });
                        } else if (status == 'ACCEPT') {
                            var resolvingCareTeam = {
                                'performer.id': data.performer.id,
                                'practitioner.id': data.performer.id,
                                'status': 'PAIRED'
                            };
                            var careTeam = new CareTeam(resolvingCareTeam);
                            careTeam.save(function (err, result) {
                                if (err) {
                                    callback(err);
                                } else {
                                    Pair.findByIdAndRemove(pairId, function () { });
                                    callback(result);
                                }
                            });
                        } else {
                            callback('ERROR');

                        }

                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};

/**
 * Get person by Name
 * @param personName
 * @param callback
 * @returns callback to personController
 */
module.exports.getPersonByName = (personName, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                Person.find({ 'name.given': personName, type: 'PERSON' })
                    .populate([{ path: 'link.target.id', model: Person }
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
 * Get person by active
 * @param active
 * @param callback
 * @returns callback to personController
 */
module.exports.getPersonByActive = (active, callback) => {

    Person.find({ active: active, type: 'PERSON' })
        .populate([{ path: 'link.target.id', model: Person }
        ])
        .exec(function (err, output) {
            if (err) {
                callback(err);
            } else {
                callback(output);
            }
        });

};


const createMainBucket = (callback) => {
    // Create the parameters for calling createBucket
    const bucketParams = {
        Bucket: bucketName
    };
    s3.headBucket(bucketParams, function (err, data) {
        if (err) {
            s3.createBucket(bucketParams, function (err, data) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data);
                }
            });
        } else {
            callback(null, data);
        }
    });
};

const createItemObject = (callback) => {
    const params = {
        Bucket: bucketName,
        Key: `${imageName}`,
        ACL: 'public-read',
        Body: image
    };
    s3.upload(params, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};


/**
 * update Person Image
 * @param file
 * @param personId
 * @param callback
 * @returns callback to personController
 */

module.exports.updatePersonImage = (personId, file, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }

        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                var tmp_path = file.file.path;
                image = fs.createReadStream(tmp_path);
                imageName = file.file.name;
                var contentType = file.file.type;
                async.series([
                    createMainBucket,
                    createItemObject
                ], (err, result) => {
                    if (err) callback(err);
                    else {
                        var resolvingData = {
                            'photo.data': result[1].Location,
                            'photo.contentType': contentType
                        };
                        Person.findByIdAndUpdate({ _id: personId }, { $set: resolvingData }, { upsert: true }, function (err, result) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(result);

                            }
                        });
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};



/**
 * Create And Send Friend Invite Code
 * @param active
 * @param callback
 * @returns callback to personController
 */
module.exports.createAndSendFriendInviteCode = (data, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }

        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else if (result.userId === data.id) {
            Invite.findOne({ performer: data.id, 'friend.email': data.email }, function (err, performer_data) {
                var resolvingObject = {
                    performer: data.id,
                    'friend.firstName': data.firstName,
                    'friend.email': data.email,
                    'friend.lastName': data.lastName,
                    'friend.phone': data.phone,
                    code: randomize('0', 5),
                    shareDetail: data.shareDetail
                };
                if (performer_data == null) {
                    var invite = new Invite(resolvingObject);
                    invite.save(function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(invite);
                        }
                    });
                } else {
                    callback({ message: 'Invitation already Sent' });
                }
            });
        } else {
            callback({ message: 'Invalid User Id' });
        }
    });
};



/**
 * accept Friend Code
 * @param data
 * @param callback
 * @returns callback to personController
 */
module.exports.acceptFriendCode = (data, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        else {
            if (result.xid != incomingXid) {

                callback({ message: 'You are not authorized to access this API' });

            } else {

                Invite.findOne({ 'friend.email': data.email, code: data.code }, function (err, result) {

                    if (err) {
                        callback(err);
                    } else {
                        if (result != null) {
                            Invite.remove({ _id: result._id }, function (err, inviteData) {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    Person.findOne({ 'telecom.value': result.friend.email }, function (err, personResult) {
                                        if (err) {
                                            callback(err);
                                        }
                                        else if (result == null) {
                                            callback({ message: 'Error while fetching results of user' });
                                        }
                                        else {
                                            var data = {
                                                performer: result.performer,
                                                friend: personResult._id
                                            };
                                            var contactRelationship = new ContactRelationship(data);
                                            contactRelationship.save(function (err, contactResult) {
                                                if (err) {
                                                    callback(err);
                                                } else {
                                                    var friendData = {
                                                        friend: {
                                                            id: contactResult.friend,
                                                            deviceId: '2222222',
                                                            title: 'Test',
                                                            text: 'Testing Data',
                                                            shareDetail: true
                                                        }
                                                    };
                                                    //var notification = new Notification(friendData);
                                                    Notification.findOneAndUpdate({'performer.id': contactResult.performer},{$set: friendData},{upsert: true, new: true, runValidators:true, context:'query'},
                                                    function (err,data) {
                                                        if (err) {
                                                            callback(err);
                                                        } else {
                                                            callback(result);
                                                        }
                                                    });
                                                }
                                            });

                                        }
                                    });
                                }
                            });
                        } else {
                            callback({ message: 'Cannot fetch detail for the provided code' });
                        }
                    }
                });
            }
        }
    });
};



/**
 * Get all friends of person
 * @param id
 * @param callback
 * @returns callback to personController
 */
module.exports.getAllFriendsOfPerson = (id, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        else if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (id != '') {
                ContactRelationship.find({ performer: id })
                    .populate([{ path: 'performer', model: Person },
                    { path: 'friend', model: Person }
                    ])
                    .exec(function (err, output) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(output);
                        }
                    });
            } else {
                callback({ message: 'Error, id Empty' });
            }
        }
    });
};
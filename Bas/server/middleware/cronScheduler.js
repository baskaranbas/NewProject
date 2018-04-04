/* eslint-disable */
var CronJobManager = require('cron-job-manager');
var notification = require('../models/Notification');
var contact = require('../models/ContactRelationship');
var MedicationStatement = require('../models/MedicationStatement');
var Person = require('../models/Person');
var moment = require('moment');
var apns = require('apns');
var options = {
    keyFile: './support/key.pem',
    certFile: './support/cert.pem',
    debug: true,
    passphrase: '12345',
    gateway: 'com.10decoders.Aerobit'
};
var apnConnection = new apns.Connection(options);
const FCM = require('fcm-node');
const serverKey = 'AIzaSyAEacQDd7F1lhxaYBUozSu44MzwynzCOYA';
const fcm = new FCM(serverKey);
var date = new Date();
var startDate = moment(new Date()).subtract(1, 'day').toDate();
var notify = new CronJobManager('CHECK_STATEMENT_AND_SEND_NOTIFICATION_TO_FRIEND',
    '* * * * * *',
    function medicationStatementScheduler(req, res) {
        MedicationStatement.find({ status: 'MISSED', 'effectiveDateTime': { '$gte': startDate } }, function (err, result) {
            //console.log('===========',result);
            if (err) {
                console.log(err);
            } else if (result != '' && result != undefined) {
                for (var i = 0; i < result.length; i++) {
                    var id = result[i].performer.id;
                    notification.find({ 'performer.id': id })
                        .populate([
                            { path: 'friend.id', model: Person },
                            { path: 'performer.id', model: Person }
                        ]).then((secondResult) => {
                            if (secondResult === '') {
                                res.status(200).send(secondResult);
                                console.log(secondResult);
                            } else {
                                var myDevice = new apns.Device('A34E99A8D53CF23AE06FCA505FC7199761810C77664E8D674423BB098AAE084E');
                                var dataForIos = {
                                    "aps": {
                                        "alert": "This is your message to be displayed",
                                        "sound": "default",
                                        "badge": 1
                                    }
                                }
                                apnConnection.sendNotification({ dataForIos, myDevice }, function (err, response) {
                                    if (err) {
                                        res.status(400).send(err);
                                        console.log('666666666666666666666', err);
                                    } else {
                                        res.status(200).send(response);
                                        console.log('55555555555555555555555', response);
                                    }
                                });
                                var dataForAndroid = {
                                    'to': 'ffP8jBV_2Lg:APA91bHi0uSgQVg8r62tLUAlNLRSQzStDcBsGcCrUmhw5uC2btPg3EVkQmaE2tnXkKA4PNX0lfN2bIdGA2huGJgBaeS0ACzbIFfWmF3I74p6E-BqA979nqmUoJr1-ESCBPm6iCJQ87pb',
                                    'data': {
                                        'type': 'url',
                                        'body': 'Your friend missing daily dose'
                                    }
                                }
                                fcm.send(dataForAndroid, function (err, response) {
                                    if (err) {
                                        res.status(400).send(err)
                                    } else {
                                        res.status(200).send(response)
                                    }
                                });
                            }
                        })
                }
            }
            else {
                console.log('No data is found');
            }
        })
    },
    {
        start: true
    }
);

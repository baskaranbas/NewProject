var Person = require('../models/Person');
var MedicationStatement = require('../models/MedicationStatement');
var MedicationRequest = require('../models/MedicationRequest');
var MedicationDispense = require('../models/MedicationDispense');
var ClinicalImpression = require('../models/ClinicalImpression');
var AllergyIntolerance = require('../models/AllergyIntolerance');
var Condition = require('../models/Condition');
var moment = require('moment');

/**
 * Get dashboard content by person id
 * @param personId
 * @param callback
 * @returns callback to dashboardController
 */
module.exports.getDashboardData = (personId, incomingToken, callback) => {
    var todayDate = new Date();
    var startDate = moment(todayDate).subtract(3, 'days');
    var endDate = moment(todayDate).add(3, 'days');
    var tempStartDate = startDate;

    var nextDayDate = moment(todayDate).add(1, 'days');

    MedicationStatement.find({
        'performer.id': personId,
        'effectiveDateTime': { '$gte': startDate, '$lte': endDate }
    }).populate([
        { path: 'performer.id', model: Person },
        {
            path: 'medicationRequest.id', model: MedicationRequest, populate: {
                path: 'medicationReference.id',
                model: MedicationDispense
            }
        }
    ]).exec(function (err, output) {
        if (err) {
            callback(err);
        } else {

            var DayStatus = [];
            var dispence = [];

            for (var i = 0; i < 7; i++) {
                var day = tempStartDate.format('dddd');
                var list_of_status = [];
                output.forEach(function (item) {
                    var first_date = moment(item.effectiveDateTime).format('DD-MM-YYYY');
                    var second_date = moment(tempStartDate).format('DD-MM-YYYY');
                    if (first_date == second_date) {
                        var dose_status = {
                            dose_id: item.doseId.id,
                            status: item.status
                        };
                        list_of_status.push(dose_status);
                    }
                });
                var per_day_object = {
                    day: day,
                    status: list_of_status
                };
                DayStatus.push(per_day_object);
                tempStartDate = moment(tempStartDate).add(1, 'days');
            }


            output.forEach(function (item) {
                var effective_date = moment(item.effectiveDateTime).format('DD-MM-YYYY');
                var today_date = moment(new Date()).format('DD-MM-YYYY');
                var time;
                var curren_dose_id;

                if (effective_date == today_date) {
                    for (var i = 0; i < item.medicationRequest.id.dosageInstruction.length; i++) {

                        if (item.medicationRequest.id.dosageInstruction[i]._id.equals(item.doseId.id)) {

                            time = item.medicationRequest.id.dosageInstruction[i].timing;
                            curren_dose_id = item.medicationRequest.id.dosageInstruction[i]._id;
                        }
                    }
                    var dispence_object = {
                        doseid: curren_dose_id,
                        name: item.medicationRequest.id.medicationReference.id.name,
                        time: time
                    };
                    dispence.push(dispence_object);
                }

            });




            //  var symptom = 

            var symptoms = [];



            ClinicalImpression.find({
                'performer.id': personId,
                'createdAt': { '$gte': todayDate, '$lte': nextDayDate }
            }).populate([
                {
                    path: 'problem', model: AllergyIntolerance
                }, { path: 'finding.itemReference', model: Condition }
            ]).exec(function (err, impression) {
                if (err) {
                    callback(err);
                } else {
                    impression.forEach(function (items) {
                        var obj = {
                            problem : items.problem.type.trigger.name,
                            finding : items.finding.itemReference.type.symptom.name,
                            time : items.finding.itemReference.createdAt
                        };
                        symptoms.push(obj);
                    });
                }

                var dashboard = {
                    dayStatus: DayStatus,
                    others: symptoms,
                    todayDispenceStatus: dispence
                };
    
    
                callback(dashboard);
            });

        }
    });
};


var doseRegisterMasterDao = require('../dao/doseRegisterMasterDao');
/**
 * Create a doseRegisterMaster
 * @param doseRegisterMasterData
 * @param callback
 * @returns callback to doseRegisterMasterController
 */
module.exports.postDoseRegisterMaster = (doseRegisterMasterData, callback) => {
    doseRegisterMasterDao.postDoseRegisterMaster(doseRegisterMasterData, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get doseRegisterMaster by Id
 * @param doseRegisterMasterId
 * @param callback
 * @returns callback to doseRegisterMasterController
 */
module.exports.getDoseRegisterMasterById = (doseRegisterMasterId, callback) => {
    doseRegisterMasterDao.getDoseRegisterMasterById(doseRegisterMasterId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update doseRegisterMaster by Id
 * @param id
 * @param doseRegisterMasterData
 * @param callback
 * @returns callback to doseRegisterMasterController
 */
module.exports.updateDoseRegisterMasterById = (id, doseRegisterMasterData, callback) => {
    doseRegisterMasterDao.updateDoseRegisterMasterById(id, doseRegisterMasterData,  function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all doseRegisterMaster
 * @param callback
 * @returns callback to doseRegisterMasterController
 */
module.exports.getAllDoseRegisterMaster = (callback) => {
    doseRegisterMasterDao.getAllDoseRegisterMaster(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Get all doseRegisterMaster
 * @param callback
 * @returns callback to doseRegisterMasterController
 */
// module.exports.generateDoseRegisterMaster = (callback) => {
//     DoseRegisterMaster.find()
//         .populate([{ path: 'medicationRequestId.id', model: MedicationRequest }
//         ])
//         .exec(function (err, doses) {

            // console.log("value.medicationRequestId.id.dosageInstruction", value.medicationRequestId.id.dosageInstruction)

            // if (doses.length > 0) {
            //     async.forEach(doses, function (value, callback) { //The second argument, `callback`, is the "task callback" for a specific `messageId`          
            //         for (var i = 0; i < value.medicationRequestId.id.dosageInstruction.length; i++) {
            //             var resolvedData = {
            //                 'doseId.id': value.medicationRequestId.id.dosageInstruction[i]._id,
            //                 'performer.id': value.medicationRequestId.id.performer.id,
            //                 'effectiveDateTime': moment(value.nextRun).add(5, 'days'),
            //                 'medicationRequest.id': value.medicationRequestId.id.medicationReference.id
            //             };
            //             console.log("===>", resolvedData)
            //             var medicationStatement = new MedicationStatement(resolvedData);
            //             medicationStatement.save();
            //         }
            //         var date = moment(value.nextRun).add(1, 'days')
            //         value.nextRun = date;
            //         value.save(function (err) {
            //             if (err)
            //                 console.log('error')
            //             else
            //                 console.log('success')
            //         });
            //     }, function (err) {
            //         if (err) {
            //             console.log("error", err)
            //         };
            //         console.log("==>")
            //     });
            // }
//         });

// };

// module.exports.generateDoseRegisterMaster = (callback) => {
//     DoseRegisterMaster.find({}, function (err, doses) {
//         //console.log("dosese",doses)
//         async.forEach(doses, function (value, callback) { //The second argument, `callback`, is the "task callback" for a specific `messageId`          
//             // Coins.find({ coins: { $elemMatch: { coin_name: value.name } } }, function (err, model) {
//             //     if (err) {
//             //         callback(err)
//             //     } else {
//             //         console.log("model", model.length)
//             //         value.count = model.length
//             //         callback();
//             //     }
//             // });
//             console.log("=====>",value)
//         }, function (err) {
//             if (err) {
//                 console.log("error", err)
//             };

//             callback(data)

//         });

//     });
// };

/**
 * Get all doseRegisterMaster By Active
 * @param callback
 * @returns callback to doseRegisterMasterController
 */
module.exports.getDoseRegisterMasterByActive = (active, callback) => {
    doseRegisterMasterDao.getDoseRegisterMasterByActive(active, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};



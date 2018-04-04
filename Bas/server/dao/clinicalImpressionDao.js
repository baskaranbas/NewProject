var ClinicalImpression = require('../models/ClinicalImpression');
var Condition = require('../models/Condition');
var Person = require('../models/Person');
var AllergyIntolerance = require('../models/AllergyIntolerance');
var Session = require('../models/Session');


/**
 * Create a ClinicalImpression
 * @param ClinicalImpressionData
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.postClinicalImpression = (clinicalImpressionData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                var clinicalImpression = new ClinicalImpression(clinicalImpressionData);
                clinicalImpression.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(clinicalImpression);
                    }
                });
            } else {
                callback({ message: 'You are not authorized to access this API' });
            }
        }
    });
};


/**
 * Get ClinicalImpression by Id
 * @param ClinicalImpressionId
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getClinicalImpressionById = (clinicalImpressionId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                ClinicalImpression.findById(clinicalImpressionId)
                    .populate([{ path: 'finding.itemReference', model: Condition },
                    { path: 'performer.id', model: Person },
                    { path: 'problem', model: AllergyIntolerance }
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
 * Update ClinicalImpression by Id
 * @param id
 * @param ClinicalImpressionData
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.updateClinicalImpressionById = (id, clinicalImpressionData, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {

                ClinicalImpression.findOneAndUpdate({ _id: id },
                    {
                        $set: clinicalImpressionData
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
 * Get ClinicalImpression by patient Id
 * @param id
 * @param ClinicalImpressionData
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getClinicalImpressionByPatientId = (patientId, incomingXid, callback) => {
    Session.findOne({ xid: incomingXid }, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result === null) {
            callback({ message: 'Error in authenticating xid' });
        }
        else {
            if (result.xid === incomingXid) {
                ClinicalImpression.find({ 'performer.id': patientId })
                    .populate([{ path: 'finding.itemReference', model: Condition },
                    { path: 'performer.id', model: Person },
                    { path: 'problem', model: AllergyIntolerance }
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
 * Get all ClinicalImpression
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getAllClinicalImpression = (callback) => {
    ClinicalImpression.find()
        .populate([{ path: 'finding.itemReference', model: Condition },
        { path: 'performer.id', model: Person },
        { path: 'problem', model: AllergyIntolerance }
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
 * Get all ClinicalImpression By Active
 * @param callback
 * @returns callback to ClinicalImpressionController
 */
module.exports.getClinicalImpressionByActive = (active, callback) => {
    ClinicalImpression.find({ active: active })
        .populate([{ path: 'finding.itemReference', model: Condition },
        { path: 'performer.id', model: Person },
        { path: 'problem', model: AllergyIntolerance }
        ])
        .exec(function (err, output) {
            if (err) {
                callback(err);
            } else {
                callback(output);
            }
        });
};



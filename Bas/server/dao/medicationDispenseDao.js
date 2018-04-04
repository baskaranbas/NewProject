const async = require('async');
let image, imageName;
var fs = require('fs');
const AWS = require('aws-sdk');
var s3Config = require('../configuration/s3Config');
var MedicationDispense = require('../models/MedicationDispense');
const bucketName = s3Config.bucketName;
AWS.config.update({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey
});
const s3 = new AWS.S3({ region: s3Config.region });
/**
 * Create a medicationdispense
 * @param medicationDispenseData
 * @param callback
 * @returns callback to medicationDispenseController
 */

module.exports.postMedicationDispense = (medicationDispenseData, callback) => {
    var medicationDispense = new MedicationDispense(medicationDispenseData);
    medicationDispense.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(medicationDispense);
        }
    });

};

/**
* Get medciationDispense by Id
* @param medicationDispenseId
* @param callback
* @returns callback to medciationDispenseController
*/
module.exports.getMedicationDispenseById = (medicationDispenseId, callback) => {
    MedicationDispense.findById({ _id: medicationDispenseId }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};

/**
 * Update medciationDispense by Id
 * @param id
 * @param medicationDispenseData
 * @param callback
 * @returns callback to medciationDispenseController
 */
module.exports.updateMedicationDispenseById = (id, medicationDispenseData, callback) => {
    MedicationDispense.findOneAndUpdate({ _id: id },
        {
            $set: medicationDispenseData
        }, { upsert: true, new: true, runValidators: true, context: 'query' }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result);
            }
        });

};

/**
 * Get all medicationDispense
 * @param callback
 * @returns callback to medicationDispenseController
 */
module.exports.getAllMedicationDispense = (callback) => {
    MedicationDispense.find(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


/**
 * Get all medicationDispense By Name
 * @param callback
 * @returns callback to medicationDispenseController
 */
module.exports.getMedicationDispenseByName = (medicationDispenseName, callback) => {
    MedicationDispense.find({ name: medicationDispenseName }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });

};

/**
 * Get all medicationDispense By Active
 * @param callback
 * @returns callback to medicationDispenseController
 */
module.exports.getMedicationDispenseByActive = (active, callback) => {
    MedicationDispense.find({ active: active }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};


module.exports.updateDispenceImage = (dispenceId, file, callback) => {
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
                'image.data': result[1].Location,
                'image.contentType': contentType
            };
            MedicationDispense.findByIdAndUpdate({ _id: dispenceId }, { $set: resolvingData }, { upsert: true }, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(result);
                }
            });
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

var patientService = require('../services/patientService');
var auditLog = require('audit-log');

/**
 * Create a Patient
 * @param req
 * @param res
 * @posts data to PatientService
 */
module.exports.postPatient = (req, res) => {


    // req.assert('telecom[0].value', 'Phone Number is not valid').isNumeric();
    req.assert('telecom[0].value', 'Email is not valid').isEmail();
    req.assert('name.given[0]', 'Name is not valid').isAlpha();
    req.assert('name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[0]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].telecom[0].value', 'Phone Number is not valid').isNumeric();
    // req.assert('contact[0].telecom[1].value', 'Email is not valid').isEmail();

    const errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors);
    } else {
        var resolve = req.get('Authorization');
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        var patientData = req.body;
        patientService.postPatient(patientData, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(patientData.name.given, 'could not be added', new Date(), '', '', err);
                res.status(500).send(err);
            } else if (data.errors) {
                res.status(400).send(data.errors);
            }
            else {
                auditLog.logEvent(patientData.name.given, 'was added successfully', new Date());
                res.status(200).send(data);
            }
        });
    }

};

/**
 * Get Patient by Id
 * @param req
 * @param res
 * @posts PatientId to PatientService
 */
module.exports.getPatientById = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var PatientId = req.param('id');
    if (PatientId == '') {
        res.status(500).send({ message: 'Id is empty' });
    } else {
        patientService.getPatientById(PatientId, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent(PatientId, 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent(PatientId, 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};

/**
 * Update Patient by Id
 * @param req
 * @param res
 * @posts PatientId to PatientService
 */
module.exports.updatePatientById = (req, res) => {
    // req.assert('telecom[0].value', 'Phone Number is not valid').isNumeric();
    req.assert('telecom[0].value', 'Email is not valid').isEmail();
    req.assert('name.given[0]', 'Name is not valid').isAlpha();
    req.assert('name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[0]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].name.given[1]', 'Name is not valid').isAlpha();
    // req.assert('contact[0].telecom[0].value', 'Phone Number is not valid').isNumeric();
    // req.assert('contact[0].telecom[1].value', 'Email is not valid').isEmail();
    const errors = req.validationErrors();

    if (errors) {
        res.status(500).send(errors);
    } else {
        var resolve = req.get('Authorization');
        var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
        var id = req.param('id');
        var PatientData = req.body;
        patientService.updatePatientById(id, PatientData, incomingToken, function (data, err) {
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
 * Get all Patient 
 * @param req
 * @param res
 */
module.exports.getAllPatient = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    patientService.getAllPatient(incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent('All Patient data', 'was not retrieved successfully', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent('All Patient data', 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get Patient by Name
 * @param req
 * @param res
 * @posts PatientName to PatientService
 */
module.exports.getPatientByName = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var patientName = req.param('name');
    patientService.getPatientByName(patientName, incomingToken, function (data, err) {
        if (err) {
            auditLog.logEvent(patientName, 'could not be retrieved', new Date(), '', '', err);
            res.status(500).send(err);
        } else {
            auditLog.logEvent(patientName, 'was retrieved successfully', new Date());
            res.status(200).send(data);
        }
    });
};

/**
 * Get Patient by Active
 * @param req
 * @param res
 */
module.exports.getPatientByActive = (req, res) => {
    var resolve = req.get('Authorization');
    var incomingToken = resolve.substr(resolve.indexOf(' ') + 1);
    var active = req.param('active');
    if (active != 'true' && active != 'false') {
        res.send({ message: 'Please provide valid inputs, Accepts true/false' });
    } else {
        patientService.getPatientByActive(active, incomingToken, function (data, err) {
            if (err) {
                auditLog.logEvent('Patients', 'could not be retrieved', new Date(), '', '', err);
                res.status(500).send(err);
            } else {
                auditLog.logEvent('Patients', 'was retrieved successfully', new Date());
                res.status(200).send(data);
            }
        });
    }
};



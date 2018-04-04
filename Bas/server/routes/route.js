var express = require('express');
var apiRoutes = express.Router();
// var personTokenVerification = require('../middleware/personTokenVerification');
// var practitionerTokenVerification = require('../middleware/practitionerTokenVerification');
var personController = require('../controllers/personController');
var partnerController = require('../controllers/partnerController');
var patientController = require('../controllers/patientController');
var medicationDispenseController = require('../controllers/medicationDispenseController');
var allergyIntoleranceController = require('../controllers/allergyIntoleranceController');
var careTeamController = require('../controllers/careTeamController');
var conditionController = require('../controllers/conditionController');
var deviceController = require('../controllers/deviceController');
var doseRegisterMasterController = require('../controllers/doseRegisterMasterController');
var groupController = require('../controllers/groupController');
var medicationRequestController = require('../controllers/medicationRequestController');
var medicationStatementController = require('../controllers/medicationStatementController');
var observationController = require('../controllers/observationController');
var organizationController = require('../controllers/organizationController');
var practitionerController = require('../controllers/practitionerController');
var relatedPersonController = require('../controllers/relatedPersonController');
var testScheduleController = require('../controllers/testScheduleController');
var sessionController = require('../controllers/sessionController');
var clinicalImpressionController = require('../controllers/clinicalImpressionController');
var appointmentController = require('../controllers/appointmentController');
var dashboardController = require('../controllers/dashboardController');
var preferenceController = require('../controllers/preferenceController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();



apiRoutes.post('/person', personController.postPerson);
apiRoutes.post('/practitioner', practitionerController.postPractitioner);
apiRoutes.post('/partner', partnerController.postPartner);
apiRoutes.get('/allObservation', observationController.getAllObservation);
apiRoutes.get('/allDevice', deviceController.getAllDevice);
apiRoutes.get('/allMedicationDispense', medicationDispenseController.getAllMedicationDispense);
apiRoutes.get('/allCondition', conditionController.getAllCondition);
apiRoutes.get('/allAllergyIntolerance', allergyIntoleranceController.getAllAllergyIntolerance);

apiRoutes.post('/preference', preferenceController.postPreference );
apiRoutes.put('/preference', preferenceController.updatePreference );
apiRoutes.put('/preference/person', preferenceController.updatePreferenceByPersonId );
apiRoutes.get('/preference', preferenceController.getpreferenceById );
apiRoutes.get('/preference/person', preferenceController.getpreferenceByPersonId );


//session
apiRoutes.post('/forgotPassword', sessionController.forgotPassword);
apiRoutes.post('/resetPassword', sessionController.resetPassword);
apiRoutes.post('/login', sessionController.login);
apiRoutes.post('/checkMailExists', sessionController.checkMailExists);
apiRoutes.get('/logout', sessionController.logout);


//image upload for app api
apiRoutes.post('/imageUpload', multipartMiddleware, personController.imageUpload);

//person
apiRoutes.get('/person', personController.getPersonById);
apiRoutes.get('/personByActive', personController.getPersonByActive);
apiRoutes.get('/personByName', personController.getPersonByName);
apiRoutes.put('/person', personController.updatePersonById);
apiRoutes.get('/allPerson', personController.getAllPerson);
apiRoutes.get('/viewPairRequest', personController.viewPairOrUnPairPractitionerRequest);
apiRoutes.get('/respondPairRequest', personController.acceptOrDeclinePairRequest);
apiRoutes.get('/person/hisRelatedPerson', personController.getAllRelatedPersonOfGuardian);
apiRoutes.post('/updatePersonImage', multipartMiddleware, personController.updatePersonImage);
apiRoutes.post('/createAndSendInviteCode', personController.createAndSendFriendInviteCode);
apiRoutes.post('/acceptFriendCode', personController.acceptFriendCode);
apiRoutes.get('/friends', personController.getAllFriendsOfPerson);


//partner
apiRoutes.get('/partner', partnerController.getPartnerById);
apiRoutes.get('/partnerByActive', partnerController.getPartnerByActive);
apiRoutes.get('/partnerByName', partnerController.getPartnerByName);
apiRoutes.put('/partner', partnerController.updatePartnerById);
apiRoutes.get('/allPartner', partnerController.getAllPartner);

//patient
apiRoutes.post('/patient', patientController.postPatient);
apiRoutes.get('/patient', patientController.getPatientById);
apiRoutes.get('/patientByActive', patientController.getPatientByActive);
apiRoutes.get('/patientByName', patientController.getPatientByName);
apiRoutes.put('/patient', patientController.updatePatientById);
apiRoutes.get('/allPatient', patientController.getAllPatient);

//practitioner
apiRoutes.get('/practitioner', practitionerController.getPractitionerById);
apiRoutes.get('/practitionerByActive', practitionerController.getPractitionerByActive);
apiRoutes.put('/practitioner', practitionerController.updatePractitionerById);
apiRoutes.get('/allPractitioner', practitionerController.getAllPractitioner);
apiRoutes.get('/viewSentPairRequests', practitionerController.viewSentPairRequests);
apiRoutes.post('/sendPairRequest', practitionerController.sendPairRequestToPractitioner);
apiRoutes.get('/practitionerByName', practitionerController.getPractitionerByName);

//relatedPerson
apiRoutes.post('/relatedPerson', relatedPersonController.postRelatedPerson);
apiRoutes.get('/relatedPerson', relatedPersonController.getRelatedPersonById);
apiRoutes.get('/relatedPersonByActive', relatedPersonController.getRelatedPersonByActive);
apiRoutes.get('/relatedPersonByName', relatedPersonController.getRelatedPersonByName);
apiRoutes.put('/relatedPerson', relatedPersonController.updateRelatedPersonById);
apiRoutes.get('/allRelatedPerson', relatedPersonController.getAllRelatedPerson);

//testSchedule
apiRoutes.get('/testSchedule', testScheduleController.getTestScheduleById);
apiRoutes.get('/testScheduleByActive', testScheduleController.getTestScheduleByActive);
apiRoutes.post('/testSchedule', testScheduleController.postTestSchedule);
apiRoutes.put('/testSchedule', testScheduleController.updateTestScheduleById);
apiRoutes.get('/allTestSchedule', testScheduleController.getAllTestSchedule);

//organization
apiRoutes.get('/organization', organizationController.getOrganizationById);
apiRoutes.get('/organizationByActive', organizationController.getOrganizationByActive);
apiRoutes.get('/organizationByName', organizationController.getOrganizationByName);
apiRoutes.post('/organization', organizationController.postOrganization);
apiRoutes.put('/organization', organizationController.updateOrganizationById);
apiRoutes.get('/allOrganization', organizationController.getAllOrganization);

//observation
apiRoutes.get('/observation', observationController.getObservationById);
apiRoutes.get('/observationByActive', observationController.getObservationByActive);
apiRoutes.get('/observationByName', observationController.getObservationByName);
apiRoutes.post('/observation', observationController.postObservation);
apiRoutes.put('/observation', observationController.updateObservationById);

//medicationStatement
apiRoutes.get('/medicationStatement', medicationStatementController.getMedicationStatementById);
apiRoutes.get('/allMedicationStatement', medicationStatementController.getAllMedicationStatement);
apiRoutes.get('/medicationStatementByActive', medicationStatementController.getMedicationStatementByActive);
apiRoutes.get('/medicationStatement/patient', medicationStatementController.getMedicationStatementOfPatient);
apiRoutes.post('/medicationStatement', medicationStatementController.postMedicationStatement);
apiRoutes.put('/medicationStatement', medicationStatementController.updateMedicationStatementById);
apiRoutes.get('/medicationStatement/patient/onDate', medicationStatementController.getMedicationStatementOfPatientOnDate);
apiRoutes.get('/medicationStatement/patient/betweenDates', medicationStatementController.getMedicationStatementOfPatientBetweenDates);
apiRoutes.get('/medicationStatement/patient/history', medicationStatementController.getMedicationStatementByPatientIdAndMedicationRequestId);

//medicationRequest
apiRoutes.get('/medicationRequest', medicationRequestController.getMedicationRequestById);
apiRoutes.get('/medicationRequestByActive', medicationRequestController.getMedicationRequestByActive);
apiRoutes.post('/medicationRequest', medicationRequestController.postMedicationRequest);
apiRoutes.put('/medicationRequest', medicationRequestController.updateMedicationRequestById);
apiRoutes.get('/medicationRequest/patient', medicationRequestController.getMedicationRequestsByPatientID);
apiRoutes.get('/allMedicationRequest', medicationRequestController.getAllMedicationRequest);
apiRoutes.get('/medicationRequest/patient/history', medicationRequestController.getMedicationRequestByMedicationDispenseIdAndPatientId);

//group
apiRoutes.get('/group', groupController.getGroupById);
apiRoutes.get('/groupByActive', groupController.getGroupByActive);
apiRoutes.post('/group', groupController.postGroup);
apiRoutes.put('/group', groupController.updateGroupById);
apiRoutes.get('/group/patient', groupController.getGroupByPersonId);
apiRoutes.get('/allGroup', groupController.getAllGroup);

//doseRegisterMaster
apiRoutes.get('/doseRegisterMaster', doseRegisterMasterController.getDoseRegisterMasterById);
apiRoutes.get('/doseRegisterMasterByActive', doseRegisterMasterController.getDoseRegisterMasterByActive);
apiRoutes.post('/doseRegisterMaster', doseRegisterMasterController.postDoseRegisterMaster);
apiRoutes.put('/doseRegisterMaster', doseRegisterMasterController.updateDoseRegisterMasterById);
apiRoutes.get('/allDoseRegisterMaster', doseRegisterMasterController.getAllDoseRegisterMaster);

//device
apiRoutes.get('/device', deviceController.getDeviceById);
apiRoutes.get('/deviceByActive', deviceController.getDeviceByActive);
apiRoutes.get('/deviceByName', deviceController.getDeviceByName);
apiRoutes.post('/device', deviceController.postDevice);
apiRoutes.put('/device', deviceController.updateDeviceById);

//condition
apiRoutes.get('/condition', conditionController.getConditionById);
apiRoutes.get('/conditionByActive', conditionController.getConditionByActive);
apiRoutes.get('/conditionByName', conditionController.getConditionByName);
apiRoutes.post('/condition', conditionController.postCondition);
apiRoutes.put('/condition', conditionController.updateConditionById);

//careTeam
apiRoutes.get('/careTeam/patient', careTeamController.getCareTeamByPatientId);
apiRoutes.put('/careTeam', careTeamController.updateCareTeamById);
apiRoutes.post('/careTeam', careTeamController.postCareTeam);
apiRoutes.get('/careTeam', careTeamController.getCareTeamById);
apiRoutes.get('/careTeam/practitioner', careTeamController.getCareTeamByPractitionerId);
apiRoutes.get('/careTeamByActive', careTeamController.getCareTeamByActive);
apiRoutes.get('/allCareTeam', careTeamController.getAllCareTeam);

//allergyIntolerance
apiRoutes.get('/allergyIntolerance', allergyIntoleranceController.getAllergyIntoleranceById);
apiRoutes.get('/allergyIntoleranceByActive', allergyIntoleranceController.getAllergyIntoleranceByActive);
apiRoutes.get('/allergyIntoleranceByName', allergyIntoleranceController.getAllergyIntoleranceByName);
apiRoutes.post('/allergyIntolerance', allergyIntoleranceController.postAllergyIntolerance);
apiRoutes.put('/allergyIntolerance', allergyIntoleranceController.updateAllergyIntoleranceById);

//medicationDispense
apiRoutes.get('/medicationDispense', medicationDispenseController.getMedicationDispenseById);
apiRoutes.get('/medicationDispenseByActive', medicationDispenseController.getMedicationDispenseByActive);
apiRoutes.post('/medicationDispense', medicationDispenseController.postMedicationDispense);
apiRoutes.put('/medicationDispense', medicationDispenseController.updateMedicationDispenseById);
apiRoutes.post('/updateDispenceImage', multipartMiddleware, medicationDispenseController.updateDispenceImage);

//clinicalImpression
apiRoutes.get('/clinicalImpression', clinicalImpressionController.getClinicalImpressionById);
apiRoutes.get('/clinicalImpressionByActive', clinicalImpressionController.getClinicalImpressionByActive);
apiRoutes.post('/clinicalImpression', clinicalImpressionController.postClinicalImpression);
apiRoutes.put('/clinicalImpression', clinicalImpressionController.updateClinicalImpressionById);
apiRoutes.get('/clinicalImpression/patient', clinicalImpressionController.getClinicalImpressionByPatientId);
apiRoutes.get('/allClinicalImpression', clinicalImpressionController.getAllClinicalImpression);

//appointment
apiRoutes.post('/appointment', appointmentController.postAppointment);
apiRoutes.get('/appointment', appointmentController.getAppointmentById);
apiRoutes.put('/appointment', appointmentController.updateAppointmentById);
apiRoutes.get('/allAppointment', appointmentController.getAllAppointment);
apiRoutes.get('/viewAppoinmentByPatientId', appointmentController.viewAppoinmentByPatientId);
apiRoutes.get('/viewAppoinmentByPractitionerId', appointmentController.viewAppoinmentByPractitionerId);

//session
apiRoutes.post('/changePassword', sessionController.changePassword);


//dashboard
apiRoutes.get('/dashboard', dashboardController.getDashboardData);

module.exports = apiRoutes;
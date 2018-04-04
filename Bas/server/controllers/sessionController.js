var sessionService = require('../services/sessionService');
var emailConfig = require('../configuration/emailConfig');
var Session = require('../models/Session');
const nodemailer = require('nodemailer');
const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const jwt = require('jsonwebtoken');

/**
 * change password for  a user
 * @param req
 * @param res
 * @sends data to sessionService
 */
module.exports.changePassword = (req, res) => {
    var sessionData = req.body;
    sessionService.changePassword(sessionData, function (data, err) {
        if (err) {
            res.status(500).send(err);
        } else if (data.errors) {
            res.status(400).send(data.errors);
        }
        else {
            res.status(200).send(data);
        }
    });
};


/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
module.exports.forgotPassword = (req, res, next) => {
    const createRandomToken = crypto
        .randomBytesAsync(16)
        .then(buf => buf.toString('hex'));

    const setRandomToken = token =>

        Session.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    res.send({ message: 'Email Doesnt Exist' });
                } else {
                    user.passwordResetToken = token;
                    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                    user = user.save();
                }
                return user;
            });

    const sendForgotPasswordEmail = (user) => {
        if (!user) { return; }
        const token = user.passwordResetToken;
        const transporter = nodemailer.createTransport({
            service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
            auth: {
                user: emailConfig.SERVICE_EMAIL,
                pass: emailConfig.SERVICE_EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            to: user.email,
            from: emailConfig.EMAIL_FROM,
            subject: emailConfig.FORGOT_PASSWORD_SUBJECT,
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            https://vbjgjko57j.execute-api.us-east-1.amazonaws.com/api/resetpassword?token=${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        return transporter.sendMail(mailOptions)
            .then(() => {
                res.send({ message: `An e-mail has been sent to ${user.email} with further instructions.` });
            });
    };

    createRandomToken
        .then(setRandomToken)
        .then(sendForgotPasswordEmail)
        // .then(() => res.redirect('/forgot'))
        .catch(next);
};


/**
 * POST /reset/:token
 * Process the reset password request.
 */
module.exports.resetPassword = (req, res) => {

    Session.findOne({ passwordResetToken: req.param('token') })
        .where('passwordResetExpires').gt(Date.now())
        .then((user) => {
            if (!user) {
                res.send({ message: 'Password reset token is invalid or has expired.' });
            } else {
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                user.save(function () { });
                const transporter = nodemailer.createTransport({
                    service: emailConfig.EMAIL_SERVICE_MIDDLEWARE,
                    auth: {
                        user: emailConfig.SERVICE_EMAIL,
                        pass: emailConfig.SERVICE_EMAIL_PASSWORD
                    }
                });
                const mailOptions = {
                    to: user.email,
                    from: emailConfig.EMAIL_FROM,
                    subject: emailConfig.RESET_PASSWORD_SUBJECT,
                    text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
                };
                return transporter.sendMail(mailOptions)
                    .then(() => {
                        res.send({ message: 'Success! Your password has been changed.' });
                    });
            }

        });
};



/**
 * POST /login
 * Process the login request of the practitioner.
 */

module.exports.login = (req, res) => {
    Session.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
        if (err) { res.status(500).send(err); }
        if (!user) {
            res.status(200).send({ message: `Email ${req.body.email} not found or x-access-id not found` });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) { res.status(500).send(err); }
                if (isMatch) {
                    var uniqueUserEmail = req.body.email.toLowerCase();
                    var newXid = jwt.sign({ id: uniqueUserEmail }, 'AEROBIT', {
                        expiresIn: '2h'
                    });
                    var resolveForSession = {
                        xid: newXid
                    };
                    Session.findOne({ email: req.body.email.toLowerCase() }, function (err, data) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            Session.findByIdAndUpdate({ _id: data._id }, { $set: resolveForSession }, { upsert: true }, function (err, data) {
                                if (err) {
                                    res.status(400).send(err);
                                } else {
                                    var resolvingObject = {
                                        email: data.email,
                                        type: data.userType,
                                        userId: data.userId,
                                        xid: newXid,
                                        status: 'User Log In Success'
                                    };
                                    res.status(200).send(resolvingObject);
                                }
                            });
                        }
                    });
                }
                else {
                    res.status(200).send({ message: 'Invalid password' });
                }
            });
        }
    });
};


/**
 * GET /logout
 * Log out.
 */
module.exports.logout = (req, res) => {
    const personId = req.param('id');
    if (!personId) {
        res.status(200).send({ message: 'Please provide valid id' });
    }
    else {
        var resolvingObject = {
            xid: 'LoggedOut'
        };
        Session.findOne({ userId: personId }, function (err, data) {
            if (err) {
                res.status(400).send(err);
            } else {
                if (data.xid == 'LoggedOut') {
                    res.status(200).send({ message: 'You are already logged out, Please login to continue' });
                } else {
                    Session.findOneAndUpdate({ userId: personId }, { $set: resolvingObject }, { upsert: true, new: true }, function (err, data) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.status(200).send({ message: 'You are logged out' });
                        }
                    });

                }
            }
        });

    }
};



/**
 * check the mail is exists or not
 * @param req
 * @param res
 * @sends data to sessionService
 */
module.exports.checkMailExists = (req, res) => {
    var sessionData = req.body;
    Session.findOne({ email: sessionData.email.toLowerCase() }, (err, user) => {
        if (user != null) {
            res.status(200).send({ status: false, message: 'Email Exists' });
        } else {
            res.status(200).send({ status: true, message: 'Email Doesnt Exists' });
        }
    });
};
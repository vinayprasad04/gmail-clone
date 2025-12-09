const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const gmailController = require('../controllers/gmailController');
const { hasValidCredentials } = require('../config/googleAuth');

// Middleware to check if Gmail API is authorized
const checkGmailAuth = (req, res, next) => {
    if (hasValidCredentials()) {
        req.useGmailAPI = true;
    } else {
        req.useGmailAPI = false;
    }
    next();
};

// Send email (tries Gmail API first, falls back to SMTP)
router.post('/send', checkGmailAuth, (req, res, next) => {
    if (req.useGmailAPI) {
        gmailController.sendEmailGmailAPI(req, res, next);
    } else {
        emailController.sendEmail(req, res, next);
    }
});

// Get all emails (tries Gmail API first, falls back to mock data)
router.get('/', checkGmailAuth, (req, res, next) => {
    if (req.useGmailAPI) {
        gmailController.getGmailEmails(req, res, next);
    } else {
        emailController.getEmails(req, res, next);
    }
});

// Get single email (tries Gmail API first, falls back to mock data)
router.get('/:id', checkGmailAuth, (req, res, next) => {
    if (req.useGmailAPI) {
        gmailController.getGmailEmailById(req, res, next);
    } else {
        emailController.getEmailById(req, res, next);
    }
});

// Toggle star (tries Gmail API first, falls back to mock data)
router.put('/:id/star', checkGmailAuth, (req, res, next) => {
    if (req.useGmailAPI) {
        gmailController.toggleGmailStar(req, res, next);
    } else {
        emailController.toggleStar(req, res, next);
    }
});

// Toggle read status (tries Gmail API first, falls back to mock data)
router.put('/:id/read', checkGmailAuth, (req, res, next) => {
    if (req.useGmailAPI) {
        gmailController.toggleGmailRead(req, res, next);
    } else {
        emailController.toggleRead(req, res, next);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Send email
router.post('/send', emailController.sendEmail);

// Get all emails
router.get('/', emailController.getEmails);

// Get single email
router.get('/:id', emailController.getEmailById);

// Toggle star
router.put('/:id/star', emailController.toggleStar);

// Toggle read status
router.put('/:id/read', emailController.toggleRead);

module.exports = router;

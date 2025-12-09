const express = require('express');
const router = express.Router();
const { getAuthUrl, getTokenFromCode } = require('../config/googleAuth');

// Get authorization URL
router.get('/google', (req, res) => {
    const authUrl = getAuthUrl();
    res.json({
        success: true,
        authUrl: authUrl,
        message: 'Please visit this URL to authorize the application'
    });
});

// OAuth2 callback
router.get('/google/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code not provided');
    }

    try {
        await getTokenFromCode(code);
        res.send(`
            <html>
                <body style="font-family: Arial; text-align: center; padding: 50px;">
                    <h1 style="color: green;">✓ Authorization Successful!</h1>
                    <p>Your Gmail account has been connected successfully.</p>
                    <p>You can now close this window and return to your application.</p>
                    <script>
                        setTimeout(() => window.close(), 3000);
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send(`
            <html>
                <body style="font-family: Arial; text-align: center; padding: 50px;">
                    <h1 style="color: red;">✗ Authorization Failed</h1>
                    <p>Error: ${error.message}</p>
                    <p>Please try again.</p>
                </body>
            </html>
        `);
    }
});

// Check auth status
router.get('/status', (req, res) => {
    const { hasValidCredentials } = require('../config/googleAuth');
    const isAuthorized = hasValidCredentials();

    res.json({
        success: true,
        isAuthorized: isAuthorized,
        message: isAuthorized
            ? 'Gmail API is authorized'
            : 'Gmail API authorization required'
    });
});

module.exports = router;

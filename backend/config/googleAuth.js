const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TOKEN_PATH = path.join(__dirname, 'token.json');

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Scopes for Gmail API
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose'
];

// Generate authentication URL
function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
}

// Exchange authorization code for tokens
async function getTokenFromCode(code) {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Save tokens to file
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        console.log('✓ Tokens saved to', TOKEN_PATH);

        return tokens;
    } catch (error) {
        console.error('Error retrieving access token:', error);
        throw error;
    }
}

// Load saved tokens if they exist
function loadSavedTokens() {
    try {
        if (fs.existsSync(TOKEN_PATH)) {
            const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
            oauth2Client.setCredentials(tokens);
            console.log('Loaded saved OAuth2 tokens');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error loading saved tokens:', error);
        return false;
    }
}

// Check if we have valid credentials
function hasValidCredentials() {
    return oauth2Client.credentials && oauth2Client.credentials.access_token;
}

// Refresh token if expired
oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        try {
            // Save the new refresh token
            let savedTokens = {};
            if (fs.existsSync(TOKEN_PATH)) {
                savedTokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
            }
            savedTokens.refresh_token = tokens.refresh_token;
            if (tokens.access_token) {
                savedTokens.access_token = tokens.access_token;
            }
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(savedTokens, null, 2));
            console.log('✓ Tokens refreshed and saved');
        } catch (error) {
            console.error('Error saving refreshed tokens:', error);
        }
    }
});

module.exports = {
    oauth2Client,
    getAuthUrl,
    getTokenFromCode,
    loadSavedTokens,
    hasValidCredentials
};

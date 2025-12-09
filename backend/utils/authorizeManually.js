const { getTokenFromCode } = require('../config/googleAuth');

// Extract the code from your URL
const authCode = '4/0ATX87IMghn6gsjHpVlDhuoBGHRFcTjay2wf-aRhhdZXlnrQtLzWp6R6NKOKtybKBZ2p1iQ';

async function authorize() {
    try {
        console.log('Attempting to exchange authorization code for tokens...');
        const tokens = await getTokenFromCode(authCode);
        console.log('✓ Successfully authorized!');
        console.log('Tokens saved. You can now restart the server.');
        process.exit(0);
    } catch (error) {
        console.error('✗ Authorization failed:', error.message);
        process.exit(1);
    }
}

authorize();

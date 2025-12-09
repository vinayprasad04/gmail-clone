const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const emailRoutes = require('./routes/emailRoutes');
const authRoutes = require('./routes/authRoutes');
const { loadSavedTokens, hasValidCredentials, getAuthUrl } = require('./config/googleAuth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/emails', emailRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Gmail Clone API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);

    // Try to load saved OAuth tokens
    const tokensLoaded = loadSavedTokens();

    if (tokensLoaded && hasValidCredentials()) {
        console.log('✓ Gmail API is authorized and ready!');
    } else {
        console.log('\n⚠️  Gmail API Authorization Required!');
        console.log('Please visit this URL to authorize:');
        console.log(getAuthUrl());
        console.log('\nOr access: http://localhost:5000/api/auth/google\n');
    }
});

module.exports = app;

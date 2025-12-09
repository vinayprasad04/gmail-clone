const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleAuth');
const transporter = require('../config/nodemailer');

// Initialize Gmail API
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Send Email via Gmail API
exports.sendEmailGmailAPI = async (req, res) => {
    try {
        const { to, subject, message, cc, bcc } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide to, subject, and message fields'
            });
        }

        // Create email content
        const emailLines = [];
        emailLines.push(`To: ${to}`);
        if (cc) emailLines.push(`Cc: ${cc}`);
        if (bcc) emailLines.push(`Bcc: ${bcc}`);
        emailLines.push(`Subject: ${subject}`);
        emailLines.push('Content-Type: text/html; charset=utf-8');
        emailLines.push('');
        emailLines.push(message);

        const email = emailLines.join('\r\n');
        const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedEmail
            }
        });

        res.status(200).json({
            success: true,
            message: 'Email sent successfully via Gmail API',
            messageId: response.data.id
        });

    } catch (error) {
        console.error('Error sending email via Gmail API:', error);

        // Fallback to SMTP if Gmail API fails
        try {
            const { to, subject, message, cc, bcc } = req.body;
            const mailOptions = {
                from: `"Gmail Clone" <${process.env.EMAIL_USER}>`,
                to: to,
                subject: subject,
                html: message,
                cc: cc || '',
                bcc: bcc || ''
            };

            const info = await transporter.sendMail(mailOptions);

            res.status(200).json({
                success: true,
                message: 'Email sent successfully via SMTP (fallback)',
                messageId: info.messageId
            });
        } catch (smtpError) {
            res.status(500).json({
                success: false,
                message: 'Failed to send email',
                error: error.message
            });
        }
    }
};

// Get emails from Gmail
exports.getGmailEmails = async (req, res) => {
    try {
        const { category = 'INBOX', limit = 20, page = 1, pageToken, q } = req.query;

        // Map category to Gmail labels
        const labelMap = {
            'primary': 'INBOX',
            'social': 'CATEGORY_SOCIAL',
            'promotions': 'CATEGORY_PROMOTIONS',
            'inbox': 'INBOX',
            'sent': 'SENT',
            'drafts': 'DRAFT',
            'spam': 'SPAM',
            'trash': 'TRASH',
            'starred': 'STARRED'
        };

        const labelId = labelMap[category.toLowerCase()] || 'INBOX';
        const maxResults = parseInt(limit);

        // Get message list with pagination
        const listParams = {
            userId: 'me',
            labelIds: [labelId],
            maxResults: maxResults
        };

        // Add search query if provided (Gmail API search syntax)
        if (q && q.trim()) {
            listParams.q = q.trim();
        }

        // Add pageToken if provided for next page
        if (pageToken) {
            listParams.pageToken = pageToken;
        }

        const listResponse = await gmail.users.messages.list(listParams);

        if (!listResponse.data.messages || listResponse.data.messages.length === 0) {
            return res.status(200).json({
                success: true,
                emails: [],
                total: 0,
                nextPageToken: null,
                totalPages: 0
            });
        }

        // Get total count (Gmail API provides resultSizeEstimate)
        const totalCount = listResponse.data.resultSizeEstimate || 0;

        // Get full message details
        const emails = await Promise.all(
            listResponse.data.messages.map(async (message) => {
                const msg = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                    format: 'full'
                });

                const headers = msg.data.payload.headers;
                const getHeader = (name) => {
                    const header = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
                    return header ? header.value : '';
                };

                // Extract email body
                let body = '';
                if (msg.data.payload.parts) {
                    const htmlPart = msg.data.payload.parts.find(part => part.mimeType === 'text/html');
                    const textPart = msg.data.payload.parts.find(part => part.mimeType === 'text/plain');

                    if (htmlPart && htmlPart.body.data) {
                        body = Buffer.from(htmlPart.body.data, 'base64').toString('utf-8');
                    } else if (textPart && textPart.body.data) {
                        body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
                    }
                } else if (msg.data.payload.body.data) {
                    body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
                }

                // Get snippet
                const snippet = msg.data.snippet || '';

                // Parse date
                const date = new Date(parseInt(msg.data.internalDate));
                const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                // Parse from email
                const fromHeader = getHeader('From');
                let fromName = fromHeader;
                let fromEmail = fromHeader;
                const match = fromHeader.match(/(.*?)\s*<(.+?)>/);
                if (match) {
                    fromName = match[1].replace(/"/g, '').trim();
                    fromEmail = match[2].trim();
                }

                return {
                    id: msg.data.id,
                    threadId: msg.data.threadId,
                    from: {
                        name: fromName || fromEmail,
                        email: fromEmail
                    },
                    to: getHeader('To'),
                    subject: getHeader('Subject') || '(No Subject)',
                    snippet: snippet,
                    body: body,
                    date: date.toISOString(),
                    time: time,
                    isRead: !msg.data.labelIds.includes('UNREAD'),
                    isStarred: msg.data.labelIds.includes('STARRED'),
                    isImportant: msg.data.labelIds.includes('IMPORTANT'),
                    labels: msg.data.labelIds
                };
            })
        );

        res.status(200).json({
            success: true,
            emails: emails,
            total: totalCount,
            nextPageToken: listResponse.data.nextPageToken || null,
            page: parseInt(page),
            totalPages: Math.ceil(totalCount / maxResults)
        });

    } catch (error) {
        console.error('Error fetching Gmail emails:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch emails. Make sure you are authorized.',
            error: error.message
        });
    }
};

// Get single email by ID
exports.getGmailEmailById = async (req, res) => {
    try {
        const { id } = req.params;

        const msg = await gmail.users.messages.get({
            userId: 'me',
            id: id,
            format: 'full'
        });

        const headers = msg.data.payload.headers;
        const getHeader = (name) => {
            const header = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
            return header ? header.value : '';
        };

        // Extract email body
        let body = '';
        if (msg.data.payload.parts) {
            const htmlPart = msg.data.payload.parts.find(part => part.mimeType === 'text/html');
            const textPart = msg.data.payload.parts.find(part => part.mimeType === 'text/plain');

            if (htmlPart && htmlPart.body.data) {
                body = Buffer.from(htmlPart.body.data, 'base64').toString('utf-8');
            } else if (textPart && textPart.body.data) {
                body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
            }
        } else if (msg.data.payload.body.data) {
            body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
        }

        // Parse date
        const date = new Date(parseInt(msg.data.internalDate));
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        // Parse from email
        const fromHeader = getHeader('From');
        let fromName = fromHeader;
        let fromEmail = fromHeader;
        const match = fromHeader.match(/(.*?)\s*<(.+?)>/);
        if (match) {
            fromName = match[1].replace(/"/g, '').trim();
            fromEmail = match[2].trim();
        }

        const email = {
            id: msg.data.id,
            threadId: msg.data.threadId,
            from: {
                name: fromName || fromEmail,
                email: fromEmail
            },
            to: getHeader('To'),
            subject: getHeader('Subject') || '(No Subject)',
            snippet: msg.data.snippet || '',
            body: body,
            date: date.toISOString(),
            time: time,
            isRead: !msg.data.labelIds.includes('UNREAD'),
            isStarred: msg.data.labelIds.includes('STARRED'),
            isImportant: msg.data.labelIds.includes('IMPORTANT'),
            labels: msg.data.labelIds
        };

        res.status(200).json({
            success: true,
            email: email
        });

    } catch (error) {
        console.error('Error fetching Gmail email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email',
            error: error.message
        });
    }
};

// Toggle star
exports.toggleGmailStar = async (req, res) => {
    try {
        const { id } = req.params;

        // Get current message to check if starred
        const msg = await gmail.users.messages.get({
            userId: 'me',
            id: id,
            format: 'minimal'
        });

        const isStarred = msg.data.labelIds.includes('STARRED');

        // Toggle star
        if (isStarred) {
            await gmail.users.messages.modify({
                userId: 'me',
                id: id,
                requestBody: {
                    removeLabelIds: ['STARRED']
                }
            });
        } else {
            await gmail.users.messages.modify({
                userId: 'me',
                id: id,
                requestBody: {
                    addLabelIds: ['STARRED']
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Email star toggled successfully',
            isStarred: !isStarred
        });

    } catch (error) {
        console.error('Error toggling star:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle star',
            error: error.message
        });
    }
};

// Toggle read status
exports.toggleGmailRead = async (req, res) => {
    try {
        const { id } = req.params;

        // Get current message to check if read
        const msg = await gmail.users.messages.get({
            userId: 'me',
            id: id,
            format: 'minimal'
        });

        const isUnread = msg.data.labelIds.includes('UNREAD');

        // Toggle read status
        if (isUnread) {
            await gmail.users.messages.modify({
                userId: 'me',
                id: id,
                requestBody: {
                    removeLabelIds: ['UNREAD']
                }
            });
        } else {
            await gmail.users.messages.modify({
                userId: 'me',
                id: id,
                requestBody: {
                    addLabelIds: ['UNREAD']
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Email read status toggled successfully',
            isRead: isUnread
        });

    } catch (error) {
        console.error('Error toggling read status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle read status',
            error: error.message
        });
    }
};

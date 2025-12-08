const transporter = require('../config/nodemailer');

// Send Email
exports.sendEmail = async (req, res) => {
    try {
        const { to, subject, message, cc, bcc } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide to, subject, and message fields'
            });
        }

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
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
};

// Mock data for inbox emails
const mockInboxEmails = [
    {
        id: 1,
        from: { name: 'Quora Digest', email: 'digest@quora.com' },
        subject: 'Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?',
        snippet: 'Many years ago in the early 1980\'s, a friend and colleague in SBI – a young officer who had joined SBI as a PO a few years back, wrote the test for IIM\'s and was called for the interview for...',
        body: '<p>Many years ago in the early 1980\'s, a friend and colleague in SBI – a young officer who had joined SBI as a PO a few years back, wrote the test for IIM\'s and was called for the interview for admission. He had a great academic record and was doing very well in SBI. However, he was in a dilemma whether to continue in SBI or join IIM.</p>',
        date: new Date().toISOString(),
        time: '7:44 PM',
        isRead: false,
        isStarred: false,
        isImportant: false,
        labels: ['primary']
    },
    {
        id: 2,
        from: { name: 'LinkedIn', email: 'notifications@linkedin.com' },
        subject: 'You have 5 new job opportunities',
        snippet: 'Based on your profile, here are some positions you might be interested in: Senior Full Stack Developer at TechCorp, Lead React Developer at StartupXYZ...',
        body: '<p>Based on your profile, here are some positions you might be interested in: Senior Full Stack Developer at TechCorp, Lead React Developer at StartupXYZ...</p>',
        date: new Date(Date.now() - 3600000).toISOString(),
        time: '6:30 PM',
        isRead: false,
        isStarred: true,
        isImportant: true,
        labels: ['social']
    },
    {
        id: 3,
        from: { name: 'GitHub', email: 'noreply@github.com' },
        subject: '[Gmail-Clone] New pull request merged',
        snippet: 'Your pull request #45 "Add email functionality" has been merged into main branch by vinayprasad04...',
        body: '<p>Your pull request #45 "Add email functionality" has been merged into main branch by vinayprasad04...</p>',
        date: new Date(Date.now() - 7200000).toISOString(),
        time: '5:15 PM',
        isRead: true,
        isStarred: false,
        isImportant: false,
        labels: ['primary']
    },
    {
        id: 4,
        from: { name: 'Amazon', email: 'order-update@amazon.com' },
        subject: 'Your order has been shipped',
        snippet: 'Good news! Your order #123-4567890-1234567 has been shipped and will arrive by December 10, 2025...',
        body: '<p>Good news! Your order #123-4567890-1234567 has been shipped and will arrive by December 10, 2025...</p>',
        date: new Date(Date.now() - 10800000).toISOString(),
        time: '4:00 PM',
        isRead: true,
        isStarred: false,
        isImportant: false,
        labels: ['promotions']
    },
    {
        id: 5,
        from: { name: 'Stack Overflow', email: 'noreply@stackoverflow.com' },
        subject: 'Your question received 3 new answers',
        snippet: 'The question "How to implement real-time updates in React?" has received 3 new answers. Check them out...',
        body: '<p>The question "How to implement real-time updates in React?" has received 3 new answers. Check them out...</p>',
        date: new Date(Date.now() - 14400000).toISOString(),
        time: '2:30 PM',
        isRead: false,
        isStarred: true,
        isImportant: false,
        labels: ['primary']
    }
];

// Get all emails (mock data)
exports.getEmails = async (req, res) => {
    try {
        const { category = 'primary', page = 1, limit = 50 } = req.query;

        let filteredEmails = mockInboxEmails;

        if (category !== 'all') {
            filteredEmails = mockInboxEmails.filter(email =>
                email.labels.includes(category.toLowerCase())
            );
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedEmails = filteredEmails.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            emails: paginatedEmails,
            total: filteredEmails.length,
            page: parseInt(page),
            totalPages: Math.ceil(filteredEmails.length / limit)
        });

    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch emails',
            error: error.message
        });
    }
};

// Get single email by ID
exports.getEmailById = async (req, res) => {
    try {
        const { id } = req.params;
        const email = mockInboxEmails.find(e => e.id === parseInt(id));

        if (!email) {
            return res.status(404).json({
                success: false,
                message: 'Email not found'
            });
        }

        res.status(200).json({
            success: true,
            email: email
        });

    } catch (error) {
        console.error('Error fetching email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email',
            error: error.message
        });
    }
};

// Star/Unstar email
exports.toggleStar = async (req, res) => {
    try {
        const { id } = req.params;
        const email = mockInboxEmails.find(e => e.id === parseInt(id));

        if (!email) {
            return res.status(404).json({
                success: false,
                message: 'Email not found'
            });
        }

        email.isStarred = !email.isStarred;

        res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            email: email
        });

    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update email',
            error: error.message
        });
    }
};

// Mark as read/unread
exports.toggleRead = async (req, res) => {
    try {
        const { id } = req.params;
        const email = mockInboxEmails.find(e => e.id === parseInt(id));

        if (!email) {
            return res.status(404).json({
                success: false,
                message: 'Email not found'
            });
        }

        email.isRead = !email.isRead;

        res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            email: email
        });

    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update email',
            error: error.message
        });
    }
};

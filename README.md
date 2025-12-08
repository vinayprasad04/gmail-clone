# Gmail Clone - React Application

A full-featured Gmail clone built with React and Node.js, supporting email sending via Gmail SMTP.

## Features

### Current Features (SMTP Approach)
- ✅ Gmail-like UI with Header, Left Menu, and Email List
- ✅ Compose Email Modal with Cc/Bcc support
- ✅ Send emails using Gmail SMTP (Nodemailer)
- ✅ View email list with mock data
- ✅ Email detail view
- ✅ Star/Unstar emails
- ✅ Tab navigation (Primary, Social, Promotions)
- ✅ Refresh emails
- ✅ Responsive compose modal (minimize/maximize)

### Future Features (Gmail API with OAuth2)
- 🔄 Read real emails from Gmail inbox
- 🔄 Delete, Archive, Mark as read/unread
- 🔄 Search functionality
- 🔄 Attachments support
- 🔄 Reply and Forward emails
- 🔄 Labels management
- 🔄 Filters and sorting

## Tech Stack

**Frontend:**
- React 18
- Sass (SCSS)
- Axios
- React Icons
- React Router DOM

**Backend:**
- Node.js
- Express
- Nodemailer (Gmail SMTP)
- CORS
- dotenv

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Gmail account with App Password enabled

### Step 1: Get Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** > **2-Step Verification** (enable if not enabled)
3. Scroll down to **App passwords**
4. Select app: **Mail**, Select device: **Other (Custom name)**
5. Copy the 16-character password

### Step 2: Clone and Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### Step 3: Configure Environment Variables

The `.env` file is already created in the `backend` folder with your credentials:

```env
EMAIL_USER=vinay.qss@gmail.com
EMAIL_PASS=jaznhofvilfzdukl
PORT=5000
```

### Step 4: Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
```

Backend will run on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
npm start
```

Frontend will run on http://localhost:3000

## Usage

### Sending Emails

1. Click the **Compose** button in the left menu
2. Fill in the recipient email, subject, and message
3. Optionally add Cc/Bcc recipients
4. Click **Send**

### Viewing Emails

- Browse through mock emails in the inbox
- Click on any email to view details
- Star/unstar emails by clicking the star icon
- Switch between Primary, Social, and Promotions tabs
- Click refresh to reload emails

## API Endpoints

### Email API (http://localhost:5000/api/emails)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/emails/send` | Send an email |
| GET | `/api/emails` | Get all emails (mock data) |
| GET | `/api/emails/:id` | Get single email by ID |
| PUT | `/api/emails/:id/star` | Toggle star on email |
| PUT | `/api/emails/:id/read` | Toggle read status |
| GET | `/api/health` | Health check |

### Send Email Request Example

```bash
curl -X POST http://localhost:5000/api/emails/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "message": "<p>Hello, this is a test email!</p>",
    "cc": "",
    "bcc": ""
  }'
```

## Project Structure

```
gmail-clone/
├── backend/
│   ├── config/
│   │   └── nodemailer.js       # Email configuration
│   ├── controllers/
│   │   └── emailController.js  # Email logic & mock data
│   ├── routes/
│   │   └── emailRoutes.js      # API routes
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── server.js               # Express server
│   └── package.json
├── src/
│   ├── componend/
│   │   ├── body/
│   │   │   ├── LeftMenu.js
│   │   │   ├── MainListing.js
│   │   │   └── UserList.js
│   │   ├── ComposeEmail.js
│   │   ├── EmailDetail.js
│   │   ├── Header.js
│   │   ├── SearchHeader.js
│   │   └── Body.js
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── style/
│   │   ├── body.scss
│   │   ├── compose.scss
│   │   ├── emailDetail.scss
│   │   ├── grid.scss
│   │   └── header.scss
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Future Upgrade: Gmail API with OAuth2

When you're ready to integrate Gmail API for full functionality:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Gmail API
3. Create OAuth 2.0 credentials
4. Update backend to use googleapis library
5. Implement OAuth flow in frontend

Let me know when you want to implement this!

## Troubleshooting

### Email not sending?

1. **Check App Password**: Make sure you're using the 16-character app password, not your regular Gmail password
2. **2-Step Verification**: Ensure 2-Step Verification is enabled on your Google account
3. **Backend Running**: Verify backend server is running on port 5000
4. **Firewall**: Check if port 5000 is not blocked by firewall

### Backend connection error?

1. Make sure backend server is running: `cd backend && npm start`
2. Check console for errors
3. Verify `.env` file exists in backend folder
4. Check if port 5000 is available

### CORS errors?

- Backend has CORS enabled for all origins during development
- If you still face issues, restart both servers

## Contributing

This is a demo project. Feel free to fork and enhance!

## License

ISC

---

**Built with ❤️ using React and Node.js**

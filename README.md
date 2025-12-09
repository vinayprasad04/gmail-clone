# Gmail Clone - React Application

A full-featured Gmail clone built with React and Node.js, featuring Gmail API integration with OAuth2 for complete email management.

## Features

### ✅ Implemented Features
- **Gmail API Integration**: Full OAuth2 authentication with Gmail API
- **Email Management**:
  - Read real emails from your Gmail account
  - Send emails via Gmail API (with SMTP fallback)
  - Star/unstar emails
  - Mark as read/unread
  - Delete and move to trash
- **Search Functionality**:
  - Direct search bar (type and press Enter)
  - Advanced search with filters (from, to, subject, keywords, size, date, attachments)
  - Gmail search query syntax support
- **Email Organization**:
  - Multiple folders (Inbox, Starred, Sent, Drafts, Spam, Trash)
  - Tab navigation (Primary, Social, Promotions)
  - Email counts for each folder
- **Pagination**: Navigate through all emails (20 per page) with pageToken support
- **UI Features**:
  - Gmail-like responsive interface
  - Compose email modal with Cc/Bcc support
  - Email detail view
  - Custom scrollbar for email list
  - Refresh functionality

## Tech Stack

**Frontend:**
- React 18
- Sass (SCSS)
- Axios
- React Icons
- React Router DOM

**Backend:**
- Node.js & Express
- Google APIs (Gmail API)
- Nodemailer (SMTP fallback)
- OAuth2 authentication
- CORS & body-parser

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Gmail account
- Google Cloud Console project with Gmail API enabled

### Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Gmail API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret

### Step 2: Gmail App Password (for SMTP fallback)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Generate password for "Mail" app
5. Copy the 16-character password

### Step 3: Clone and Install

```bash
# Clone the repository
git clone https://github.com/vinayprasad04/gmail-clone.git
cd gmail-clone

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### Step 4: Configure Environment Variables

Create `backend/.env` file:

```env
# Gmail SMTP (fallback)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password

# Gmail API OAuth2
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Server
PORT=5000
```

### Step 5: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```
Backend runs on: http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
npm start
```
Frontend runs on: http://localhost:3000

### Step 6: Authorize Gmail API

1. After starting the backend, check the console for the authorization URL
2. Visit the URL in your browser
3. Select your Gmail account
4. Grant all requested permissions
5. You'll be redirected back with authorization successful

**Or use the API endpoint:**
```bash
curl http://localhost:5000/api/auth/status
```

## Usage

### Search Emails

**Direct Search:**
1. Type query in the search bar
2. Press Enter or click the search icon
3. Searches across all email content

**Advanced Search:**
1. Click the filter icon (☰) next to the search bar
2. Fill in specific criteria:
   - **From**: Search by sender email
   - **To**: Search by recipient
   - **Subject**: Search by subject line
   - **Has the words**: Keywords to include
   - **Doesn't have**: Keywords to exclude
   - **Size**: Filter by email size (greater/less than X MB/KB)
   - **Date within**: Time range (1 day, 3 days, 1 week, etc.)
   - **Specific date**: Search after specific date
   - **Has attachment**: Only emails with attachments
3. Click "Search" to execute
4. Click "Clear filter" to reset

### Compose and Send Emails

1. Click **Compose** button in the left menu
2. Fill in recipient, subject, and message
3. Optionally add Cc/Bcc recipients
4. Click **Send**

### Navigate Emails

- Click on any email to view full details
- Use star icon to star/unstar emails
- Switch between folders using left sidebar
- Use pagination to browse all emails
- Click refresh to reload current view

### Folder Navigation

- **Inbox**: All incoming emails
- **Starred**: Starred emails
- **Sent**: Emails you've sent
- **Drafts**: Draft emails
- **Spam**: Spam emails
- **Trash**: Deleted emails

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/google` | Get OAuth2 authorization URL |
| GET | `/api/auth/google/callback` | OAuth2 callback handler |
| GET | `/api/auth/status` | Check authorization status |

### Email Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/emails` | Get emails with pagination & search |
| GET | `/api/emails/:id` | Get single email by ID |
| POST | `/api/emails/send` | Send an email |
| PUT | `/api/emails/:id/star` | Toggle star on email |
| PUT | `/api/emails/:id/read` | Toggle read status |
| GET | `/api/health` | Health check |

### Query Parameters for `/api/emails`

- `category`: Folder (inbox, sent, drafts, spam, trash, starred)
- `page`: Page number (default: 1)
- `limit`: Emails per page (default: 20)
- `pageToken`: Gmail API page token for pagination
- `q`: Search query (Gmail search syntax)

### Example Requests

**Get Inbox Emails:**
```bash
curl "http://localhost:5000/api/emails?category=inbox&page=1&limit=20"
```

**Search Emails:**
```bash
curl "http://localhost:5000/api/emails?q=from:example@gmail.com+subject:important"
```

**Send Email:**
```bash
curl -X POST http://localhost:5000/api/emails/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "message": "<p>Hello, this is a test!</p>",
    "cc": "",
    "bcc": ""
  }'
```

## Project Structure

```
gmail-clone/
├── backend/
│   ├── config/
│   │   ├── googleAuth.js        # OAuth2 configuration
│   │   ├── nodemailer.js        # SMTP configuration
│   │   └── token.json           # OAuth tokens (auto-generated, gitignored)
│   ├── controllers/
│   │   ├── emailController.js   # Mock data & SMTP fallback
│   │   └── gmailController.js   # Gmail API operations
│   ├── routes/
│   │   ├── authRoutes.js        # OAuth routes
│   │   └── emailRoutes.js       # Email API routes
│   ├── utils/
│   │   └── authorizeManually.js # Manual authorization helper
│   ├── .env                     # Environment variables (gitignored)
│   ├── server.js                # Express server
│   └── package.json
├── src/
│   ├── componend/
│   │   ├── body/
│   │   │   ├── LeftMenu.js      # Sidebar with folders
│   │   │   ├── MainListing.js   # Email list with pagination
│   │   │   └── UserList.js      # User contacts
│   │   ├── ComposeEmail.js      # Compose modal
│   │   ├── EmailDetail.js       # Email viewer
│   │   ├── Header.js            # App header
│   │   ├── SearchHeader.js      # Search bar with filters
│   │   └── Body.js              # Main body component
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── style/
│   │   ├── body.scss            # Email list styles
│   │   ├── compose.scss         # Compose modal styles
│   │   ├── emailDetail.scss     # Email detail styles
│   │   ├── grid.scss
│   │   └── header.scss
│   ├── App.js                   # Main app component
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Gmail Search Syntax

The search feature supports Gmail's powerful search operators:

- `from:sender@example.com` - Emails from specific sender
- `to:recipient@example.com` - Emails to specific recipient
- `subject:keyword` - Subject contains keyword
- `has:attachment` - Emails with attachments
- `larger:5M` - Emails larger than 5MB
- `smaller:1M` - Emails smaller than 1MB
- `newer_than:1d` - Emails from last 1 day (1d, 3d, 1w, 1m, 1y)
- `after:2024/01/01` - Emails after specific date
- `-keyword` - Exclude emails with keyword
- `OR` - Combine multiple criteria

**Example:** `from:boss@company.com subject:urgent has:attachment`

## Features Breakdown

### Pagination System
- 20 emails per page
- Gmail API pageToken-based navigation
- Automatic reset when switching folders or searching
- Shows "X-Y of Total" count
- Next/Previous buttons

### Search System
1. **Direct Search**: Type directly in search bar
2. **Advanced Search**: Click filter icon for detailed criteria
3. **Query Building**: Automatically builds Gmail search syntax
4. **Real-time**: Searches actual Gmail data via API

### Smart Fallback System
- **Authorized**: Uses Gmail API for all operations
- **Not Authorized**: Uses SMTP for sending, mock data for reading
- **Graceful Degradation**: Continues to work even if Gmail API fails

## Troubleshooting

### Authorization Issues

**Problem**: "Authorization failed" or "Cannot GET /api/auth/google/callback"

**Solution**:
1. Make sure backend is running BEFORE authorizing
2. Check redirect URI in Google Cloud Console matches exactly: `http://localhost:5000/api/auth/google/callback`
3. Get a fresh authorization URL (codes expire in 60 seconds)
4. Complete authorization quickly

### Email Not Sending

**Solution**:
1. Check authorization status: `curl http://localhost:5000/api/auth/status`
2. Verify SMTP credentials in `.env` if using fallback
3. Check backend console for error messages

### Search Not Working

**Solution**:
1. Ensure Gmail API is authorized
2. Check browser console for errors
3. Verify search query syntax
4. Check backend logs for API errors

### Backend Connection Error

**Solution**:
1. Verify backend is running: `cd backend && npm start`
2. Check if port 5000 is available
3. Look for errors in backend console
4. Ensure `.env` file exists with correct values

### Pagination Issues

**Solution**:
1. Pagination resets automatically when switching folders
2. PageTokens are cached per page
3. Refresh the email list if stuck

## Security Notes

- OAuth tokens are stored in `backend/config/token.json` (gitignored)
- `.env` file contains sensitive credentials (gitignored)
- Never commit `token.json` or `.env` to version control
- Use environment variables for production deployment

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

ISC

---

**Built with ❤️ using React, Node.js, Express, Gmail API, and OAuth2**

**Author**: Vinay Prasad
**Repository**: https://github.com/vinayprasad04/gmail-clone

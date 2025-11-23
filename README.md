# Typeface Dropbox Clone - Frontend

A modern file storage and management application built with React and Vite.

Backend repo: https://github.com/Prateek1013/typeface-spring

## Features

- 🔐 User authentication (Login/Register)
- 📁 File upload and management
- 👁️ File preview (images, PDFs)
- ⬇️ File download
- 🗑️ File deletion with confirmation dialog
- 🎨 Modern, responsive UI with Tailwind CSS

## Prerequisites

- Node.js 16 or higher
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Prateek1013/typeface-react.git
cd typeface-react
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Configuration

The application is configured to proxy API requests to the backend server. The proxy configuration is in `vite.config.js`:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

## Project Structure

```
typeface-dropbox-clone/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── FileCard.jsx
│   ├── Input.jsx
│   ├── Navbar.jsx
│   └── ConfirmationDialog.jsx
├── pages/              # Page components
│   ├── Auth.jsx        # Login/Register page
│   ├── Home.jsx        # File dashboard
│   └── FileViewer.jsx  # File preview page
├── App.jsx             # Main app component with routing
├── index.jsx           # Application entry point
└── vite.config.js      # Vite configuration
```

## Usage

### 1. Register a New Account
- Navigate to `http://localhost:3000`
- Click "start your 14-day free trial"
- Enter your email and password
- Click "Sign up"

### 2. Login
- Enter your registered email and password
- Click "Sign in"

### 3. Upload Files
- Click the "Upload File" button
- Select a file from your computer
- The file will be uploaded and appear in your dashboard

### 4. View Files
- Click on any file card to view its preview
- Supported previews: Images, PDFs
- Other file types show a download option

### 5. Download Files
- Click on a file card to open the viewer
- Click the "Download" button

### 6. Delete Files
- Click the trash icon on a file card, OR
- Open the file viewer and click "Delete"
- Confirm the deletion in the dialog

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **js-cookie** - Cookie management for JWT tokens

## API Integration

The frontend communicates with the backend API using the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/files` - List user files
- `POST /api/files/upload` - Upload file
- `GET /api/files/{id}` - Download file
- `DELETE /api/files/{id}` - Delete file

All file management endpoints require JWT authentication via the `Authorization: Bearer <token>` header.

## Environment Variables

No environment variables are required for basic operation. The API proxy is configured in `vite.config.js`.

## Troubleshooting

### Backend Connection Issues
- Ensure the backend is running on `http://localhost:8080`
- Check the browser console for CORS errors
- Verify the proxy configuration in `vite.config.js`

### Authentication Issues
- Clear browser cookies and try logging in again
- Check that the JWT token is being stored in cookies
- Verify the backend is returning valid JWT tokens

### File Upload Issues
- Check file size limits (backend configuration)
- Ensure you're logged in with a valid token
- Check browser console for error messages

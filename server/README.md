# Spacemaster API Server

Express.js API server with MongoDB for the Spacemaster application.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
  - Body: `{ name, phone, email, password }`
  - Returns: `{ success, message, data: { user, token } }`

- `POST /api/auth/signin` - Sign in with email and password
  - Body: `{ email, password }`
  - Returns: `{ success, message, data: { user, token } }`

## Environment Variables

Create a `.env` file in the server directory (optional):
```
PORT=5000
JWT_SECRET=your-secret-key-here
```

## MongoDB Connection

The server connects to MongoDB Atlas using the provided connection string.


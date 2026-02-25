# Spacemaster App

A full-stack application with React frontend and Express.js backend.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Project Structure

```
spacemaster-app/
├── server/          # Express.js backend API
├── src/            # React frontend
└── package.json    # Frontend dependencies
```

## Quick Setup

### Install All Dependencies

```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

## Running the Application

You need to run both the backend server and frontend development server. You can do this in two ways:

### Option 1: Using Two Terminal Windows (Recommended)

**Terminal 1: Start Backend Server**

```bash
npm run server
```

Or for development with auto-reload:
```bash
npm run server:dev
```

The backend server will run on `http://localhost:5001`

**Terminal 2: Start Frontend Development Server**

```bash
npm run dev
```

The frontend will run on `http://localhost:4200`

### Option 2: Manual Commands

**Terminal 1: Backend**
```bash
cd server
npm start
```

**Terminal 2: Frontend**
```bash
npm run dev
```

## Verify Everything is Working

1. **Backend**: Open `http://localhost:5001/api/health` in your browser. You should see:
   ```json
   {"status":"OK","message":"Server is running"}
   ```

2. **Frontend**: Open `http://localhost:4200` in your browser. You should see the home page.

3. **Test Sign Up**: Navigate to `/signup` and create an account.

4. **Test Sign In**: Navigate to `/signin` and sign in with your credentials.

## API Endpoints

- **POST** `/api/auth/signup` - Create new user account
  - Body: `{ name, phone, email, password }`
  
- **POST** `/api/auth/signin` - Sign in user
  - Body: `{ email, password }`
  
- **GET** `/api/health` - Health check

## Environment Variables

The frontend uses Vite proxy to forward `/api` requests to the backend server at `http://localhost:5001`.

If you need to change the API URL, create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5001/api
```

## MongoDB

The server connects to MongoDB Atlas using the connection string in `server/config/database.js`.

The database name is set to `spacemaster` in the connection configuration.

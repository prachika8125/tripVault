# TRIP VAULT
Trip Vault is a a travel memory journal where users can log trips, upload photos, and share memories. Logged-in users can create, view, edit, and delete their own trips. All trip data is scoped to the authenticated user — no user can view or modify another user's trips.

### Features
- View all your trips as cards (title, destination, dates, rating)
- Create a new trip via a form
- Edit an existing trip (pre-filled form)
- Delete a trip with a confirmation prompt
- Friendly empty state when you have no trips yet

## Tech Stack

* **Frontend:** React.js, Vite
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT)
* **Database:** MongoDB / Mongoose 



## Installation

### Setup and Build Instructions
1. Clone the repository
```bash
git clone https://github.com/prachika8125/tripVault.git
cd tripVault
```
2. Install dependencies
```bash
# Backend
cd server
npm install
```
Create a `.env` file in the ``/server`` directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
```

Open a new terminal, navigate to the ``/client`` directory, install the frontend dependencies
```bash
cd client 
npm install 
npm install vite@5.4.11 @vitejs/plugin-react@4.3.4 axios react-router-dom
```

3. Run the application

```bash
# Backend
cd server
node index.js

# Frontend
cd client
npm run dev
```

## Data Models

### Trip
| Field       | Type     | Required | Notes                          |
|-------------|----------|----------|----------------------------------|
| title       | String   | Yes      |                                  |
| destination | String   | Yes      |                                  |
| startDate   | Date     | No       |                                  |
| endDate     | Date     | No       |                                  |
| description | String   | No       |                                  |
| rating      | Number   | No       | 1–5                              |
| user        | ObjectId | Yes      | References the User who owns it |



## API Routes

All routes below require `Authorization: Bearer <token>`.

| Method | Route            | Description                              |
|--------|------------------|--------------------------------------------|
| POST   | /api/trips       | Create a new trip                        |
| GET    | /api/trips       | Get all trips for the logged-in user     |
| GET    | /api/trips/:id   | Get a single trip by ID (owner only)     |
| PUT    | /api/trips/:id   | Update a trip (owner only)               |
| DELETE | /api/trips/:id   | Delete a trip (owner only)               |
|



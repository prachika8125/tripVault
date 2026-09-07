# TRIP VAULT
Trip Vault is a a travel memory journal where users can log trips, upload photos, and share memories.

## Tech Stack

* **Frontend:** React.js, Vite
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT)
* **Database:** MongoDB / Mongoose 



## Installation

### Setup and Build Instructions
1. Clone the repository
First, clone the repository in your local machine
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

3. Frontend configuration
Open a new terminal, navigate to the ``/client`` directory, install the dependencies
```bash
cd client 
npm install 
npm install vite@5.4.11 @vitejs/plugin-react@4.3.4 axios react-router-dom
```

4. Run the application

```bash
# Backend
cd server
node index.js

# Frontend
cd client
npm run dev
```
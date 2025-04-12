# PMS Frontend - Pharmacy Management System

A frontend application for a Pharmacy Management System, built with React (using the MERN stack), to manage pharmacy inventory efficiently.

## Overview
PMS_Frontend is the client-side of a Pharmacy Management System designed for inventory management. It allows users to track stock, manage medicines, and handle pharmacy operations, connecting to a backend API built with Express.js and MongoDB.

## Tech Stack
- **Frontend**: React (JavaScript framework)
- **Backend**: Express.js, Node.js, MongoDB (MERN stack)
- **Environment**: Node.js

## Installation
1. **Prerequisites**:
   - Ensure Node.js (v16 or later) is installed on your computer. Download from [nodejs.org](https://nodejs.org).

2. **Navigate to the Project Folder**:
   ```bash
   cd PMS_Frontend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   - Contact the project owner for the `.env` file, which contains API routes and URLs.
   - Place the `.env` file in the `PMS_Frontend` root directory.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Usage
- Access the app at `http://localhost:5173` after starting the server.
- Ensure the backend (Express.js/MongoDB) is running to connect to the API.
- Use the interface to manage pharmacy inventory (e.g., add medicines, track stock).

## Environment Variables
- Requires a `.env` file with API routes and URLs.
- **How to Obtain**: Contact the project owner for the `.env` file.
- **Example**:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```

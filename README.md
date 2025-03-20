# Task & Agent Management System

## Overview
This is a **Task & Agent Management System** built using **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It allows users to manage agents and tasks efficiently, ensuring seamless CRUD (Create, Read, Update, Delete) operations.

## Features
### Agents Management
- Add, edit, delete agents.
- Assign tasks to agents dynamically.

### Task Management
- View task list.
- Assign tasks to agents.
- Upload tasks via file upload.

### Authentication
- Secure agent authentication using bcrypt.

### UI/UX
- Fully responsive user interface built with **Tailwind CSS**.
- User-friendly dashboard with a sidebar navigation.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/your-username/task-agent-management.git
cd task-agent-management
```

### Backend Setup
1. Navigate to the backend folder:
```sh
cd backend
```
2. Install dependencies:
```sh
npm install
```
3. Create a **.env** file and configure it:
```sh
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. Start the backend server:
```sh
npm run dev
```

### Frontend Setup
1. Navigate to the frontend folder:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Start the frontend server:
```sh
npm run dev
```

## API Endpoints
### Agents
- `POST /api/v1/createAgent` - Create a new agent.
- `GET /api/v1/agents` - Retrieve all agents.
- `PUT /api/v1/agents/:id` - Update an agent.
- `DELETE /api/v1/agents/:id` - Delete an agent.

### Tasks
- `GET /api/tasks` - Retrieve all tasks.
- `POST /api/upload-tasks` - Upload tasks via file.

## Usage
1. Start the backend and frontend servers.
2. Open `http://localhost:5173/` in your browser.
3. Manage agents and tasks using the user-friendly UI.

## Technologies Used
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **Authentication**: bcrypt.js, JWT

## Contribution
Feel free to fork this repository and contribute by creating pull requests. If you find any issues, open a new issue.

## License
This project is open-source and available under the [MIT License](LICENSE).


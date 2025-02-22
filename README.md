# Task Management Application

## 📌 Short Description

A modern, responsive Task Management Application with real-time updates, drag-and-drop functionality, and Firebase authentication.

## 🚀 Live Demo

[Live App](#) (https://task-manager-39487.firebaseapp.com)

## 📂 Repository Structure

```
/task-management-app
│── frontend/  # React + Vite frontend
│── backend/   # Express.js backend
│── README.md
```

## 📦 Dependencies

### Frontend:

- React.js (Vite)
- Tailwind CSS & DaisyUI
- DnD Kit (Drag and Drop)
- Firebase Authentication
- TanStack React Query
- Axios
- React Hot Toast
- React Icons
- React Router

### Backend:

- Node.js + Express.js
- MongoDB (with Change Streams for real-time updates)
- WebSockets for instant syncing
- Node.js + Express.js
- MongoDB (with Change Streams for real-time updates)
- WebSockets for instant syncing

## 📌 Installation Steps

### Clone the Repository

```sh
git clone https://github.com/SifatSararChistee/task-manager-client
cd task-management-app
```

### Setup Backend

```sh
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm start
```

### Setup Frontend

```sh
cd frontend
npm install
npm run dev
```

## 🛠 Technologies Used

- React.js
- Tailwind CSS & DaisyUI
- Node.js & Express.js
- MongoDB & WebSockets
- Firebase Authentication

## 🔗 API Endpoints

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| POST   | /tasks     | Add a new task     |
| GET    | /tasks     | Retrieve all tasks |
| PUT    | /tasks/:id | Update a task      |
| DELETE | /tasks/:id | Delete a task      |

## 🎯 Bonus Features

- Dark Mode Toggle
- Task Due Dates with color indicators
- Activity Log to track task movements

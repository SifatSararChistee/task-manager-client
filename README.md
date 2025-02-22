# Task Management Application

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

## 🛠 Technologies Used

### Frontend:

- React.js (Vite)
- Tailwind CSS & DaisyUI
- DnD Kit (Drag and Drop)
- Firebase Authentication

### Backend:

- Node.js + Express.js
- MongoDB (with Change Streams for real-time updates)
- WebSockets for instant syncing

## 🔑 Features

- Google Authentication (Firebase Auth)
- Add, Edit, Delete, and Reorder Tasks
- Drag and Drop between categories (To-Do, In Progress, Done)
- Real-time Updates using MongoDB Change Streams & WebSockets
- Optimistic UI Updates for a seamless experience
- Fully responsive UI for both desktop & mobile
- Clean, minimal design with a maximum of four colors

## 📌 Installation Steps

### Clone the Repository

```sh
git clone https://github.com/SifatSararChistee/task-manager-client.git
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

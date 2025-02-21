import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes, Route } from "react-router";
import Login from './Components/Login.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Provider/AuthProvider.jsx';
import {DndContext} from '@dnd-kit/core';
import { TaskProvider } from './Context/TaskContext.jsx';
import PrivateRoute from './PrivateRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
<DndContext>
<AuthProvider>
  <TaskProvider>
  <Routes>
              {/* Public Route */}
              <Route path="/" element={<Login />} />

              {/* Private Route */}
              <Route 
                path="/app" 
                element={<PrivateRoute element={<App />} />} 
              />
            </Routes>
    <Toaster />
  </TaskProvider>
      </AuthProvider>
</DndContext>
  </BrowserRouter>
  </StrictMode>,
)

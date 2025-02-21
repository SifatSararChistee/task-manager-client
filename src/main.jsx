import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes, Route } from "react-router";
import Login from './Components/Login.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Provider/AuthProvider.jsx';
import {DndContext} from '@dnd-kit/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskProvider } from './Context/TaskContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
<QueryClientProvider client={queryClient}>
<DndContext>
<AuthProvider>
  <TaskProvider>
  <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/" element={<Login />} />
    </Routes>
    <Toaster />
  </TaskProvider>
      </AuthProvider>
</DndContext>
</QueryClientProvider>

  </BrowserRouter>
  </StrictMode>,
)

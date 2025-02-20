import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes, Route } from "react-router";
import Login from './Components/Login.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <AuthProvider>
      <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/" element={<Login />} />
    </Routes>
    <Toaster />
      </AuthProvider>
  </BrowserRouter>
  </StrictMode>,
)

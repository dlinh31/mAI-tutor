import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatbot from './chatbot/Chatbot';
import LandingPage from './LandingPage';
import QuizGenerator from './chatbot/QuizGenerator';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import ChatPage from './pages/Chat';
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/chatbot/quiz" element={<QuizGenerator />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

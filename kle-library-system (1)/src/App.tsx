import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Portal from './pages/Portals/Portal';
import Reservations from './pages/Reservations';
import { ChatAssistant } from './components/ChatAssistant/ChatAssistant';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/portal/user" element={<Portal role="student" />} />
              <Route path="/portal/employee" element={<Portal role="employee" />} />
              <Route path="/portal/admin" element={<Portal role="admin" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ChatAssistant />
        </div>
      </Router>
    </LanguageProvider>
  );
}

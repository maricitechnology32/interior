import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProfilePage from './pages/ProfilePage';
import WhatsAppButton from './components/ui/WhatsAppButton';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header is always visible */}
      <Header />

      {/* This 'main' section will contain the active page */}
      <main className="container mx-auto grow p-4">
        {/* Outlet renders the matched child route (e.g., HomePage, LoginPage) */}
        <Outlet />
      </main>

      {/* Footer is always visible */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
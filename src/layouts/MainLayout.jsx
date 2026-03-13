import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Conditionally apply top padding: 
          - No padding on Home so the dark hero bleeds to the top edge.
          - pt-24 (96px) on other pages to offset the fixed navbar. */}
      <main className={`flex-1 pb-12 ${isHome ? 'pt-0' : 'pt-24'}`}>
        {children}
      </main>
    </div>
  );
}
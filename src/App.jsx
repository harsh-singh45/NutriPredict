import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* The Data Collection Form Wizard */}
          <Route path="/predict" element={<ProfileSetup />} />
          
          {/* The Results Dashboard (We will rename this to Results later if needed) */}
          <Route path="/results" element={<Dashboard />} />
          
          <Route path="/profile" element={<Profile />} />
          {/* Placeholder for Compare Page */}
          <Route path="/compare" element={
            <div className="container mx-auto px-4 text-center mt-20">
              <h2 className="text-3xl font-bold">Compare Diets Coming Soon</h2>
            </div>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
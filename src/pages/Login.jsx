import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, ArrowRight } from 'lucide-react';
import { loginUser, getUser } from '../utils/auth';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (getUser()) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && email) {
      loginUser(name, email);
      // Redirect to the Profile page after successful login
      navigate('/profile');
      // Force a tiny reload so the Navbar catches the new user state
      window.dispatchEvent(new Event('storage')); 
    }
  };

  const isFormValid = name.trim() !== '' && email.trim() !== '';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm text-center">
        
        {/* Header Section */}
        <div className="w-14 h-14 bg-[#05694F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#05694F]">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to NutriPredict</h2>
        <p className="text-sm text-gray-500 mb-8">Sign in to save your predictions and track progress</p>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 ml-1">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-100/80 border border-transparent focus:bg-white focus:border-[#05694F] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-100/80 border border-transparent focus:bg-white focus:border-[#05694F] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!isFormValid}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all duration-300 disabled:bg-[#A7D7C5] disabled:text-white/80 disabled:cursor-not-allowed bg-[#05694F] text-white hover:bg-[#04523e] hover:shadow-lg hover:shadow-[#05694F]/20"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <p className="text-[11px] text-gray-400 mt-8">
          Demo mode — no real authentication. Data stored locally.
        </p>
      </div>
    </div>
  );
}
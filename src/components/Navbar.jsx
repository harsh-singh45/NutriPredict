import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Activity, User } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Color theme logic based on route and scroll position
  const isHome = location.pathname === '/';
  const useLightText = isHome && !isScrolled;

  // Handle Scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle User Auth state
  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem('nutripredict_user');
      setUser(userStr ? JSON.parse(userStr) : null);
    };
    
    checkUser();
    // Listen for storage events (triggered in Login.jsx) to update UI instantly
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
      isScrolled ? 'pt-4 px-4 sm:px-6 pointer-events-none' : 'pt-0 px-0 pointer-events-auto'
    }`}>
      
      <nav className={`pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
        isScrolled 
          ? 'w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-6 h-[64px]' 
          : `w-full rounded-none px-4 sm:px-8 h-20 ${useLightText ? 'bg-transparent border-transparent' : 'bg-white/60 backdrop-blur-xl border-b border-gray-200'}`
      }`}>
        
        {/* Left: Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
            useLightText ? 'bg-white/10' : 'bg-[#05694F]/10'
          }`}>
            <Activity className={`w-5 h-5 transition-colors ${useLightText ? 'text-white' : 'text-[#05694F]'}`} />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
            useLightText ? 'text-white' : 'text-gray-900'
          }`}>
            NutriPredict
          </span>
        </Link>

        {/* Right: Navigation Links & Auth Button */}
        <div className="flex items-center gap-6 sm:gap-8 pr-1">
          
          {/* Links (Hidden on mobile devices) */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Predict', 'Compare'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <NavLink 
                  key={item}
                  to={path} 
                  className={({ isActive }) => `text-sm font-semibold transition-colors duration-300 ${
                    isActive 
                      ? (useLightText ? 'text-emerald-400' : 'text-[#05694F]') 
                      : (useLightText ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                  }`}
                >
                  {item}
                </NavLink>
              );
            })}
          </div>
          
          {/* Auth Button / User Profile Indicator */}
          <div className="flex items-center">
            {user ? (
              <Link to="/profile" className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                useLightText ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-[#05694F]/10 hover:bg-[#05694F]/20 text-[#05694F]'
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${useLightText ? 'bg-white/20' : 'bg-[#05694F]/20'}`}>
                  <User className="w-4 h-4 text-current absolute" />
                </div>
                <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg ${
                useLightText 
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                  : 'bg-[#05694F] text-white hover:bg-[#04523e] shadow-[#05694F]/20 hover:shadow-[#05694F]/30 border border-transparent'
              }`}>
                Sign In
              </Link>
            )}
          </div>
        </div>

      </nav>
    </div>
  );
}
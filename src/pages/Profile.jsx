import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Trash2, Clock, TrendingDown, Zap, Target, Plus } from 'lucide-react';
import { getUser, logoutUser } from '../utils/auth';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('nutripredict_history');
    return saved ? JSON.parse(saved) : []; 
  });

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleSignOut = () => {
    logoutUser();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const clearHistory = () => {
    localStorage.removeItem('nutripredict_history');
    setHistory([]);
  };

  if (!user) return null;

  // Calculate Stats (with safeguards against NaN values)
  const validHistory = history.filter(h => !isNaN(h.adherence) && !isNaN(h.totalLoss));
  const totalPredictions = history.length;
  const bestAdherence = validHistory.length ? Math.max(...validHistory.map(h => h.adherence)) : 0;
  const maxLoss = validHistory.length ? Math.min(...validHistory.map(h => h.totalLoss)) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      
      {/* 1. USER IDENTITY CARD */}
      <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-[24px] p-6 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#05694F]/10 text-[#05694F] flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600 font-medium">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold border border-red-100"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-[#05694F] mb-1">{totalPredictions}</div>
          <div className="text-xs text-gray-500 font-medium">Predictions</div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-[#05694F] mb-1">{bestAdherence}%</div>
          <div className="text-xs text-gray-500 font-medium">Best Adherence</div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-[#0EA5E9] mb-1">{maxLoss}kg</div>
          <div className="text-xs text-gray-500 font-medium">Max Loss Predicted</div>
        </div>
      </div>

      {/* 3. PREDICTION HISTORY */}
      <div className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 px-1 gap-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
            <Clock className="w-5 h-5 text-[#05694F]" /> Prediction History
          </h3>
          
          {/* NEW: Action Buttons Group */}
          <div className="flex items-center justify-between sm:justify-end gap-6">
            <button 
              onClick={() => navigate('/predict')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#05694F] text-white text-sm font-semibold hover:bg-[#04523e] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> New Prediction
            </button>

            <button 
              onClick={clearHistory}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors disabled:opacity-30"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-500 mb-4">No predictions yet</p>
              <button onClick={() => navigate('/predict')} className="px-6 py-2.5 rounded-xl bg-[#05694F] text-white text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all">
                Make Your First Prediction
              </button>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate('/results')} 
                className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-[#05694F]/30 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
                    🥦
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-[#05694F] transition-colors">{item.dietType}</h4>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
                
                {/* Mini Metrics (With safeguards for empty data) */}
                <div className="flex items-center gap-6 pr-2">
                  <div className="flex flex-col items-center">
                    <TrendingDown className="w-4 h-4 text-[#0EA5E9] mb-1" />
                    <span className="text-xs font-bold text-gray-700">{item.totalLoss || 0}kg</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="w-4 h-4 text-orange-400 mb-1" />
                    <span className="text-xs font-bold text-gray-700">{item.energyScore || 0}%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Target className="w-4 h-4 text-[#05694F] mb-1" />
                    <span className="text-xs font-bold text-gray-700">{item.adherence || 0}%</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
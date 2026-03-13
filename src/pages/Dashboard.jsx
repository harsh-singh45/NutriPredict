import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  AreaChart, Area, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingDown, Battery, HeartPulse, Target, ArrowLeft, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Retrieve the real data passed from the Predict Wizard
  const { formData, results } = location.state || {};

  // Security check: If a user tries to type /results directly into the URL without generating data, kick them back.
  if (!formData || !results) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Prediction Data Found</h2>
        <p className="text-gray-500 mb-6">You need to run a simulation first.</p>
        <button onClick={() => navigate('/predict')} className="px-6 py-3 bg-[#05694F] text-white rounded-xl font-bold hover:bg-[#04523e] transition-colors">
          Go to Predict Wizard
        </button>
      </div>
    );
  }

  // Format diet name nicely
  const dietName = formData.dietType === 'intermittent' ? 'Intermittent Fasting (16:8)' :
                   formData.dietType === 'plantbased' ? 'Plant-Based' :
                   formData.dietType === 'lowcarb' ? 'Low-Carb' : 'Ketogenic';

  // Construct Radar Data dynamically based on the engine's scores
  const radarData = [
    { metric: 'Glucose Stability', score: results.metrics.metabolicScore + 10, fullMark: 100 },
    { metric: 'Energy', score: results.metrics.energyScore, fullMark: 100 },
    { metric: 'Adherence', score: parseInt(results.metrics.adherence), fullMark: 100 },
    { metric: 'Metabolism', score: results.metrics.metabolicScore, fullMark: 100 },
    { metric: 'Fat Loss', score: Math.min(100, (parseFloat(results.metrics.totalLoss) / 10) * 100), fullMark: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8">
      
      {/* 1. DASHBOARD HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => navigate('/predict')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Setup
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Outcome: <span className="text-[#05694F]">{dietName}</span>
          </h1>
          <p className="text-gray-500 mt-1">12-Week AI Forecast based on your unique metabolic profile.</p>
        </div>
        
        <div className="flex bg-white/60 backdrop-blur-xl border border-gray-200 p-1 rounded-xl shadow-sm">
          {['overview', 'metabolic', 'weekly'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab ? 'bg-[#05694F] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TOP METRICS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={<TrendingDown />} title="Projected Loss" value={`-${results.metrics.totalLoss}kg`} color="text-[#0EA5E9]" bg="bg-[#0EA5E9]/10" />
        <MetricCard icon={<Target />} title="Adherence Prob." value={results.metrics.adherence} color="text-[#05694F]" bg="bg-[#05694F]/10" />
        <MetricCard icon={<Battery />} title="Energy Score" value={`${results.metrics.energyScore}/100`} color="text-orange-500" bg="bg-orange-500/10" />
        <MetricCard icon={<HeartPulse />} title="Metabolic Health" value={`${results.metrics.metabolicScore}/100`} color="text-indigo-500" bg="bg-indigo-500/10" />
      </div>

      {/* 3. PLATEAU WARNING (Conditional) */}
      {results.plateauWeek && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-orange-800">Metabolic Plateau Detected</h4>
            <p className="text-sm text-orange-700 mt-1">
              Based on your high stress or low sleep inputs, the model predicts a weight loss plateau around <strong>Week {results.plateauWeek}</strong>. Consider incorporating a diet break or adjusting sleep habits to break through it.
            </p>
          </div>
        </div>
      )}

      {/* 4. MAIN CHARTS GRID (Overview Tab) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weight Trajectory Chart (Takes up 2 columns) */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Weight Trajectory Forecast</h3>
              <p className="text-xs text-gray-500">Actual projected weight vs. ideal linear loss.</p>
            </div>
            <div className="flex-1 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.weightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#05694F" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#05694F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="week" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  {/* Projected Ideal Line */}
                  <Area type="monotone" dataKey="projected" name="Ideal Linear Loss" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  {/* Actual Forecasted Line with Plateau logic */}
                  <Area type="monotone" dataKey="weight" name="Forecasted Weight (kg)" stroke="#05694F" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" activeDot={{ r: 6, fill: '#05694F', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Metabolic Radar Chart (Takes up 1 column) */}
          <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center">
            <div className="mb-2 w-full text-left">
              <h3 className="font-bold text-gray-900 text-lg">Health Impact Index</h3>
              <p className="text-xs text-gray-500">Multidimensional score breakdown.</p>
            </div>
            <div className="w-full flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#4B5563', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Diet Profile" dataKey="score" stroke="#0EA5E9" strokeWidth={2} fill="#0EA5E9" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 w-full bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm text-gray-600">
              <strong className="text-gray-900 block mb-1">AI Summary:</strong>
              This plan shows a strong {results.metrics.adherence} likelihood of success, though high initial fatigue may impact energy scores.
            </div>
          </div>

        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'overview' && (
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-12 text-center text-gray-500 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{activeTab} Details</h3>
          <p>This tab is structurally ready for the next set of charts.</p>
        </div>
      )}

    </div>
  );
}

// Reusable Metric Card Sub-Component
function MetricCard({ icon, title, value, color, bg }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg} ${color}`}>
          {React.cloneElement(icon, { className: "w-4 h-4" })}
        </div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
      </div>
      <div className={`text-3xl font-black tracking-tight ${color}`}>{value}</div>
    </div>
  );
}
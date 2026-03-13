import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Brain, ShieldCheck, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] font-sans">
      {/* 1. HERO SECTION - Deep Navy Cinematic */}
      <section className="relative min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Floating Background Orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}></div>

        <div className="z-10 max-w-5xl mt-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-sm font-medium mb-8">
            <Activity className="w-4 h-4" /> AI-Powered Diet Prediction
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Know What Your Diet <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Will Do</span> <br /> Before You Start
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered personalized outcome forecasting for smarter nutrition decisions. Predict energy, weight trajectory, and adherence before committing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Navigates directly to your ProfileSetup wizard */}
            <Link to="/profile" className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-lg hover:from-indigo-400 hover:to-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2">
              Predict My Diet Outcome <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Stat Cards */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl px-4 z-10 pb-16">
          <StatCard value="94%" label="Prediction Accuracy" />
          <StatCard value="12K+" label="Users Served" />
          <StatCard value="4" label="Diet Models" />
          <StatCard value="12wk" label="Forecast Range" />
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Predictive, Not <span className="text-primary">Prescriptive</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Unlike generic diet apps, NutriPredict forecasts real outcomes tailored to your unique profile.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={<TrendingUp />} title="Weight Trajectory" desc="See your projected weight over 12 weeks with different diet plans before you start." />
          <FeatureCard icon={<Brain />} title="Metabolic Impact" desc="Understand how each diet affects glucose stability, lipid trends, and metabolic stress." />
          <FeatureCard icon={<Activity />} title="Energy Forecasting" desc="Predict sustained energy vs fatigue patterns based on your lifestyle and chosen diet." />
          <FeatureCard icon={<ShieldCheck />} title="Adherence Probability" desc="Know how likely you are to sustain a diet long-term based on behavioral patterns." />
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-gray-900">How It <span className="text-primary">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <Step num="01" title="Enter Your Profile" desc="Share basic health data, lifestyle habits, and preferences." />
            <Step num="02" title="Choose Diets to Compare" desc="Select from Keto, Low-Carb, Intermittent Fasting, or Plant-Based." />
            <Step num="03" title="Get AI Predictions" desc="Receive personalized forecasts for weight, energy, metabolism, and adherence." />
          </div>
          <Link to="/profile" className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg shadow-primary/30">
            Start Predicting Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2026 NutriPredict. AI-powered diet outcome prediction.
        </div>
      </footer>
    </div>
  );
}

// Sub-components for Home Page
function StatCard({ value, label }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-emerald-300 bg-clip-text text-transparent mb-1">{value}</div>
      <div className="text-slate-500 text-xs font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(5,105,79,0.1)] group">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-black text-primary/10 mb-4 tracking-tighter">{num}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
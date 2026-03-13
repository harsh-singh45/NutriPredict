import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import { generatePredictions, savePrediction } from '../utils/predictions';
import { getUser } from '../utils/auth';

const CONDITIONS = ["None", "Pre-diabetes", "Hypertension", "PCOS", "Thyroid disorder"];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    age: '', gender: 'Select', height: '', weight: '',
    conditions: [], 
    workSchedule: 'regular', sleepHours: 7, activityLevel: 5, stressLevel: 5, // Step 1 Defaults
    dietType: ''
  });

  const canNext = () => {
    if (step === 0) return data.age && data.gender !== 'Select' && data.height && data.weight;
    if (step === 1) return true; // Sliders always have a valid default value
    if (step === 2) return data.dietType !== '';
    return true;
  };

  const handlePredict = () => {
    const predictionResults = generatePredictions(data);
    if (getUser()) {
      savePrediction(data, predictionResults);
    }
    navigate('/results', { state: { formData: data, results: predictionResults } });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Predict Your <span className="text-[#05694F]">Diet Outcome</span></h2>
        <p className="text-gray-500 mt-2">Complete 3 quick steps for your personalized forecast</p>
      </div>

      {/* 3-Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {[0, 1, 2].map((s, index) => (
          <React.Fragment key={s}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              step >= s ? 'bg-[#05694F] text-white shadow-md' : 'bg-gray-200 text-gray-500'
            }`}>
              {s + 1}
            </div>
            {index < 2 && (
              <div className={`w-16 h-px transition-colors duration-300 ${
                step > s ? 'bg-[#05694F]' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        
        {/* STEP 0: Personal Details */}
        {step === 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              <User className="text-[#05694F]" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Age" type="number" value={data.age} onChange={(v) => setData({...data, age: v})} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <select className="bg-gray-100 p-3.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#05694F] transition-shadow text-gray-700" value={data.gender} onChange={(e) => setData({...data, gender: e.target.value})}>
                  <option>Select</option><option>Male</option><option>Female</option>
                </select>
              </div>
              <Input label="Height (cm)" type="number" value={data.height} onChange={(v) => setData({...data, height: v})} />
              <Input label="Weight (kg)" type="number" value={data.weight} onChange={(v) => setData({...data, weight: v})} />
            </div>
            
            <div className="pt-2">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Medical Conditions</label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map(c => (
                  <button key={c} onClick={() => {
                    const next = data.conditions.includes(c) ? data.conditions.filter(x => x !== c) : [...data.conditions, c];
                    setData({...data, conditions: next});
                  }} className={`px-4 py-2.5 rounded-xl text-sm border transition-all ${data.conditions.includes(c) ? 'bg-[#05694F]/10 border-[#05694F] text-[#05694F] font-semibold' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#05694F]/30'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Lifestyle Signals (Added from your screenshot) */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              <Moon className="text-[#05694F]" /> Lifestyle Signals
            </h3>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Work Schedule</label>
              <select className="bg-gray-400/20 p-3.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#05694F] text-gray-800 font-medium" value={data.workSchedule} onChange={(e) => setData({...data, workSchedule: e.target.value})}>
                <option value="regular">Regular (9-5)</option>
                <option value="shift">Shift Work</option>
                <option value="remote">Remote</option>
                <option value="irregular">Irregular</option>
              </select>
            </div>

            <RangeSlider 
              label="Sleep Hours" 
              value={data.sleepHours} min={3} max={12} 
              onChange={(v) => setData({...data, sleepHours: parseInt(v)})} 
              valueLabel={`${data.sleepHours}h`} minLabel="3h" maxLabel="12h" 
            />

            <RangeSlider 
              label="Activity Level" 
              value={data.activityLevel} min={1} max={10} 
              onChange={(v) => setData({...data, activityLevel: parseInt(v)})} 
              valueLabel={`${data.activityLevel}/10`} minLabel="Sedentary" maxLabel="Very Active" 
            />

            <RangeSlider 
              label="Stress Level" 
              value={data.stressLevel} min={1} max={10} 
              onChange={(v) => setData({...data, stressLevel: parseInt(v)})} 
              valueLabel={`${data.stressLevel}/10`} minLabel="Low" maxLabel="High" 
            />
          </div>
        )}

        {/* STEP 2: Select Target Diet */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              <Activity className="text-[#05694F]" /> Select Target Diet
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['keto', 'lowcarb', 'intermittent', 'plantbased'].map(diet => (
                <button key={diet} onClick={() => setData({...data, dietType: diet})} className={`p-6 rounded-2xl border text-left transition-all duration-300 ${data.dietType === diet ? 'border-[#05694F] bg-[#05694F]/5 shadow-[0_0_20px_rgba(5,105,79,0.15)] scale-[1.02]' : 'border-gray-200 bg-gray-50 hover:border-[#05694F]/30'}`}>
                  <h4 className="font-bold capitalize text-gray-900 text-lg">
                    {diet === 'intermittent' ? 'Fasting (16:8)' : diet.replace('based', '-Based')}
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">Simulate 12-week physiological outcome for this plan.</p>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 disabled:opacity-0 transition-all font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button disabled={!canNext()} onClick={() => step < 2 ? setStep(s => s + 1) : handlePredict()} className="bg-[#05694F] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#04523e] hover:shadow-lg disabled:bg-[#A7D7C5] disabled:text-white/80 transition-all">
            {step === 2 ? 'Generate Prediction' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Input({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-100 p-3.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#05694F] transition-shadow text-gray-900" placeholder="0" />
    </div>
  );
}

function RangeSlider({ label, value, min, max, onChange, valueLabel, minLabel, maxLabel }) {
  // Calculate the percentage to determine where the green fill stops and the gray begins
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1">
      {/* Top Labels */}
      <div className="flex justify-between items-center mb-2">
        <label className="text-[15px] font-semibold text-gray-800">{label}</label>
        <span className="text-[15px] font-semibold text-[#05694F]">{valueLabel}</span>
      </div>
      
      {/* Dynamic Progress Bar Slider */}
      <input 
        type="range" 
        min={min} max={max} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        // This inline style creates the filled progress bar effect!
        style={{
          background: `linear-gradient(to right, #05694F ${percentage}%, #E5E7EB ${percentage}%)`
        }}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
                   focus:outline-none focus:ring-4 focus:ring-[#05694F]/20
                   
                   /* Chrome, Safari, Edge, Opera Thumbs */
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-5
                   [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:bg-[#05694F]
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:shadow-[0_2px_5px_rgba(0,0,0,0.2)]
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:transition-transform
                   hover:[&::-webkit-slider-thumb]:scale-110
                   
                   /* Firefox Thumbs */
                   [&::-moz-range-thumb]:w-5
                   [&::-moz-range-thumb]:h-5
                   [&::-moz-range-thumb]:bg-[#05694F]
                   [&::-moz-range-thumb]:border-none
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:shadow-[0_2px_5px_rgba(0,0,0,0.2)]
                   [&::-moz-range-thumb]:cursor-pointer
                   [&::-moz-range-thumb]:transition-transform
                   hover:[&::-moz-range-thumb]:scale-110"
      />
      
      {/* Bottom Labels */}
      <div className="flex justify-between items-center text-[13px] text-gray-500 font-medium mt-2">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
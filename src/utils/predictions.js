// Pure JS implementation of your Prediction Engine
export const generatePredictions = (data) => {
  const { weight, height, age, activityLevel, stressLevel, sleepHours, dietType } = data;
  
  // 1. BMI Calculation
  const bmi = weight / Math.pow(height / 100, 2);
  
  // 2. Base Weekly Loss Logic
  const baseLossMap = { keto: 1.2, lowcarb: 0.9, intermittent: 0.8, plantbased: 0.6 };
  let weeklyLoss = baseLossMap[dietType] || 0.7;

  // 3. Modifiers
  weeklyLoss += activityLevel * 0.05;
  weeklyLoss -= stressLevel * 0.03;
  weeklyLoss += sleepHours >= 7 ? 0.1 : -0.1;
  if (age > 40) weeklyLoss -= 0.1;
  if (bmi > 30) weeklyLoss += 0.15;

  weeklyLoss = Math.max(0.1, weeklyLoss);

  // 4. Generate 12-Week Trajectory
  const weightData = [];
  const plateauWeek = (stressLevel > 6 || sleepHours < 6) ? 6 : null;

  for (let i = 0; i <= 12; i++) {
    let currentWeight = weight - (weeklyLoss * i);
    if (plateauWeek && i >= plateauWeek && i <= plateauWeek + 2) {
      currentWeight = weight - (weeklyLoss * plateauWeek);
    }
    weightData.push({ 
      week: `Wk ${i}`, 
      weight: parseFloat(currentWeight.toFixed(1)),
      projected: parseFloat((weight - (weeklyLoss * i)).toFixed(1)) 
    });
  }

  // 5. Scores
  const adherence = Math.min(95, 70 - (stressLevel * 3) + (sleepHours >= 7 ? 5 : -5));
  
  return {
    weightData,
    metrics: {
      totalLoss: (weeklyLoss * 12).toFixed(1),
      adherence: `${adherence}%`,
      energyScore: 50 + (sleepHours * 4) - (stressLevel * 3),
      metabolicScore: 65 + (activityLevel * 2) - (stressLevel * 2),
      dropoutRisk: 100 - adherence + (stressLevel * 2)
    },
    plateauWeek
  };
};


export const savePrediction = (formData, results) => {
  // 1. Get existing history or start fresh
  const existingHistory = JSON.parse(localStorage.getItem('nutripredict_history') || '[]');
  
  // 2. Format the new entry matching your design docs
  const newEntry = {
    id: crypto.randomUUID(),
    // Formats date to: "09/03/2026 at 00:59:41"
    date: new Date().toLocaleString('en-GB', { 
      day: '2-digit', month: '2-digit', year: 'numeric', 
      hour: '2-digit', minute:'2-digit', second:'2-digit' 
    }).replace(',', ' at'),
    
    // Map the diet ID back to a readable string for the UI
    dietType: formData.dietType === 'intermittent' ? 'Fasting (16:8)' :
              formData.dietType === 'plantbased' ? 'Plant-Based' :
              formData.dietType === 'lowcarb' ? 'Low-Carb' : 'Ketogenic',
              
    // Parse the string metrics back into numbers for the Profile stats math
    totalLoss: -Math.abs(parseFloat(results.metrics.totalLoss)), 
    energyScore: parseInt(results.metrics.energyScore),
    adherence: parseInt(results.metrics.adherence)
  };

  // 3. Add to the beginning of the array and limit to the 50 most recent
  const updatedHistory = [newEntry, ...existingHistory].slice(0, 50);
  
  // 4. Save back to local storage
  localStorage.setItem('nutripredict_history', JSON.stringify(updatedHistory));
};
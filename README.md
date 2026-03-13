# 🥗 NutriPredict

**NutriPredict** is an AI-Powered Diet Outcome Prediction Platform designed to simulate diet results *before* a user commits to a plan.

Every year, millions of people start diet programs without knowing whether the diet aligns with their metabolism, lifestyle, stress levels, and activity patterns. NutriPredict bridges the gap between generic diet advice and personalized, data-driven forecasting.

Instead of prescribing a diet and hoping for the best, NutriPredict uses a predictive simulation engine to forecast measurable outcomes in advance.

---

## ✨ Key Features

### 🔮 Predictive, Not Prescriptive
Forecasts real outcomes tailored to user-specific inputs:
- Weight
- Sleep duration
- Stress levels
- Activity level

### 📈 12-Week Weight Trajectory
Interactive Area charts visualize:
- Projected weight loss curve
- Ideal linear weight-loss comparison
- Weekly progress insights

### 🧬 Metabolic Impact Analysis
Radar chart insights for:
- Glucose stability
- Lipid trends
- Metabolic stress levels

Supports diet types like:
- Keto
- Low-Carb
- Intermittent Fasting (IF)
- Plant-Based

### ⚡ Energy Level Forecasting
Predicts:
- Sustained energy patterns
- Adaptation phases (e.g., keto-flu)
- Fatigue likelihood

### 🧠 Behavioral Adherence Probability
Calculates how likely a user is to sustain the diet long-term based on lifestyle consistency and stress indicators.

### 🎨 Premium Glassmorphism UI
- Dark hero aesthetic
- Floating pill-style navigation
- Smooth transitions & micro-interactions
- Dynamic progress-bar range sliders

### 💾 Client-Side Persistence
- Simulated authentication
- Prediction history stored in browser `localStorage`
- No backend required

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| **React 19** | Frontend Framework |
| **Vite 8** | Build Tool |
| **Tailwind CSS v4** | Styling & UI System |
| **Recharts** | Data Visualization |
| **Lucide React** | Icons |
| **React Router DOM** | Routing |

---

## 📂 Project Structure

| Directory / File | Purpose |
|------------------|----------|
| `src/components/` | Reusable UI components (Navbar, Cards, Charts) |
| `src/layouts/` | Layout wrappers for routing |
| `src/pages/` | Core pages (Home, Wizard, Dashboard, Profile) |
| `src/utils/predictions.js` | Core mathematical simulation engine |
| `src/utils/auth.js` | Local authentication logic |
| `src/App.jsx` | Main router configuration |
| `src/index.css` | Tailwind theme configuration & animations |

---

## 🚀 Getting Started

### 📌 Prerequisites
- Node.js v18 or higher
- npm

---

### 🔧 Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/nutripredict.git
cd nutripredict
```

#### 2️⃣ Install Dependencies

> Because this project uses Vite 8 and Tailwind v4, we use legacy peer deps to resolve strict dependency conflicts.

```bash
npm install --legacy-peer-deps
```

If prompted by Recharts:

```bash
npm install react-is --legacy-peer-deps
```

#### 3️⃣ Start Development Server

```bash
npm run dev -- --force
```

#### 4️⃣ Open in Browser

Visit:

```
http://localhost:5173
```

---

## 💡 Usage Workflow

1. Click **Predict My Diet Outcome**
2. Complete the 3-step wizard:
   - Personal Details
   - Lifestyle Signals
   - Target Diet
3. View your 12-week forecast dashboard
4. Sign in to save prediction history

---

## 📊 Core Concept

NutriPredict is built on a **simulation-first approach**, meaning:

> "Forecast first. Commit later."

It models metabolic trends, behavioral sustainability, and projected weight curves using deterministic front-end logic — providing decision confidence before lifestyle change.

---

## 📄 License

This project is developed for:

- Educational purposes  
- Academic submission  
- Hackathon demonstration  

Not intended for medical diagnosis or real-world clinical use.

---

## 👨‍💻 Author

**Harsh Singh**  
B.Tech Student  
Parul University, Gujarat  

---

⭐ If you like this project, consider giving it a star on GitHub!
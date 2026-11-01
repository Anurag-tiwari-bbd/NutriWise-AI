# NutriWise AI — AI-Based Personalized Nutrition Recommendation Engine

**Clinical Informatics Project | UN Sustainable Development Goal 3: Good Health and Well-being (Target 3.4)**

NutriWise AI is an evidence-informed, deterministic rule-based clinical nutrition recommendation web application tailored for Indian dietary traditions and metabolic wellness. It integrates the clinically validated **Mifflin-St Jeor** predictive equation to calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), enforcing ICMR-NIN 2020 Recommended Dietary Allowances (RDA) to formulate customized 7-day Indian meal plans, cultural fasting adaptations, 6-aisle grocery checklists, longitudinal patient records, and publication-grade clinical PDF reports.

---

## 🎯 UN Sustainable Development Goal 3 (Target 3.4) Alignment

> **UN SDG Target 3.4:** *"By 2030, reduce by one third premature mortality from non-communicable diseases (NCDs) through prevention and treatment and promote mental health and well-being."*

- **Type 2 Diabetes:** Enforces a strict glycemic index ceiling ($\text{GI} \le 55$) with high-fiber whole pulses and unpolished grains to mitigate postprandial glucose surges (addressing India's 77M+ diabetes burden).
- **Hypertension & Cardiovascular Health:** Enforces a DASH-compliant sodium restriction ceiling ($< 2,000\text{ mg/day}$) paired with bioavailable potassium from lentils, spinach, and unrefined salts.
- **PCOS & Insulin Resistance:** Enforces an insulin-sensitizing macronutrient distribution ($25\%\text{ Protein}$, $45\%\text{ Complex Low-GI Carbs}$, $30\%\text{ Healthy MUFA/PUFA Fats}$).
- **Cultural Inclusivity:** Full support for Vegetarian, Vegan, Non-Vegetarian (55:45 Golden Ratio), and strict Jain diets (zero alliums or underground root tubers).

---

## 🚀 Complete Architecture Across All 6 Phases

### 🔹 Phase 1: Healthcare Design System & UN SDG 3 Baseline
- Dual-theme design tokens (Light Theme `#F8FAFC` & Dark Theme `#0B1220` with `#111C30` card surfaces and `#26364D` borders).
- Floating 1-click Dark/Light mode FAB with persistent `localStorage` theme state.
- Interactive UN SDG 3 impact showcase with statistics cited from WHO, ICMR-INDIAB, and AIIMS.
- Comprehensive medical and educational guidance disclaimer modal.

### 🔹 Phase 2: Core Deterministic Nutrition Engine & 112 Authentic Indian Dishes
- Clinically validated **Mifflin-St Jeor** BMR estimation base:
  $$\text{BMR}_{\text{male}} = 10 \times \text{weight (kg)} + 6.25 \times \text{height (cm)} - 5 \times \text{age} + 5$$
  $$\text{BMR}_{\text{female}} = 10 \times \text{weight (kg)} + 6.25 \times \text{height (cm)} - 5 \times \text{age} - 161$$
  $$\text{TDEE} = \text{BMR} \times \text{PAL multiplier}$$
- Absolute physiological safety floors: Minimum $\ge 1,200\text{ kcal/day}$ for females and $\ge 1,500\text{ kcal/day}$ for males.
- Comprehensive catalog of 112 authentic Indian regional meals categorized across Breakfast, Lunch, Evening Snacks, and Dinner.

### 🔹 Phase 3: Interactive Multi-Step Health Assessment Wizard
- 3-step clinical biometrics form:
  1. *Body Metrics & Demographics* (Age, Sex, Height, Weight, live BMI calculation widget).
  2. *Lifestyle & Goals* (PAL activity multiplier cards, health goal adjustments, dietary preferences, non-veg cadence).
  3. *Health Cautions & Safety Pre-flight* (Condition toggles, allergen exclusions, safety summary).
- Active assessment completed status card with single-click "Re-Assess / Edit Profile" or "Start Fresh" workflows.

### 🔹 Phase 4: Nutrition Dashboard & Recharts Analytics
- Recharts Caloric Macronutrient Donut chart and 7-day energy & protein consistency bar chart.
- Clinical safety ceiling gauges: Dietary Fiber ($\ge 30\text{g}$ standard), DASH Sodium ceiling ($< 2,000\text{ mg/day}$), and interactive Daily Water Hydration logger.
- Cultural & Religious Fasting Adaptation Engine supporting:
  - Navratri & Ekadashi Vrat Mode (100% grain-free pseudograin substitution).
  - Shravan & Somwar Satvik Mode (pure satvik plant-protein conversion).
  - Ramadan Roza Circadian Timing (biphasic Suhoor & Iftar metabolic alignment).
- Condition-specific Clinical Advisory cards (Diabetes, Hypertension, PCOS, Lactose Intolerance).

### 🔹 Phase 5: 7-Day Meal Planner, Pantry Optimizer & Food Explorer
- Interactive 7-Day Indian Meal Schedule with intra-slot meal-swapping dialog enforcing identical calorie and macro tolerances ($\pm 50\text{ kcal}$).
- Dynamic 6-Aisle Indian Pantry & Grocery Planner with interactive item check-off and clipboard copy.
- Indian Food Explorer encyclopedia featuring 112 regional dishes with portion scaling ($0.5\times, 1\times, 1.5\times, 2\times$), culinary ingredients, authentic cooking instructions, spice pharmacology, and micronutrient %DV bars.

### 🔹 Phase 6: Capstone Clinical Deliverables & Algorithmic Transparency Suite
- **Publication-Grade 3-Page Clinical PDF Exporter (`src/utils/pdfExport.ts`):**
  - Page 1: Clinical demographics, anthropometrics, Mifflin-St Jeor parameters, macro split table, and medical cautions.
  - Page 2: Complete 7-day Indian regional meal schedule (Monday to Sunday) across all 4 daily slots.
  - Page 3: Consolidated 6-aisle grocery checklist, ICMR/WHO medical disclaimer, and clinician sign-off block.
- **Patient Assessment Vault & History (`src/components/history/AssessmentHistoryModal.tsx`):**
  - Immutable historical assessment snapshots saved client-side in `localStorage`.
  - Longitudinal trend comparison chip (calculating $\Delta \text{ Weight}$, $\Delta \text{ BMI}$, and $\Delta \text{ Caloric Target}$ between sessions).
  - One-click "Restore Plan" and "Export PDF for This Record" actions.
- **Clinical Algorithm & Calculation Inspector (`src/components/common/VivaDefenseModal.tsx`):**
  - Live arithmetic substitution showing step-by-step products of Mifflin-St Jeor equation across customizable patient archetypes.
  - Deterministic rule engine audit trail with multi-scenario filter simulation (Vegetarian, Jain, Vegan, Non-Veg, DASH).
  - Interactive Live Dish Rule Tester with quick-test tags.
  - Formal UN SDG 3.4 evidence & policy mapping matrix.
- **Architecture & Clinical Engineering Guide (`SYSTEM_ARCHITECTURE_GUIDE.md`):**
  - In-depth technical rationale covering deterministic algorithms vs. LLMs, Mifflin-St Jeor derivation, and clinical adherence protocols.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18 (Hooks, Context, Memoization) |
| **Build System & Tooling** | Vite 5, TypeScript 5.6 (Strict Type Safety) |
| **Styling & Theme** | Tailwind CSS 3, Custom CSS Variables, Dark Mode Class Architecture |
| **Data Visualization** | Recharts (ResponsiveContainer, PieChart, BarChart) |
| **Clinical PDF Engine** | jsPDF (Multi-page vector layout) |
| **Icons & Micro-interactions** | Lucide React |
| **Storage & Privacy** | HTML5 LocalStorage (100% Client-Side, Zero Cloud Leakage) |

---

## 💻 How to Run the Application

```powershell
# 1. Clone the repository
git clone https://github.com/Anurag-tiwari-bbd/NutriWise-AI.git
cd NutriWise-AI

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Preview production build
npm run build
npm run preview
```

The web application runs locally at:  
👉 **`http://localhost:5173/`**

---

## 📚 Clinical Evaluation Credentials

- **Project Title:** NutriWise AI — AI-Based Personalized Nutrition Recommendation Engine
- **Global Benchmark:** United Nations Sustainable Development Goal 3 (Good Health and Well-being)
- **Clinical Guidelines:** ICMR-NIN (2020) Nutrient Requirements & RDA for Indians; WHO Global Action Plan on NCDs

import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, 
  Calendar, 
  Ruler, 
  Scale, 
  Activity, 
  Flame, 
  Heart, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Utensils, 
  Wheat, 
  Milk, 
  Fish, 
  Egg, 
  Leaf, 
  Dumbbell, 
  HeartPulse, 
  Plus, 
  X,
  Target,
  Clock,
  Check
} from 'lucide-react';
import { 
  UserProfile, 
  ActivityLevel, 
  HealthGoal, 
  DietPreference, 
  NonVegCadence, 
  HealthCondition 
} from '../../types/nutrition';
import { 
  calculateBMI, 
  calculateBMR, 
  calculateTDEE, 
  getSafeCalorieTarget 
} from '../../utils/calculations';
import { Badge } from '../common/Badge';
import { InfoTooltip } from '../common/InfoTooltip';
import { DEMO_PROFILES } from '../../data/demoProfiles';

interface AssessmentWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
  initialProfile?: UserProfile | null;
}

interface FormData {
  name: string;
  age: string;
  gender: 'male' | 'female';
  heightCm: string;
  weightKg: string;
  activityLevel: ActivityLevel;
  healthGoal: HealthGoal;
  dietPreference: DietPreference;
  nonVegCadence: NonVegCadence;
  healthConditions: HealthCondition[];
  allergies: string[];
}

const DEFAULT_FORM: FormData = {
  name: '',
  age: '',
  gender: 'male',
  heightCm: '',
  weightKg: '',
  activityLevel: 'moderate',
  healthGoal: 'weight_loss',
  dietPreference: 'vegetarian',
  nonVegCadence: 'balanced_daily',
  healthConditions: [],
  allergies: [],
};

const COMMON_ALLERGENS = [
  { id: 'dairy', label: 'Dairy / Lactose', icon: Milk },
  { id: 'peanuts', label: 'Peanuts / Groundnut', icon: Wheat },
  { id: 'gluten', label: 'Gluten / Wheat', icon: Wheat },
  { id: 'eggs', label: 'Eggs', icon: Egg },
  { id: 'fish', label: 'Fish & Seafood', icon: Fish },
  { id: 'soy', label: 'Soy / Soya', icon: Leaf },
];

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({
  onComplete,
  onCancel,
  initialProfile,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [customAllergy, setCustomAllergy] = useState('');
  const [form, setForm] = useState<FormData>(() => {
    if (initialProfile) {
      return {
        name: initialProfile.name,
        age: initialProfile.age.toString(),
        gender: initialProfile.gender,
        heightCm: initialProfile.heightCm.toString(),
        weightKg: initialProfile.weightKg.toString(),
        activityLevel: initialProfile.activityLevel,
        healthGoal: initialProfile.healthGoal,
        dietPreference: initialProfile.dietPreference,
        nonVegCadence: initialProfile.nonVegCadence || 'balanced_daily',
        healthConditions: initialProfile.healthConditions,
        allergies: initialProfile.allergies,
      };
    }
    // Check localStorage draft
    try {
      const saved = localStorage.getItem('nutriwise_assessment_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore parse error
    }
    return DEFAULT_FORM;
  });

  // Persist draft to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nutriwise_assessment_draft', JSON.stringify(form));
    } catch {
      // Ignore quota errors
    }
  }, [form]);

  // Live BMI calculation
  const liveBmi = useMemo(() => {
    const h = parseFloat(form.heightCm);
    const w = parseFloat(form.weightKg);
    if (!isNaN(h) && !isNaN(w) && h >= 120 && h <= 230 && w >= 35 && w <= 200) {
      const { bmi, category } = calculateBMI(w, h);
      const hM = h / 100;
      const minHealthyW = Math.round(18.5 * hM * hM * 10) / 10;
      const maxHealthyW = Math.round(24.9 * hM * hM * 10) / 10;
      return { bmi, category, minHealthyW, maxHealthyW };
    }
    return null;
  }, [form.heightCm, form.weightKg]);

  // Live Calorie Estimates
  const liveEnergy = useMemo(() => {
    const h = parseFloat(form.heightCm);
    const w = parseFloat(form.weightKg);
    const a = parseInt(form.age, 10);
    if (!isNaN(h) && !isNaN(w) && !isNaN(a) && a >= 18 && a <= 100 && h >= 120 && w >= 35) {
      const bmr = calculateBMR(form.gender, w, h, a);
      const tdee = calculateTDEE(bmr, form.activityLevel);
      const { targetCalories, adjustmentNote } = getSafeCalorieTarget(tdee, form.healthGoal, form.gender);
      return { bmr, tdee, targetCalories, adjustmentNote };
    }
    return null;
  }, [form.heightCm, form.weightKg, form.age, form.gender, form.activityLevel, form.healthGoal]);

  // Step 1 Validation
  const step1Valid = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const ageNum = parseInt(form.age, 10);
    const ageOk = !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100;
    const hNum = parseFloat(form.heightCm);
    const hOk = !isNaN(hNum) && hNum >= 120 && hNum <= 230;
    const wNum = parseFloat(form.weightKg);
    const wOk = !isNaN(wNum) && wNum >= 35 && wNum <= 200;
    return nameOk && ageOk && hOk && wOk;
  }, [form.name, form.age, form.heightCm, form.weightKg]);

  // Step 2 Validation
  const step2Valid = useMemo(() => {
    return Boolean(form.activityLevel && form.healthGoal && form.dietPreference);
  }, [form.activityLevel, form.healthGoal, form.dietPreference]);

  // Preset Fast-Fill for Sample Demonstrations
  const handleLoadPreset = (profile: UserProfile) => {
    setForm({
      name: profile.name,
      age: profile.age.toString(),
      gender: profile.gender,
      heightCm: profile.heightCm.toString(),
      weightKg: profile.weightKg.toString(),
      activityLevel: profile.activityLevel,
      healthGoal: profile.healthGoal,
      dietPreference: profile.dietPreference,
      nonVegCadence: profile.nonVegCadence || 'balanced_daily',
      healthConditions: [...profile.healthConditions],
      allergies: [...profile.allergies],
    });
  };

  const handleToggleCondition = (cond: HealthCondition) => {
    setForm((prev) => {
      const exists = prev.healthConditions.includes(cond);
      return {
        ...prev,
        healthConditions: exists
          ? prev.healthConditions.filter((c) => c !== cond)
          : [...prev.healthConditions, cond],
      };
    });
  };

  const handleToggleAllergy = (allergen: string) => {
    setForm((prev) => {
      const exists = prev.allergies.includes(allergen);
      return {
        ...prev,
        allergies: exists
          ? prev.allergies.filter((a) => a !== allergen)
          : [...prev.allergies, allergen],
      };
    });
  };

  const handleAddCustomAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customAllergy.trim().toLowerCase();
    if (trimmed && !form.allergies.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        allergies: [...prev.allergies, trimmed],
      }));
      setCustomAllergy('');
    }
  };

  const handleRemoveAllergy = (allergen: string) => {
    setForm((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((a) => a !== allergen),
    }));
  };

  const handleSubmit = () => {
    const finalProfile: UserProfile = {
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      age: parseInt(form.age, 10),
      gender: form.gender,
      heightCm: parseFloat(form.heightCm),
      weightKg: parseFloat(form.weightKg),
      activityLevel: form.activityLevel,
      healthGoal: form.healthGoal,
      dietPreference: form.dietPreference,
      nonVegCadence: form.dietPreference === 'non_vegetarian' ? form.nonVegCadence : undefined,
      healthConditions: form.healthConditions,
      allergies: form.allergies,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.removeItem('nutriwise_assessment_draft');
    } catch {
      // Ignore
    }

    onComplete(finalProfile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 sm:px-6">
      <div className="bg-white dark:bg-[#111C30] rounded-3xl border border-slate-200/90 dark:border-[#26364D] shadow-xl overflow-hidden space-y-0 transition-all">
        
        {/* Top Header & Fast Preset Fill Bar */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 dark:from-[#17243A] dark:via-[#111C30] dark:to-[#0F172A] border-b border-slate-100 dark:border-[#26364D] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <HeartPulse className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Health &amp; Biometrics Assessment
                  </h1>
                  <Badge variant="emerald" size="sm">Phase 3</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Clinical input form for precision Indian diet formulation
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[#17243A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
          </div>

          {/* Quick Preset Bar for Sample Profiles */}
          <div className="pt-2 border-t border-emerald-100/80 dark:border-[#26364D] flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Quick Fill Sample Profiles:
            </span>
            {DEMO_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleLoadPreset(p)}
                className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-emerald-200 dark:border-[#26364D] shadow-2xs transition-all flex items-center gap-1"
              >
                <span>{p.name.split(' ')[0]} ({p.dietPreference})</span>
              </button>
            ))}
          </div>

          {/* 3-Step Visual Progress Bar */}
          <div className="pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className={currentStep === 1 ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : ''}>
                1. Biometrics &amp; Body
              </span>
              <span className={currentStep === 2 ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : ''}>
                2. Lifestyle &amp; Goals
              </span>
              <span className={currentStep === 3 ? 'text-emerald-700 dark:text-emerald-400 font-extrabold' : ''}>
                3. Health Cautions &amp; Safety
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Wizard Form Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* ==================================================== */}
          {/* STEP 1: Biometrics & Demographics */}
          {/* ==================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Step 1: Body Metrics &amp; Demographics
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Required to compute your Basal Metabolic Rate (BMR) via the clinically validated Mifflin-St Jeor formula.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="name-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Full Name or Alias</span>
                    <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Min 2 characters</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ananya Gupta"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#26364D] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#0F172A]"
                  />
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label htmlFor="age-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Age (Years)</span>
                    <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">18 – 100</span>
                  </label>
                  <input
                    id="age-input"
                    type="number"
                    min="18"
                    max="100"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#26364D] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#0F172A]"
                  />
                </div>

                {/* Biological Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span className="inline-flex items-center">
                      Biological Sex
                      <InfoTooltip termKey="mifflinStJeor" size="sm" />
                    </span>
                    <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Mifflin BMR constant</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, gender: 'male' })}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        form.gender === 'male'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-[#26364D]'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Male (+5)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, gender: 'female' })}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        form.gender === 'female'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-[#26364D]'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Female (-161)</span>
                    </button>
                  </div>
                </div>

                {/* Height (cm) */}
                <div className="space-y-1.5">
                  <label htmlFor="height-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Height (cm)</span>
                    <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">120 – 230 cm</span>
                  </label>
                  <div className="relative">
                    <input
                      id="height-input"
                      type="number"
                      min="120"
                      max="230"
                      value={form.heightCm}
                      onChange={(e) => setForm({ ...form, heightCm: e.target.value })}
                      placeholder="e.g. 170"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#26364D] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#0F172A] pr-12"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400 dark:text-slate-500">cm</span>
                  </div>
                </div>

                {/* Weight (kg) */}
                <div className="space-y-1.5">
                  <label htmlFor="weight-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Weight (kg)</span>
                    <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">35 – 200 kg</span>
                  </label>
                  <div className="relative">
                    <input
                      id="weight-input"
                      type="number"
                      min="35"
                      max="200"
                      step="0.5"
                      value={form.weightKg}
                      onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
                      placeholder="e.g. 68"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#26364D] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#0F172A] pr-12"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400 dark:text-slate-500">kg</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Live BMI Calculation Widget */}
              {liveBmi && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/60 to-white dark:from-[#17243A] dark:via-[#111C30] dark:to-[#0F172A] border border-emerald-200/80 dark:border-[#26364D] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                        Live Body Mass Index (BMI)
                      </span>
                    </div>
                    <Badge 
                      variant={
                        liveBmi.category === 'normal' 
                          ? 'emerald' 
                          : liveBmi.category === 'underweight' 
                          ? 'mint' 
                          : 'amber'
                      } 
                      size="sm"
                    >
                      {liveBmi.category.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {liveBmi.bmi} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">kg/m²</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Healthy reference weight for your height ({form.heightCm} cm):{' '}
                      <strong className="text-emerald-800 dark:text-emerald-300 font-bold">
                        {liveBmi.minHealthyW} kg – {liveBmi.maxHealthyW} kg
                      </strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 2: Lifestyle, Activity & Dietary Preference */}
          {/* ==================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Step 2: Lifestyle, Energy &amp; Dietary Preferences
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your physical activity and target caloric goal to determine daily expenditure (TDEE).
                </p>
              </div>

              {/* Physical Activity Level Cards */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="inline-flex items-center">
                    Physical Activity Level
                    <InfoTooltip termKey="tdee" size="sm" />
                  </span>
                  <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Mifflin PAL multiplier</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'sedentary', label: 'Sedentary', sub: 'Desk job, minimal activity', mult: '1.20', icon: Clock },
                    { id: 'light', label: 'Lightly Active', sub: 'Light exercise 1-3 days/week', mult: '1.375', icon: Activity },
                    { id: 'moderate', label: 'Moderately Active', sub: 'Workouts 3-5 days/week', mult: '1.55', icon: Dumbbell },
                    { id: 'very_active', label: 'Very Active', sub: 'Hard sports 6-7 days/week', mult: '1.725', icon: Flame },
                    { id: 'extra_active', label: 'Extra Active', sub: 'Physical labor or 2x/day training', mult: '1.90', icon: Target },
                  ].map((item) => {
                    const isSelected = form.activityLevel === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setForm({ ...form, activityLevel: item.id as ActivityLevel })}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-slate-50/60 dark:bg-[#17243A] hover:bg-slate-100 dark:hover:bg-[#1f304c] border-slate-200/80 dark:border-[#26364D]'
                        }`}
                      >
                        <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-[#0F172A] text-slate-600 dark:text-slate-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</span>
                            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-[#0F172A] px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                              ×{item.mult}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{item.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Health Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="inline-flex items-center">
                    Primary Metabolic Goal
                    <InfoTooltip termKey="calorieTarget" size="sm" />
                  </span>
                  <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Daily calorie adjustment</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'weight_loss', label: 'Weight Loss', delta: '-450 kcal', sub: 'Gradual, healthy fat reduction' },
                    { id: 'maintenance', label: 'Maintain Weight', delta: '0 kcal', sub: 'Isocaloric energy equilibrium' },
                    { id: 'weight_gain', label: 'Weight / Muscle Gain', delta: '+300 kcal', sub: 'Surplus for lean hypertrophy' },
                  ].map((g) => {
                    const isSelected = form.healthGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setForm({ ...form, healthGoal: g.id as HealthGoal })}
                        className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
                          isSelected
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-slate-50/60 dark:bg-[#17243A] hover:bg-slate-100 dark:hover:bg-[#1f304c] border-slate-200/80 dark:border-[#26364D]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{g.label}</span>
                          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-[#0F172A] text-slate-700 dark:text-slate-300'}`}>
                            {g.delta}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{g.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diet Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Dietary Preference</span>
                  <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Controls catalog filtering</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'vegetarian', label: 'Vegetarian', sub: 'Dairy allowed' },
                    { id: 'jain', label: 'Jain Diet', sub: 'Root-veg & onion free' },
                    { id: 'vegan', label: '100% Vegan', sub: 'Plant-based only' },
                    { id: 'non_vegetarian', label: 'Non-Vegetarian', sub: 'Eggs, poultry, fish' },
                  ].map((d) => {
                    const isSelected = form.dietPreference === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setForm({ ...form, dietPreference: d.id as DietPreference })}
                        className={`p-3.5 rounded-2xl border text-center transition-all space-y-0.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200 border-slate-200/60 dark:border-[#26364D]'
                        }`}
                      >
                        <div className="text-xs font-bold">{d.label}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {d.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Non-Veg Cadence Sub-Selector */}
              {form.dietPreference === 'non_vegetarian' && (
                <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-[#0F172A] border border-emerald-200/80 dark:border-[#26364D] space-y-3 animate-fade-in">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                      <Utensils className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      Select Non-Vegetarian Consumption Cadence:
                    </span>
                    <p className="text-[11.5px] text-emerald-800 dark:text-emerald-400 leading-relaxed">
                      Clinical rule: Indian non-veg diet pairs animal protein with 30g+ prebiotic gut fiber from lentils &amp; vegetables.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { 
                        id: 'balanced_daily', 
                        label: '⚖️ Balanced Flexitarian', 
                        badge: 'Recommended 55:45',
                        desc: '1-2 non-veg meals/day + wholesome dals & prebiotic greens.' 
                      },
                      { 
                        id: 'high_protein_gym', 
                        label: '🏋️ High-Protein Gym', 
                        badge: 'Fitness Training',
                        desc: '2-3 non-veg meals/day (eggs in morning + poultry in night).' 
                      },
                      { 
                        id: 'occasional', 
                        label: '🌿 Occasional Non-Veg', 
                        badge: '2-3 Days/Week',
                        desc: 'Non-veg on alternate days; wholesome vegetarian on others.' 
                      },
                    ].map((c) => {
                      const isSelected = form.nonVegCadence === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setForm({ ...form, nonVegCadence: c.id as NonVegCadence })}
                          className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                            isSelected
                              ? 'bg-white dark:bg-[#17243A] border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-600/20 shadow-xs'
                              : 'bg-emerald-100/50 hover:bg-white/80 dark:bg-[#111C30] dark:hover:bg-[#17243A] border-emerald-200/70 dark:border-[#26364D] text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{c.label}</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                            {c.badge}
                          </span>
                          <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-snug">{c.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live Energy Calculation Preview Chip */}
              {liveEnergy && (
                <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#070D18] border border-slate-800 dark:border-[#26364D] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      Live Metabolic Energy Computation
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                      <span>BMR: <strong className="text-white font-bold">{liveEnergy.bmr} kcal</strong></span>
                      <span>•</span>
                      <span>TDEE: <strong className="text-white font-bold">{liveEnergy.tdee} kcal</strong></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400">
                      ~{liveEnergy.targetCalories} <span className="text-xs font-normal text-slate-300">kcal/day</span>
                    </div>
                    <span className="text-[10.5px] text-slate-400">{liveEnergy.adjustmentNote}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* STEP 3: Clinical Health Conditions & Allergies */}
          {/* ==================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Step 3: Clinical Conditions &amp; Allergen Safety
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Strict medical boundaries enforced by our rule engine to safeguard against glucose spikes or allergen reactions.
                </p>
              </div>

              {/* Health Conditions Multi-Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="inline-flex items-center">
                    Existing Medical &amp; Lifestyle Conditions
                    <InfoTooltip termKey="dietaryCaution" size="sm" />
                  </span>
                  <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Select all that apply</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'diabetes',
                      label: 'Type-2 Diabetes / Pre-diabetes',
                      desc: 'Strictly enforces Low Glycemic Index (<55) to prevent postprandial glucose spikes.',
                      termKey: 'diabetes' as const,
                    },
                    {
                      id: 'hypertension',
                      label: 'Hypertension (High BP)',
                      desc: 'Applies DASH-diet rules: restricts sodium, papads, pickles; prioritizes potassium.',
                      termKey: 'hypertension' as const,
                    },
                    {
                      id: 'pcos',
                      label: 'PCOS / PCOD Hormonal Care',
                      desc: 'Emphasizes insulin-sensitizing complex carbs and anti-inflammatory spices.',
                      termKey: 'pcos' as const,
                    },
                    {
                      id: 'thyroid',
                      label: 'Hypothyroid / Thyroid Support',
                      desc: 'Ensures bioavailable selenium and cooked crucifers, avoiding raw goitrogens.',
                      termKey: 'thyroid' as const,
                    },
                    {
                      id: 'lactose_intolerance',
                      label: 'Lactose Intolerance',
                      desc: 'Completely eliminates dairy, cow milk, paneer & curd; replaces with plant proteins.',
                      termKey: 'lactose_intolerance' as const,
                    },
                  ].map((item) => {
                    const isSelected = form.healthConditions.includes(item.id as HealthCondition);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleCondition(item.id as HealthCondition)}
                        className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 flex items-start gap-3 ${
                          isSelected
                            ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20'
                            : 'bg-slate-50/60 dark:bg-[#17243A] hover:bg-slate-100 dark:hover:bg-[#1f304c] border-slate-200/80 dark:border-[#26364D]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300 dark:border-[#26364D] bg-white dark:bg-[#0F172A]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center">
                            <span>{item.label}</span>
                            <InfoTooltip termKey={item.termKey} size="sm" />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Food Allergies Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Food Allergens &amp; Intolerances</span>
                  <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">Strictly excluded from meals</span>
                </label>
                
                {/* Predefined Allergy Chips */}
                <div className="flex flex-wrap gap-2">
                  {COMMON_ALLERGENS.map((a) => {
                    const isSelected = form.allergies.includes(a.id);
                    const Icon = a.icon;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => handleToggleAllergy(a.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-[#26364D]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{a.label}</span>
                        {isSelected && <X className="w-3 h-3 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Allergy Adder */}
                <form onSubmit={handleAddCustomAllergy} className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                    placeholder="Add custom ingredient (e.g. mushrooms, sesame)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#26364D] focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-900 dark:text-white bg-slate-50/50 dark:bg-[#0F172A]"
                  />
                  <button
                    type="submit"
                    disabled={!customAllergy.trim()}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </form>

                {/* Active Custom Allergies Display */}
                {form.allergies.filter((a) => !COMMON_ALLERGENS.some((ca) => ca.id === a)).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {form.allergies
                      .filter((a) => !COMMON_ALLERGENS.some((ca) => ca.id === a))
                      .map((ca) => (
                        <span
                          key={ca}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-xs font-bold flex items-center gap-1"
                        >
                          {ca}
                          <button
                            type="button"
                            onClick={() => handleRemoveAllergy(ca)}
                            className="hover:text-rose-950 dark:hover:text-rose-100"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Pre-Flight Clinical Safety Summary Card */}
              <div className="p-5 rounded-2xl bg-emerald-50/90 dark:bg-[#0F172A] border border-emerald-200 dark:border-[#26364D] shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <span className="text-xs font-extrabold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider">
                    Pre-Flight Safety Checks Verified by Recommendation Engine
                  </span>
                </div>
                <ul className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                    <span>Diet Category: <strong>{form.dietPreference.toUpperCase()}</strong></span>
                    {form.dietPreference === 'non_vegetarian' && (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">({form.nonVegCadence.replace('_', ' ')})</span>
                    )}
                  </li>
                  {form.healthConditions.length > 0 ? (
                    form.healthConditions.map((cond) => (
                      <li key={cond} className="flex items-center gap-1.5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                        <span>Clinical Filter Active: <strong>{cond.toUpperCase()}</strong></span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>No active chronic clinical cautions selected; standard healthy adult parameters apply.</span>
                    </li>
                  )}
                  {form.allergies.length > 0 && (
                    <li className="flex items-center gap-1.5">
                      <span className="text-rose-600 dark:text-rose-400 font-bold">✓</span>
                      <span>Zero tolerance exclusion for: <strong>{form.allergies.join(', ')}</strong></span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 dark:border-[#26364D] flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2)}
                className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1f304c] transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-3 rounded-2xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
              >
                Cancel
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                disabled={currentStep === 1 ? !step1Valid : !step2Valid}
                onClick={() => setCurrentStep((prev) => (prev + 1) as 2 | 3)}
                className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-2xl text-sm font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 transform hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate My AI Nutrition Plan</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

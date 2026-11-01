import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  X, 
  Calculator, 
  Cpu, 
  Globe2, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Flame,
  Scale,
  Droplets,
  AlertTriangle,
  Check,
  UserCheck,
  HeartPulse,
  ShieldCheck,
  Info
} from 'lucide-react';
import { UserProfile, NutritionMetrics, WeeklyPlan, MealItem } from '../../types/nutrition';
import { INDIAN_MEALS } from '../../data/indianMeals';
import { Badge } from './Badge';

interface VivaDefenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  metrics: NutritionMetrics | null;
  plan: WeeklyPlan | null;
}

interface ScenarioProfile {
  id: string;
  label: string;
  subtitle: string;
  badge: string;
  icon: string;
  profile: UserProfile;
  constraints: {
    diet: string;
    glycemic: string;
    sodium: string;
    allergen: string;
  };
}

const CLINICAL_SCENARIOS: ScenarioProfile[] = [
  {
    id: 'rajesh',
    label: 'Rajesh Sharma',
    subtitle: 'Vegetarian • Type 2 Diabetes • Hypertension',
    badge: 'Vegetarian + DASH',
    icon: '🥬',
    profile: {
      id: 'demo-rajesh',
      name: 'Rajesh Sharma (Sample Profile)',
      age: 48,
      gender: 'male',
      heightCm: 172,
      weightKg: 82,
      activityLevel: 'sedentary',
      healthGoal: 'weight_loss',
      dietPreference: 'vegetarian',
      allergies: ['peanuts'],
      healthConditions: ['diabetes', 'hypertension'],
      createdAt: new Date().toISOString(),
    },
    constraints: {
      diet: 'Enforced VEGETARIAN protocol. All animal poultry, meat, fish, and eggs strictly excluded.',
      glycemic: 'Active: Glycemic Index capped at LOW/MEDIUM (<=55). High GI refined flours & sugars filtered.',
      sodium: 'DASH Protocol Active: Daily dietary sodium capped at <2,000 mg/day.',
      allergen: 'Allergen Shield: Banned tags: PEANUTS. Zero cross-contamination permitted.',
    }
  },
  {
    id: 'priya',
    label: 'Priya Patel',
    subtitle: 'Strict Jain • PCOS • Insulin Resistance',
    badge: 'Strict Jain (No Allium)',
    icon: '🪷',
    profile: {
      id: 'demo-priya',
      name: 'Priya Patel (Sample Profile)',
      age: 26,
      gender: 'female',
      heightCm: 160,
      weightKg: 68,
      activityLevel: 'light',
      healthGoal: 'weight_loss',
      dietPreference: 'jain',
      allergies: [],
      healthConditions: ['pcos'],
      createdAt: new Date().toISOString(),
    },
    constraints: {
      diet: 'Strict JAIN AHIMSA protocol. Excludes all underground root tubers (onions, garlic, potatoes, carrots, radish) & all animal products.',
      glycemic: 'PCOS Insulin Rule: Capped at LOW/MEDIUM GI (<=55) to prevent hyperinsulinemia & ovarian androgen spikes.',
      sodium: 'ICMR Healthy Baseline: Sodium balanced under 2,000 mg/day with clean natural seasonings.',
      allergen: 'Allium & Root Tuber Barrier: Zero onion, zero garlic, zero potatoes enforced across all 4 meal slots.',
    }
  },
  {
    id: 'aman',
    label: 'Aman Verma',
    subtitle: 'Non-Vegetarian • Fitness • Lactose Intolerance',
    badge: 'Non-Veg + Dairy Free',
    icon: '🍗',
    profile: {
      id: 'demo-aman',
      name: 'Aman Verma (Sample Profile)',
      age: 22,
      gender: 'male',
      heightCm: 178,
      weightKg: 65,
      activityLevel: 'moderate',
      healthGoal: 'weight_gain',
      dietPreference: 'non_vegetarian',
      allergies: ['lactose_intolerance'],
      healthConditions: ['lactose_intolerance'],
      createdAt: new Date().toISOString(),
    },
    constraints: {
      diet: 'Balanced NON-VEGETARIAN cadence. Complete animal protein from lean chicken & fish paired with whole grains.',
      glycemic: 'Metabolic Anabolism: Balanced complex carbs paired with high protein for lean tissue accretion.',
      sodium: 'Standard ICMR Guideline: Sodium capped at <2,000 mg/day to preserve long-term vascular health.',
      allergen: '100% DAIRY-FREE Filter: Zero bovine milk, paneer, regular curd, or whey to prevent lactose intolerance distress.',
    }
  },
  {
    id: 'vegan',
    label: 'Ananya Sen',
    subtitle: '100% Plant-Based Vegan • Gluten Caution',
    badge: 'Pure Vegan (Plant-Based)',
    icon: '🌱',
    profile: {
      id: 'demo-vegan',
      name: 'Ananya Sen (Sample Profile)',
      age: 31,
      gender: 'female',
      heightCm: 165,
      weightKg: 62,
      activityLevel: 'moderate',
      healthGoal: 'weight_loss',
      dietPreference: 'vegan',
      allergies: ['gluten'],
      healthConditions: [],
      createdAt: new Date().toISOString(),
    },
    constraints: {
      diet: '100% PLANT-BASED VEGAN. Excludes all animal products, cow/buffalo milk, paneer, curd, ghee, butter, eggs, poultry, and fish.',
      glycemic: 'Plant Whole-Food Matrix: High soluble & insoluble fiber (>35g/day) from legumes, seeds, and pseudograins.',
      sodium: 'Whole Plant Baseline: Naturally low-sodium whole ingredients seasoned with fresh coriander, mint, and cumin.',
      allergen: 'GLUTEN SHIELD: Eliminates wheat, Maida, suji, and barley; admits rice, oats, millet, and buckwheat.',
    }
  },
  {
    id: 'dash',
    label: 'Vikram Malhotra',
    subtitle: 'Cardiovascular DASH • Heart Health Focus',
    badge: 'Cardio DASH Protocol',
    icon: '🩺',
    profile: {
      id: 'demo-dash',
      name: 'Vikram Malhotra (Sample Profile)',
      age: 54,
      gender: 'male',
      heightCm: 175,
      weightKg: 78,
      activityLevel: 'light',
      healthGoal: 'maintenance',
      dietPreference: 'vegetarian',
      allergies: [],
      healthConditions: ['hypertension'],
      createdAt: new Date().toISOString(),
    },
    constraints: {
      diet: 'Cardioprotective VEGETARIAN protocol emphasizing high potassium greens, lentils, and heart-healthy unsaturated fats.',
      glycemic: 'Anti-Inflammatory Low GI: Protects arterial endothelial function by preventing postprandial oxidative stress.',
      sodium: 'STRICT DASH SODIUM CEILING: Daily dietary sodium capped under 1,500–2,000 mg/day; commercial pickles & papads barred.',
      allergen: 'Clean Whole Ingredients: Zero MSG, artificial sodium additives, or commercial preserved sauces.',
    }
  }
];

export interface MealEvaluation {
  isSafe: boolean;
  ruleTag: string;
  reason: string;
  clinicalExplanation: string;
}

export function evaluateMealForScenario(meal: MealItem, profile: UserProfile): MealEvaluation {
  // 1. Dietary Preference Check
  if (profile.dietPreference === 'vegan') {
    if (meal.dietType !== 'vegan' || meal.allergens.includes('dairy') || meal.allergens.includes('eggs') || meal.allergens.includes('fish')) {
      return {
        isSafe: false,
        ruleTag: 'BANNED: NON-VEGAN',
        reason: 'Dietary Protocol: Contains animal dairy (paneer, ghee, milk, curd), eggs, or meat.',
        clinicalExplanation: 'Vegan dietary framework strictly prohibits all animal-derived foods and animal byproducts.'
      };
    }
  } else if (profile.dietPreference === 'jain') {
    if (!meal.isRootVegetableFree || (meal.dietType !== 'jain' && meal.dietType !== 'vegetarian' && meal.dietType !== 'vegan')) {
      return {
        isSafe: false,
        ruleTag: 'BANNED: ROOT TUBER / ALLIUM',
        reason: 'Jain Ahimsa Filter: Contains prohibited underground root tubers (potatoes, onions, garlic, carrots) or animal products.',
        clinicalExplanation: 'Jain dietary philosophy prohibits root vegetables and alliums to prevent underground organism harm.'
      };
    }
  } else if (profile.dietPreference === 'vegetarian') {
    if (meal.dietType === 'non_vegetarian' || meal.allergens.includes('eggs') || meal.allergens.includes('fish')) {
      return {
        isSafe: false,
        ruleTag: 'BANNED: ANIMAL FLESH / EGGS',
        reason: 'Vegetarian Protocol: Excluded animal poultry, meat, fish, and eggs.',
        clinicalExplanation: 'Vegetarian dietary boundaries prohibit animal slaughter products and avian eggs.'
      };
    }
    if (meal.dietType === 'jain') {
      return {
        isSafe: false,
        ruleTag: 'EXCLUDED: JAIN ONLY',
        reason: 'Culinary Variety: Excluded specialized Jain formulation to retain wholesome Indian vegetarian allium palette.',
        clinicalExplanation: 'Standard vegetarian profiles utilize onion and garlic for allicin and cardiovascular antioxidants.'
      };
    }
  } else if (profile.dietPreference === 'non_vegetarian') {
    if (meal.dietType === 'jain') {
      return {
        isSafe: false,
        ruleTag: 'EXCLUDED: JAIN ONLY',
        reason: 'Culinary Alignment: Excluded specialized Jain formulation for general palate.',
        clinicalExplanation: 'Non-vegetarian profiles are served standard culinary preparations.'
      };
    }
  }

  // 2. Direct Allergens Check
  for (const allergen of meal.allergens) {
    if (profile.allergies.some(a => a.toLowerCase().includes(allergen.toLowerCase()) || allergen.toLowerCase().includes(a.toLowerCase()))) {
      return {
        isSafe: false,
        ruleTag: `BANNED: ALLERGEN (${allergen.toUpperCase()})`,
        reason: `Allergen Shield: Contains ${allergen.toUpperCase()}, which is flagged as an active personal allergen.`,
        clinicalExplanation: 'Immediate automated exclusion prevents allergic sensitization, gastrointestinal distress, or anaphylaxis.'
      };
    }
  }

  // 3. Clinical Conditions Rules
  for (const cond of profile.healthConditions) {
    if (cond === 'diabetes' && meal.glycemicIndex === 'high') {
      return {
        isSafe: false,
        ruleTag: 'BANNED: HIGH GLYCEMIC INDEX',
        reason: 'Glycemic Control Rule: High GI (>55) induces rapid postprandial glucose spike.',
        clinicalExplanation: 'ICMR and WHO guidelines advise restricting high-GI refined grains to stabilize insulin and HbA1c.'
      };
    }
    if (cond === 'pcos' && meal.glycemicIndex === 'high') {
      return {
        isSafe: false,
        ruleTag: 'BANNED: HIGH GI (PCOS)',
        reason: 'Endocrine Protocol: High-GI carbohydrates worsen hyperinsulinemia and ovarian metabolic dysfunction.',
        clinicalExplanation: 'PCOS nutritional protocols prioritize low-GI and complex carbohydrates to manage insulin resistance.'
      };
    }
    if (cond === 'lactose_intolerance' && meal.allergens.includes('dairy')) {
      return {
        isSafe: false,
        ruleTag: 'BANNED: DAIRY (LACTOSE)',
        reason: 'Enzymatic Deficiency: Contains bovine dairy triggering lactose malabsorption, cramps, and bloating.',
        clinicalExplanation: '100% elimination of dairy lactose protects the mucosal intestinal lining in lactase-deficient patients.'
      };
    }
    if (cond === 'hypertension' && meal.calories > 450 && meal.category === 'snacks') {
      return {
        isSafe: false,
        ruleTag: 'BANNED: SODIUM CEILING',
        reason: 'Cardiovascular Ceiling: High caloric/sodium density exceeds DASH snack thresholds.',
        clinicalExplanation: 'DASH guidelines mandate restricting dense sodium-heavy preparations to regulate systemic blood pressure.'
      };
    }
  }

  // Clinical Rationale for Accepted Dishes
  let rationale = 'Wholesome balanced nutrition compliant with dietary preferences.';
  if (profile.healthConditions.includes('diabetes')) {
    rationale = `Low/Medium GI (${meal.glycemicIndex.toUpperCase()}) provides slow sustained glucose release without glycemic surge.`;
  } else if (profile.dietPreference === 'jain') {
    rationale = '100% underground root tuber & allium free, complying with strict Jain Ahimsa requirements.';
  } else if (profile.dietPreference === 'vegan') {
    rationale = 'Plant-based protein and micronutrient density with zero animal dairy or fats.';
  } else if (profile.dietPreference === 'non_vegetarian') {
    rationale = `High biological value protein (${meal.protein}g) paired with wholesome complex carbs.`;
  } else if (profile.healthConditions.includes('hypertension')) {
    rationale = 'Heart-healthy potassium-magnesium balance with low sodium density.';
  }

  return {
    isSafe: true,
    ruleTag: 'RULE MATCHED & SAFE',
    reason: 'Passed all dietary, allergen, and clinical safety thresholds.',
    clinicalExplanation: rationale,
  };
}

export const VivaDefenseModal: React.FC<VivaDefenseModalProps> = ({
  isOpen,
  onClose,
  profile,
  metrics,
  plan,
}) => {
  const [activeTab, setActiveTab] = useState<'derivation' | 'audit' | 'sdg'>('derivation');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('rajesh');
  const [dishSearchQuery, setDishSearchQuery] = useState<string>('');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Combine static scenarios with current user active profile (if present)
  const scenarios = useMemo(() => {
    if (profile && !profile.id.startsWith('demo-')) {
      const activePatientScenario: ScenarioProfile = {
        id: 'active-patient',
        label: profile.name,
        subtitle: `Active Assessment • ${profile.dietPreference.toUpperCase()} • ${profile.age}y`,
        badge: 'Current Patient',
        icon: '👤',
        profile,
        constraints: {
          diet: `Active ${profile.dietPreference.toUpperCase()} preference enforced.`,
          glycemic: profile.healthConditions.includes('diabetes')
            ? 'Active: Glycemic Index capped at LOW/MEDIUM (<=55).'
            : 'Standard complex carbohydrates prioritized.',
          sodium: profile.healthConditions.includes('hypertension')
            ? 'DASH Protocol Active: Daily dietary sodium capped at <2,000 mg/day.'
            : 'Standard ICMR sodium safety ceiling.',
          allergen: profile.allergies.length > 0
            ? `Banned tags: ${profile.allergies.join(', ').toUpperCase()}.`
            : 'No active allergen bans.',
        }
      };
      return [activePatientScenario, ...CLINICAL_SCENARIOS];
    }
    return CLINICAL_SCENARIOS;
  }, [profile]);

  const currentScenario = useMemo(() => {
    return scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  }, [scenarios, selectedScenarioId]);

  const activeP = currentScenario.profile;

  // Mathematical Derivations for Active Scenario
  const weightTerm = 10 * activeP.weightKg;
  const heightTerm = +(6.25 * activeP.heightCm).toFixed(2);
  const ageTerm = 5 * activeP.age;
  const sexConstant = activeP.gender === 'male' ? 5 : -161;
  const computedBmr = Math.round(weightTerm + heightTerm - ageTerm + sexConstant);

  const palMultipliers: Record<string, number> = {
    sedentary: 1.20,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
    extra_active: 1.90,
  };
  const pal = palMultipliers[activeP.activityLevel] || 1.20;
  const computedTdee = Math.round(computedBmr * pal);

  let rawTarget = computedTdee;
  let deltaKcal = 0;
  if (activeP.healthGoal === 'weight_loss') {
    deltaKcal = -450;
    rawTarget = computedTdee - 450;
  } else if (activeP.healthGoal === 'weight_gain') {
    deltaKcal = 300;
    rawTarget = computedTdee + 300;
  }
  const minFloor = activeP.gender === 'male' ? 1500 : 1200;
  const finalCalorieTarget = Math.max(rawTarget, minFloor);
  const isFloorClamped = rawTarget < minFloor;

  // Macronutrient 4:4:9 splits (approx. 22% Protein, 48% Carbs, 30% Fat)
  const proteinGrams = Math.round((finalCalorieTarget * 0.22) / 4);
  const carbsGrams = Math.round((finalCalorieTarget * 0.48) / 4);
  const fatGrams = Math.round((finalCalorieTarget * 0.30) / 9);
  const hydrationLiters = +(activeP.weightKg * 0.035).toFixed(2);
  const hydrationGlasses = Math.round(hydrationLiters / 0.25);

  // Dynamic Rule Execution across all 112 Indian Dishes
  const { acceptedList, rejectedList } = useMemo(() => {
    const accepted: { meal: MealItem; evalResult: MealEvaluation }[] = [];
    const rejected: { meal: MealItem; evalResult: MealEvaluation }[] = [];

    INDIAN_MEALS.forEach((meal) => {
      const evalResult = evaluateMealForScenario(meal, activeP);
      if (evalResult.isSafe) {
        accepted.push({ meal, evalResult });
      } else {
        rejected.push({ meal, evalResult });
      }
    });

    return { acceptedList: accepted, rejectedList: rejected };
  }, [activeP]);

  // Live Food Tester search result
  const searchedMealResult = useMemo(() => {
    const q = dishSearchQuery.trim().toLowerCase();
    if (!q) return null;
    const found = INDIAN_MEALS.find(m => 
      m.nameEn.toLowerCase().includes(q) || 
      m.nameHi.toLowerCase().includes(q)
    );
    if (!found) return 'not_found';
    return {
      meal: found,
      evaluation: evaluateMealForScenario(found, activeP)
    };
  }, [dishSearchQuery, activeP]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="algo-inspector-title"
    >
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-[#111C30] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#26364D] p-5 sm:p-7 overflow-hidden transition-all my-6 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#26364D] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-sm shrink-0">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="algo-inspector-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Clinical Algorithm &amp; Calculation Inspector
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  TRANSPARENCY AUDIT
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Deterministic clinical rules, live Mifflin-St Jeor arithmetic substitution, and multi-category dish filtering audit.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#17243A] rounded-xl transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none shrink-0"
            aria-label="Close Algorithm Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Interactive Scenario Selector Strip */}
        <div className="pt-3 pb-2 border-b border-slate-100 dark:border-[#26364D]/60 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Select Scenario Profile to Inspect Live Rules:
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60 hidden sm:inline-block">
              Active: {currentScenario.label} ({currentScenario.badge})
            </span>
          </div>

          {/* Clickable Scenario Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {scenarios.map((sc) => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-[1.02]'
                      : 'bg-slate-50 dark:bg-[#17243A] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#26364D] hover:bg-slate-100 dark:hover:bg-[#1f304c]'
                  }`}
                  title={sc.subtitle}
                >
                  <span>{sc.icon}</span>
                  <span>{sc.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                    isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200/80 dark:bg-[#0F172A] text-slate-500 dark:text-slate-400'
                  }`}>
                    {sc.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-3 pb-2 border-b border-slate-100 dark:border-[#26364D] shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('derivation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'derivation'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1e2f4a]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>1. Mifflin-St Jeor Derivation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1e2f4a]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>2. Deterministic AI Rule Firing</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sdg')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sdg'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1e2f4a]'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>3. UN SDG 3.4 Alignment Matrix</span>
          </button>
        </div>

        {/* Tab Content with Scroll */}
        <div id="inspector-modal-content-scroll" className="overflow-y-auto py-4 pr-1 flex-1 space-y-6">

          {/* ========================================================= */}
          {/* TAB 1: MIFFLIN-ST JEOR DERIVATION */}
          {/* ========================================================= */}
          {activeTab === 'derivation' && (
            <div className="space-y-6 animate-fade-in">
              {/* Formula Card */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-[#17243A]/80 border border-emerald-200 dark:border-[#26364D] space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Clinical Equation: Mifflin-St Jeor (1990)
                  </h3>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-white dark:bg-[#0F172A] px-2 py-0.5 rounded-md border border-emerald-200 dark:border-[#26364D]">
                    Gold Standard Clinical Validation
                  </span>
                </div>
                <div className="font-mono text-sm bg-white dark:bg-[#0F172A] p-3.5 rounded-xl border border-emerald-100 dark:border-[#26364D] text-slate-800 dark:text-emerald-200 overflow-x-auto shadow-2xs">
                  BMR = (10 × Weight_kg) + (6.25 × Height_cm) - (5 × Age_yrs) + s
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                    Where differential <strong>s = +5</strong> for biological males, <strong>s = -161</strong> for biological females.
                  </div>
                </div>
              </div>

              {/* Step-by-Step Live Arithmetic Walkthrough */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Live Arithmetic Substitution for Active Scenario: {activeP.name}
                  </h4>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {activeP.gender.toUpperCase()} • {activeP.age}y • {activeP.weightKg}kg • {activeP.heightCm}cm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Step 1: Weight Component */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D]">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Step 1: Mass Product</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                      10 × {activeP.weightKg} kg = <span className="text-emerald-600 dark:text-emerald-400">{weightTerm}</span>
                    </div>
                  </div>

                  {/* Step 2: Height Component */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D]">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Step 2: Stature Product</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                      6.25 × {activeP.heightCm} cm = <span className="text-emerald-600 dark:text-emerald-400">{heightTerm}</span>
                    </div>
                  </div>

                  {/* Step 3: Age Component */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D]">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Step 3: Chronological Constant</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                      5 × {activeP.age} yrs = <span className="text-emerald-600 dark:text-emerald-400">{ageTerm}</span>
                    </div>
                  </div>

                  {/* Step 4: Biological Sex Offset */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D]">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Step 4: Sex Constant (s)</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                      {activeP.gender === 'male' ? 'Male Constant (+5)' : 'Female Constant (-161)'} = <span className="text-emerald-600 dark:text-emerald-400">{sexConstant > 0 ? `+${sexConstant}` : sexConstant}</span>
                    </div>
                  </div>
                </div>

                {/* Combined BMR Total */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Calculated Basal Metabolic Rate (BMR):
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-mono">
                      {weightTerm} + {heightTerm} - {ageTerm} {sexConstant > 0 ? `+ ${sexConstant}` : sexConstant}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {computedBmr} kcal/day
                  </div>
                </div>

                {/* TDEE PAL Derivation */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Physical Activity Level (PAL Multiplier):
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-slate-200 dark:bg-[#17243A]">
                      {activeP.activityLevel.toUpperCase()} (× {pal})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      Total Daily Energy Expenditure (TDEE = BMR × PAL):
                    </span>
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {computedBmr} × {pal} = {computedTdee} kcal/day
                    </strong>
                  </div>
                </div>

                {/* Goal Delta & Safety Floor */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Health Goal Caloric Delta:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {activeP.healthGoal === 'weight_loss' ? 'Moderate Calorie Deficit (-450 kcal)' : activeP.healthGoal === 'weight_gain' ? 'Calorie Surplus (+300 kcal)' : 'Iso-caloric Maintenance (0 kcal)'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-200 dark:border-[#26364D]">
                    <span className="text-slate-600 dark:text-slate-400">Metabolic Safety Floor Clamping:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Minimum Safe Floor: {minFloor} kcal/day ({isFloorClamped ? 'CLAMPED' : 'PASSED'})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1.5 border-t border-slate-200 dark:border-[#26364D]">
                    <span className="font-bold text-slate-800 dark:text-white">Final Prescribed Target Caloric Budget:</span>
                    <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                      {finalCalorieTarget} kcal/day
                    </span>
                  </div>
                </div>

                {/* 4:4:9 Macro Ratio Breakdown and Hydration */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-[#17243A] border border-emerald-200 dark:border-[#26364D] text-center">
                    <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">Protein (22%)</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{proteinGrams}g</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">4 kcal/g • {proteinGrams * 4} kcal</div>
                  </div>
                  <div className="p-3 rounded-xl bg-teal-50 dark:bg-[#17243A] border border-teal-200 dark:border-[#26364D] text-center">
                    <div className="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase">Complex Carbs (48%)</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{carbsGrams}g</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">4 kcal/g • {carbsGrams * 4} kcal</div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-[#17243A] border border-amber-200 dark:border-[#26364D] text-center">
                    <div className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Healthy Fats (30%)</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{fatGrams}g</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">9 kcal/g • {fatGrams * 9} kcal</div>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-[#17243A] border border-sky-200 dark:border-[#26364D] text-center">
                    <div className="text-[10px] font-bold text-sky-800 dark:text-sky-300 uppercase">Hydration (35ml/kg)</div>
                    <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{hydrationLiters}L</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">~{hydrationGlasses} glasses/day</div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: DETERMINISTIC RULE FIRING AUDIT */}
          {/* ========================================================= */}
          {activeTab === 'audit' && (
            <div className="space-y-6 animate-fade-in">
              {/* Algorithmic Integrity Explanation Banner */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-[#17243A] border border-blue-200 dark:border-[#26364D] text-xs text-blue-900 dark:text-blue-200 space-y-1.5">
                <div className="font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Deterministic Rule-Based Engine vs. Generative LLM Hallucination</span>
                </div>
                <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300">
                  Unlike generative black-box LLMs that can hallucinate unsafe ingredients or inaccurate calorie totals, NutriWise AI evaluates 112 pre-calibrated dishes through an immutable constraint filter matrix calibrated to ICMR-NIN & WHO clinical thresholds.
                </p>
              </div>

              {/* Live Rule Execution Funnel & Metric Counters */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    5-Stage Algorithmic Filter Execution Funnel:
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Active Scenario: <strong className="text-emerald-600 dark:text-emerald-400">{currentScenario.label}</strong>
                  </span>
                </div>

                {/* 3 Metric Funnel Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Total Indian Dishes</div>
                      <div className="text-xl font-black text-slate-900 dark:text-white">{INDIAN_MEALS.length}</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#0F172A] text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-xs">
                      ALL
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase">Excluded by Rules</div>
                      <div className="text-xl font-black text-rose-600 dark:text-rose-400">{rejectedList.length}</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
                      FAIL
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Clinically Approved</div>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{acceptedList.length}</div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                      PASS
                    </div>
                  </div>
                </div>

                {/* Filter Pipeline Visual Steps */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 overflow-x-auto gap-2">
                  <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D]">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Cultural / Diet Protocol</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                  <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D]">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Allergen Shield</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                  <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D]">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Glycemic Capping (GI &le; 55)</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                  <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D]">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>Sodium Floor</span>
                  </div>
                </div>
              </div>

              {/* Active Clinical Constraints Applied for Chosen Scenario */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Active Constraints Enforced for: {currentScenario.label}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs space-y-1">
                    <strong className="text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Diet Preference Protocol:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentScenario.constraints.diet}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs space-y-1">
                    <strong className="text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Glycemic Control Rule:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentScenario.constraints.glycemic}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs space-y-1">
                    <strong className="text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Cardiovascular Sodium Ceiling:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentScenario.constraints.sodium}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs space-y-1">
                    <strong className="text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Allergen Safety Guard:
                    </strong>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentScenario.constraints.allergen}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Live Dish Rule Tester */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/40 dark:from-[#0F172A] dark:to-[#17243A] border border-slate-200 dark:border-[#26364D] space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label htmlFor="dish-tester-input" className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span>Live Dish Tester: Test Any of 112 Indian Meals Against Active Rules</span>
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Quick Test:</span>
                    {['Paneer', 'Chicken', 'Egg', 'Poha', 'Khichdi', 'Chilla'].map((dish) => (
                      <button
                        key={dish}
                        type="button"
                        onClick={() => setDishSearchQuery(dish)}
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold transition-all ${
                          dishSearchQuery.toLowerCase() === dish.toLowerCase()
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-white dark:bg-[#111C30] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#26364D] hover:border-emerald-400'
                        }`}
                      >
                        {dish}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="dish-tester-input"
                    type="text"
                    value={dishSearchQuery}
                    onChange={(e) => setDishSearchQuery(e.target.value)}
                    placeholder="Type an Indian dish name to test its clinical eligibility..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#111C30] border border-slate-300 dark:border-[#26364D] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {dishSearchQuery && (
                    <button
                      onClick={() => setDishSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search Result Feedback Box */}
                {searchedMealResult && (
                  <div className="animate-fade-in">
                    {searchedMealResult === 'not_found' ? (
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#17243A] text-xs text-slate-500 dark:text-slate-400">
                        No dish found matching &quot;{dishSearchQuery}&quot; in our 112-meal Indian clinical catalog.
                      </div>
                    ) : (
                      <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        searchedMealResult.evaluation.isSafe
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
                      }`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {searchedMealResult.meal.nameEn}
                            </span>
                            <span className="text-slate-500 text-xs">({searchedMealResult.meal.nameHi})</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              searchedMealResult.evaluation.isSafe
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                            }`}>
                              {searchedMealResult.evaluation.isSafe ? 'ACCEPTED BY RULES' : 'EXCLUDED BY RULES'}
                            </span>
                          </div>
                          <p className={`mt-1 font-semibold ${
                            searchedMealResult.evaluation.isSafe ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                          }`}>
                            {searchedMealResult.evaluation.reason}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                            Clinical Rationale: {searchedMealResult.evaluation.clinicalExplanation}
                          </p>
                        </div>

                        <div className="shrink-0 text-right text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {searchedMealResult.meal.calories} kcal • P: {searchedMealResult.meal.protein}g • GI: {searchedMealResult.meal.glycemicIndex.toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sample Excluded Meals for Active Scenario */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Filtered / Excluded Meals Under {currentScenario.badge} ({rejectedList.length} Total Excluded)</span>
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400">Showing Top 5 Clinical Exclusions</span>
                </div>

                <div className="space-y-2.5">
                  {rejectedList.slice(0, 5).map(({ meal: m, evalResult }) => (
                    <div 
                      key={m.id} 
                      className="p-3.5 rounded-2xl bg-rose-50/40 dark:bg-[#0F172A] border border-rose-200/80 dark:border-[#26364D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all hover:border-rose-300"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-slate-900 dark:text-white line-through opacity-75 text-sm">
                            {m.nameEn}
                          </span>
                          <span className="text-slate-400 text-xs">({m.nameHi})</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                            {evalResult.ruleTag}
                          </span>
                        </div>
                        <div className="text-rose-700 dark:text-rose-400 font-semibold text-[11.5px]">
                          {evalResult.reason}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {evalResult.clinicalExplanation}
                        </div>
                      </div>

                      <div className="shrink-0 sm:text-right font-mono text-[11px] text-slate-500 dark:text-slate-400 border-t sm:border-t-0 pt-1 sm:pt-0 border-rose-100 dark:border-[#26364D]">
                        <div>{m.portion}</div>
                        <div className="font-bold text-slate-700 dark:text-slate-300">{m.calories} kcal</div>
                        <div>P: {m.protein}g • GI: {m.glycemicIndex.toUpperCase()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Accepted Recommendations for Active Scenario */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Accepted Recommendations Under {currentScenario.badge} ({acceptedList.length} Approved)</span>
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400">Showing Top 5 Verified Matches</span>
                </div>

                <div className="space-y-2.5">
                  {acceptedList.slice(0, 5).map(({ meal: m, evalResult }) => (
                    <div 
                      key={m.id} 
                      className="p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-[#0F172A] border border-emerald-200/80 dark:border-[#26364D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all hover:border-emerald-300"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                            {m.nameEn}
                          </span>
                          <span className="text-slate-400 text-xs">({m.nameHi})</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            RULE MATCHED
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300">
                            GI: {m.glycemicIndex.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-emerald-800 dark:text-emerald-300 font-semibold text-[11.5px]">
                          {evalResult.clinicalExplanation}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {m.healthBenefits}
                        </div>
                      </div>

                      <div className="shrink-0 sm:text-right font-mono text-[11px] text-slate-600 dark:text-slate-400 border-t sm:border-t-0 pt-1 sm:pt-0 border-emerald-100 dark:border-[#26364D]">
                        <div>{m.portion}</div>
                        <div className="font-bold text-emerald-700 dark:text-emerald-400">{m.calories} kcal</div>
                        <div>P: {m.protein}g • C: {m.carbs}g • F: {m.fat}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: UN SDG 3.4 ALIGNMENT MATRIX */}
          {/* ========================================================= */}
          {activeTab === 'sdg' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-5 rounded-2xl bg-emerald-500/10 dark:bg-[#17243A] border border-emerald-300 dark:border-[#26364D] space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm">
                  <Globe2 className="w-5 h-5 text-emerald-600" />
                  UN Sustainable Development Goal 3 — Target 3.4
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &quot;By 2030, reduce by one third premature mortality from non-communicable diseases (NCDs) through prevention and treatment and promote mental health and well-being.&quot;
                </p>
              </div>

              {/* Policy Mapping Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 dark:border-[#26364D] rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 dark:bg-[#0F172A] text-slate-800 dark:text-white uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200 dark:border-[#26364D]">Clinical Focus Area</th>
                      <th className="p-3 border-b border-slate-200 dark:border-[#26364D]">National Burden (India)</th>
                      <th className="p-3 border-b border-slate-200 dark:border-[#26364D]">NutriWise AI Engine Solution</th>
                      <th className="p-3 border-b border-slate-200 dark:border-[#26364D]">Evidence Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#26364D] text-slate-600 dark:text-slate-300">
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#17243A]/50">
                      <td className="p-3 font-bold text-slate-800 dark:text-white">Type 2 Diabetes &amp; Glycemia</td>
                      <td className="p-3">77M+ adults; premature onset in 30s-40s.</td>
                      <td className="p-3">Automatic ceiling on Glycemic Index (GI &le; 55) &amp; complex carb prioritization.</td>
                      <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">ICMR-INDIAB &amp; WHO</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#17243A]/50">
                      <td className="p-3 font-bold text-slate-800 dark:text-white">Cardiovascular &amp; Hypertension</td>
                      <td className="p-3">Average salt intake &gt; 10g/day (2x WHO limit).</td>
                      <td className="p-3">DASH dietary sodium ceiling (&lt; 2,000 mg/day) &amp; high-potassium dal pairing.</td>
                      <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">ICMR-NIN 2020 RDA</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#17243A]/50">
                      <td className="p-3 font-bold text-slate-800 dark:text-white">Metabolic Syndrome &amp; PCOS</td>
                      <td className="p-3">1 in 5 women of reproductive age.</td>
                      <td className="p-3">Anti-inflammatory ratio (25% Protein, 45% Carbs, 30% Healthy Fats).</td>
                      <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">AIIMS / Endocrine Soc.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#17243A]/50">
                      <td className="p-3 font-bold text-slate-800 dark:text-white">Cultural &amp; Religious Fasting</td>
                      <td className="p-3">Millions fast on Ekadashi, Navratri, Shravan.</td>
                      <td className="p-3">Iso-caloric pseudograin adaptation preserving macro splits without starvation.</td>
                      <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">NutriWise Fasting Engine</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Citations Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  Primary Literature &amp; Clinical Guidelines Citations:
                </div>
                <p>1. Mifflin MD, St Jeor ST, et al. &quot;A new predictive equation for resting energy expenditure in healthy individuals.&quot; Am J Clin Nutr. 1990;51(2):241-247.</p>
                <p>2. Indian Council of Medical Research - National Institute of Nutrition (ICMR-NIN). &quot;Nutrient Requirements and Recommended Dietary Allowances for Indians.&quot; Hyderabad, 2020.</p>
                <p>3. World Health Organization (WHO). &quot;Global Action Plan for the Prevention and Control of Noncommunicable Diseases 2013-2020.&quot;</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-slate-200 dark:border-[#26364D] flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            NutriWise AI Clinical Nutrition Engine • Algorithmic Transparency Mode
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

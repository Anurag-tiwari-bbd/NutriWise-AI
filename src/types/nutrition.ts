// NutriWise AI - Core TypeScript Definitions

export type Gender = 'male' | 'female';

export type ActivityLevel =
  | 'sedentary'       // Little to no exercise, desk job (1.20)
  | 'light'           // Light exercise 1-3 days/week (1.375)
  | 'moderate'        // Moderate exercise 3-5 days/week (1.55)
  | 'very_active'     // Hard exercise 6-7 days/week (1.725)
  | 'extra_active';   // Very hard exercise, physical work (1.90)

export type HealthGoal =
  | 'weight_loss'     // Caloric deficit (-450 kcal)
  | 'maintenance'     // Energy balance (0 kcal)
  | 'weight_gain';    // Caloric surplus (+300 kcal)

export type DietPreference =
  | 'vegetarian'      // Dairy allowed, no meat/fish/egg
  | 'vegan'           // 100% plant-based, no dairy/honey
  | 'non_vegetarian'  // Poultry/fish/meat included
  | 'jain';           // Vegetarian without onion, garlic, or root vegetables

export type NonVegCadence =
  | 'balanced_daily'       // 1-2 non-veg meals/day + wholesome dals & veggies (Default 55:45 Golden Ratio)
  | 'high_protein_gym'     // 2-3 non-veg meals/day (High protein for intense training)
  | 'occasional';          // 2-3 days non-veg/week (Rest flexitarian days)

export type HealthCondition =
  | 'diabetes'        // Low GI, fiber emphasis, blood sugar control
  | 'hypertension'    // Low sodium, potassium-rich foods
  | 'thyroid'         // Balanced iodine, goitrogen moderation
  | 'pcos'            // Insulin-sensitizing macro split, anti-inflammatory
  | 'lactose_intolerance'; // Zero dairy (substitute curd/paneer with tofu/soya)

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  healthGoal: HealthGoal;
  dietPreference: DietPreference;
  allergies: string[];
  healthConditions: HealthCondition[];
  nonVegCadence?: NonVegCadence;
  createdAt: string;
}

export interface NutritionMetrics {
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  bmr: number;                    // Basal Metabolic Rate (kcal)
  tdee: number;                   // Total Daily Energy Expenditure (kcal)
  targetCalories: number;         // Safe target calories
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  waterTargetLitres: number;
  macroRatios: {
    proteinPercent: number;
    carbsPercent: number;
    fatPercent: number;
  };
  calorieAdjustmentNote: string;
  clinicalNotes: string[];
}

export interface MealItem {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  dietType: 'vegetarian' | 'vegan' | 'non_vegetarian' | 'jain';
  glycemicIndex: 'low' | 'medium' | 'high';
  allergens: string[];
  isRootVegetableFree: boolean;
  prepTimeMinutes: number;
  healthBenefits: string;
}

export interface DayPlan {
  dayNumber: number;
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  breakfast: MealItem;
  lunch: MealItem;
  snacks: MealItem;
  dinner: MealItem;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
}

export interface WeeklyPlan {
  planId: string;
  userId: string;
  generatedDate: string;
  days: DayPlan[];
}

export interface AssessmentRecord {
  id: string;
  timestamp: string;
  profile: UserProfile;
  metrics: NutritionMetrics;
  plan: WeeklyPlan;
}

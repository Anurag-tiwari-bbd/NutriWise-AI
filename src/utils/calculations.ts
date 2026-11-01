import { 
  UserProfile, 
  NutritionMetrics, 
  ActivityLevel, 
  HealthGoal, 
  HealthCondition 
} from '../types/nutrition';

/**
 * Activity Multipliers based on standard clinical exercise physiology
 */
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.20,      // Desk worker, minimal movement
  light: 1.375,         // Light activity 1-3 days/week
  moderate: 1.55,       // Moderate exercise 3-5 days/week
  very_active: 1.725,   // Intense exercise 6-7 days/week
  extra_active: 1.90,   // Heavy physical labor or 2x/day training
};

/**
 * Calculate Body Mass Index (BMI)
 */
export function calculateBMI(weightKg: number, heightCm: number): {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
} {
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  
  let category: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 24.9) category = 'normal';
  else if (bmi < 29.9) category = 'overweight';
  else category = 'obese';

  return { bmi, category };
}

/**
 * Mifflin-St Jeor Basal Metabolic Rate (BMR) Formula
 * Male: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
 * Female: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
 */
export function calculateBMR(
  gender: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  age: number
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === 'male' ? base + 5 : base - 161;
  return Math.round(bmr);
}

/**
 * Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
}

/**
 * Clinical safety boundaries:
 * Never allow calorie targets to drop below 1,200 kcal (female) or 1,500 kcal (male).
 */
export function getSafeCalorieTarget(
  tdee: number,
  goal: HealthGoal,
  gender: 'male' | 'female'
): { targetCalories: number; adjustmentNote: string } {
  const safetyFloor = gender === 'female' ? 1200 : 1500;

  let target = tdee;
  let adjustmentNote = 'Iso-caloric maintenance target to sustain present body weight.';

  if (goal === 'weight_loss') {
    target = tdee - 450;
    adjustmentNote = 'Moderate calorie adjustment (estimate) of ~450 kcal for gradual weight loss.';
    if (target < safetyFloor) {
      target = safetyFloor;
      adjustmentNote = `Adjusted to baseline reference floor (min ${safetyFloor} kcal) to support essential metabolic function.`;
    }
  } else if (goal === 'weight_gain') {
    target = tdee + 300;
    adjustmentNote = 'Moderate calorie adjustment (estimate) of +300 kcal for gradual weight gain.';
  }

  return { targetCalories: Math.round(target), adjustmentNote };
}

/**
 * Hydration target in Litres
 * 35 ml per kg body weight, clamped between 2.0L and 4.5L
 */
export function calculateWaterTarget(weightKg: number): number {
  const raw = (weightKg * 35) / 1000;
  const rounded = Math.round(raw * 4) / 4; // Round to nearest 0.25 L
  return Math.min(Math.max(rounded, 2.0), 4.5);
}

/**
 * Comprehensive calculation orchestrator
 */
export function calculateNutritionMetrics(profile: UserProfile): NutritionMetrics {
  const { bmi, category } = calculateBMI(profile.weightKg, profile.heightCm);
  const bmr = calculateBMR(profile.gender, profile.weightKg, profile.heightCm, profile.age);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const { targetCalories, adjustmentNote } = getSafeCalorieTarget(tdee, profile.healthGoal, profile.gender);
  const waterTargetLitres = calculateWaterTarget(profile.weightKg);

  // Macro distribution rules
  let proteinPercent = 20;
  let carbsPercent = 50;
  let fatPercent = 30;

  const clinicalNotes: string[] = [];

  const hasDiabetes = profile.healthConditions.includes('diabetes');
  const hasPCOS = profile.healthConditions.includes('pcos');
  const hasHypertension = profile.healthConditions.includes('hypertension');
  const hasThyroid = profile.healthConditions.includes('thyroid');
  const hasLactose = profile.healthConditions.includes('lactose_intolerance');

  if (hasDiabetes || hasPCOS) {
    proteinPercent = 25;
    carbsPercent = 45;
    fatPercent = 30;
    clinicalNotes.push('Dietary Caution Note: Complex carbohydrates prioritized to support steady glycemic response.');
  } else if (profile.healthGoal === 'weight_loss') {
    proteinPercent = 25;
    carbsPercent = 45;
    fatPercent = 30;
    clinicalNotes.push('Satiety Optimization: Higher protein ratio helps preserve lean muscle mass during caloric restriction.');
  } else if (profile.healthGoal === 'weight_gain') {
    proteinPercent = 22;
    carbsPercent = 55;
    fatPercent = 23;
    clinicalNotes.push('Carbohydrate Surplus: Supplies continuous glycogen for recovery and positive nitrogen balance.');
  }

  if (hasHypertension) {
    clinicalNotes.push('Dietary Caution Note: General advice to moderate sodium intake and include potassium-rich vegetables.');
  }

  if (hasThyroid) {
    clinicalNotes.push('Dietary Caution Note: General advice to ensure adequate cooked vegetables and avoid excessive raw goitrogens.');
  }

  if (hasLactose) {
    clinicalNotes.push('Dietary Caution Note: Dairy ingredients substituted with plant-based alternatives (tofu, soya, or almond options).');
  }

  // Convert percentages to grams
  // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
  const proteinGrams = Math.round((targetCalories * (proteinPercent / 100)) / 4);
  const carbsGrams = Math.round((targetCalories * (carbsPercent / 100)) / 4);
  const fatGrams = Math.round((targetCalories * (fatPercent / 100)) / 9);
  
  // Fiber target: ~14g per 1,000 kcal
  const fiberGrams = Math.round((targetCalories / 1000) * 14);

  return {
    bmi,
    bmiCategory: category,
    bmr,
    tdee,
    targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
    waterTargetLitres,
    macroRatios: {
      proteinPercent,
      carbsPercent,
      fatPercent,
    },
    calorieAdjustmentNote: adjustmentNote,
    clinicalNotes,
  };
}

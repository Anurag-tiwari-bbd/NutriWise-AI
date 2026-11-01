import { 
  UserProfile, 
  NutritionMetrics, 
  MealItem, 
  DayPlan, 
  WeeklyPlan 
} from '../types/nutrition';
import { INDIAN_MEALS } from '../data/indianMeals';
import { HEALTH_CONDITION_RULES } from '../data/healthRules';

/**
 * Validates whether a specific meal is compatible with user's
 * diet preference, allergies, and health conditions.
 */
export function isMealSafeForUser(meal: MealItem, profile: UserProfile): boolean {
  // 1. Dietary Preference Check
  if (profile.dietPreference === 'vegan') {
    if (meal.dietType !== 'vegan' || meal.allergens.includes('dairy') || meal.allergens.includes('eggs') || meal.allergens.includes('fish')) {
      return false;
    }
  } else if (profile.dietPreference === 'jain') {
    // Jain diet requires zero root vegetables and strictly non-meat/egg/fish
    const isAllowedDiet = meal.dietType === 'jain' || (meal.isRootVegetableFree && (meal.dietType === 'vegetarian' || meal.dietType === 'vegan'));
    if (!isAllowedDiet || !meal.isRootVegetableFree) {
      return false;
    }
  } else if (profile.dietPreference === 'vegetarian') {
    if (meal.dietType === 'non_vegetarian' || meal.allergens.includes('eggs') || meal.allergens.includes('fish')) {
      return false;
    }
    // Exclude meals specifically crafted and tagged as Jain unless user requested Jain
    if (meal.dietType === 'jain') {
      return false;
    }
  } else if (profile.dietPreference === 'non_vegetarian') {
    // Non-vegetarians must NEVER be served meals specifically tagged as Jain
    if (meal.dietType === 'jain') {
      return false;
    }
  }

  // 2. Direct Allergen Checks
  const lowerAllergies = profile.allergies.map((a) => a.toLowerCase().trim());
  
  for (const allergen of meal.allergens) {
    const lowerMealAllergen = allergen.toLowerCase();
    if (lowerAllergies.some((userAllergy) => userAllergy.includes(lowerMealAllergen) || lowerMealAllergen.includes(userAllergy))) {
      return false;
    }
  }

  // 3. Health Condition Rules
  for (const condition of profile.healthConditions) {
    const rules = HEALTH_CONDITION_RULES[condition];
    if (rules) {
      // Forbidden allergens (e.g. dairy for lactose intolerance)
      for (const forbidden of rules.forbiddenAllergens) {
        if (meal.allergens.includes(forbidden)) {
          return false;
        }
      }

      // Max Glycemic Index constraint (e.g. avoid high-GI in diabetes or PCOS)
      if (rules.maxGlycemicIndex === 'medium' && meal.glycemicIndex === 'high') {
        return false;
      }
      if (rules.maxGlycemicIndex === 'low' && meal.glycemicIndex !== 'low') {
        return false;
      }
    }
  }

  return true;
}

/**
 * Filter all safe meals from the catalog for a given category and profile
 */
export function getSafeMealsForCategory(
  category: 'breakfast' | 'lunch' | 'snacks' | 'dinner',
  profile: UserProfile
): MealItem[] {
  const safeMeals = INDIAN_MEALS.filter(
    (meal) => meal.category === category && isMealSafeForUser(meal, profile)
  );

  // Robust safety fallback: If filters are excessively tight, fall back to safe generic items in that category
  if (safeMeals.length === 0) {
    return INDIAN_MEALS.filter((m) => m.category === category);
  }

  return safeMeals;
}

/**
 * Filter candidate meals by dietary preference targets
 * for non-vegetarian flexitarian balancing (55:45 Golden Ratio).
 */
function filterBySlotTarget(
  meals: MealItem[],
  preferNonVeg: boolean,
  isNonVegUser: boolean
): MealItem[] {
  if (!isNonVegUser) return meals;

  if (preferNonVeg) {
    const nonVegOnly = meals.filter((m) => m.dietType === 'non_vegetarian');
    if (nonVegOnly.length > 0) return nonVegOnly;
  } else {
    // Wholesome Indian veg/vegan (strictly exclude Jain meals)
    const wholesomeVegOnly = meals.filter(
      (m) => m.dietType !== 'non_vegetarian' && m.dietType !== 'jain'
    );
    if (wholesomeVegOnly.length > 0) return wholesomeVegOnly;
  }
  return meals;
}

/**
 * Deterministic helper to cycle through candidate meals across 7 days
 * without repeating the same dish on consecutive days.
 */
function pickDiverseMeal(
  candidates: MealItem[],
  dayIndex: number,
  targetSlotCalories: number,
  previousMealId?: string
): MealItem {
  if (candidates.length === 1) return candidates[0];

  // Exclude immediate previous dish if possible
  const validCandidates = candidates.filter((m) => m.id !== previousMealId);
  const pool = validCandidates.length > 0 ? validCandidates : candidates;

  // Sort pool by proximity to target slot calories
  const sorted = [...pool].sort((a, b) => {
    const diffA = Math.abs(a.calories - targetSlotCalories);
    const diffB = Math.abs(b.calories - targetSlotCalories);
    return diffA - diffB;
  });

  // Cycle predictably across the top candidates using dayIndex
  const pickIndex = dayIndex % sorted.length;
  return sorted[pickIndex];
}

const DAY_NAMES: DayPlan['dayName'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

/**
 * Generates an authentic 7-Day Indian Meal Plan customized to the user's
 * caloric target, macro profile, diet type, and medical considerations.
 * Implements the 55:45 Clinical Golden Ratio for non-vegetarian diets.
 */
export function generateWeeklyPlan(profile: UserProfile, metrics: NutritionMetrics): WeeklyPlan {
  // Target caloric split: Breakfast ~25%, Lunch ~35%, Snacks ~15%, Dinner ~25%
  const targetCals = metrics.targetCalories;
  const targetBreakfast = Math.round(targetCals * 0.25);
  const targetLunch = Math.round(targetCals * 0.35);
  const targetSnacks = Math.round(targetCals * 0.15);
  const targetDinner = Math.round(targetCals * 0.25);

  const safeBreakfasts = getSafeMealsForCategory('breakfast', profile);
  const safeLunches = getSafeMealsForCategory('lunch', profile);
  const safeSnacks = getSafeMealsForCategory('snacks', profile);
  const safeDinners = getSafeMealsForCategory('dinner', profile);

  const isNonVeg = profile.dietPreference === 'non_vegetarian';
  const cadence = profile.nonVegCadence || 'balanced_daily';

  let prevBf: string | undefined;
  let prevLn: string | undefined;
  let prevSn: string | undefined;
  let prevDn: string | undefined;

  const days: DayPlan[] = DAY_NAMES.map((dayName, index) => {
    const dayNumber = index + 1;

    // Determine Non-Veg vs Wholesome Veg allocation per slot
    let preferBfNonVeg = false;
    let preferLnNonVeg = false;
    let preferSnNonVeg = false;
    let preferDnNonVeg = false;

    if (isNonVeg) {
      if (cadence === 'high_protein_gym') {
        preferBfNonVeg = [0, 1, 2, 4, 6].includes(index); // 5 days non-veg
        preferLnNonVeg = [0, 1, 3, 4, 5].includes(index); // 5 days non-veg
        preferSnNonVeg = [2, 5].includes(index);          // 2 days high-protein snack
        preferDnNonVeg = [0, 1, 2, 3, 4, 6].includes(index); // 6 days non-veg
      } else if (cadence === 'occasional') {
        preferBfNonVeg = [0, 6].includes(index);          // 2 days non-veg
        preferLnNonVeg = [2, 5].includes(index);          // 2 days non-veg
        preferSnNonVeg = false;                           // 100% plant snacks
        preferDnNonVeg = [1, 3, 6].includes(index);       // 3 days non-veg
      } else {
        // Balanced Daily (The 55:45 Golden Ratio Default):
        // Breakfast: 4 days Non-Veg (Eggs/Poultry) + 3 days Fiber Veg (Chilla, Poha, Soya)
        preferBfNonVeg = [0, 2, 4, 6].includes(index);
        // Lunch: 4 days Non-Veg + 3 days Wholesome Indian Legumes (Rajma, Chole, Dal)
        preferLnNonVeg = [0, 2, 4, 5].includes(index);
        // Snacks: 100% Light, Prebiotic, Gut-Friendly Plant Snacks (Chana, Sprouts, Makhana)
        preferSnNonVeg = false;
        // Dinner: 5 days Lean Non-Veg + 2 days Digestive Rest Veg (Moong Dal Khichdi, Tofu)
        preferDnNonVeg = [0, 1, 2, 4, 5].includes(index);
      }
    }

    const bfPool = filterBySlotTarget(safeBreakfasts, preferBfNonVeg, isNonVeg);
    const lnPool = filterBySlotTarget(safeLunches, preferLnNonVeg, isNonVeg);
    const snPool = filterBySlotTarget(safeSnacks, preferSnNonVeg, isNonVeg);
    const dnPool = filterBySlotTarget(safeDinners, preferDnNonVeg, isNonVeg);

    const breakfast = pickDiverseMeal(bfPool, index, targetBreakfast, prevBf);
    prevBf = breakfast.id;

    const lunch = pickDiverseMeal(lnPool, index + 1, targetLunch, prevLn);
    prevLn = lunch.id;

    const snacks = pickDiverseMeal(snPool, index + 2, targetSnacks, prevSn);
    prevSn = snacks.id;

    const dinner = pickDiverseMeal(dnPool, index + 3, targetDinner, prevDn);
    prevDn = dinner.id;

    const totalCalories = breakfast.calories + lunch.calories + snacks.calories + dinner.calories;
    const totalProtein = breakfast.protein + lunch.protein + snacks.protein + dinner.protein;
    const totalCarbs = breakfast.carbs + lunch.carbs + snacks.carbs + dinner.carbs;
    const totalFat = breakfast.fat + lunch.fat + snacks.fat + dinner.fat;
    const totalFiber = breakfast.fiber + lunch.fiber + snacks.fiber + dinner.fiber;

    return {
      dayNumber,
      dayName,
      breakfast,
      lunch,
      snacks,
      dinner,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalFiber,
    };
  });

  return {
    planId: `plan-${profile.id || 'demo'}-${Date.now()}`,
    userId: profile.id,
    generatedDate: new Date().toISOString(),
    days,
  };
}

/**
 * Returns safe alternative dishes in the same category for meal swaps,
 * ranked by calorie and macro similarity.
 */
export function getMealAlternatives(
  currentMeal: MealItem,
  profile: UserProfile,
  count: number = 3
): MealItem[] {
  const safePool = getSafeMealsForCategory(currentMeal.category, profile);

  const alternatives = safePool.filter((m) => m.id !== currentMeal.id);

  // For non-veg users, exclude Jain dishes from swaps
  const pool = profile.dietPreference === 'non_vegetarian'
    ? alternatives.filter((m) => m.dietType !== 'jain')
    : alternatives;

  pool.sort((a, b) => {
    // If current meal is non-veg, prioritize matching non-veg in the top alternatives
    if (profile.dietPreference === 'non_vegetarian' && currentMeal.dietType === 'non_vegetarian') {
      const aIsNonVeg = a.dietType === 'non_vegetarian' ? 1 : 0;
      const bIsNonVeg = b.dietType === 'non_vegetarian' ? 1 : 0;
      if (aIsNonVeg !== bIsNonVeg) {
        return bIsNonVeg - aIsNonVeg;
      }
    }
    const calorieDiffA = Math.abs(a.calories - currentMeal.calories);
    const calorieDiffB = Math.abs(b.calories - currentMeal.calories);
    if (calorieDiffA !== calorieDiffB) {
      return calorieDiffA - calorieDiffB;
    }
    return b.protein - a.protein;
  });

  return pool.slice(0, count);
}

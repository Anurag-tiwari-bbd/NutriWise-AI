// NutriWise AI - Central Plain-Language Terminology Dictionary
// Provides friendly, clinically verified explanations for nutrition, health, and technical concepts.

export interface PlainLanguageTerm {
  id: string;
  term: string;
  title: string;
  explanation: string;
  ariaLabel: string;
}

export const PLAIN_LANGUAGE_TERMS = {
  sdg3: {
    id: 'sdg3',
    term: 'UN SDG 3',
    title: 'UN Sustainable Development Goal 3',
    explanation: 'A United Nations global target to promote physical well-being and healthy lifestyles, helping reduce premature mortality from preventable non-communicable diseases (NCDs) worldwide.',
    ariaLabel: 'Learn what UN Sustainable Development Goal 3 means',
  },
  personalizedNutrition: {
    id: 'personalizedNutrition',
    term: 'Personalized Nutrition',
    title: 'Personalized Nutrition Guidance',
    explanation: 'Dietary guidance shaped around your individual body size, daily movement habits, and personal food preferences rather than an arbitrary one-size-fits-all plan.',
    ariaLabel: 'Learn what personalized nutrition means',
  },
  ruleBasedEngine: {
    id: 'ruleBasedEngine',
    term: 'Rule-Based Engine',
    title: 'Local Rule-Based Recommendation Engine',
    explanation: 'A set of transparent mathematical formulas and dietary rules running directly in your web browser. It computes your estimates on your device without sending personal data to external AI servers.',
    ariaLabel: 'Learn what a local rule-based engine is',
  },
  bmr: {
    id: 'bmr',
    term: 'BMR',
    title: 'Basal Metabolic Rate (BMR)',
    explanation: 'The estimated energy (calories) your body burns every day just staying alive at complete rest, powering essentials like breathing, blood flow, and cell repair.',
    ariaLabel: 'Learn what BMR means',
  },
  bmrFormula: {
    id: 'bmrFormula',
    term: 'Mifflin-St Jeor Estimation Base',
    title: 'Mifflin-St Jeor Estimation Formula',
    explanation: 'The clinical gold-standard predictive equation estimating resting metabolic rate: (10 × Weight in kg) + (6.25 × Height in cm) - (5 × Age in years) ± Sex constant (+5 for biological males, -161 for biological females).',
    ariaLabel: 'Learn how the Mifflin-St Jeor estimation formula works',
  },
  tdee: {
    id: 'tdee',
    term: 'TDEE',
    title: 'Total Daily Energy Expenditure (TDEE)',
    explanation: 'Your total daily calorie burn. It combines your resting metabolism (BMR) with the energy burned through walking, working, chores, and exercise.',
    ariaLabel: 'Learn what TDEE means',
  },
  tdeeGoal: {
    id: 'tdeeGoal',
    term: 'Target Caloric Intake',
    title: 'Target Caloric Intake & Energy Balance',
    explanation: 'Your personalized daily energy target, calculated from your TDEE and health goal (-450 kcal deficit for gradual weight loss, or +350 kcal surplus for muscle gain), safely clamped to clinical minimum floors.',
    ariaLabel: 'Learn what your target caloric intake means',
  },
  mifflinStJeor: {
    id: 'mifflinStJeor',
    term: 'Mifflin-St Jeor Equation',
    title: 'Mifflin-St Jeor Estimation Equation',
    explanation: 'A widely recognized nutrition science formula that estimates baseline calorie needs using your age, gender, height, and weight.',
    ariaLabel: 'Learn what the Mifflin-St Jeor equation is',
  },
  calorieTarget: {
    id: 'calorieTarget',
    term: 'Calorie Target',
    title: 'Daily Calorie Target',
    explanation: 'The estimated daily calorie intake to aim for based on your personal goal (steady weight loss, maintenance, or gradual weight gain), kept within baseline wellness boundaries.',
    ariaLabel: 'Learn what a daily calorie target means',
  },
  dietaryCaution: {
    id: 'dietaryCaution',
    term: 'Dietary Cautions',
    title: 'Dietary Cautions & Clinical Rules',
    explanation: 'Sensible food adjustments tailored to specific conditions—such as choosing slow-digesting carbs for diabetes awareness, moderating sodium, or swapping dairy with plant-based alternatives.',
    ariaLabel: 'Learn what dietary cautions mean',
  },
  localStorage: {
    id: 'localStorage',
    term: 'LocalStorage',
    title: 'Local Browser Storage',
    explanation: 'A private storage area built into your web browser. It keeps your meal preferences and water records safely on your own computer without transmitting them over the internet.',
    ariaLabel: 'Learn what local browser storage means',
  },
  educationalEstimate: {
    id: 'educationalEstimate',
    term: 'Educational Estimate',
    title: 'Educational Nutrition Estimate',
    explanation: 'Nutritional estimates provided to help you understand balance and plan wholesome meals. They serve as an educational reference, not a medical diagnosis or prescription.',
    ariaLabel: 'Learn what an educational nutrition estimate is',
  },
  macronutrients: {
    id: 'macronutrients',
    term: 'Macronutrients',
    title: 'Macronutrients (Macros)',
    explanation: 'The three primary nutrient categories that provide daily calories: Protein (muscle & tissue repair), Carbohydrates (daily energy), and Healthy Fats (hormone & cell support).',
    ariaLabel: 'Learn what macronutrients are',
  },
  protein: {
    id: 'protein',
    term: 'Protein',
    title: 'Dietary Protein',
    explanation: 'An essential nutrient that preserves lean muscle, helps repair cells, and keeps you feeling full and satisfied after meals.',
    ariaLabel: 'Learn what dietary protein does',
  },
  carbohydrates: {
    id: 'carbohydrates',
    term: 'Carbohydrates',
    title: 'Carbohydrates',
    explanation: 'Your body’s main fuel source. NutriWise prioritizes complex, whole-grain Indian carbs (like oats, dal, and multigrain roti) for slow, steady energy.',
    ariaLabel: 'Learn what carbohydrates are',
  },
  fats: {
    id: 'fats',
    term: 'Healthy Fats',
    title: 'Healthy Dietary Fats',
    explanation: 'Beneficial fats from nuts, seeds, and healthy cooking oils that support hormone production, cell structure, and vitamin absorption.',
    ariaLabel: 'Learn what healthy dietary fats do',
  },
  dietaryFiber: {
    id: 'dietaryFiber',
    term: 'Dietary Fiber',
    title: 'Dietary Fiber',
    explanation: 'Indigestible plant parts found in lentils, vegetables, and whole grains that aid healthy digestion, improve gut health, and steady blood sugar response.',
    ariaLabel: 'Learn what dietary fiber is',
  },
  hydrationTarget: {
    id: 'hydrationTarget',
    term: 'Hydration Target',
    title: 'Daily Hydration Target',
    explanation: 'The estimated daily water intake tailored to your body weight (~35 ml per kg) to support energy, mental focus, and smooth digestion.',
    ariaLabel: 'Learn how daily hydration target is calculated',
  },
  hydrationStandard: {
    id: 'hydrationStandard',
    term: 'Hydration Standard',
    title: 'Clinical Hydration Standard (35 ml/kg)',
    explanation: 'Calculated using the clinical guideline of 35 ml water per kg of total body weight, ensuring adequate cellular hydration, optimal kidney clearance, and daily electrolyte balance.',
    ariaLabel: 'Learn about the 35 ml per kg hydration standard',
  },
  glycemicIndex: {
    id: 'glycemicIndex',
    term: 'Glycemic Index (GI)',
    title: 'Glycemic Index (GI)',
    explanation: 'A scale measuring how quickly a carbohydrate food raises blood sugar. Lower-GI foods digest gradually, providing smooth, sustained energy without rapid spikes.',
    ariaLabel: 'Learn what glycemic index means',
  },
  mealSwaps: {
    id: 'mealSwaps',
    term: 'Meal Swaps',
    title: 'Nutritional Meal Swaps',
    explanation: 'An interactive feature allowing you to trade any meal item for an alternative Indian dish with a comparable calorie and macronutrient balance.',
    ariaLabel: 'Learn how meal swaps work',
  },
  pdfReport: {
    id: 'pdfReport',
    term: 'Nutrition Summary PDF',
    title: 'Downloadable Clinical Nutrition Report',
    explanation: 'A publication-grade 3-page clinical PDF containing your biometrics, Mifflin-St Jeor metabolic calculations, personalized 7-day meal matrix, and grocery checklist for offline clinician consultation.',
    ariaLabel: 'Learn about the clinical nutrition report PDF',
  },

  // Condition-Specific Clinical Plain-Language Terms
  diabetes: {
    id: 'diabetes',
    term: 'Type 2 Diabetes / Glycemic Management',
    title: 'Type 2 Diabetes & Glycemic Control',
    explanation: 'Restricts meal choices to Low/Medium Glycemic Index (GI ≤ 55) and prioritizes soluble dietary fiber (≥30g/day) to blunt postprandial blood sugar spikes and protect pancreatic beta-cell function.',
    ariaLabel: 'Learn what type 2 diabetes glycemic guidance entails',
  },
  hypertension: {
    id: 'hypertension',
    term: 'Hypertension / DASH Sodium Protocol',
    title: 'Hypertension & DASH Sodium Ceiling',
    explanation: 'Enforces a strict sodium ceiling under 2,000 mg/day (less than 1 level teaspoon of salt across all daily meals) while boosting bioavailable potassium and magnesium to promote arterial relaxation.',
    ariaLabel: 'Learn about hypertension DASH sodium rules',
  },
  pcos: {
    id: 'pcos',
    term: 'PCOS / PCOD Hormonal Care',
    title: 'PCOS & Insulin Resistance Management',
    explanation: 'Emphasizes an insulin-sensitizing macronutrient balance (45% complex low-GI carbs, 25% protein, 30% healthy fats) along with anti-inflammatory herbs to moderate insulin and ovarian androgen synthesis.',
    ariaLabel: 'Learn about PCOS nutritional guidance',
  },
  thyroid: {
    id: 'thyroid',
    term: 'Hypothyroid Support',
    title: 'Thyroid Metabolism & Micronutrient Balance',
    explanation: 'Ensures adequate intake of selenium, zinc, and iodine while ensuring goitrogenic vegetables (cabbage, cauliflower, broccoli) are consumed thoroughly cooked rather than raw to support thyroid hormone production.',
    ariaLabel: 'Learn about hypothyroid nutritional care',
  },
  lactose_intolerance: {
    id: 'lactose_intolerance',
    term: 'Lactose Intolerance',
    title: '100% Dairy-Free & Lactose-Safe Protocol',
    explanation: 'Completely eliminates bovine milk, conventional paneer, cow/buffalo ghee, and regular curd to prevent gastrointestinal distress, replacing them with calcium-rich tofu, soya, and plant milks.',
    ariaLabel: 'Learn about 100% dairy-free lactose-safe nutrition',
  },
} as const;

export type TermKey = keyof typeof PLAIN_LANGUAGE_TERMS;

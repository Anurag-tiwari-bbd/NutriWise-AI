import { WeeklyPlan, DayPlan, MealItem, UserProfile } from '../types/nutrition';

export type FastingMode = 'none' | 'navratri_ekadashi' | 'shravan_somwar' | 'ramadan_roza';

export interface FastingModeConfig {
  id: FastingMode;
  title: string;
  hindiTitle: string;
  badge: string;
  shortDescription: string;
  clinicalRationale: string;
  prohibitedItems: string[];
  recommendedSubstitutes: string[];
}

export const FASTING_MODES: FastingModeConfig[] = [
  {
    id: 'none',
    title: 'Standard Personalized Plan',
    hindiTitle: 'नियमित संतुलित आहार',
    badge: 'Standard Diet',
    shortDescription: 'All recommended meals aligned with your routine profile and preferences.',
    clinicalRationale: 'Continuous nutritional delivery according to standard metabolic targets.',
    prohibitedItems: [],
    recommendedSubstitutes: [],
  },
  {
    id: 'navratri_ekadashi',
    title: 'Navratri & Ekadashi Vrat Mode',
    hindiTitle: 'नवरात्रि एवं एकादशी व्रत',
    badge: 'Grain & Allium Free',
    shortDescription: '100% grain-free, legume-free, and onion-garlic free with authentic fasting superfoods.',
    clinicalRationale: 'Replaces grains with pseudo-cereals (Kuttu, Singhara, Samak) rich in rutin and resistant starch, utilizing mineral-rich Sendha Namak (Himalayan rock salt) without dropping protein.',
    prohibitedItems: ['Wheat (Gehu)', 'Rice (Chawal)', 'Lentils (Dals)', 'Onion (Pyaaz)', 'Garlic (Lahsun)', 'Table Salt'],
    recommendedSubstitutes: ['Kuttu (Buckwheat)', 'Singhara (Water Chestnut)', 'Samak Rice', 'Sendha Namak', 'Makhana', 'Lauki'],
  },
  {
    id: 'shravan_somwar',
    title: 'Shravan & Somwar Satvik Mode',
    hindiTitle: 'श्रावण एवं सोमवार सात्विक',
    badge: 'Pure Satvik High-Protein',
    shortDescription: 'Converts non-vegetarian profiles to 100% Pure Satvik vegetarian with zero protein loss.',
    clinicalRationale: 'Shifts non-veg meals to bioavailable lacto-vegetarian and plant proteins (Paneer, Tofu, Soya, Sprouted Moong) to protect muscle mass and renal clearance.',
    prohibitedItems: ['Chicken', 'Fish', 'Eggs', 'Meat'],
    recommendedSubstitutes: ['Low-fat Paneer', 'Firm Tofu', 'Sprouted Moong', 'Soya Chunks', 'Yellow Moong Dal'],
  },
  {
    id: 'ramadan_roza',
    title: 'Ramadan Roza Metabolic Timing',
    hindiTitle: 'रमज़ान रोज़ा मेटाबॉलिक चक्र',
    badge: '2-Phase Circadian Timing',
    shortDescription: 'Re-aligns the 4-meal cycle into Suhoor (Pre-dawn) & Iftar/Dinner (Sunset) metabolic windows.',
    clinicalRationale: 'Optimizes pre-dawn glycogen retention via low-GI complex carbs and provides rapid rehydration and potassium recovery at sunset without blood sugar spikes.',
    prohibitedItems: ['Daytime snacking', 'Deep-fried pakoras', 'Refined sugar sherbets'],
    recommendedSubstitutes: ['Medjool Dates (Khajur)', 'Complex Oats & Seeds', 'Nimbu Paani with Mint', 'Grilled Chicken / Paneer'],
  },
];

// Curated Fasting-Compliant Meal Catalog for Navratri/Ekadashi
const NAVRATRI_VRAT_MEALS: Record<'breakfast' | 'lunch' | 'snacks' | 'dinner', MealItem[]> = {
  breakfast: [
    {
      id: 'vrat-bf-01',
      nameEn: 'Kuttu (Buckwheat) Cheela with Fresh Curd',
      nameHi: 'कुट्टू का चीला और ताज़ा दही',
      category: 'breakfast',
      portion: '2 cheelas (140g) + 1 small katori low-fat curd',
      calories: 280,
      protein: 11,
      carbs: 42,
      fat: 7,
      fiber: 6,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: [],
      isRootVegetableFree: true,
      prepTimeMinutes: 15,
      healthBenefits: 'High in rutin flavonoid and magnesium; stabilizes blood sugar during religious fasting.',
    },
    {
      id: 'vrat-bf-02',
      nameEn: 'Singhara (Water Chestnut) Paratha with Green Mint Chutney',
      nameHi: 'सिंघाड़े के आटे का परांठा और पुदीना चटनी',
      category: 'breakfast',
      portion: '2 rotis (120g) + rock salt mint dip',
      calories: 260,
      protein: 8,
      carbs: 45,
      fat: 6,
      fiber: 5,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: [],
      isRootVegetableFree: true,
      prepTimeMinutes: 20,
      healthBenefits: 'Singhara flour is alkaline and rich in potassium, preventing acidity and electrolyte depletion.',
    },
  ],
  lunch: [
    {
      id: 'vrat-lun-01',
      nameEn: 'Samak Rice Khichdi with Lauki & Sendha Namak',
      nameHi: 'समा के चावल की खिचड़ी, लौकी और सेंधा नमक',
      category: 'lunch',
      portion: '1 large bowl (220g) + cucumber raita',
      calories: 340,
      protein: 9,
      carbs: 58,
      fat: 8,
      fiber: 7,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: [],
      isRootVegetableFree: true,
      prepTimeMinutes: 25,
      healthBenefits: 'Samak is barnyard millet: gluten-free, easily digestible with slow gastric transit.',
    },
    {
      id: 'vrat-lun-02',
      nameEn: 'Low-Fat Paneer Bhurji with Kuttu Rotis',
      nameHi: 'पनीर भुर्जी (सेंधा नमक) और कुट्टू की रोटी',
      category: 'lunch',
      portion: '1 katori paneer (120g) + 2 kuttu rotis',
      calories: 380,
      protein: 20,
      carbs: 38,
      fat: 14,
      fiber: 6,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: ['dairy'],
      isRootVegetableFree: true,
      prepTimeMinutes: 20,
      healthBenefits: 'High biological value protein preserving lean muscle mass during extended fasts.',
    },
  ],
  snacks: [
    {
      id: 'vrat-snk-01',
      nameEn: 'Roasted Fox Nuts (Makhana) with Sendha Namak',
      nameHi: 'भुना मखाना, सेंधा नमक और काली मिर्च',
      category: 'snacks',
      portion: '1 large bowl (40g) + herbal green tea',
      calories: 150,
      protein: 5,
      carbs: 26,
      fat: 3,
      fiber: 4,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: [],
      isRootVegetableFree: true,
      prepTimeMinutes: 8,
      healthBenefits: 'Rich in anti-aging flavonoids (kaempferol) and low sodium to keep blood pressure low.',
    },
    {
      id: 'vrat-snk-02',
      nameEn: 'Sweet Potato (Shakarkandi) Chaat with Roasted Cumin',
      nameHi: 'भुनी शकरकंदी चाट, नींबू और भुना जीरा',
      category: 'snacks',
      portion: '1 bowl (130g) with rock salt & lemon',
      calories: 160,
      protein: 3,
      carbs: 36,
      fat: 1,
      fiber: 5,
      dietType: 'vegetarian',
      glycemicIndex: 'medium',
      allergens: [],
      isRootVegetableFree: false,
      prepTimeMinutes: 12,
      healthBenefits: 'High beta-carotene and dietary fiber promoting steady energy release.',
    },
  ],
  dinner: [
    {
      id: 'vrat-din-01',
      nameEn: 'Lauki (Bottle Gourd) Kofta in Tomato-Curd Gravy with Kuttu Phulkas',
      nameHi: 'लौकी कोफ्ता करी (व्रत) और कुट्टू की फुल्का',
      category: 'dinner',
      portion: '1 katori sabzi (180g) + 2 soft phulkas',
      calories: 330,
      protein: 10,
      carbs: 48,
      fat: 9,
      fiber: 7,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: [],
      isRootVegetableFree: true,
      prepTimeMinutes: 25,
      healthBenefits: 'Extremely cooling, hydrating and alkaline; prevents nocturnal fasting reflux.',
    },
    {
      id: 'vrat-din-02',
      nameEn: 'Paneer Makhana Curry with Samak Rice Pulao',
      nameHi: 'पनीर मखाना करी और समा राइस पुलाव',
      category: 'dinner',
      portion: '1 katori curry (160g) + 1 katori samak rice',
      calories: 370,
      protein: 18,
      carbs: 46,
      fat: 12,
      fiber: 6,
      dietType: 'jain',
      glycemicIndex: 'low',
      allergens: ['dairy'],
      isRootVegetableFree: true,
      prepTimeMinutes: 25,
      healthBenefits: 'Synergistic protein and calcium pairing for restful sleep and night tissue repair.',
    },
  ],
};

// Satvik High-Protein Replacements for Shravan Mode (Replacing Non-Veg Meals)
const SATVIK_HIGH_PROTEIN_REPLACEMENTS: Record<'breakfast' | 'lunch' | 'dinner', MealItem[]> = {
  breakfast: [
    {
      id: 'satvik-bf-01',
      nameEn: 'Sprouted Moong & Paneer Tawa Bhurji with Mint Chutney',
      nameHi: 'अंकुरित मूंग और पनीर भुर्जी व पुदीना चटनी',
      category: 'breakfast',
      portion: '1 bowl (180g) + 1 whole wheat toast/roti',
      calories: 310,
      protein: 19,
      carbs: 32,
      fat: 10,
      fiber: 7,
      dietType: 'vegetarian',
      glycemicIndex: 'low',
      allergens: ['dairy'],
      isRootVegetableFree: false,
      prepTimeMinutes: 15,
      healthBenefits: 'Matches egg-white protein density while delivering active sprouting enzymes.',
    },
  ],
  lunch: [
    {
      id: 'satvik-lun-01',
      nameEn: 'Soya Chunks & Green Peas Masala with Brown Rice & Dal',
      nameHi: 'सोया चंक्स मटर करी, ब्राउन राइस और पीली दाल',
      category: 'lunch',
      portion: '1 katori soya curry (160g) + 1 katori rice + dal',
      calories: 420,
      protein: 26,
      carbs: 54,
      fat: 8,
      fiber: 9,
      dietType: 'vegan',
      glycemicIndex: 'low',
      allergens: ['soya'],
      isRootVegetableFree: false,
      prepTimeMinutes: 25,
      healthBenefits: 'Soya chunks provide complete amino acids matching chicken breast protein scores.',
    },
    {
      id: 'satvik-lun-02',
      nameEn: 'Grilled Tofu Tikka & High-Protein Dal Tadka with 2 Rotis',
      nameHi: 'टोफू टिक्का और मूंग दाल तड़का साथ में 2 रोटियां',
      category: 'lunch',
      portion: '120g tofu tikka + 1 katori dal + 2 rotis',
      calories: 410,
      protein: 24,
      carbs: 48,
      fat: 11,
      fiber: 8,
      dietType: 'vegan',
      glycemicIndex: 'low',
      allergens: ['soya'],
      isRootVegetableFree: false,
      prepTimeMinutes: 20,
      healthBenefits: 'Plant isoflavones and bioavailable iron with zero cholesterol.',
    },
  ],
  dinner: [
    {
      id: 'satvik-din-01',
      nameEn: 'Low-Fat Paneer Tikka Masala with Whole Wheat Rotis',
      nameHi: 'पनीर टिक्का मसाला और 2 साबुत गेहूं की रोटियां',
      category: 'dinner',
      portion: '1 katori paneer (130g) + 2 rotis + cucumber salad',
      calories: 390,
      protein: 22,
      carbs: 42,
      fat: 13,
      fiber: 7,
      dietType: 'vegetarian',
      glycemicIndex: 'low',
      allergens: ['dairy'],
      isRootVegetableFree: false,
      prepTimeMinutes: 25,
      healthBenefits: 'Casein slow-release protein supporting nocturnal muscle protein synthesis.',
    },
  ],
};

/**
 * Transforms an existing WeeklyPlan based on the selected Cultural Fasting Mode.
 */
export function adaptPlanForFasting(
  originalPlan: WeeklyPlan,
  profile: UserProfile,
  mode: FastingMode
): WeeklyPlan {
  if (mode === 'none') {
    return originalPlan;
  }

  const updatedDays: DayPlan[] = originalPlan.days.map((day, dayIdx) => {
    let { breakfast, lunch, snacks, dinner } = day;

    if (mode === 'navratri_ekadashi') {
      // Replace all 4 slots with authentic Navratri fasting dishes
      breakfast = NAVRATRI_VRAT_MEALS.breakfast[dayIdx % NAVRATRI_VRAT_MEALS.breakfast.length];
      lunch = NAVRATRI_VRAT_MEALS.lunch[dayIdx % NAVRATRI_VRAT_MEALS.lunch.length];
      snacks = NAVRATRI_VRAT_MEALS.snacks[dayIdx % NAVRATRI_VRAT_MEALS.snacks.length];
      dinner = NAVRATRI_VRAT_MEALS.dinner[dayIdx % NAVRATRI_VRAT_MEALS.dinner.length];
    } else if (mode === 'shravan_somwar') {
      // If user is non-veg and meal is non-veg, convert to Satvik high-protein equivalent
      if (breakfast.dietType === 'non_vegetarian') {
        breakfast = SATVIK_HIGH_PROTEIN_REPLACEMENTS.breakfast[0];
      }
      if (lunch.dietType === 'non_vegetarian') {
        lunch = SATVIK_HIGH_PROTEIN_REPLACEMENTS.lunch[dayIdx % SATVIK_HIGH_PROTEIN_REPLACEMENTS.lunch.length];
      }
      if (dinner.dietType === 'non_vegetarian') {
        dinner = SATVIK_HIGH_PROTEIN_REPLACEMENTS.dinner[0];
      }
    } else if (mode === 'ramadan_roza') {
      // Re-align descriptions and timings for Ramadan circadian pattern
      breakfast = {
        ...breakfast,
        nameEn: `[Suhoor / Sehri] ${breakfast.nameEn}`,
        nameHi: `[सहरी - भोर] ${breakfast.nameHi}`,
        healthBenefits: `Eaten pre-dawn with plenty of water. High-fiber slow-release energy for daytime fasting.`,
      };
      snacks = {
        ...snacks,
        nameEn: `[Iftar Opening] Medjool Dates & ${snacks.nameEn}`,
        nameHi: `[इफ्तार - सूर्यास्त] खजूर और ${snacks.nameHi}`,
        healthBenefits: `Fast-acting natural electrolytes, glucose and hydration to break daytime fast smoothly.`,
      };
      dinner = {
        ...dinner,
        nameEn: `[Post-Iftar Dinner] ${dinner.nameEn}`,
        nameHi: `[इफ्तार उपरांत भोजन] ${dinner.nameHi}`,
        healthBenefits: `Nutrient-dense dinner meeting nocturnal protein requirements.`,
      };
    }

    const totalCalories = breakfast.calories + lunch.calories + snacks.calories + dinner.calories;
    const totalProtein = breakfast.protein + lunch.protein + snacks.protein + dinner.protein;
    const totalCarbs = breakfast.carbs + lunch.carbs + snacks.carbs + dinner.carbs;
    const totalFat = breakfast.fat + lunch.fat + snacks.fat + dinner.fat;
    const totalFiber = breakfast.fiber + lunch.fiber + snacks.fiber + dinner.fiber;

    return {
      ...day,
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
    ...originalPlan,
    days: updatedDays,
  };
}

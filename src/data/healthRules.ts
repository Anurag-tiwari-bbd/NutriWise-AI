import { HealthCondition } from '../types/nutrition';

export interface HealthConditionGuideline {
  condition: HealthCondition;
  title: string;
  badgeLabel: string;
  primaryGoal: string;
  dietaryCautions: string[];
  recommendedFoods: string[];
  restrictedFoods: string[];
  maxGlycemicIndex: 'low' | 'medium' | 'high';
  forbiddenAllergens: string[];
}

export const HEALTH_CONDITION_RULES: Record<HealthCondition, HealthConditionGuideline> = {
  diabetes: {
    condition: 'diabetes',
    title: 'Type 2 Diabetes & Glycemic Management',
    badgeLabel: 'Glycemic Caution',
    primaryGoal: 'Stabilize postprandial glucose curves with slow-digesting complex carbohydrates and high soluble fiber.',
    dietaryCautions: [
      'Prioritize Low-GI whole grains (multigrain roti, oats, brown lentils, dalia).',
      'Aim for a minimum of 25–35g dietary fiber daily to slow intestinal glucose absorption.',
      'Strictly avoid refined sugars, sweetened fruit beverages, and refined maida.',
      'Pair carbohydrate staples with protein (paneer, tofu, dal, eggs) to attenuate blood sugar spikes.',
    ],
    recommendedFoods: ['Palak Paneer', 'Moong Dal Chilla', 'Besan Chilla', 'Sprouts Chaat', 'Methi Thepla', 'Bitter Gourd (Karela)'],
    restrictedFoods: ['White sugar', 'Refined flour (Maida)', 'Deep-fried snacks (Samosa, Pakora)', 'Sugary sweets (Mithai)'],
    maxGlycemicIndex: 'medium', // High GI filtered out
    forbiddenAllergens: [],
  },

  hypertension: {
    condition: 'hypertension',
    title: 'Hypertension & Cardiovascular Health',
    badgeLabel: 'Sodium Caution',
    primaryGoal: 'Promote healthy arterial tone and fluid balance through moderate sodium (< 2,000 mg/day) and high potassium.',
    dietaryCautions: [
      'Limit salt intake to under 1 level teaspoon (< 5g salt) across all meals each day.',
      'Emphasize potassium- and magnesium-rich ingredients like bottle gourd, spinach, coconut water, and pumpkin seeds.',
      'Minimize commercial pickles (Achaar), processed papads, and salted namkeens.',
      'Utilize fresh herbs (coriander, mint, curry leaves) and lemon juice instead of extra table salt for seasoning.',
    ],
    recommendedFoods: ['Lauki Kofta / Sabzi', 'Tender Coconut Water', 'Masala Chaas', 'Spinach Khichdi', 'Roasted Makhana (unsalted)'],
    restrictedFoods: ['High-sodium pickles (Achaar)', 'Commercial salted chips & mixtures', 'Canned broths', 'Processed meats'],
    maxGlycemicIndex: 'high',
    forbiddenAllergens: [],
  },

  pcos: {
    condition: 'pcos',
    title: 'PCOS & Hormonal Insulin Sensitivity',
    badgeLabel: 'Hormonal & Insulin Care',
    primaryGoal: 'Reduce systemic inflammation, combat insulin resistance, and support healthy ovarian and metabolic function.',
    dietaryCautions: [
      'Favor anti-inflammatory fats (walnuts, flaxseeds, almonds) and lean proteins.',
      'Prioritize complex, low-GI whole pulses and millets (bajra, jowar, oats) to keep insulin levels balanced.',
      'Avoid high-sugar snacks and sweetened dairy drinks.',
      'Include cruciferous and leafy vegetables to support natural estrogen metabolism.',
    ],
    recommendedFoods: ['Moong Dal Chilla', 'Soya Matar Bhurji', 'Sprouted Moong Salad', 'Methi Thepla', 'Nuts & Pumpkin Seeds'],
    restrictedFoods: ['Refined flours', 'Sugary bakery pastries', 'Carbonated sodas', 'Excessive trans-fat fried snacks'],
    maxGlycemicIndex: 'medium',
    forbiddenAllergens: [],
  },

  thyroid: {
    condition: 'thyroid',
    title: 'Thyroid Metabolism & Micronutrient Balance',
    badgeLabel: 'Metabolic & Thyroid Care',
    primaryGoal: 'Provide adequate selenium, zinc, and iodine while ensuring goitrogenic foods are consumed cooked rather than raw.',
    dietaryCautions: [
      'Always consume cruciferous greens (cauliflower, cabbage, broccoli) cooked or sautéed, never raw in large quantities.',
      'Ensure adequate intake of selenium and zinc through whole pulses, nuts, and seeds.',
      'Avoid raw soy in excessive amounts; cooked fermented soy/tofu in moderation is safe.',
      'Maintain consistent meal timing to sustain metabolic rate and energy levels.',
    ],
    recommendedFoods: ['Cooked Palak Dal', 'Oats Khichdi', 'Mixed Nuts (Walnuts & Almonds)', 'Mushroom Matar', 'Paneer Bhurji'],
    restrictedFoods: ['Raw cabbage/cauliflower salads in large volumes', 'Excessive unfermented raw soy flour', 'Heavy refined sugars'],
    maxGlycemicIndex: 'high',
    forbiddenAllergens: [],
  },

  lactose_intolerance: {
    condition: 'lactose_intolerance',
    title: 'Lactose Intolerance & Dairy Sensitivity',
    badgeLabel: '100% Dairy-Free Filter',
    primaryGoal: 'Eliminate bovine dairy sugars that provoke intestinal cramping, bloating, or malabsorption.',
    dietaryCautions: [
      'Strictly avoid milk, conventional paneer, cow/buffalo ghee, malai, and regular dairy curd.',
      'Substitute paneer with firm calcium-set tofu for equivalent protein and texture.',
      'Substitute dairy curd with plant curd or fortified soya/almond alternatives.',
      'Incorporate calcium-rich seeds (sesame seeds, chia) and leafy greens to maintain bone density.',
    ],
    recommendedFoods: ['Tofu Bhurji', 'Tofu Palak', 'Soya Chunks Curry', 'Sprouts Chaat', 'Vegetable Poha', 'Dal Tadka'],
    restrictedFoods: ['Milk (Cow/Buffalo)', 'Paneer', 'Curd (Dahi)', 'Malai', 'Butter / Makkhan', 'Khoya sweets'],
    maxGlycemicIndex: 'high',
    forbiddenAllergens: ['dairy'],
  },
};

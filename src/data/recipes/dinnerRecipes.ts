import { RecipeDetail } from '../recipeData';

export const DINNER_RECIPES: Record<string, RecipeDetail> = {
  "dn-01": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "Ayurvedic",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Yellow Moong Dal & Rice (50:50 Blend)",
        "quantity": "1 katori (65g dry / 160g cooked)",
        "category": "grain"
      },
      {
        "item": "Fresh Spinach (Palak) Leaves (Finely Chopped)",
        "quantity": "1 large cup (70g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 small (35g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger Juliennes",
        "quantity": "1 tsp",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds (Jeera) & Hing",
        "quantity": "0.75 tsp jeera, 1 pinch hing",
        "category": "spice"
      },
      {
        "item": "Turmeric Powder (Haldi)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil or Sesame Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Water for Khichdi",
        "quantity": "3 cups (for soft soothing porridge)",
        "category": "grain"
      },
      {
        "item": "Roasted Moong Papad",
        "quantity": "1 crisp papad",
        "category": "pulse"
      },
      {
        "item": "Rock Salt (Sendha Namak)",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Rinse moong dal and rice together 3 times; soak in water for 15 minutes to soften grains.",
      "Heat oil in a pressure cooker on medium flame. Splutter cumin seeds and a pinch of hing.",
      "Add chopped onions and ginger juliennes; sauté for 3 minutes until translucent.",
      "Add chopped fresh spinach leaves, turmeric, and rock salt; sauté for 1 minute until spinach wilts.",
      "Drain soaked dal and rice; add into the cooker and sauté for 1 minute.",
      "Pour 3 cups water, stir well, and close lid with weight.",
      "Pressure cook on medium heat for 4 whistles, then reduce flame to low for 2 minutes before turning off.",
      "Let steam release naturally; open lid and whisk gently with a ladle into a comforting, nutrient-dense green porridge.",
      "Serve hot accompanied by a roasted crisp papad and lemon wedges."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      },
      {
        "spiceName": "Asafoetida (Hing)",
        "activeCompound": "Ferulic Acid & Umbelliferone",
        "clinicalMechanism": "Relieves intestinal spasms and curbs colonic fermentation of oligosaccharides."
      }
    ],
    "micronutrients": {
      "ironMg": 4.4,
      "calciumMg": 105,
      "vitaminB12Mcg": 0,
      "zincMg": 2.7,
      "potassiumMg": 574,
      "folateMcg": 185
    }
  },
  "dn-02": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 12,
    "servings": 1,
    "cuisine": "Dhaba Punjabi",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Fresh Malai Paneer (Crumbled)",
        "quantity": "120g fresh paneer",
        "category": "protein"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 large (60g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Green Chillies & Ginger",
        "quantity": "2 chillies, 1 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds (Jeera)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Turmeric & Kashmiri Red Chilli Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Pav Bhaji Masala or Garam Masala",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Kasuri Methi (Fenugreek Leaves)",
        "quantity": "1 tsp crushed",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee or Cold-Pressed Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas & Green Salad",
        "quantity": "2 phulkas + cucumber slices",
        "category": "grain"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Hand-crumble fresh paneer with your fingers into soft, uneven bite-sized curds (do not grate to keep authentic dhaba texture).",
      "Heat ghee or oil in a heavy cast-iron skillet on medium flame. Crackle cumin seeds until aromatic.",
      "Add chopped onions, green chillies, and grated ginger. Sauté on medium flame for 4 minutes until onions turn soft and translucent golden.",
      "Add chopped tomatoes, turmeric, and Kashmiri red chilli powder with rock salt.",
      "Sauté on medium flame for 3 minutes, pressing tomatoes with the spatula until soft and mushy.",
      "Add pav bhaji masala and 2 tablespoons of warm water; stir to create a rich, moist masala base.",
      "Fold in the crumbled paneer gently. Toss on medium-low flame for exactly 2 minutes so the paneer absorbs flavors while staying soft and tender (avoid overcooking).",
      "Turn off heat immediately. Rub kasuri methi between palms and crush over the bhurji with fresh lemon juice and coriander.",
      "Serve steaming hot with 2 soft phulkas and fresh green salad."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Kasuri Methi (Fenugreek)",
        "activeCompound": "Trigonelline & Galactomannan",
        "clinicalMechanism": "Delays intestinal glucose absorption, smoothing glycemic spikes."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 4.5,
      "calciumMg": 235,
      "vitaminB12Mcg": 0.4,
      "zincMg": 3.3,
      "potassiumMg": 554,
      "folateMcg": 172
    }
  },
  "dn-03": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "Jain Satvik",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Fresh Bottle Gourd (Lauki Cubes)",
        "quantity": "1 large bowl (140g diced)",
        "category": "vegetable"
      },
      {
        "item": "Split Bengal Gram (Chana Dal - Soaked 2 Hrs)",
        "quantity": "0.5 katori (40g dry / 90g cooked)",
        "category": "pulse"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds (Jeera)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Asafoetida (Hing - strict Jain grade)",
        "quantity": "1 pinch",
        "category": "spice"
      },
      {
        "item": "Fresh Ginger Paste & Green Chillies",
        "quantity": "0.5 tsp ginger, 1 chilli slit",
        "category": "spice"
      },
      {
        "item": "Turmeric & Coriander Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Rotis",
        "quantity": "2 soft rotis",
        "category": "grain"
      },
      {
        "item": "Fresh Coriander Leaves & Lemon",
        "quantity": "1 tbsp each",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt (Sendha Namak)",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Soak chana dal in warm water for 2 hours, then drain thoroughly.",
      "Heat desi ghee in a pressure cooker on medium flame. Splutter cumin seeds and a generous pinch of Jain hing.",
      "Add fresh ginger paste and slit green chillies; sauté for 30 seconds until aromatic.",
      "Add chopped tomatoes, turmeric, coriander powder, and rock salt. Sauté for 3 minutes until tomatoes turn soft.",
      "Add diced bottle gourd (lauki) and soaked chana dal. Toss for 1 minute to coat with spices.",
      "Add 1.5 cups water, stir well, and close pressure cooker lid with weight.",
      "Cook on medium flame for 4 whistles until chana dal is tender yet retains shape and lauki is melt-in-mouth soft.",
      "Open lid, simmer for 2 minutes to thicken, stir in fresh lemon juice and coriander.",
      "Serve hot accompanied by 2 whole wheat rotis."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Asafoetida (Hing)",
        "activeCompound": "Ferulic Acid & Umbelliferone",
        "clinicalMechanism": "Relieves intestinal spasms and curbs colonic fermentation of oligosaccharides."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 5.3,
      "calciumMg": 138,
      "vitaminB12Mcg": 0.4,
      "zincMg": 2.5,
      "potassiumMg": 639,
      "folateMcg": 213
    }
  },
  "dn-04": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "Healthy Fusion Vegan",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Organic Firm Tofu Cubes",
        "quantity": "120g cubed",
        "category": "protein"
      },
      {
        "item": "Fresh Spinach (Palak) Leaves",
        "quantity": "1 large bunch (180g washed)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds & Bay Leaf",
        "quantity": "0.5 tsp jeera, 1 leaf",
        "category": "spice"
      },
      {
        "item": "Kasuri Methi (Fenugreek Leaves)",
        "quantity": "1 tsp crushed",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Sesame or Mustard Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Multigrain Whole Wheat Rotis",
        "quantity": "2 soft rotis",
        "category": "grain"
      },
      {
        "item": "Fresh Lemon Juice",
        "quantity": "1 tsp (added off heat)",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Blanch washed spinach in boiling water for 2 minutes, plunge into ice water, and blend into a silky smooth green puree with 1 green chilli.",
      "Lightly pan-sear tofu cubes with a pinch of turmeric in 0.5 tsp oil for 2 minutes until golden on edges; set aside.",
      "In the same pan, heat remaining oil. Temper cumin seeds and bay leaf until aromatic.",
      "Add chopped onions and sauté for 4 minutes until golden. Add ginger-garlic paste and sauté for 1 minute.",
      "Add chopped tomatoes and turmeric; cook until tomatoes melt into a glossy masala and oil separates.",
      "Pour in the bright green spinach puree. Simmer on low flame for 3 minutes.",
      "Gently fold in the pan-seared tofu cubes. Simmer for 2 minutes on low flame so tofu absorbs the spinach flavors.",
      "Finish with crushed kasuri methi and fresh lemon juice off-heat.",
      "Serve hot with 2 multigrain rotis."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Kasuri Methi (Fenugreek)",
        "activeCompound": "Trigonelline & Galactomannan",
        "clinicalMechanism": "Delays intestinal glucose absorption, smoothing glycemic spikes."
      },
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      }
    ],
    "micronutrients": {
      "ironMg": 5.8,
      "calciumMg": 117,
      "vitaminB12Mcg": 0,
      "zincMg": 3,
      "potassiumMg": 611,
      "folateMcg": 212
    }
  },
  "dn-05": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Continental Fusion",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Skinless Chicken Breast Fillet",
        "quantity": "150g clean fillet",
        "category": "protein"
      },
      {
        "item": "Fresh Lemon Juice & Zest",
        "quantity": "1.5 tbsp juice, 0.5 tsp zest",
        "category": "vegetable"
      },
      {
        "item": "Finely Minced Garlic Cloves",
        "quantity": "3 cloves",
        "category": "spice"
      },
      {
        "item": "Dried Oregano & Thyme Herbs",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Cracked Black Pepper",
        "quantity": "0.5 tsp coarse",
        "category": "spice"
      },
      {
        "item": "Extra Virgin Olive Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Sautéed Vegetables (Zucchini, Carrots, Beans)",
        "quantity": "1 large cup (100g)",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Marinate chicken breast with minced garlic, lemon juice, lemon zest, oregano, thyme, black pepper, and 0.5 tsp olive oil for 15 minutes.",
      "Heat a heavy grill pan or skillet on medium-high heat until hot.",
      "Place marinated chicken in pan; sear undisturbed for 4 minutes on high heat to create grill marks.",
      "Flip chicken and sear for 3 minutes on the other side.",
      "Lower flame, cover with lid, and cook for 4 minutes until internal temperature reaches 75°C and juices run clear.",
      "In a separate pan, flash-sauté diced zucchini, carrots, and beans in remaining olive oil for 3 minutes until crisp-tender.",
      "Rest grilled chicken on a cutting board for 3 minutes, then slice across grain into tender strips.",
      "Plate warm sliced chicken over colorful sautéed vegetables with fresh lemon wedges."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Black Pepper (Kali Mirch)",
        "activeCompound": "Piperine",
        "clinicalMechanism": "Inhibits hepatic glucuronidation, multiplying micronutrient bioavailability up to 2000%."
      }
    ],
    "micronutrients": {
      "ironMg": 5.9,
      "calciumMg": 320,
      "vitaminB12Mcg": 0.9,
      "zincMg": 5.9,
      "potassiumMg": 499,
      "folateMcg": 248
    }
  },
  "dn-06": {
    "prepTimeMinutes": 12,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Coastal Light",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Fresh White Fish Fillet (Steamed Rohu/Bhetki)",
        "quantity": "130g fillet",
        "category": "protein"
      },
      {
        "item": "Turmeric Powder & Mustard Paste",
        "quantity": "0.5 tsp haldi, 1 tsp mustard",
        "category": "spice"
      },
      {
        "item": "Slit Green Chillies & Ginger",
        "quantity": "2 chillies, 0.5 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Chopped Ripe Tomatoes",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Kalonji (Nigella Seeds)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Steamed Brown Basmati Rice",
        "quantity": "1 cup cooked (130g)",
        "category": "grain"
      },
      {
        "item": "Fresh Coriander Leaves",
        "quantity": "1 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Rub fish fillet with turmeric, salt, and mustard paste; rest for 10 minutes.",
      "Heat mustard oil in a pan; temper with kalonji and slit green chillies until sizzling.",
      "Add chopped tomatoes and sauté for 2 minutes until soft.",
      "Add 0.75 cup water to create a light, digestive coastal broth; bring to a simmer.",
      "Slide seasoned fish into the broth. Cover tightly with a lid and steam-simmer on low heat for 7-8 minutes until fish is tender and flaky.",
      "Garnish with fresh coriander leaves.",
      "Serve hot with a cup of steamed brown basmati rice."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Mustard Seeds (Rai)",
        "activeCompound": "Allyl Isothiocyanate",
        "clinicalMechanism": "Stimulates digestive mucosal circulation and exhibits antimicrobial activity."
      },
      {
        "spiceName": "Turmeric (Haldi)",
        "activeCompound": "Curcumin",
        "clinicalMechanism": "Potent cellular antioxidant suppressing NF-kB inflammatory cascade."
      }
    ],
    "micronutrients": {
      "ironMg": 5.4,
      "calciumMg": 222,
      "vitaminB12Mcg": 0.9,
      "zincMg": 4.1,
      "potassiumMg": 499,
      "folateMcg": 179
    }
  },
  "dn-07": {
    "prepTimeMinutes": 8,
    "cookTimeMinutes": 10,
    "servings": 1,
    "cuisine": "Mumbai Street",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Farm-Fresh Whole Eggs",
        "quantity": "2 large eggs",
        "category": "protein"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 small (40g)",
        "category": "vegetable"
      },
      {
        "item": "Green Chillies & Ginger",
        "quantity": "1 chilli, 0.5 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds (Jeera)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Turmeric & Pav Bhaji Masala",
        "quantity": "0.25 tsp haldi, 0.5 tsp masala",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee or Cold-Pressed Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Multigrain Whole Wheat Phulkas",
        "quantity": "2 soft rotis",
        "category": "grain"
      },
      {
        "item": "Fresh Coriander Leaves",
        "quantity": "2 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt & Black Pepper",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Whisk 2 whole eggs with turmeric, salt, and black pepper for 1 minute until aerated.",
      "Heat ghee or oil in a cast-iron skillet. Crackle cumin seeds until aromatic.",
      "Add chopped onions, green chillies, and ginger; sauté for 3 minutes until translucent golden.",
      "Add chopped tomatoes and pav bhaji masala; sauté for 2 minutes until soft and moist.",
      "Lower flame to low-medium. Pour in the whisked eggs directly over the spiced onion-tomato mixture.",
      "Scramble gently from the edges toward the center for 90 seconds until soft, creamy, and velvety curds form.",
      "Turn off flame immediately so eggs remain moist and tender without drying out.",
      "Fold in fresh coriander leaves and serve hot with 2 multigrain phulkas."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Black Pepper (Kali Mirch)",
        "activeCompound": "Piperine",
        "clinicalMechanism": "Inhibits hepatic glucuronidation, multiplying micronutrient bioavailability up to 2000%."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 5.4,
      "calciumMg": 173,
      "vitaminB12Mcg": 0.9,
      "zincMg": 3.2,
      "potassiumMg": 480,
      "folateMcg": 152
    }
  },
  "dn-08": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "North Indian Vegan",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Yellow Split Moong Dal (Cooked Creamy)",
        "quantity": "1 katori (60g dry / 150g cooked)",
        "category": "pulse"
      },
      {
        "item": "Fresh Steamed Bottle Gourd (Lauki)",
        "quantity": "1 cup (100g steamed cubes)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 small (35g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Tomatoes",
        "quantity": "1 small (40g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds (Jeera) & Hing",
        "quantity": "0.5 tsp jeera, 1 pinch hing",
        "category": "spice"
      },
      {
        "item": "Turmeric & Coriander Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas",
        "quantity": "2 soft hot rotis",
        "category": "grain"
      },
      {
        "item": "Fresh Coriander Leaves & Lemon",
        "quantity": "1 tbsp each",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Pressure cook yellow moong dal with turmeric and rock salt for 3 whistles until soft and creamy.",
      "Steam bottle gourd (lauki) cubes separately for 5 minutes until tender.",
      "Heat oil in a kadai. Splutter cumin seeds and a pinch of hing.",
      "Add chopped onions and sauté for 3 minutes until translucent.",
      "Add chopped tomatoes and coriander powder; cook for 3 minutes until soft.",
      "Pour boiled moong dal and steamed lauki cubes into the tempered masala; simmer for 3 minutes.",
      "Turn off flame, stir in fresh lemon juice and coriander leaves.",
      "Serve hot accompanied by 2 soft whole wheat phulkas."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      },
      {
        "spiceName": "Asafoetida (Hing)",
        "activeCompound": "Ferulic Acid & Umbelliferone",
        "clinicalMechanism": "Relieves intestinal spasms and curbs colonic fermentation of oligosaccharides."
      }
    ],
    "micronutrients": {
      "ironMg": 4.8,
      "calciumMg": 101,
      "vitaminB12Mcg": 0,
      "zincMg": 2.5,
      "potassiumMg": 597,
      "folateMcg": 197
    }
  },
  "dn-09": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "Gujarati / Jain",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Fresh Malai Paneer Cubes",
        "quantity": "120g cubed",
        "category": "protein"
      },
      {
        "item": "Fresh Methi (Fenugreek) Leaves (Chopped)",
        "quantity": "1 large bowl (80g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 medium (60g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger Paste (Jain allowed)",
        "quantity": "1 tsp",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds (Jeera) & Hing",
        "quantity": "0.5 tsp jeera, 1 pinch hing",
        "category": "spice"
      },
      {
        "item": "Turmeric & Kashmiri Red Chilli Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Gluten-Free Bajra Rotis (Pearl Millet)",
        "quantity": "2 hot bajra rotis",
        "category": "grain"
      },
      {
        "item": "Rock Salt (Sendha Namak)",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Wash fresh methi leaves thoroughly in salted water, drain completely, and chop finely.",
      "Heat desi ghee in a heavy kadai. Crackle cumin seeds and a generous pinch of Jain hing.",
      "Add fresh ginger paste and slit green chillies; sauté for 30 seconds.",
      "Add chopped methi leaves and sauté on medium heat for 3 minutes until wilted and sweet-scented.",
      "Add chopped tomatoes, turmeric, and Kashmiri red chilli powder; cook for 3 minutes until tomatoes melt into a rich masala.",
      "Add fresh paneer cubes and 0.5 cup warm water; season with rock salt.",
      "Cover with lid and simmer on low flame for 4 minutes so the paneer absorbs the earthy methi flavors.",
      "Serve hot accompanied by 2 rustic gluten-free bajra rotis (pearl millet bread)."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Asafoetida (Hing)",
        "activeCompound": "Ferulic Acid & Umbelliferone",
        "clinicalMechanism": "Relieves intestinal spasms and curbs colonic fermentation of oligosaccharides."
      },
      {
        "spiceName": "Kasuri Methi (Fenugreek)",
        "activeCompound": "Trigonelline & Galactomannan",
        "clinicalMechanism": "Delays intestinal glucose absorption, smoothing glycemic spikes."
      }
    ],
    "micronutrients": {
      "ironMg": 5.4,
      "calciumMg": 173,
      "vitaminB12Mcg": 0.4,
      "zincMg": 3.2,
      "potassiumMg": 629,
      "folateMcg": 200
    }
  },
  "dn-10": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "North Indian",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Roasted Broken Wheat (Dalia)",
        "quantity": "1 katori (55g)",
        "category": "grain"
      },
      {
        "item": "Yellow Moong Dal (Split)",
        "quantity": "0.5 katori (35g)",
        "category": "pulse"
      },
      {
        "item": "Diced Mixed Vegetables (Carrots, Peas, Beans)",
        "quantity": "1 cup (80g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 small (35g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds & Ginger Juliennes",
        "quantity": "0.5 tsp jeera, 1 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Turmeric Powder & Hing",
        "quantity": "0.5 tsp haldi, 1 pinch hing",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Fresh Low-Fat Curd (Dahi)",
        "quantity": "1 small bowl (80g)",
        "category": "dairy_alt"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Rinse broken wheat and moong dal together; drain thoroughly.",
      "Heat ghee in a pressure cooker. Splutter cumin seeds, hing, and ginger juliennes.",
      "Add chopped onions and sauté for 3 minutes until translucent.",
      "Add diced mixed vegetables, turmeric, and rock salt; sauté for 1 minute.",
      "Add dalia and moong dal; pour 3 cups of water and stir well.",
      "Close cooker lid and pressure cook for 4 whistles on medium flame.",
      "Let steam release naturally; open and stir into a creamy, wholesome porridge.",
      "Serve hot with a side of fresh chilled low-fat curd."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      },
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      }
    ],
    "micronutrients": {
      "ironMg": 4.8,
      "calciumMg": 186,
      "vitaminB12Mcg": 0.4,
      "zincMg": 2.4,
      "potassiumMg": 583,
      "folateMcg": 193
    }
  },
  "dn-11": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 10,
    "servings": 1,
    "cuisine": "Healthy Asian Vegan",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Fresh Button Mushrooms (Quartered)",
        "quantity": "1 cup (90g)",
        "category": "vegetable"
      },
      {
        "item": "Organic Firm Tofu Cubes",
        "quantity": "100g cubed",
        "category": "protein"
      },
      {
        "item": "Diced Red & Green Bell Peppers",
        "quantity": "0.5 cup (50g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Sliced Garlic & Ginger",
        "quantity": "3 cloves garlic, 1 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Sesame Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Tamari / Soy Sauce & Black Pepper",
        "quantity": "1 tbsp tamari, 0.5 tsp coarse pepper",
        "category": "spice"
      },
      {
        "item": "Multigrain Whole Wheat Roti",
        "quantity": "1 soft roti",
        "category": "grain"
      },
      {
        "item": "Fresh Spring Onion Greens",
        "quantity": "2 tbsp chopped",
        "category": "vegetable"
      }
    ],
    "instructions": [
      "Heat sesame oil in a wok on high flame until shimmering.",
      "Add sliced garlic and ginger; toss for 30 seconds until fragrant.",
      "Add tofu cubes and mushrooms; stir-fry on high flame for 3 minutes until lightly browned.",
      "Add diced bell peppers; toss for 2 minutes to keep them crisp and colorful.",
      "Pour in tamari sauce and freshly cracked black pepper; toss rapidly for 30 seconds to coat evenly.",
      "Turn off heat and garnish with chopped spring onion greens.",
      "Serve hot with 1 warm multigrain roti."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      },
      {
        "spiceName": "Black Pepper (Kali Mirch)",
        "activeCompound": "Piperine",
        "clinicalMechanism": "Inhibits hepatic glucuronidation, multiplying micronutrient bioavailability up to 2000%."
      }
    ],
    "micronutrients": {
      "ironMg": 5,
      "calciumMg": 117,
      "vitaminB12Mcg": 0,
      "zincMg": 3,
      "potassiumMg": 481,
      "folateMcg": 180
    }
  },
  "dn-12": {
    "prepTimeMinutes": 12,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Healthy Comfort",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Steamed Malai Paneer Cubes",
        "quantity": "100g cubed",
        "category": "protein"
      },
      {
        "item": "Finely Diced Mixed Vegetables (Carrots, Beans, Corn, Peas)",
        "quantity": "1.5 cups (120g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Ginger & Garlic",
        "quantity": "1 tsp each",
        "category": "spice"
      },
      {
        "item": "Freshly Cracked Black Pepper",
        "quantity": "0.5 tsp coarse",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee or Olive Oil",
        "quantity": "0.5 tsp (2.5ml)",
        "category": "spice"
      },
      {
        "item": "Vegetable Herb Broth",
        "quantity": "2.5 cups clear broth",
        "category": "vegetable"
      },
      {
        "item": "Fresh Coriander Leaves & Lemon",
        "quantity": "1 tbsp each",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Heat 0.5 tsp ghee in a soup pot. Sauté minced garlic and ginger for 30 seconds.",
      "Add diced mixed vegetables and sauté on high heat for 2 minutes.",
      "Pour 2.5 cups vegetable broth and rock salt; bring to a rolling boil.",
      "Cover and simmer on low-medium flame for 8 minutes until vegetables are tender.",
      "Gently slide steamed paneer cubes into the soup; simmer for 2 minutes.",
      "Finish with freshly cracked black pepper, lemon juice, and chopped coriander.",
      "Serve steaming hot in a deep ceramic bowl for a soothing, light dinner."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Black Pepper (Kali Mirch)",
        "activeCompound": "Piperine",
        "clinicalMechanism": "Inhibits hepatic glucuronidation, multiplying micronutrient bioavailability up to 2000%."
      },
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      }
    ],
    "micronutrients": {
      "ironMg": 4,
      "calciumMg": 228,
      "vitaminB12Mcg": 0.4,
      "zincMg": 3.2,
      "potassiumMg": 444,
      "folateMcg": 152
    }
  },
  "dn-13": {
    "prepTimeMinutes": 8,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Jain Satvik",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Yellow Moong Dal (Pressure Cooked)",
        "quantity": "0.75 katori (50g dry / 130g cooked)",
        "category": "pulse"
      },
      {
        "item": "Cumin Seeds (Jeera)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Asafoetida (Hing - strict Jain grade)",
        "quantity": "1 pinch",
        "category": "spice"
      },
      {
        "item": "Fresh Ginger Juliennes",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Turmeric & Rock Salt",
        "quantity": "0.25 tsp haldi, salt to taste",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas",
        "quantity": "2 crisp phulkas",
        "category": "grain"
      },
      {
        "item": "Fresh Lemon Juice & Coriander",
        "quantity": "1 tbsp each",
        "category": "vegetable"
      }
    ],
    "instructions": [
      "Boil yellow moong dal with turmeric and rock salt in 2.5 cups water until completely dissolved and watery broth forms.",
      "Heat desi ghee in a seasoning pan. Crackle cumin seeds, ginger juliennes, and a generous pinch of Jain hing.",
      "Pour hot sizzling tadka into the moong broth; simmer for 3 minutes.",
      "Turn off flame, stir in fresh lemon juice and fresh coriander leaves.",
      "Serve hot in a soup bowl with 2 crisp whole wheat phulkas."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Asafoetida (Hing)",
        "activeCompound": "Ferulic Acid & Umbelliferone",
        "clinicalMechanism": "Relieves intestinal spasms and curbs colonic fermentation of oligosaccharides."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 4.4,
      "calciumMg": 131,
      "vitaminB12Mcg": 0.4,
      "zincMg": 2.4,
      "potassiumMg": 537,
      "folateMcg": 177
    }
  },
  "dn-14": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 12,
    "servings": 1,
    "cuisine": "High-Protein Vegan",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Nutri Soya Granules (Dry)",
        "quantity": "1 katori (45g dry / 120g rehydrated)",
        "category": "protein"
      },
      {
        "item": "Fresh Green Peas (Matar)",
        "quantity": "0.5 katori (40g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 medium (60g)",
        "category": "vegetable"
      },
      {
        "item": "Slit Green Chillies & Grated Ginger",
        "quantity": "1 chilli, 1 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds & Mustard Seeds",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Turmeric & Kashmiri Red Chilli Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Pav Bhaji Masala or Garam Masala",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Fresh Lemon Juice",
        "quantity": "1 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Fresh Chopped Coriander Leaves",
        "quantity": "2 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Whole Wheat Rotis",
        "quantity": "2 soft hot rotis",
        "category": "grain"
      }
    ],
    "instructions": [
      "Boil soya granules in 2 cups water with a pinch of rock salt for 5 minutes. Drain through a fine mesh sieve and rinse under cold water. Squeeze out all excess moisture firmly with your palms so granules absorb the spices.",
      "Heat cold-pressed mustard oil in a heavy kadai until shimmering. Splutter cumin and mustard seeds.",
      "Add finely chopped onions, slit green chillies, and grated ginger. Sauté on medium flame for 4 minutes until onions turn soft and translucent golden.",
      "Add green peas, diced tomatoes, turmeric, coriander powder, and Kashmiri red chilli powder. Sauté for 3 minutes until tomatoes soften into a glossy masala.",
      "Add the squeezed soya granules into the masala along with pav bhaji masala and 3 tablespoons of warm water.",
      "Sauté continuously on medium flame for 4-5 minutes so the soya granules absorb all the aromatic spices evenly without drying out.",
      "Turn off the flame. Drizzle freshly squeezed lemon juice and garnish generously with chopped fresh coriander leaves.",
      "Serve hot accompanied by 2 soft whole wheat rotis and fresh cucumber lemon slices."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      },
      {
        "spiceName": "Mustard Seeds (Rai)",
        "activeCompound": "Allyl Isothiocyanate",
        "clinicalMechanism": "Stimulates digestive mucosal circulation and exhibits antimicrobial activity."
      }
    ],
    "micronutrients": {
      "ironMg": 6.3,
      "calciumMg": 141,
      "vitaminB12Mcg": 0,
      "zincMg": 3.8,
      "potassiumMg": 643,
      "folateMcg": 251
    }
  },
  "dn-15": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 20,
    "servings": 1,
    "cuisine": "North Indian",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Whole Brown Masoor Lentils (Soaked 1 Hr)",
        "quantity": "1 katori (65g dry / 160g cooked)",
        "category": "pulse"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Finely Chopped Tomatoes",
        "quantity": "1 medium (60g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds & Bay Leaf",
        "quantity": "0.5 tsp jeera, 1 leaf",
        "category": "spice"
      },
      {
        "item": "Turmeric, Coriander & Garam Masala",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Steamed Basmati Rice & Cucumber Raita",
        "quantity": "1 cup rice + 1 bowl raita",
        "category": "grain"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Pressure cook soaked masoor dal with 2.5 cups water, turmeric, and rock salt for 4 whistles until tender.",
      "Heat ghee in a kadai on medium heat. Splutter cumin seeds and bay leaf.",
      "Add chopped onions and sauté for 4 minutes until golden.",
      "Add ginger-garlic paste and sauté for 1 minute.",
      "Add chopped tomatoes and coriander powder; cook for 3 minutes until oil separates.",
      "Pour in the cooked masoor dal; simmer on low flame for 5 minutes so lentils absorb the masala.",
      "Finish with garam masala and fresh coriander leaves.",
      "Serve hot with steamed basmati rice and refreshing cucumber raita."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 5.8,
      "calciumMg": 207,
      "vitaminB12Mcg": 0.4,
      "zincMg": 2.8,
      "potassiumMg": 629,
      "folateMcg": 205
    }
  },
  "dn-16": {
    "prepTimeMinutes": 20,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Tandoori Healthy",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Skinless Chicken Breast Fillet",
        "quantity": "150g clean fillet",
        "category": "protein"
      },
      {
        "item": "Hung Curd (Greek Style Dahi)",
        "quantity": "2 tbsp (30g)",
        "category": "dairy_alt"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Kashmiri Degi Mirch (Red Pepper)",
        "quantity": "1 tsp",
        "category": "spice"
      },
      {
        "item": "Kasuri Methi & Garam Masala",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Cucumber Mint Salad with Lemon",
        "quantity": "1 large bowl (80g)",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Whisk hung curd with mustard oil, ginger-garlic paste, degi mirch, kasuri methi, garam masala, and rock salt into a rich tandoori marinade.",
      "Make light diagonal scores across the chicken breast and coat thoroughly with marinade; rest for 20 minutes.",
      "Heat a grill pan on medium-high heat until hot.",
      "Place marinated chicken breast in pan; sear for 4 minutes on high heat to create charred grill marks.",
      "Flip and sear the other side for 3 minutes.",
      "Lower flame, cover with lid, and cook for 4-5 minutes until chicken is juicy and reaches 75°C internal temperature.",
      "Rest for 3 minutes, then slice across grain.",
      "Serve hot with a crisp cucumber mint salad and lemon wedges."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Black Pepper (Kali Mirch)",
        "activeCompound": "Piperine",
        "clinicalMechanism": "Inhibits hepatic glucuronidation, multiplying micronutrient bioavailability up to 2000%."
      }
    ],
    "micronutrients": {
      "ironMg": 5,
      "calciumMg": 334,
      "vitaminB12Mcg": 0.9,
      "zincMg": 6.2,
      "potassiumMg": 462,
      "folateMcg": 224
    }
  },
  "dn-17": {
    "prepTimeMinutes": 20,
    "cookTimeMinutes": 35,
    "servings": 1,
    "cuisine": "Kashmiri",
    "difficulty": "Advanced",
    "ingredients": [
      {
        "item": "Lean Trimmed Mutton Cuts",
        "quantity": "140g lean pieces",
        "category": "protein"
      },
      {
        "item": "Fresh Low-Fat Curd (Dahi)",
        "quantity": "2 tbsp (30g whisked)",
        "category": "dairy_alt"
      },
      {
        "item": "Kashmiri Degi Mirch Powder",
        "quantity": "1.5 tsp (for signature scarlet hue)",
        "category": "spice"
      },
      {
        "item": "Fennel Powder (Saunf)",
        "quantity": "1 tsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Dry Ginger Powder (Sonth)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Whole Spices: Black Cardamom, Cloves, Cinnamon",
        "quantity": "1 cardamom, 2 cloves, 1 stick",
        "category": "spice"
      },
      {
        "item": "Asafoetida (Hing) & Cumin",
        "quantity": "1 pinch hing, 0.5 tsp jeera",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas",
        "quantity": "2 soft rotis",
        "category": "grain"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Heat mustard oil in a heavy handi until smoking point, then cool slightly.",
      "Crackle black cardamom, cloves, cinnamon, and a pinch of hing.",
      "Add lean mutton pieces and sear on high heat for 5 minutes until browned on all sides (bhunai phase).",
      "Lower flame; whisk Kashmiri degi mirch with 2 tbsp water and pour into the handi, stirring rapidly so the meat turns deep crimson.",
      "Gradually whisk in the curd on low heat to prevent curdling.",
      "Add freshly ground fennel powder (saunf) and dry ginger powder (sonth); season with rock salt.",
      "Add 1 cup warm water, cover with a tight lid, and simmer on gentle low flame (or pressure cook for 5 whistles) until mutton is melt-in-the-mouth tender.",
      "Let the rich rogan (aromatic spice oil) rise to the surface.",
      "Serve piping hot with 2 soft whole wheat phulkas."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Fennel (Saunf)",
        "activeCompound": "Anethole",
        "clinicalMechanism": "Relaxes digestive smooth muscle, preventing intestinal cramping and spasms."
      },
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      }
    ],
    "micronutrients": {
      "ironMg": 5.4,
      "calciumMg": 264,
      "vitaminB12Mcg": 0.9,
      "zincMg": 4.9,
      "potassiumMg": 582,
      "folateMcg": 202
    }
  },
  "dn-18": {
    "prepTimeMinutes": 12,
    "cookTimeMinutes": 12,
    "servings": 1,
    "cuisine": "Coastal Fusion",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Fresh Rawas Fillet (Indian Salmon)",
        "quantity": "130g clean fillet",
        "category": "protein"
      },
      {
        "item": "Turmeric Powder & Fresh Lemon Juice",
        "quantity": "0.5 tsp haldi, 1 tbsp lemon",
        "category": "spice"
      },
      {
        "item": "Cracked Black Pepper (Kali Mirch)",
        "quantity": "0.5 tsp freshly crushed",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil or Coconut Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Sautéed Seasonal Vegetables (Beans, Carrots, Capsicum)",
        "quantity": "1 large cup (100g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Coriander Leaves",
        "quantity": "1 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Rub rawas fillet with turmeric, cracked black pepper, salt, and lemon juice; rest for 10 minutes.",
      "Heat oil in a heavy cast-iron skillet on medium-high heat until shimmering.",
      "Place rawas skin-side down; sear for 3 minutes without moving until a golden crust forms.",
      "Flip gently and cook the flesh side for 2.5 minutes until opaque and flaky.",
      "Transfer fish to a warm plate.",
      "In the same skillet, toss sliced beans, carrots, and capsicum with a pinch of pepper for 3 minutes until crisp-tender.",
      "Plate the pan-seared rawas over the colorful sautéed vegetables.",
      "Serve hot with a squeeze of fresh lemon juice."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Black Pepper (Kali Mirch)",
        "activeCompound": "Piperine",
        "clinicalMechanism": "Inhibits hepatic glucuronidation, multiplying micronutrient bioavailability up to 2000%."
      },
      {
        "spiceName": "Turmeric (Haldi)",
        "activeCompound": "Curcumin",
        "clinicalMechanism": "Potent cellular antioxidant suppressing NF-kB inflammatory cascade."
      }
    ],
    "micronutrients": {
      "ironMg": 5.4,
      "calciumMg": 292,
      "vitaminB12Mcg": 0.9,
      "zincMg": 5.4,
      "potassiumMg": 526,
      "folateMcg": 217
    }
  },
  "dn-19": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 20,
    "servings": 1,
    "cuisine": "Mughlai",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Skinless Chicken Breast Cubes",
        "quantity": "140g cubed",
        "category": "protein"
      },
      {
        "item": "Red Onions (Stage 1: Finely Sliced)",
        "quantity": "1 medium (50g for bhunai)",
        "category": "vegetable"
      },
      {
        "item": "Red Onions (Stage 2: Cubed Petals)",
        "quantity": "1 small (40g added later)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Vine-Ripened Tomato Puree",
        "quantity": "1 medium (60g)",
        "category": "vegetable"
      },
      {
        "item": "Whole Spices: Bay Leaf, Cardamom, Cloves",
        "quantity": "1 leaf, 2 pods, 2 cloves",
        "category": "spice"
      },
      {
        "item": "Coriander Powder & Garam Masala",
        "quantity": "1 tsp dhaniya, 0.5 tsp garam masala",
        "category": "spice"
      },
      {
        "item": "Kasuri Methi (Fenugreek Leaves)",
        "quantity": "1 tsp crushed",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Multigrain Whole Wheat Rotis",
        "quantity": "2 soft rotis",
        "category": "grain"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Heat mustard oil in a heavy kadai until smoking hot, then reduce flame.",
      "Crackle whole spices: bay leaf, cardamom, and cloves.",
      "Add Stage 1 sliced onions; sauté for 7 minutes until rich golden-brown (bhunai phase).",
      "Add ginger-garlic paste and sauté for 1 minute.",
      "Add tomato puree, coriander powder, turmeric, and Kashmiri red chilli powder. Cook until oil separates.",
      "Add chicken cubes; sear on high heat for 3 minutes to seal juices.",
      "Add 0.5 cup warm water and rock salt; cover and simmer on low flame for 10 minutes until chicken is tender.",
      "Add Stage 2 onion petals; toss for 3 minutes so onions absorb gravy while retaining crunchy bite (the signature Do Pyaza style).",
      "Finish with crushed kasuri methi and garam masala; serve hot with 2 multigrain rotis."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Green Cardamom (Elaichi)",
        "activeCompound": "Terpinyl Acetate",
        "clinicalMechanism": "Promotes arterial vasodilation and mitigates gastrointestinal acid reflux."
      }
    ],
    "micronutrients": {
      "ironMg": 5.9,
      "calciumMg": 292,
      "vitaminB12Mcg": 0.9,
      "zincMg": 5.4,
      "potassiumMg": 573,
      "folateMcg": 233
    }
  },
  "dn-20": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Dhaba",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Farm-Fresh Boiled Eggs",
        "quantity": "2 whole eggs",
        "category": "protein"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Vine-Ripened Tomato Puree",
        "quantity": "1 medium (60g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds & Bay Leaf",
        "quantity": "0.5 tsp jeera, 1 leaf",
        "category": "spice"
      },
      {
        "item": "Turmeric, Coriander & Garam Masala",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Gluten-Free Jowar Rotis (Sorghum)",
        "quantity": "2 rustic jowar bhakris",
        "category": "grain"
      },
      {
        "item": "Kasuri Methi & Fresh Coriander",
        "quantity": "1 tsp methi, 1 tbsp coriander",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Boil eggs for 9 minutes, peel, and make 3 vertical slits.",
      "Sear eggs in 0.5 tsp hot oil with turmeric for 2 minutes until golden blistered skin forms; set aside.",
      "In the same pan, heat remaining oil. Crackle cumin seeds and bay leaf.",
      "Add chopped onions and sauté for 5 minutes until deep golden brown.",
      "Add ginger-garlic paste and sauté for 1 minute.",
      "Add tomato puree, coriander powder, and red chilli powder; cook for 4 minutes until oil separates.",
      "Add 0.5 cup warm water to create a clinging spicy gravy; slide in the seared eggs.",
      "Simmer covered on low heat for 4 minutes so gravy infuses the eggs.",
      "Finish with crushed kasuri methi and fresh coriander; serve hot with 2 jowar rotis."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Coriander (Dhaniya)",
        "activeCompound": "Linalool",
        "clinicalMechanism": "Displays spasmolytic and carminative actions, reducing abdominal bloating."
      }
    ],
    "micronutrients": {
      "ironMg": 6.3,
      "calciumMg": 180,
      "vitaminB12Mcg": 0.9,
      "zincMg": 3.3,
      "potassiumMg": 555,
      "folateMcg": 188
    }
  },
  "dn-21": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 20,
    "servings": 1,
    "cuisine": "North Indian",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Skinless Chicken Breast Cubes",
        "quantity": "140g clean cubes",
        "category": "protein"
      },
      {
        "item": "Fresh Methi (Fenugreek) Leaves (Chopped)",
        "quantity": "1 large bowl (80g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Low-Fat Curd (Dahi)",
        "quantity": "2 tbsp (30g)",
        "category": "dairy_alt"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Whole Spices: Bay Leaf, Cardamom, Cloves",
        "quantity": "1 leaf, 2 pods, 2 cloves",
        "category": "spice"
      },
      {
        "item": "Coriander Powder & Garam Masala",
        "quantity": "1 tsp dhaniya, 0.5 tsp masala",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas",
        "quantity": "2 soft rotis",
        "category": "grain"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Marinate chicken cubes with curd, turmeric, half the ginger-garlic paste, and rock salt for 15 minutes.",
      "Heat mustard oil in a heavy kadai until smoking hot. Crackle whole spices.",
      "Add chopped onions and sauté for 5 minutes until golden brown.",
      "Add remaining ginger-garlic paste and sauté for 1 minute.",
      "Add chopped fresh methi leaves and sauté for 3 minutes until aromatic and wilted.",
      "Add marinated chicken cubes; sear on high heat for 3 minutes to seal juices.",
      "Add coriander powder, garam masala, and 0.5 cup warm water; stir well.",
      "Cover with lid and simmer on low-medium flame for 12 minutes until chicken is tender and curry turns rich.",
      "Garnish with fresh coriander and serve hot with 2 whole wheat phulkas."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Green Cardamom (Elaichi)",
        "activeCompound": "Terpinyl Acetate",
        "clinicalMechanism": "Promotes arterial vasodilation and mitigates gastrointestinal acid reflux."
      }
    ],
    "micronutrients": {
      "ironMg": 6.3,
      "calciumMg": 285,
      "vitaminB12Mcg": 0.9,
      "zincMg": 5.3,
      "potassiumMg": 573,
      "folateMcg": 245
    }
  },
  "dn-22": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Coastal",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "White Fish Tikka Cubes (Rohu/Pomfret)",
        "quantity": "130g cubed",
        "category": "protein"
      },
      {
        "item": "Light Coconut Milk",
        "quantity": "0.5 cup (100ml)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 small (40g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tsp",
        "category": "spice"
      },
      {
        "item": "Kashmiri Red Chilli & Coriander Seeds",
        "quantity": "1 tsp chilli, 0.5 tsp ground seeds",
        "category": "spice"
      },
      {
        "item": "Tamarind Pulp or Kokum",
        "quantity": "1 tbsp soaked",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Coconut Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Steamed Brown Basmati Rice",
        "quantity": "1 cup cooked (130g)",
        "category": "grain"
      },
      {
        "item": "Fresh Coriander Leaves",
        "quantity": "1 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Pan-sear fish tikka cubes with turmeric in 0.5 tsp coconut oil for 2 minutes until lightly crusted; set aside.",
      "Heat remaining oil in the pan; sauté chopped onions for 3 minutes until translucent.",
      "Add ginger-garlic paste and ground spices; sauté for 1 minute until fragrant.",
      "Add tamarind pulp and light coconut milk; bring to a gentle simmer.",
      "Slide seared fish tikka cubes into the simmering coconut gravy.",
      "Cover and simmer on low heat for 5 minutes until fish is cooked through and tender.",
      "Garnish with fresh coriander leaves.",
      "Serve hot accompanied by a bowl of steamed brown rice."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Coriander (Dhaniya)",
        "activeCompound": "Linalool",
        "clinicalMechanism": "Displays spasmolytic and carminative actions, reducing abdominal bloating."
      },
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      }
    ],
    "micronutrients": {
      "ironMg": 5,
      "calciumMg": 278,
      "vitaminB12Mcg": 0.9,
      "zincMg": 5.1,
      "potassiumMg": 526,
      "folateMcg": 193
    }
  },
  "dn-23": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 20,
    "servings": 1,
    "cuisine": "Awadhi",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Lean Chicken Mince (Keema)",
        "quantity": "120g ground lean breast",
        "category": "protein"
      },
      {
        "item": "Aged Brown Basmati Rice (Soaked)",
        "quantity": "1 katori (60g dry)",
        "category": "grain"
      },
      {
        "item": "Fresh Green Peas (Matar)",
        "quantity": "0.5 katori (40g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Sliced Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Ginger-Garlic Paste",
        "quantity": "1 tbsp freshly ground",
        "category": "spice"
      },
      {
        "item": "Whole Spices: Cinnamon, Cardamom, Cloves, Bay Leaf",
        "quantity": "1 stick, 2 pods, 2 cloves, 1 leaf",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Fresh Mint & Coriander Leaves",
        "quantity": "2 tbsp each chopped",
        "category": "vegetable"
      },
      {
        "item": "Cucumber Kachumber Salad",
        "quantity": "1 small bowl (60g)",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Rinse brown basmati rice and soak in room temperature water for 30 minutes.",
      "Heat ghee in a pressure cooker on medium flame. Crackle whole spices until aromatic.",
      "Add sliced onions and sauté for 5 minutes until golden brown.",
      "Add ginger-garlic paste and sauté for 1 minute.",
      "Add minced chicken and green peas; sear on high heat for 3 minutes, breaking up keema with spatula.",
      "Drain soaked rice and add to the cooker with mint, coriander, and rock salt; toss gently for 1 minute.",
      "Add 1.5 cups water, stir well, and close cooker lid with weight.",
      "Cook on medium flame for 3 whistles, then simmer on low for 5 minutes.",
      "Let steam release naturally; fluff with a fork and serve hot with cucumber kachumber salad."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Green Cardamom (Elaichi)",
        "activeCompound": "Terpinyl Acetate",
        "clinicalMechanism": "Promotes arterial vasodilation and mitigates gastrointestinal acid reflux."
      },
      {
        "spiceName": "Cinnamon (Dalchini)",
        "activeCompound": "Cinnamaldehyde",
        "clinicalMechanism": "Activates insulin receptor kinase, improving cellular glucose uptake."
      }
    ],
    "micronutrients": {
      "ironMg": 5.9,
      "calciumMg": 264,
      "vitaminB12Mcg": 0.9,
      "zincMg": 4.9,
      "potassiumMg": 610,
      "folateMcg": 218
    }
  },
  "dn-24": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 25,
    "servings": 1,
    "cuisine": "Punjabi",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Fresh Mustard Greens (Sarson Ke Patte)",
        "quantity": "1 large bunch (150g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Spinach & Bathua Leaves",
        "quantity": "0.5 bunch each (100g combined)",
        "category": "vegetable"
      },
      {
        "item": "Makki Ka Atta (Maize Flour - for binding)",
        "quantity": "1.5 tbsp (20g)",
        "category": "grain"
      },
      {
        "item": "Finely Chopped Garlic & Ginger",
        "quantity": "1 tbsp each finely chopped",
        "category": "spice"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Makki Di Roti (Maize Flatbread)",
        "quantity": "1 rustic yellow maize roti",
        "category": "grain"
      },
      {
        "item": "Desi Cow Ghee (for tadka & topping)",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Fresh Green Chilli & Radish Salad",
        "quantity": "1 chilli, sliced radish",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Wash sarson, spinach, and bathua leaves thoroughly 3 times to remove all grit; chop coarsely.",
      "Pressure cook greens with ginger, garlic, green chillies, and 1 cup water for 3 whistles until completely tender.",
      "Whisk cooked greens vigorously with a wooden churner (mathani) or pulse briefly into a coarse rustic mash.",
      "Sprinkle makki ka atta into the hot greens while stirring continuously; simmer on low heat for 8 minutes to cook maize flour into a rich velvety texture.",
      "In a separate kadai, heat desi ghee on medium heat. Sauté chopped onions until golden brown.",
      "Add chopped tomatoes and sauté for 3 minutes until oil separates.",
      "Pour the churned saag into the tadka; simmer on low flame for 5 minutes.",
      "Serve steaming hot topped with a dab of desi ghee, alongside warm rustic Makki Di Roti and green chilli."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Ginger (Adrak)",
        "activeCompound": "6-Gingerol & Shogaols",
        "clinicalMechanism": "Stimulates gastric motility, accelerating postprandial gastric clearance."
      }
    ],
    "micronutrients": {
      "ironMg": 4.8,
      "calciumMg": 165,
      "vitaminB12Mcg": 0.4,
      "zincMg": 2,
      "potassiumMg": 583,
      "folateMcg": 182
    }
  },
  "dn-25": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 20,
    "servings": 1,
    "cuisine": "Rajasthani / Jain",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Panchmel Dal (5 Lentil Blend: Moong, Toor, Chana, Masoor, Urad)",
        "quantity": "1 katori (65g dry / 160g cooked)",
        "category": "pulse"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 medium (60g)",
        "category": "vegetable"
      },
      {
        "item": "Cumin Seeds & Dry Kashmiri Red Chilli",
        "quantity": "0.5 tsp jeera, 1 dry chilli",
        "category": "spice"
      },
      {
        "item": "Asafoetida (Hing - strict Jain grade)",
        "quantity": "1 pinch",
        "category": "spice"
      },
      {
        "item": "Fresh Ginger Paste & Green Chilli",
        "quantity": "0.5 tsp ginger, 1 chilli slit",
        "category": "spice"
      },
      {
        "item": "Turmeric & Coriander Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas & Steamed Cabbage",
        "quantity": "2 phulkas + cabbage sabzi",
        "category": "grain"
      },
      {
        "item": "Rock Salt (Sendha Namak)",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Rinse 5 lentils together; pressure cook with 2.5 cups water, turmeric, and rock salt for 4 whistles until completely tender.",
      "Heat desi ghee in a kadai on medium flame. Splutter cumin seeds, dry red chilli, and a generous pinch of Jain hing.",
      "Add fresh ginger paste and slit green chilli; sauté for 30 seconds.",
      "Add chopped tomatoes and coriander powder; cook for 3 minutes until tomatoes melt into a rich masala.",
      "Pour boiled panchmel dal into the tempered masala; simmer on low heat for 5 minutes.",
      "Finish with fresh lemon juice and chopped coriander leaves.",
      "Serve hot with 2 soft phulkas and steamed cabbage sabzi."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Asafoetida (Hing)",
        "activeCompound": "Ferulic Acid & Umbelliferone",
        "clinicalMechanism": "Relieves intestinal spasms and curbs colonic fermentation of oligosaccharides."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 6.3,
      "calciumMg": 152,
      "vitaminB12Mcg": 0.4,
      "zincMg": 2.8,
      "potassiumMg": 620,
      "folateMcg": 221
    }
  },
  "dn-26": {
    "prepTimeMinutes": 12,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "North Indian Vegan",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Yellow Split Moong Dal (Boiled Creamy)",
        "quantity": "1 katori (60g dry / 150g cooked)",
        "category": "pulse"
      },
      {
        "item": "Fresh Tender Okra (Bhindi Sautéed)",
        "quantity": "1 cup (80g sliced)",
        "category": "vegetable"
      },
      {
        "item": "Finely Sliced Garlic & Cumin Seeds",
        "quantity": "3 cloves garlic, 0.5 tsp jeera",
        "category": "spice"
      },
      {
        "item": "Whole Dried Kashmiri Red Chilli",
        "quantity": "1 whole pod",
        "category": "spice"
      },
      {
        "item": "Turmeric Powder & Amchur",
        "quantity": "0.5 tsp haldi, 0.25 tsp amchur",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1.5 tsp (7ml for dal & bhindi)",
        "category": "spice"
      },
      {
        "item": "Steamed Brown Basmati Rice",
        "quantity": "1 cup cooked (130g)",
        "category": "grain"
      },
      {
        "item": "Fresh Coriander Leaves",
        "quantity": "1 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Pressure cook yellow moong dal with turmeric and rock salt for 3 whistles until soft and creamy.",
      "In a skillet, sauté sliced bhindi in 0.5 tsp mustard oil with amchur for 6 minutes until tender and crisp; set aside.",
      "In a tadka pan, heat remaining mustard oil until hot. Crackle cumin seeds, dried red chilli, and sliced garlic until golden.",
      "Pour sizzling hot garlic tadka immediately into the simmering moong dal.",
      "Serve piping hot yellow dal over steamed brown basmati rice accompanied by crisp sautéed bhindi."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Mustard Seeds (Rai)",
        "activeCompound": "Allyl Isothiocyanate",
        "clinicalMechanism": "Stimulates digestive mucosal circulation and exhibits antimicrobial activity."
      }
    ],
    "micronutrients": {
      "ironMg": 4.8,
      "calciumMg": 105,
      "vitaminB12Mcg": 0,
      "zincMg": 2.7,
      "potassiumMg": 638,
      "folateMcg": 201
    }
  },
  "dn-27": {
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 18,
    "servings": 1,
    "cuisine": "Punjabi / Rajasthani Vegan",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Large Eggplant (Bharta Baingan - Roasted)",
        "quantity": "1 large (250g raw / 150g pulp)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 large (60g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "2 medium (100g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Green Chillies & Garlic Cloves",
        "quantity": "2 chillies, 3 cloves garlic",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds (Jeera)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Turmeric & Kashmiri Red Chilli Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Mustard Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Gluten-Free Bajra Rotis (Pearl Millet)",
        "quantity": "2 rustic bajra rotis",
        "category": "grain"
      },
      {
        "item": "Fresh Chopped Coriander Leaves",
        "quantity": "2 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Slit eggplant, insert garlic cloves and green chilli, and roast over open gas flame for 10-12 minutes until skin is charred black and flesh is tender.",
      "Peel charred skin under cold water; mash smoky pulp thoroughly with a fork.",
      "Heat mustard oil in a heavy kadai until smoking hot, then lower heat.",
      "Crackle cumin seeds and sauté chopped onions for 5 minutes until golden brown.",
      "Add chopped tomatoes, turmeric, and chilli powder; sauté for 4 minutes until a luscious bhuna masala forms.",
      "Add mashed smoky eggplant pulp into the kadai.",
      "Bhunai phase: Sauté continuously on medium flame for 5 minutes so the smoky flavors marry with the spiced masala.",
      "Garnish with fresh coriander and serve hot with 2 rustic gluten-free bajra rotis."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Garlic (Lahsun)",
        "activeCompound": "Allicin",
        "clinicalMechanism": "Inhibits ACE and promotes vascular nitric oxide release, aiding blood pressure control."
      },
      {
        "spiceName": "Mustard Seeds (Rai)",
        "activeCompound": "Allyl Isothiocyanate",
        "clinicalMechanism": "Stimulates digestive mucosal circulation and exhibits antimicrobial activity."
      }
    ],
    "micronutrients": {
      "ironMg": 5.8,
      "calciumMg": 81,
      "vitaminB12Mcg": 0,
      "zincMg": 1.9,
      "potassiumMg": 630,
      "folateMcg": 210
    }
  },
  "dn-28": {
    "prepTimeMinutes": 12,
    "cookTimeMinutes": 15,
    "servings": 1,
    "cuisine": "Healthy Fusion Vegan",
    "difficulty": "Medium",
    "ingredients": [
      {
        "item": "Organic Firm Tofu Cubes",
        "quantity": "120g bite-sized cubes",
        "category": "protein"
      },
      {
        "item": "Diced Green & Red Bell Peppers (Capsicum)",
        "quantity": "1 katori (70g cubed in squares)",
        "category": "vegetable"
      },
      {
        "item": "Sliced Red Onion Petals",
        "quantity": "1 medium (50g cubed)",
        "category": "vegetable"
      },
      {
        "item": "Vine-Ripened Tomato Puree",
        "quantity": "2 medium tomatoes (100g pureed)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Kadai Masala (Freshly Ground)",
        "quantity": "1 tbsp (coarse roasted coriander, dry red chilli, fennel, black pepper)",
        "category": "spice"
      },
      {
        "item": "Fresh Ginger Juliennes & Slit Green Chillies",
        "quantity": "1 tsp ginger, 1 chilli",
        "category": "spice"
      },
      {
        "item": "Turmeric & Kashmiri Red Chilli Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Kasuri Methi (Fenugreek Leaves)",
        "quantity": "1 tsp crushed",
        "category": "spice"
      },
      {
        "item": "Cold-Pressed Sesame or Mustard Oil",
        "quantity": "1.5 tsp (7ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Rotis",
        "quantity": "2 soft whole wheat rotis",
        "category": "grain"
      },
      {
        "item": "Fresh Chopped Coriander Leaves",
        "quantity": "2 tbsp",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt (Sendha Namak)",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Dry-roast whole coriander seeds, dry Kashmiri red chillies, fennel seeds, and black peppercorns on low heat; coarsely crush in a mortar-pestle into authentic aromatic Kadai Masala.",
      "Heat 0.5 tsp oil in a wide kadai. Flash-sear diced bell peppers and onion petals on high flame for 2 minutes to retain their crunch and vibrant color; transfer to a plate.",
      "Lightly pan-sear tofu cubes with a pinch of turmeric for 2 minutes until golden on the edges; set aside.",
      "Add remaining oil to the kadai. Sauté ginger juliennes and slit green chillies for 30 seconds.",
      "Pour in fresh tomato puree, turmeric, red chilli powder, and half the crushed Kadai Masala. Sauté on medium flame until thick and oil separates from the edges.",
      "Add 3-4 tablespoons warm water to create a luscious semi-dry clinging gravy; season with rock salt.",
      "Gently fold in the seared tofu cubes, crunchy bell peppers, and onion petals. Simmer on low flame for 3 minutes so the spices infuse without making vegetables soggy.",
      "Crush kasuri methi over the dish, sprinkle remaining Kadai Masala, garnish with ginger juliennes and fresh coriander, and serve hot with 2 whole wheat rotis."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Coriander (Dhaniya)",
        "activeCompound": "Linalool",
        "clinicalMechanism": "Displays spasmolytic and carminative actions, reducing abdominal bloating."
      },
      {
        "spiceName": "Fennel (Saunf)",
        "activeCompound": "Anethole",
        "clinicalMechanism": "Relaxes digestive smooth muscle, preventing intestinal cramping and spasms."
      }
    ],
    "micronutrients": {
      "ironMg": 5.4,
      "calciumMg": 133,
      "vitaminB12Mcg": 0,
      "zincMg": 3.6,
      "potassiumMg": 574,
      "folateMcg": 212
    }
  },
  "dn-29": {
    "prepTimeMinutes": 10,
    "cookTimeMinutes": 12,
    "servings": 1,
    "cuisine": "Dhaba Punjabi",
    "difficulty": "Easy",
    "ingredients": [
      {
        "item": "Fresh Malai Paneer (Crumbled)",
        "quantity": "120g fresh paneer",
        "category": "protein"
      },
      {
        "item": "Finely Chopped Red Onions",
        "quantity": "1 medium (50g)",
        "category": "vegetable"
      },
      {
        "item": "Finely Chopped Vine Tomatoes",
        "quantity": "1 large (60g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Green Chillies & Grated Ginger",
        "quantity": "2 chillies, 1 tsp ginger",
        "category": "spice"
      },
      {
        "item": "Cumin Seeds (Jeera)",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Turmeric & Kashmiri Red Chilli Powder",
        "quantity": "0.5 tsp each",
        "category": "spice"
      },
      {
        "item": "Pav Bhaji Masala or Garam Masala",
        "quantity": "0.5 tsp",
        "category": "spice"
      },
      {
        "item": "Kasuri Methi (Fenugreek Leaves)",
        "quantity": "1 tsp crushed",
        "category": "spice"
      },
      {
        "item": "Desi Cow Ghee or Cold-Pressed Oil",
        "quantity": "1 tsp (5ml)",
        "category": "spice"
      },
      {
        "item": "Whole Wheat Phulkas",
        "quantity": "2 soft hot rotis",
        "category": "grain"
      },
      {
        "item": "Cucumber Tomato Kachumber Salad",
        "quantity": "1 small bowl (60g)",
        "category": "vegetable"
      },
      {
        "item": "Fresh Coriander Leaves & Lemon",
        "quantity": "1 tbsp each",
        "category": "vegetable"
      },
      {
        "item": "Rock Salt",
        "quantity": "To taste",
        "category": "spice"
      }
    ],
    "instructions": [
      "Hand-crumble fresh paneer with your fingers into soft, uneven bite-sized curds (do not grate to preserve authentic dhaba texture).",
      "Heat ghee or oil in a cast-iron skillet on medium flame. Crackle cumin seeds until aromatic.",
      "Add finely chopped onions, green chillies, and grated ginger. Sauté on medium flame for 4 minutes until onions turn soft and translucent golden.",
      "Add chopped tomatoes, turmeric, Kashmiri red chilli powder, and a pinch of rock salt.",
      "Sauté on medium flame for 3 minutes, pressing tomatoes with the spatula until soft and mushy.",
      "Add pav bhaji masala and 2 tablespoons of warm water; stir to create a rich, moist masala base.",
      "Fold in the crumbled paneer gently. Toss on medium-low flame for exactly 2 minutes so the paneer absorbs flavors while staying soft and tender (avoid overcooking).",
      "Turn off heat immediately. Rub kasuri methi between palms and crush over the bhurji with fresh lemon juice and coriander.",
      "Serve steaming hot with 2 soft phulkas and fresh cucumber tomato kachumber salad."
    ],
    "spiceBenefits": [
      {
        "spiceName": "Kasuri Methi (Fenugreek)",
        "activeCompound": "Trigonelline & Galactomannan",
        "clinicalMechanism": "Delays intestinal glucose absorption, smoothing glycemic spikes."
      },
      {
        "spiceName": "Cumin (Jeera)",
        "activeCompound": "Cuminaldehyde & Thymol",
        "clinicalMechanism": "Stimulates pancreatic lipase and bile flow for smooth lipid metabolism."
      }
    ],
    "micronutrients": {
      "ironMg": 4.5,
      "calciumMg": 242,
      "vitaminB12Mcg": 0.4,
      "zincMg": 3.4,
      "potassiumMg": 564,
      "folateMcg": 176
    }
  }
};

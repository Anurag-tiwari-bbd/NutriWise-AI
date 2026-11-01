# NutriWise AI — System Architecture & Clinical Engineering Guide

**Clinical Nutrition Engineering | UN Sustainable Development Goal 3: Good Health and Well-being (Target 3.4)**  
**Project Title:** NutriWise AI — AI-Based Personalized Nutrition Recommendation Engine  
**Target Audience:** Clinical Informatics Engineers, Nutritionists, Peer Reviewers & Technical Architects

---

## 🎯 Executive Project Summary

NutriWise AI is a client-side, evidence-based clinical decision support and nutrition recommendation web application designed specifically for Indian physiological profiles and dietary lifestyles. 

Unlike black-box generative models (LLMs) that introduce risks of hallucination, inaccurate caloric values, or non-deterministic safety oversights, NutriWise AI implements an **expert-system deterministic rule engine** coupled with the clinically validated **Mifflin-St Jeor (1990)** predictive metabolic model and **ICMR-NIN 2020** nutritional standards.

---

## 📋 Top 12 Technical & Clinical Architecture Questions & Answers

### Q1: Why did you choose a deterministic rule-based expert system over a generative Large Language Model (LLM)?
**Answer:**  
In clinical healthcare and metabolic nutrition, **zero hallucination, mathematical determinism, and patient safety** are paramount. 
1. **Clinical Safety Ceilings:** Generative models can recommend high-glycemic or high-sodium foods to a diabetic or hypertensive patient due to probabilistic text generation. A deterministic expert system enforces hard safety ceilings ($\text{GI} \le 55$, sodium $< 2,000\text{ mg/day}$) with 100% mathematical guarantee.
2. **Computational Reproducibility:** Given identical biometrics, the system will always yield the exact same caloric requirement, making it auditable for clinical research.
3. **Privacy & Offline Independence:** It runs 100% client-side with zero external API latency, zero token costs, and complete protection of sensitive patient health biometrics.

---

### Q2: Why is the Mifflin-St Jeor equation selected over the classic Harris-Benedict (1919) equation?
**Answer:**  
Extensive validation studies published in the *Journal of the American Dietetic Association (Frankenfield et al., 2005)* demonstrated that the Mifflin-St Jeor equation is the most reliable predictive model for resting metabolic rate in modern populations, predicting BMR within $\pm 10\%$ of indirect calorimetry in $82\%$ of non-obese and $70\%$ of obese individuals. The Harris-Benedict equation tends to overestimate caloric requirements by $5\%$ to $15\%$ in contemporary sedentary lifestyles.

$$\text{BMR}_{\text{male}} = 10 \times W_{\text{kg}} + 6.25 \times H_{\text{cm}} - 5 \times A_{\text{yrs}} + 5$$
$$\text{BMR}_{\text{female}} = 10 \times W_{\text{kg}} + 6.25 \times H_{\text{cm}} - 5 \times A_{\text{yrs}} - 161$$

---

### Q3: How are metabolic safety floors enforced to prevent malnutrition or metabolic crash?
**Answer:**  
NutriWise AI implements an automated **Metabolic Floor Clamping Mechanism**:
- For biological females: Absolute minimum caloric intake is clamped at **$1,200\text{ kcal/day}$**.
- For biological males: Absolute minimum caloric intake is clamped at **$1,500\text{ kcal/day}$**.
Even if an extreme caloric deficit is mathematically requested, the engine clamps the target to these physiological thresholds, preventing adaptive thermogenesis, muscle catabolism, micronutrient depletion, and gallstone formation.

---

### Q4: How does the system adapt to India's unique diabetes crisis (UN SDG Target 3.4)?
**Answer:**  
According to the ICMR-INDIAB study, over 77 million Indian adults suffer from Type 2 Diabetes, characterized by early-onset beta-cell dysfunction and visceral adiposity. When the "Diabetes" caution is active:
1. Every meal is restricted to a **Low or Medium Glycemic Index ($\text{GI} \le 55$)**.
2. High-GI refined carbohydrates (maida, sabudana, white sugar) are strictly filtered out.
3. Meals prioritize soluble dietary fiber ($\ge 30\text{g/day}$) from pulses, millets, and vegetables, which forms a viscous gel in the small intestine, slowing carbohydrate hydrolysis and preventing postprandial glucose spikes.

---

### Q5: How is the DASH diet adapted to traditional Indian cooking for hypertension?
**Answer:**  
Average daily salt consumption in urban and rural India exceeds $10\text{g/day}$ (double the WHO recommendation of $< 5\text{g/day}$, equivalent to $< 2,000\text{mg}$ sodium). The NutriWise DASH protocol:
1. Enforces an aggregate sodium cap of **$< 2,000\text{ mg/day}$**.
2. Excludes processed papads, commercial pickles (*achaar*), and sodium-heavy packaged namkeens.
3. Promotes bioavailable potassium and magnesium from fresh spinach (*palak*), bottle gourd (*lauki*), and lentils to relax vascular smooth muscle and balance fluid dynamics.

---

### Q6: How does the Cultural & Religious Fasting Adaptation Engine work without causing nutritional deficit?
**Answer:**  
Millions of Indians observe religious fasts (Navratri, Ekadashi, Shravan, Ramadan). Typically, fasting leads either to starvation or bingeing on calorie-dense fried snacks (*pakoras, puri*). NutriWise AI features a **dynamic rule re-mapping engine**:
- **Navratri & Ekadashi Vrat Mode:** Automatically filters out all regular grains and legumes while maintaining caloric targets through pseudograins (Kuttu/Buckwheat, Rajgira/Amaranth, Samak rice) and plant proteins (makhana, roasted chana, paneer/tofu).
- **Shravan Satvik Mode:** Converts non-vegetarian profiles to pure satvik vegetarian profiles with zero alliums (onion/garlic) while preserving exact daily protein requirements.
- **Ramadan Roza:** Re-aligns the 4-meal distribution into a biphasic circadian cycle (Suhoor pre-dawn and Iftar/Dinner sunset) with high-hydration and slow-digesting complex carbs.

---

### Q7: What is the "Non-Veg Cadence (55:45 Golden Ratio)" feature?
**Answer:**  
Unlike Western non-vegetarian diets where meat is consumed with almost every meal, the majority of Indian non-vegetarians follow a flexitarian lifestyle (eating poultry/eggs/fish 2-4 days a week, often observing vegetarian days on Tuesdays, Thursdays, or Saturdays). The 55:45 Golden Ratio delivers 55% vegetarian staples (dals, sabzi, rotis) and 45% lean animal protein (eggs, skinless chicken breast, fish), promoting cardiovascular longevity and avoiding saturated fat overload.

---

### Q8: How does the system handle strict Jain dietary laws?
**Answer:**  
Jain dietary ethics forbid animal slaughter as well as the consumption of root vegetables (*kandmool*—potatoes, onions, garlic, carrots, radishes) because uprooting plants destroys microorganisms and living roots. When the Jain preference is selected:
- All root vegetables and allium spices are filtered out.
- The engine formulates meals using green pods, gourds (*lauki, tori*), tomatoes, capsicum, lentils, and satvik spices (cumin, turmeric, ginger, rock salt) to achieve complete nutritional balance.

---

### Q9: What is the purpose of the 6-Aisle Weekly Pantry Optimizer?
**Answer:**  
A common barrier to clinical dietary adherence is grocery logistics. The engine consolidates all ingredients across 28 scheduled meals into 6 categorized Indian supermarket/bazaar aisles:
1. Whole Grains & Flours
2. Pulses, Dals & Legumes
3. Fresh Produce & Leafy Greens
4. Protein & Dairy / Plant Alternatives
5. Healthy Fats, Seeds & Prebiotics
6. Essential Spices & Bioactive Compounds  
This transforms abstract nutritional advice into an actionable weekly shopping checklist.

---

### Q10: How does the Patient Assessment History Vault maintain longitudinal data?
**Answer:**  
Using client-side structured `localStorage`, each completed assessment creates an immutable clinical snapshot with a unique report ID, timestamp, anthropometrics, and generated plan. The vault calculates longitudinal trends ($\Delta \text{ Weight}$, $\Delta \text{ BMI}$, and $\Delta \text{ Calorie Target}$) between consecutive assessments, allowing clinicians and patients to track metabolic progress over weeks.

---

### Q11: How does the system ensure Accessibility (WCAG 2.1 AA) and responsive usability?
**Answer:**  
1. **Contrast Ratio:** All text meets or exceeds the WCAG AA minimum contrast ratio of $4.5:1$ in both Light and Dark modes.
2. **Keyboard Navigation:** Full support for `Tab`, `Shift+Tab`, `Enter`, and `Escape` modal dismissals.
3. **Screen Readers:** ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `sr-only` indicators) ensure complete assistive technology support.
4. **Responsive Layout:** Adaptive breakpoints from mobile viewport ($390\text{px}$) to widescreen desktop ($1280\text{px}+$).

---

### Q12: How is the Clinical PDF Consultation Report generated?
**Answer:**  
The PDF generation engine leverages `jsPDF` to compile a clean, 3-page vector A4 report entirely on the client:
- **Page 1:** Demographics, anthropometrics, Mifflin-St Jeor math, macro split table, and clinical caution badges.
- **Page 2:** Complete 7-Day Indian Regional Meal Matrix (Monday to Sunday) across Breakfast, Lunch, Snacks, and Dinner.
- **Page 3:** 6-Aisle Grocery Planner, ICMR/WHO Educational Disclaimer, and a formal Clinician / Dietitian Review & Signature block.

---

## 🛠️ Verification Checklist

- [x] **Mifflin-St Jeor Derivation:** Mathematically verified live via Clinical Algorithm & Calculation Inspector.
- [x] **ICMR-NIN 2020 RDA Calibration:** Enforced for Protein, Fiber, and Sodium.
- [x] **Zero Cloud Server Latency:** Runs 100% offline in client browser.
- [x] **112 Authentic Regional Dishes:** Categorized with authentic cooking steps and spice pharmacology.
- [x] **Multi-Page Clinical PDF Export:** Verified across all demo personas and user assessments.
- [x] **Dual Theme Support:** WCAG AA certified Dark & Light modes.

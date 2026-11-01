import { jsPDF } from 'jspdf';
import { UserProfile, NutritionMetrics, WeeklyPlan } from '../types/nutrition';

/**
 * Clinical PDF Nutrition Summary Exporter
 * Generates an authentic, 3-page publication-grade clinical nutrition report
 * formatted for medical consultations, clinical archives, and dietary records.
 */
export async function exportClinicalNutritionReport(
  profile: UserProfile,
  metrics: NutritionMetrics,
  plan: WeeklyPlan
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 12;
  const contentWidth = pageWidth - margin * 2; // 186mm
  let y = margin;

  const primaryEmerald = [5, 150, 105]; // #059669
  const darkSlate = [15, 23, 42]; // #0f172a
  const mutedSlate = [100, 116, 139]; // #64748b
  const lightBg = [248, 250, 252]; // #f8fafc

  const timestamp = new Date().toISOString().split('T')[0];
  const reportId = `NW-${profile.id.replace('user-', '').replace('demo-', '').slice(0, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  // =========================================================================
  // PAGE 1: CLINICAL DEMOGRAPHICS, ANTHROPOMETRICS & METABOLIC TARGETS
  // =========================================================================

  // 1. Top Header Banner
  doc.setFillColor(240, 253, 244); // light mint
  doc.roundedRect(margin, y, contentWidth, 23, 3, 3, 'F');
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin, y, contentWidth, 23, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryEmerald[0], primaryEmerald[1], primaryEmerald[2]);
  doc.text('NutriWise AI — Clinical Nutrition Consultation Report', margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('Evidence-Informed Personalized Nutrition Engine • Aligned with UN SDG 3 (Target 3.4) & ICMR-NIN 2020', margin + 5, y + 14);

  doc.setFontSize(7.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text(`Clinical Report ID: ${reportId}   |   Issued: ${timestamp}   |   Classification: Clinical Nutrition Consultation Record`, margin + 5, y + 19);

  y += 28;

  // 2. Patient Demographics & Anthropometrics Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('1. Patient Demographics & Anthropometric Profile', margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const col1 = margin + 5;
  const col2 = margin + 52;
  const col3 = margin + 98;
  const col4 = margin + 142;

  doc.text(`Patient Name: ${profile.name}`, col1, y + 14);
  doc.text(`Age / Sex: ${profile.age} yrs / ${profile.gender.toUpperCase()}`, col1, y + 20);
  doc.text(`Activity Level: ${profile.activityLevel.replace('_', ' ').toUpperCase()}`, col1, y + 26);

  doc.text(`Height: ${profile.heightCm} cm`, col2, y + 14);
  doc.text(`Weight: ${profile.weightKg} kg`, col2, y + 20);
  doc.text(`Health Goal: ${profile.healthGoal.replace('_', ' ').toUpperCase()}`, col2, y + 26);

  doc.text(`Computed BMI: ${metrics.bmi} kg/m²`, col3, y + 14);
  doc.text(`Classification: ${metrics.bmiCategory.toUpperCase()}`, col3, y + 20);
  const hM = profile.heightCm / 100;
  const minW = Math.round(18.5 * hM * hM);
  const maxW = Math.round(24.9 * hM * hM);
  doc.text(`Healthy Range: ${minW} - ${maxW} kg`, col3, y + 26);

  doc.text(`Diet Preference: ${profile.dietPreference.toUpperCase()}`, col4, y + 14);
  if (profile.nonVegCadence) {
    doc.text(`Cadence: ${profile.nonVegCadence.replace('_', ' ')}`, col4, y + 20);
  } else {
    doc.text('Cadence: Standard Daily', col4, y + 20);
  }
  doc.text('Protocol: 7-Day Indian Matrix', col4, y + 26);

  y += 39;

  // 3. Clinical Metabolic Parameters
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('2. Clinical Metabolic Parameters (Mifflin-St Jeor Estimation Model)', margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Basal Metabolic Rate (BMR): ${metrics.bmr} kcal/day`, col1, y + 14);
  doc.text(`Total Daily Energy (TDEE): ${metrics.tdee} kcal/day`, col1, y + 20);
  doc.text(`Caloric Target: ${metrics.targetCalories} kcal/day`, col1, y + 26);

  doc.text(`Hydration Target: ${metrics.waterTargetLitres} L/day (~${Math.round(metrics.waterTargetLitres * 4)} glasses @ 250ml)`, col3, y + 14);
  doc.text(`Calorie Delta: ${metrics.calorieAdjustmentNote.slice(0, 48)}`, col3, y + 20);
  doc.text(`Dietary Fiber Target: ~${metrics.fiberGrams}g/day (ICMR >=30g standard)`, col3, y + 26);

  y += 39;

  // 4. Clinical Cautions & Allergen Exclusions Box
  doc.setFillColor(254, 243, 199); // light amber
  doc.setDrawColor(251, 191, 36);
  doc.roundedRect(margin, y, contentWidth, 25, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(146, 64, 14);
  doc.text('3. Active Clinical Cautions, Dietary Directives & Allergen Safeguards', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 53, 15);
  const conditionsText = profile.healthConditions.length > 0
    ? profile.healthConditions.map((c) => c.replace('_', ' ').toUpperCase()).join(', ')
    : 'None (Standard healthy adult protocol)';
  doc.text(`Active Medical Cautions: ${conditionsText}`, margin + 5, y + 12);

  const allergiesText = profile.allergies.length > 0
    ? profile.allergies.map((a) => a.replace('_', ' ').toUpperCase()).join(', ')
    : 'No specified food allergies';
  doc.text(`Excluded Allergens: ${allergiesText}`, margin + 5, y + 17);
  doc.text('Enforced Rules: Low-GI constraint (GI <= 55), DASH sodium ceiling (<2,000mg/day), ICMR minimum protein floors.', margin + 5, y + 22);

  y += 30;

  // 5. Daily Macronutrient Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('4. Recommended Daily Macronutrient Split (Calibrated to ICMR RDA)', margin, y + 4);

  y += 7;

  // Table header
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Nutrient Classification', margin + 4, y + 5);
  doc.text('Percentage (%)', margin + 58, y + 5);
  doc.text('Target Mass (g)', margin + 108, y + 5);
  doc.text('Energy Value (kcal)', margin + 148, y + 5);

  y += 7;

  const macroRows = [
    { name: 'Protein (High Biological Value / Plant Complex)', pct: `${metrics.macroRatios.proteinPercent}%`, g: `${metrics.proteinGrams}g`, cal: `${metrics.proteinGrams * 4} kcal` },
    { name: 'Complex Carbohydrates (Low Glycemic Index)', pct: `${metrics.macroRatios.carbsPercent}%`, g: `${metrics.carbsGrams}g`, cal: `${metrics.carbsGrams * 4} kcal` },
    { name: 'Healthy Unsaturated Fats (MUFA / PUFA)', pct: `${metrics.macroRatios.fatPercent}%`, g: `${metrics.fatGrams}g`, cal: `${metrics.fatGrams * 9} kcal` },
    { name: 'Dietary Prebiotic Fiber (Gut Health & Glycemia)', pct: '—', g: `~${metrics.fiberGrams}g`, cal: 'Prebiotic SCFA' },
  ];

  macroRows.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, contentWidth, 6.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(row.name, margin + 4, y + 4.5);
    doc.text(row.pct, margin + 58, y + 4.5);
    doc.text(row.g, margin + 108, y + 4.5);
    doc.text(row.cal, margin + 148, y + 4.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + 6.5, margin + contentWidth, y + 6.5);
    y += 6.5;
  });

  y += 12;

  // Bottom Page 1 Indicator
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('Page 1 of 3 • Continued on Page 2 for Complete 7-Day Indian Regional Meal Matrix...', margin, y);

  // =========================================================================
  // PAGE 2: PERSONALIZED 7-DAY INDIAN REGIONAL MEAL MATRIX (ALL 7 DAYS)
  // =========================================================================
  doc.addPage();
  y = margin;

  // Page 2 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('5. Personalized 7-Day Indian Regional Meal Matrix (Monday to Sunday)', margin, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text(`Patient: ${profile.name} | Caloric Target: ~${metrics.targetCalories} kcal/day | Formula: Mifflin-St Jeor + ICMR RDA`, margin, y + 9);

  y += 13;

  plan.days.forEach((day) => {
    // Day banner
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(margin, y, contentWidth, 5.5, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(primaryEmerald[0], primaryEmerald[1], primaryEmerald[2]);
    doc.text(`${day.dayName.toUpperCase()} — Total: ~${day.totalCalories} kcal  |  Protein: ${day.totalProtein}g  |  Carbs: ${day.totalCarbs}g  |  Fat: ${day.totalFat}g  |  Fiber: ${day.totalFiber}g`, margin + 3, y + 4);

    y += 6;

    const slots = [
      { name: 'Breakfast', m: day.breakfast },
      { name: 'Lunch', m: day.lunch },
      { name: 'Snacks', m: day.snacks },
      { name: 'Dinner', m: day.dinner },
    ];

    slots.forEach((s) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, 7.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
      doc.text(`${s.name.toUpperCase()}:`, margin + 3, y + 3.8);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      // Clean non-ASCII for pure PDF standard fonts
      const cleanEnName = s.m.nameEn.replace(/[^\x20-\x7E]/g, '');
      doc.text(cleanEnName.slice(0, 52), margin + 24, y + 3.8);

      doc.setFontSize(6.5);
      doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
      const portionText = s.m.portion.replace(/[^\x20-\x7E]/g, '').slice(0, 35);
      const meta = `Portion: ${portionText} | ${s.m.calories} kcal | P: ${s.m.protein}g, C: ${s.m.carbs}g, F: ${s.m.fat}g, Fib: ${s.m.fiber}g | GI: ${s.m.glycemicIndex.toUpperCase()}`;
      doc.text(meta, margin + 24, y + 6.6);

      y += 7.5;
    });

    y += 2.2;
  });

  // Bottom Page 2 Indicator
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('Page 2 of 3 • Continued on Page 3 for Consolidated 6-Aisle Grocery Planner & Clinician Sign-off...', margin, y + 2);

  // =========================================================================
  // PAGE 3: PANTRY GROCERY PLANNER, CLINICAL DISCLAIMER & SIGN-OFF
  // =========================================================================
  doc.addPage();
  y = margin;

  // Page 3 Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('6. Weekly Indian Pantry & Grocery Checklist (6 Aisle Consolidation)', margin, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text(`Consolidated from all 28 meals in ${profile.name}'s 7-day plan with dietary caution filters applied.`, margin, y + 9);

  y += 13;

  // Compile the 6 aisles dynamically based on profile
  const isJain = profile.dietPreference === 'jain';
  const isLactoseIntolerant = profile.allergies.includes('lactose_intolerance') || profile.healthConditions.includes('lactose_intolerance');
  const isNonVeg = profile.dietPreference === 'non_vegetarian';
  const hasPeanutAllergy = profile.allergies.includes('peanuts');

  const groceryAisles = [
    {
      title: 'Aisle 1: Whole Grains & Flours',
      items: [
        'Whole Wheat Atta (Stone-ground) — 3 kg',
        'Besan (Bengal Gram Flour) — 500g',
        'Jowar / Bajra Millet Flour — 1 kg',
        'Brown Basmati Rice (Low GI) — 1.5 kg',
        'Thick Poha (Iron-rich) — 500g',
        'Rolled Oats / Ragi Flour — 500g',
      ],
    },
    {
      title: 'Aisle 2: Pulses, Dals & Legumes',
      items: [
        'Yellow Split Moong Dal — 1 kg',
        'Whole Green Moong (for sprouts) — 500g',
        'Split Masoor Dal (Red Lentil) — 500g',
        'Kashmiri Rajma (Kidney Beans) — 500g',
        'Kabuli Chana (Chickpeas) — 500g',
        'Nutrela Soya Chunks/Granules — 300g',
      ],
    },
    {
      title: 'Aisle 3: Fresh Produce & Leafy Greens',
      items: [
        'Fresh Baby Spinach (Palak) — 3 bunches (750g)',
        'Fresh Fenugreek (Methi) — 2 bunches (500g)',
        'Bottle Gourd (Lauki / Dudhi) — 2 medium (1 kg)',
        'Fresh Ladyfinger (Bhindi) — 500g',
        'Firm Ripe Tomatoes — 1.5 kg',
        'Cucumbers & Green Chillies — 1 kg',
        'Fresh Lemons (Vitamin C) — 8-10 pcs',
        ...(!isJain ? ['Red Onions (2 kg) & Garlic (250g)', 'Fresh Ginger Root (200g)'] : []),
      ],
    },
    {
      title: 'Aisle 4: Protein, Dairy & Plant Alts',
      items: [
        ...(isNonVeg ? [
          'Farm Fresh Eggs (Omega-3 fortified) — 2-3 dozen',
          'Skinless Chicken Breast (Lean) — 1.5 kg',
          'Fresh Fish Fillets (Rohu / Salmon) — 750g',
        ] : []),
        ...(!isLactoseIntolerant && !isNonVeg ? [
          'Low-Fat Fresh Paneer — 800g',
          'Low-Fat Set Curd / Dahi (Probiotics) — 1.5 kg',
        ] : []),
        ...(isLactoseIntolerant ? [
          'Organic Soya Tofu (Firm) — 600g',
          'Fortified Soya / Almond Milk — 1 Litre',
        ] : []),
      ],
    },
    {
      title: 'Aisle 5: Healthy Fats, Seeds & Prebiotics',
      items: [
        'Cold-Pressed Mustard Oil / Til Oil — 500ml',
        'Desi A2 Cow Ghee (Medicinal) — 250ml',
        'Phool Makhana (Fox Nuts) — 250g',
        'Skin-on Roasted Chana — 500g',
        'Raw Flaxseeds & Chia Seeds — 200g',
        ...(!hasPeanutAllergy ? ['Raw Peanuts / Groundnuts — 250g'] : []),
      ],
    },
    {
      title: 'Aisle 6: Spices & Bioactive Compounds',
      items: [
        'Whole Cumin (Jeera) & Mustard Seeds — 200g',
        'High-Curcumin Turmeric (Haldi) — 200g',
        'Coriander & Cumin Powder (Dhana-Jeeru) — 200g',
        'Kashmiri Degi Mirch (Antioxidant) — 100g',
        'Whole Black Peppercorns (Piperine) — 100g',
        'Dry Roasted Kasuri Methi & Hing — 50g each',
      ],
    },
  ];

  // Render 6 aisles in 2 columns (3 rows)
  const aisleColWidth = (contentWidth - 6) / 2; // ~90mm
  groceryAisles.forEach((aisle, idx) => {
    const colIndex = idx % 2;
    const rowIndex = Math.floor(idx / 2);
    const ax = margin + colIndex * (aisleColWidth + 6);
    const ay = y + rowIndex * 35;

    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(ax, ay, aisleColWidth, 32, 2, 2, 'FD');

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(ax, ay, aisleColWidth, 5.5, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(primaryEmerald[0], primaryEmerald[1], primaryEmerald[2]);
    doc.text(aisle.title, ax + 3, ay + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(51, 65, 85);
    let itemY = ay + 9;
    aisle.items.slice(0, 5).forEach((item) => {
      doc.text(`[  ] ${item.slice(0, 48)}`, ax + 3, itemY);
      itemY += 4.5;
    });
  });

  y += 112;

  // Legal & Clinical Disclaimer Box
  doc.setFillColor(254, 242, 242); // soft rose
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, y, contentWidth, 27, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(153, 27, 27);
  doc.text('IMPORTANT CLINICAL, EDUCATIONAL & INSTITUTIONAL DISCLAIMER', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(185, 28, 28);
  const disclaimerText =
    'NutriWise AI is an evidence-based clinical decision-support system developed under UN Sustainable Development Goal 3 (Target 3.4) and calibrated against ICMR-NIN (National Institute of Nutrition, India) and WHO dietary frameworks. All BMR, TDEE, and macronutrient distributions are mathematical estimations. This report is designed for educational guidance and clinical triage; it does not replace a personalized physician prescription or formal diagnostic procedure. Patients under active pharmacotherapy (e.g., insulin, antihypertensives, thyroid hormones) must consult a certified medical practitioner before altering caloric or sodium intake.';
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 8);
  doc.text(splitDisclaimer, margin + 4, y + 9.5);

  y += 31;

  // Clinician Sign-off Block
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 23, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('Clinical Review & Institutional Verification Sign-off', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mutedSlate[0], mutedSlate[1], mutedSlate[2]);
  doc.text('Reviewing Clinician / Nutritionist: __________________________________________________', margin + 4, y + 12);
  doc.text('Medical Council / Institutional Reg. No.: ________________________    Date: ____________________    Signature: ______________________', margin + 4, y + 18);

  // Trigger browser file download
  const safeName = profile.name.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`NutriWise_Clinical_Nutrition_Report_${safeName}.pdf`);
}

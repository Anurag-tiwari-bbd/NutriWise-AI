import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  ChefHat, 
  Sparkles, 
  Flame, 
  CheckSquare, 
  Square, 
  Info, 
  ShieldCheck, 
  UtensilsCrossed,
  HeartPulse,
  Leaf,
  Users,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { MealItem } from '../../types/nutrition';
import { getRecipeDetailForMeal, RecipeDetail } from '../../data/recipeData';

interface RecipeDetailModalProps {
  meal: MealItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  meal,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'spices' | 'micronutrients'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['ingredients', 'instructions', 'spices', 'micronutrients'].includes(tab)) {
        return tab as any;
      }
    } catch {}
    return 'ingredients';
  });
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [portionScale, setPortionScale] = useState<number>(1.0);

  // Close on ESC key and reset states
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setPortionScale(1.0);
      setCheckedIngredients({});
      try {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab && ['ingredients', 'instructions', 'spices', 'micronutrients'].includes(tab)) {
          setActiveTab(tab as any);
        } else {
          setActiveTab('ingredients');
        }
      } catch {
        setActiveTab('ingredients');
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !meal) return null;

  const recipe: RecipeDetail = getRecipeDetailForMeal(meal);

  const toggleIngredient = (item: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Helper to scale quantities safely
  const scaleQuantity = (qty: string, scale: number): string => {
    if (scale === 1.0) return qty;
    return qty.replace(/(\d+(\.\d+)?)/g, (match) => {
      const val = parseFloat(match);
      const scaled = val * scale;
      return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
    });
  };

  // Scaled macros
  const scaledCalories = Math.round(meal.calories * portionScale);
  const scaledProtein = Math.round(meal.protein * portionScale);
  const scaledCarbs = Math.round(meal.carbs * portionScale);
  const scaledFat = Math.round(meal.fat * portionScale);

  // ICMR-NIN Daily Values (Adult baseline)
  const icmrDailyValues = {
    iron: 19,        // mg
    calcium: 1000,   // mg
    vitaminB12: 2.2, // mcg
    zinc: 13.2,      // mg
    potassium: 3500, // mg
    folate: 300,     // mcg
  };

  // Dietary certification label helper
  const getDietaryGuarantee = (dietType: string): string => {
    switch (dietType) {
      case 'jain':
        return '✨ Strict Jain Certified • Zero Onion, Garlic, Potato & Root Veg';
      case 'vegan':
        return '🌿 100% Certified Vegan • Zero Dairy & Zero Eggs';
      case 'vegetarian':
        return '🥗 100% Lacto-Vegetarian • Pure Plant & High-Protein Dairy';
      case 'non_vegetarian':
        return '🍗 Clean Lean Protein • ICMR-NIN Calibrated Poultry & Seafood';
      default:
        return '✨ Balanced Nutrition Formulation • ICMR-NIN Calibrated';
    }
  };

  // Diet badge styling helper
  const getDietBadgeStyle = (dietType: string): string => {
    switch (dietType) {
      case 'jain':
        return 'bg-amber-400/25 text-amber-200 border-amber-300/40';
      case 'vegan':
        return 'bg-emerald-400/25 text-emerald-200 border-emerald-300/40';
      case 'vegetarian':
        return 'bg-teal-400/25 text-teal-200 border-teal-300/40';
      case 'non_vegetarian':
        return 'bg-rose-400/25 text-rose-200 border-rose-300/40';
      default:
        return 'bg-white/20 text-white border-white/30';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-hidden"
      onClick={onClose}
    >
      <div 
        className="relative w-full min-w-0 bg-white dark:bg-[#111C30] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-[#26364D] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh] animate-slide-up mx-auto"
        style={{ maxWidth: 'min(960px, calc(100vw - 20px))' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
      >
        {/* ========================================================================= */}
        {/* REGION A — Compact Recipe Header                                          */}
        {/* ========================================================================= */}
        <div className="w-full min-w-0 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-3 sm:px-6 sm:py-3.5 relative shrink-0 shadow-sm border-b border-emerald-600/30">
          {/* Row 1: Badges + Close Button */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1 min-w-0 pr-1">
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shrink-0">
                <ChefHat className="w-3 h-3" />
                {meal.category}
              </span>

              <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider border shrink-0 ${getDietBadgeStyle(meal.dietType)}`}>
                {meal.dietType === 'non_vegetarian' ? 'NON-VEG' : meal.dietType.toUpperCase()}
              </span>

              {meal.glycemicIndex && (
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-emerald-100 text-[10px] sm:text-[11px] font-bold border border-white/15 shrink-0">
                  GI: {meal.glycemicIndex.toUpperCase()}
                </span>
              )}

              {recipe.cuisine && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-900/40 text-emerald-200 text-[10px] sm:text-[11px] font-semibold border border-emerald-400/20 shrink-0">
                  <Compass className="w-3 h-3 text-emerald-300" />
                  {recipe.cuisine}
                </span>
              )}

              {recipe.difficulty && (
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-900/40 text-emerald-200 text-[10px] sm:text-[11px] font-semibold border border-emerald-400/20 shrink-0">
                  {recipe.difficulty}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white shrink-0 -mt-0.5"
              aria-label="Close recipe modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Row 2: English Recipe Title & Hindi Subtitle */}
          <div className="space-y-0.5">
            <h2 id="recipe-modal-title" className="text-base sm:text-xl md:text-2xl font-extrabold tracking-tight text-white leading-tight">
              {meal.nameEn}
            </h2>
            <p className="text-emerald-100/90 font-medium text-xs sm:text-sm">
              {meal.nameHi}
            </p>
          </div>

          {/* Row 3: Portion Scaler Controls & Compact Dietary Guarantee */}
          <div className="mt-2 pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Portion Scaler */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-100 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-200" />
                Portion:
              </span>
              <div className="inline-flex items-center bg-black/25 p-0.5 rounded-lg border border-white/10">
                {[0.5, 1.0, 1.5, 2.0].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setPortionScale(scale)}
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] sm:text-[11px] transition-all ${
                      portionScale === scale
                        ? 'bg-white text-emerald-900 shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {scale === 1.0 ? '1x (Std)' : `${scale}x`}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Guarantee Chip */}
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-100 bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-none">
                {getDietaryGuarantee(meal.dietType)}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REGION B — Compact Nutrition Summary                                      */}
        {/* ========================================================================= */}
        <div className="w-full min-w-0 bg-slate-50/95 dark:bg-[#0F172A] px-4 py-2 sm:px-6 sm:py-2.5 border-b border-slate-200/80 dark:border-[#26364D] shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {/* Energy */}
            <div className="bg-white dark:bg-[#17243A] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-200/80 dark:border-[#26364D] shadow-2xs flex items-center justify-between min-w-0">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider truncate">
                  Energy ({portionScale}x)
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {scaledCalories} <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">kcal</span>
                </span>
              </div>
              <Flame className="w-4 h-4 text-amber-500 shrink-0 ml-1" />
            </div>

            {/* Protein */}
            <div className="bg-white dark:bg-[#17243A] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-200/80 dark:border-[#26364D] shadow-2xs flex items-center justify-between min-w-0">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider truncate">
                  Protein
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                  {scaledProtein}g <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">({Math.round((scaledProtein * 4 / (scaledCalories || 1)) * 100)}%)</span>
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 ml-1" />
            </div>

            {/* Prep & Cook Time */}
            <div className="bg-white dark:bg-[#17243A] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-200/80 dark:border-[#26364D] shadow-2xs flex items-center justify-between min-w-0">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider truncate">
                  Prep &amp; Cook
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-teal-600 dark:text-teal-400">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                </span>
              </div>
              <Clock className="w-4 h-4 text-teal-500 shrink-0 ml-1" />
            </div>

            {/* Baseline Serving Size */}
            <div className="bg-white dark:bg-[#17243A] rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-200/80 dark:border-[#26364D] shadow-2xs flex items-center justify-between min-w-0">
              <div className="min-w-0 flex-1 pr-1">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider truncate">
                  Serving Size
                </span>
                <span 
                  className="font-bold text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 block line-clamp-2 leading-tight" 
                  title={meal.portion}
                >
                  {meal.portion}
                </span>
              </div>
              <UtensilsCrossed className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Tab Navigation Strip                                                      */}
        {/* ========================================================================= */}
        <div className="w-full min-w-0 max-w-full flex border-b border-slate-200 dark:border-[#26364D] bg-white dark:bg-[#0F172A] px-3 sm:px-6 shrink-0 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('ingredients')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'ingredients'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400 bg-emerald-50/50 dark:bg-[#17243A]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Ingredients ({recipe.ingredients.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'instructions'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400 bg-emerald-50/50 dark:bg-[#17243A]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Cooking Steps ({recipe.instructions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spices')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'spices'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400 bg-emerald-50/50 dark:bg-[#17243A]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Spice Pharmacology</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('micronutrients')}
            className={`py-2.5 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'micronutrients'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400 bg-emerald-50/50 dark:bg-[#17243A]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Micronutrients &amp; %DV</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* REGION C — Main Recipe Content Workspace (Scrollable & Maximized)          */}
        {/* ========================================================================= */}
        <div className="w-full min-w-0 p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 flex-1 min-h-0 bg-white dark:bg-[#111C30] text-slate-800 dark:text-slate-100">
          
          {/* ----------------------------------------------------------------------- */}
          {/* TAB 1: INGREDIENTS                                                      */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'ingredients' && (
            <div className="space-y-3.5 animate-fade-in">
              {/* Notice bar */}
              <div className="flex items-center justify-between text-xs bg-emerald-50/80 dark:bg-[#17243A] p-2.5 sm:p-3 rounded-xl border border-emerald-100 dark:border-[#26364D]">
                <span className="flex items-center gap-1.5 font-medium text-emerald-950 dark:text-emerald-200">
                  <Info className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  Authentic Indian culinary measurements scaled for <strong>{portionScale}x serving</strong>. Click items you already have in pantry.
                </span>
                <span className="hidden sm:inline-flex text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                  {Object.values(checkedIngredients).filter(Boolean).length} / {recipe.ingredients.length} items checked
                </span>
              </div>

              {/* 2-Column Responsive Ingredients Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = Boolean(checkedIngredients[ing.item]);
                  const scaledQty = scaleQuantity(ing.quantity, portionScale);

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(ing.item)}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked 
                          ? 'bg-slate-50/60 dark:bg-[#0D1525] border-slate-200/60 dark:border-[#26364D]/60 opacity-60' 
                          : 'bg-white dark:bg-[#17243A] border-slate-200 dark:border-[#26364D] hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-emerald-50/20 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <span className={`text-xs sm:text-[13px] font-semibold block leading-snug break-words ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                            {ing.item}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                            {ing.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg shrink-0 border border-emerald-200/80 dark:border-emerald-700/50">
                        {scaledQty}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pantry Readiness Status Footer */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span className="font-medium">Pantry Readiness Status:</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                  {Object.values(checkedIngredients).filter(Boolean).length} / {recipe.ingredients.length} items checked
                </span>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 2: COOKING STEPS                                                    */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'instructions' && (
            <div className="space-y-3.5 animate-fade-in">
              {/* Clinical Protocol Banner */}
              <div className="p-2.5 sm:p-3 bg-emerald-50/80 dark:bg-[#17243A] border border-emerald-100 dark:border-[#26364D] rounded-xl text-xs text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>Clinical Culinary Protocol:</strong> Sauté on medium-low flame. Gentle heat preserves heat-labile micronutrients (folate, vitamin C) and prevents lipid oxidation.
                </span>
              </div>

              {/* Steps List */}
              <ol className="space-y-2.5 sm:space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] hover:border-emerald-300 dark:hover:border-emerald-500/40 transition-colors shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                        {step}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 3: SPICE PHARMACOLOGY                                               */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'spices' && (
            <div className="space-y-3.5 animate-fade-in">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Traditional Indian culinary spices contain potent bioactive phytochemicals verified by pharmacological clinical research:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {recipe.spiceBenefits.map((spice, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 sm:p-3.5 rounded-xl bg-amber-50/60 dark:bg-[#17243A] border border-amber-200/80 dark:border-[#26364D] space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        {spice.spiceName}
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700/50 shrink-0">
                        {spice.activeCompound}
                      </span>
                    </div>
                    <p className="text-xs text-amber-900/90 dark:text-slate-300 leading-relaxed">
                      {spice.clinicalMechanism}
                    </p>
                  </div>
                ))}
              </div>

              {/* Synergies box */}
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-[#17243A] border border-teal-200 dark:border-[#26364D] text-xs text-teal-950 dark:text-teal-200 space-y-1">
                <strong className="block font-bold flex items-center gap-1.5 text-teal-900 dark:text-teal-300">
                  <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  ICMR Micronutrient Synergies:
                </strong>
                <p className="leading-snug text-teal-900/90 dark:text-slate-300">
                  Combining fresh lemon juice (Ascorbic acid) with plant-based dals increases non-heme iron absorption by up to 300%. Always add lemon juice after turning off heat to preserve vitamin C!
                </p>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 4: MICRONUTRIENTS & %DV                                             */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'micronutrients' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-2.5 sm:p-3 bg-teal-50/80 dark:bg-[#17243A] border border-teal-200 dark:border-[#26364D] rounded-xl text-xs text-teal-950 dark:text-teal-200 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                <span>
                  Calibrated against <strong>ICMR-NIN (National Institute of Nutrition, India)</strong> adult Recommended Dietary Allowances (RDA).
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {/* Iron */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Dietary Iron</span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {(recipe.micronutrients.ironMg * portionScale).toFixed(1)} mg
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((recipe.micronutrients.ironMg * portionScale) / icmrDailyValues.iron) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>% Daily Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {Math.round(((recipe.micronutrients.ironMg * portionScale) / icmrDailyValues.iron) * 100)}% DV
                    </span>
                  </div>
                </div>

                {/* Calcium */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Calcium</span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {Math.round(recipe.micronutrients.calciumMg * portionScale)} mg
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-teal-600 dark:bg-teal-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((recipe.micronutrients.calciumMg * portionScale) / icmrDailyValues.calcium) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>% Daily Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {Math.round(((recipe.micronutrients.calciumMg * portionScale) / icmrDailyValues.calcium) * 100)}% DV
                    </span>
                  </div>
                </div>

                {/* Vitamin B12 */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Vitamin B12</span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {(recipe.micronutrients.vitaminB12Mcg * portionScale).toFixed(1)} mcg
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-sky-600 dark:bg-sky-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((recipe.micronutrients.vitaminB12Mcg * portionScale) / icmrDailyValues.vitaminB12) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>% Daily Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {Math.round(((recipe.micronutrients.vitaminB12Mcg * portionScale) / icmrDailyValues.vitaminB12) * 100)}% DV
                    </span>
                  </div>
                </div>

                {/* Zinc */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Zinc</span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {(recipe.micronutrients.zincMg * portionScale).toFixed(1)} mg
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 dark:bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((recipe.micronutrients.zincMg * portionScale) / icmrDailyValues.zinc) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>% Daily Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {Math.round(((recipe.micronutrients.zincMg * portionScale) / icmrDailyValues.zinc) * 100)}% DV
                    </span>
                  </div>
                </div>

                {/* Potassium */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Potassium</span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {Math.round(recipe.micronutrients.potassiumMg * portionScale)} mg
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((recipe.micronutrients.potassiumMg * portionScale) / icmrDailyValues.potassium) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>% Daily Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {Math.round(((recipe.micronutrients.potassiumMg * portionScale) / icmrDailyValues.potassium) * 100)}% DV
                    </span>
                  </div>
                </div>

                {/* Folate */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Dietary Folate</span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      {Math.round(recipe.micronutrients.folateMcg * portionScale)} mcg
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 dark:bg-emerald-400 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((recipe.micronutrients.folateMcg * portionScale) / icmrDailyValues.folate) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>% Daily Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {Math.round(((recipe.micronutrients.folateMcg * portionScale) / icmrDailyValues.folate) * 100)}% DV
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* REGION D — Compact Footer                                                 */}
        {/* ========================================================================= */}
        <div className="w-full min-w-0 px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-50/95 dark:bg-[#0F172A] border-t border-slate-200 dark:border-[#26364D] flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 text-center sm:text-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Portion scaled to {portionScale}x ({scaledCalories} kcal, {scaledProtein}g protein). Zero food waste.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Close Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
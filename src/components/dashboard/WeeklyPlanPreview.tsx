import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Utensils, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRightLeft, 
  ShieldCheck, 
  AlertCircle,
  ChefHat
} from 'lucide-react';
import { WeeklyPlan, DayPlan, MealItem, UserProfile } from '../../types/nutrition';
import { Badge } from '../common/Badge';
import { InfoTooltip } from '../common/InfoTooltip';
import { getMealAlternatives } from '../../utils/recommendationEngine';
import { HEALTH_CONDITION_RULES } from '../../data/healthRules';

interface WeeklyPlanPreviewProps {
  plan: WeeklyPlan;
  profile: UserProfile;
  onSelectMealForRecipe?: (meal: MealItem) => void;
}

export const WeeklyPlanPreview: React.FC<WeeklyPlanPreviewProps> = ({ 
  plan, 
  profile,
  onSelectMealForRecipe 
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMealForSwap, setSelectedMealForSwap] = useState<MealItem | null>(null);

  // Automatically reset selected day to Monday and close swaps on profile change
  useEffect(() => {
    setSelectedDayIndex(0);
    setSelectedMealForSwap(null);
  }, [profile.id]);

  const currentDay: DayPlan = plan.days[selectedDayIndex] || plan.days[0];

  // Compute alternatives for the selected meal if user requested a swap preview
  const swapAlternatives = selectedMealForSwap
    ? getMealAlternatives(selectedMealForSwap, profile, 3)
    : [];

  const mealSlots: Array<{
    slotName: string;
    slotHindi: string;
    meal: MealItem;
    timeHint: string;
    color: 'emerald' | 'mint' | 'amber' | 'blue';
  }> = [
    {
      slotName: 'Breakfast',
      slotHindi: 'नाश्ता',
      meal: currentDay.breakfast,
      timeHint: '8:00 AM – 9:00 AM',
      color: 'emerald',
    },
    {
      slotName: 'Lunch',
      slotHindi: 'दोपहर का भोजन',
      meal: currentDay.lunch,
      timeHint: '1:00 PM – 2:00 PM',
      color: 'mint',
    },
    {
      slotName: 'Evening Snacks',
      slotHindi: 'शाम का नाश्ता',
      meal: currentDay.snacks,
      timeHint: '4:30 PM – 5:30 PM',
      color: 'amber',
    },
    {
      slotName: 'Dinner',
      slotHindi: 'रात का भोजन',
      meal: currentDay.dinner,
      timeHint: '7:30 PM – 8:30 PM',
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#26364D] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                <Calendar className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Personalized 7-Day Indian Meal Schedule
              </h3>
              <Badge variant="emerald" size="sm">Phase 2 AI Engine</Badge>
              {profile.dietPreference === 'non_vegetarian' && (
                <Badge variant="mint" size="sm">55:45 Golden Ratio Balance</Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formulated dynamically from 110+ authentic Indian regional dishes with strict safety constraints for {profile.name}.
            </p>
            {profile.dietPreference === 'non_vegetarian' && (
              <div className="pt-1 text-[11.5px] text-emerald-900 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 rounded-xl px-3.5 py-1.5 leading-relaxed">
                <strong className="font-bold text-emerald-950 dark:text-emerald-200">Clinical Balance Rationale: </strong>
                Lean animal proteins deliver high-biological-value amino acids, while wholesome lentils and sprouts supply 30g+ essential prebiotic fiber for gut motility and renal health.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Daily Target Total:</span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm border border-emerald-200 dark:border-emerald-800/60">
              ~{currentDay.totalCalories} kcal
            </span>
          </div>
        </div>

        {/* Day Selector Tabs (Monday through Sunday) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {plan.days.map((d, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => {
                  setSelectedDayIndex(idx);
                  setSelectedMealForSwap(null);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-[#26364D]'
                }`}
              >
                <span>{d.dayName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-[#0F172A] text-slate-600 dark:text-slate-300'}`}>
                  {d.totalCalories} kcal
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Meal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mealSlots.map((slot) => {
          const m = slot.meal;
          const isSelectedForSwap = selectedMealForSwap?.id === m.id;

          return (
            <div
              key={slot.slotName}
              className={`p-6 rounded-3xl bg-white dark:bg-[#111C30] border transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md ${
                isSelectedForSwap ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200/90 dark:border-[#26364D]'
              }`}
            >
              <div className="space-y-4">
                {/* Slot Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                      {slot.slotName} ({slot.slotHindi})
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {slot.timeHint}
                    </span>
                  </div>

                  <span className="text-sm font-extrabold text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0F172A] px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-[#26364D]">
                    {m.calories} <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">kcal</span>
                  </span>
                </div>

                {/* Dish Names */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {m.nameEn}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {m.nameHi}
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Recommended Portion:</span> {m.portion}
                  </p>
                </div>

                {/* Health & Clinical Benefit Note */}
                <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-[#17243A]/60 border border-emerald-100 dark:border-[#26364D] text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-semibold text-emerald-900 dark:text-emerald-300">Why this meal: </span>
                  {m.healthBenefits}
                </div>

                {/* Macro Breakdown Pills */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-100 dark:border-[#26364D]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Protein</span>
                    <span className="font-bold text-slate-900 dark:text-white">{m.protein}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-100 dark:border-[#26364D]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Carbs</span>
                    <span className="font-bold text-slate-900 dark:text-white">{m.carbs}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-100 dark:border-[#26364D]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Fat</span>
                    <span className="font-bold text-slate-900 dark:text-white">{m.fat}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-100 dark:border-[#26364D]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Fiber</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{m.fiber}g</span>
                  </div>
                </div>

                {/* Dietary Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Badge variant={m.dietType === 'jain' ? 'amber' : m.dietType === 'vegan' ? 'mint' : 'emerald'} size="sm">
                    {m.dietType.toUpperCase()}
                  </Badge>
                  <Badge variant={m.glycemicIndex === 'low' ? 'emerald' : 'slate'} size="sm">
                    GI: {m.glycemicIndex.toUpperCase()}
                  </Badge>
                  {m.isRootVegetableFree && (
                    <Badge variant="mint" size="sm">Root-Veg Free</Badge>
                  )}
                  {m.allergens.length === 0 && (
                    <Badge variant="slate" size="sm">Common Allergen-Free</Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons: Recipe & Swap Alternative Trigger */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#26364D] flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectMealForRecipe && onSelectMealForRecipe(m)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 transition-all flex items-center gap-1.5"
                  title="View step-by-step recipe, spices, and micronutrients"
                >
                  <ChefHat className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Recipe &amp; Nutrients</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMealForSwap(isSelectedForSwap ? null : m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelectedForSwap
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-emerald-50 dark:bg-[#17243A] dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300'
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{isSelectedForSwap ? 'Close Swaps' : 'See Meal Swaps'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Swap Alternatives Panel */}
      {selectedMealForSwap && (
        <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-white dark:from-[#17243A] dark:via-[#111C30] dark:to-[#0F172A] rounded-3xl p-6 sm:p-8 border border-emerald-200/90 dark:border-[#26364D] shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-emerald-100 dark:border-[#26364D] pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                <ArrowRightLeft className="w-4 h-4" />
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Safe Alternative Swaps for: <span className="text-emerald-700 dark:text-emerald-400">{selectedMealForSwap.nameEn}</span>
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMealForSwap(null)}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            The AI engine automatically selected dishes with matching calorie density and identical dietary safety constraints ({profile.dietPreference}, zero forbidden allergens).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {swapAlternatives.map((alt) => (
              <div
                key={alt.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#111C30] border border-emerald-100 dark:border-[#26364D] shadow-sm space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald" size="sm">GI: {alt.glycemicIndex.toUpperCase()}</Badge>
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">{alt.calories} kcal</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{alt.nameEn}</h5>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">{alt.nameHi}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{alt.portion}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#26364D] flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <span>P: {alt.protein}g</span>
                  <span>C: {alt.carbs}g</span>
                  <span>F: {alt.fat}g</span>
                  <span className="text-emerald-600 dark:text-emerald-400">✓ Safe match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applied Health & Clinical Rules Details */}
      {profile.healthConditions.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Active Clinical Dietary Guidelines Enforced by Engine
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.healthConditions.map((cond) => {
              const rule = HEALTH_CONDITION_RULES[cond];
              if (!rule) return null;

              return (
                <div key={cond} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#17243A] border border-slate-200/80 dark:border-[#26364D] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{rule.title}</span>
                    <Badge variant="amber" size="sm">{rule.badgeLabel}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rule.primaryGoal}
                  </p>
                  <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Filter applied: </span>
                    Max Glycemic Index: {rule.maxGlycemicIndex.toUpperCase()} • Banned allergens: {rule.forbiddenAllergens.length > 0 ? rule.forbiddenAllergens.join(', ') : 'None'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

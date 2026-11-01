import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  UtensilsCrossed, 
  ChefHat, 
  Sparkles, 
  Flame, 
  X, 
  ArrowUpDown,
  Wheat,
  Leaf
} from 'lucide-react';
import { PlateCutleryIcon } from '../common/PlateCutleryIcon';
import { INDIAN_MEALS } from '../../data/indianMeals';
import { MealItem, DietPreference } from '../../types/nutrition';
import { Badge } from '../common/Badge';

interface FoodExplorerProps {
  onSelectMealForRecipe: (meal: MealItem) => void;
}

export const FoodExplorer: React.FC<FoodExplorerProps> = ({
  onSelectMealForRecipe,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHealthFilter, setSelectedHealthFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'calories_asc' | 'calories_desc' | 'protein_desc' | 'fiber_desc'>('protein_desc');

  // Filter and sort catalog
  const filteredMeals = useMemo(() => {
    return INDIAN_MEALS.filter((meal) => {
      // 1. Search Query (Hindi, English, Health Benefits)
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesNameEn = meal.nameEn.toLowerCase().includes(q);
        const matchesNameHi = meal.nameHi.toLowerCase().includes(q);
        const matchesBenefits = meal.healthBenefits.toLowerCase().includes(q);
        const matchesPortion = meal.portion.toLowerCase().includes(q);
        if (!matchesNameEn && !matchesNameHi && !matchesBenefits && !matchesPortion) {
          return false;
        }
      }

      // 2. Diet Preference Filter
      if (selectedDiet !== 'all' && meal.dietType !== selectedDiet) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'all' && meal.category !== selectedCategory) {
        return false;
      }

      // 4. Health / Clinical Filter
      if (selectedHealthFilter === 'low_gi' && meal.glycemicIndex !== 'low') {
        return false;
      }
      if (selectedHealthFilter === 'high_protein' && meal.protein < 14) {
        return false;
      }
      if (selectedHealthFilter === 'high_fiber' && meal.fiber < 6) {
        return false;
      }
      if (selectedHealthFilter === 'root_free' && !meal.isRootVegetableFree) {
        return false;
      }
      if (selectedHealthFilter === 'allergen_free' && meal.allergens.length > 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'calories_asc') return a.calories - b.calories;
      if (sortBy === 'calories_desc') return b.calories - a.calories;
      if (sortBy === 'protein_desc') return b.protein - a.protein;
      if (sortBy === 'fiber_desc') return b.fiber - a.fiber;
      return 0;
    });
  }, [searchQuery, selectedDiet, selectedCategory, selectedHealthFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Title & Introduction Banner */}
      <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#26364D] shadow-xl space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                <PlateCutleryIcon className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Indian Food &amp; Nutrient Encyclopedia
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comprehensive ICMR-calibrated database of 112+ authentic Indian regional dishes with macronutrient and clinical profiles.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200 dark:border-emerald-800/60">
              Showing {filteredMeals.length} of {INDIAN_MEALS.length} Dishes
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any dish by English name, Hindi name (e.g. 'Poha', 'राजमा', 'Moong Dal', 'Chicken')..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#17243A] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#26364D]">
          {/* Row 1: Diet Preference Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">Diet:</span>
            {[
              { id: 'all', label: 'All Diets' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'non_vegetarian', label: 'Non-Vegetarian' },
              { id: 'vegan', label: '100% Vegan' },
              { id: 'jain', label: 'Jain (Root-Free)' },
            ].map((diet) => (
              <button
                key={diet.id}
                type="button"
                onClick={() => setSelectedDiet(diet.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  selectedDiet === diet.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>

          {/* Row 2: Category & Health Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">Meal:</span>
              {[
                { id: 'all', label: 'All Meals' },
                { id: 'breakfast', label: 'Breakfast' },
                { id: 'lunch', label: 'Lunch' },
                { id: 'snacks', label: 'Snacks' },
                { id: 'dinner', label: 'Dinner' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#17243A] dark:hover:bg-[#1f304c] text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Health Criteria Filter */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">Filter:</span>
              <select
                value={selectedHealthFilter}
                onChange={(e) => setSelectedHealthFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Nutritional Profiles</option>
                <option value="low_gi">Low Glycemic Index (Diabetic-Safe)</option>
                <option value="high_protein">High Protein (≥14g)</option>
                <option value="high_fiber">High Fiber (≥6g)</option>
                <option value="root_free">Strictly Root-Vegetable Free</option>
                <option value="allergen_free">Common Allergen Free</option>
              </select>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-[#26364D] text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="protein_desc">Sort: Highest Protein</option>
                <option value="fiber_desc">Sort: Highest Fiber</option>
                <option value="calories_asc">Sort: Lowest Calories</option>
                <option value="calories_desc">Sort: Highest Calories</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      {filteredMeals.length === 0 ? (
        <div className="bg-white dark:bg-[#111C30] rounded-3xl p-12 text-center border border-slate-200 dark:border-[#26364D] shadow-sm max-w-lg mx-auto space-y-3">
          <UtensilsCrossed className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No matching dishes found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search query, diet filter, or nutritional criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDiet('all');
              setSelectedCategory('all');
              setSelectedHealthFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white dark:bg-[#111C30] rounded-3xl p-5 border border-slate-200/90 dark:border-[#26364D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Header Tag Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/60">
                      {meal.category}
                    </span>
                    <Badge variant={meal.dietType === 'jain' ? 'amber' : meal.dietType === 'vegan' ? 'mint' : 'emerald'} size="sm">
                      {meal.dietType.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white bg-slate-50 dark:bg-[#0F172A] px-2 py-0.5 rounded-lg border border-slate-200 dark:border-[#26364D]">
                    {meal.calories} kcal
                  </span>
                </div>

                {/* Dish Names */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {meal.nameEn}
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {meal.nameHi}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Portion:</span> {meal.portion}
                  </p>
                </div>

                {/* Clinical Benefit Summary */}
                <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#17243A]/60 p-2.5 rounded-xl border border-slate-100 dark:border-[#26364D] leading-snug line-clamp-2">
                  {meal.healthBenefits}
                </p>

                {/* Macro Split Grid */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  <div className="p-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/50">
                    <span className="text-[9px] text-emerald-800 dark:text-emerald-300 block">Protein</span>
                    <span className="font-extrabold text-emerald-950 dark:text-emerald-200">{meal.protein}g</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-800/50">
                    <span className="text-[9px] text-teal-800 dark:text-teal-300 block">Carbs</span>
                    <span className="font-extrabold text-teal-950 dark:text-teal-200">{meal.carbs}g</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/50">
                    <span className="text-[9px] text-amber-800 dark:text-amber-300 block">Fat</span>
                    <span className="font-extrabold text-amber-950 dark:text-amber-200">{meal.fat}g</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D]">
                    <span className="text-[9px] text-slate-600 dark:text-slate-400 block">Fiber</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">{meal.fiber}g</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1">
                  <Badge variant={meal.glycemicIndex === 'low' ? 'emerald' : 'slate'} size="sm">
                    GI: {meal.glycemicIndex.toUpperCase()}
                  </Badge>
                  {meal.isRootVegetableFree && (
                    <Badge variant="mint" size="sm">Root-Free</Badge>
                  )}
                  {meal.allergens.length === 0 ? (
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 font-medium">
                      Allergen-Free
                    </span>
                  ) : (
                    <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium border border-amber-200 dark:border-amber-800/60">
                      Contains {meal.allergens.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              {/* View Full Recipe Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#26364D]">
                <button
                  type="button"
                  onClick={() => onSelectMealForRecipe(meal)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-[#17243A] hover:bg-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 group-hover:text-emerald-800 dark:group-hover:text-emerald-300"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>View Recipe &amp; Micronutrients</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

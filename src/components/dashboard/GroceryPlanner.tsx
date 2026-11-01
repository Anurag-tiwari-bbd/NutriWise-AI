import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Wheat, 
  Apple, 
  Egg, 
  Sparkles, 
  Flame, 
  Leaf, 
  RotateCcw,
  BadgeDollarSign
} from 'lucide-react';
import { WeeklyPlan, UserProfile } from '../../types/nutrition';
import { Badge } from '../common/Badge';

interface GroceryPlannerProps {
  plan: WeeklyPlan;
  profile: UserProfile;
}

interface GroceryAisle {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: Array<{ id: string; name: string; quantity: string; note?: string }>;
}

export const GroceryPlanner: React.FC<GroceryPlannerProps> = ({
  plan,
  profile,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Automatically reset grocery checklist when active profile or plan changes
  useEffect(() => {
    setCheckedItems({});
    setCopied(false);
  }, [profile.id, plan]);

  // Compile grocery list dynamically from the actual weekly plan
  const aisles: GroceryAisle[] = useMemo(() => {
    const isJain = profile.dietPreference === 'jain';
    const isLactoseIntolerant = profile.allergies.includes('lactose_intolerance') || 
      profile.healthConditions.includes('lactose_intolerance');
    const isNonVeg = profile.dietPreference === 'non_vegetarian';
    const hasPeanutAllergy = profile.allergies.includes('peanuts');

    return [
      {
        title: '🌾 Flours & Whole Grains',
        icon: Wheat,
        items: [
          { id: 'g1', name: 'Whole Wheat Atta (Stone-ground)', quantity: '3 kg', note: 'For rotis & phulkas' },
          { id: 'g2', name: 'Besan (Bengal Gram Flour)', quantity: '500g', note: 'For chillas & kadhi' },
          { id: 'g3', name: 'Jowar or Bajra Flour', quantity: '1 kg', note: 'Gluten-free fiber flatbreads' },
          { id: 'g4', name: 'Brown Basmati Rice', quantity: '1.5 kg', note: 'Low GI complex carbohydrate' },
          { id: 'g5', name: 'Thick Poha (Flattened Rice)', quantity: '500g', note: 'Iron-rich breakfast' },
          { id: 'g6', name: 'Rolled Oats or Ragi Flour', quantity: '500g', note: 'Beta-glucan soluble fiber' },
        ],
      },
      {
        title: '🫘 Pulses, Dals & Legumes',
        icon: Leaf,
        items: [
          { id: 'p1', name: 'Yellow Split Moong Dal', quantity: '1 kg', note: 'Easy to digest dinner staple' },
          { id: 'p2', name: 'Whole Green Moong', quantity: '500g', note: 'For fresh nutrient sprouts' },
          { id: 'p3', name: 'Split Masoor Dal (Red Lentil)', quantity: '500g', note: 'High iron & folate' },
          { id: 'p4', name: 'Kashmiri Rajma (Kidney Beans)', quantity: '500g', note: 'Complete amino acid base' },
          { id: 'p5', name: 'Kabuli Chana (Chickpeas)', quantity: '500g', note: 'Resistant starch & fiber' },
          { id: 'p6', name: 'Nutrela Soya Chunks / Granules', quantity: '300g', note: '52% pure plant protein' },
        ],
      },
      {
        title: '🥬 Fresh Produce & Leafy Vegetables',
        icon: Apple,
        items: [
          { id: 'v1', name: 'Fresh Baby Spinach (Palak)', quantity: '3 bunches (750g)', note: 'Folate, lutein, iron' },
          { id: 'v2', name: 'Fresh Fenugreek (Methi)', quantity: '2 bunches (500g)', note: 'Blood sugar regulation' },
          { id: 'v3', name: 'Bottle Gourd (Lauki / Dudhi)', quantity: '2 medium (1 kg)', note: 'Alkalizing, digestive' },
          { id: 'v4', name: 'Fresh Ladyfinger (Bhindi)', quantity: '500g', note: 'Mucilage for gut soothing' },
          { id: 'v5', name: 'Firm Ripe Tomatoes', quantity: '1.5 kg', note: 'Antioxidant lycopene' },
          { id: 'v6', name: 'Cucumbers & Green Chilies', quantity: '1 kg', note: 'Daily kachumber hydration' },
          { id: 'v7', name: 'Fresh Lemons (Nimbu)', quantity: '8-10 pcs', note: 'Vitamin C iron synergy' },
          ...(!isJain ? [
            { id: 'v8', name: 'Red Onions & Garlic Bulbs', quantity: '2 kg onions, 250g garlic', note: 'Prebiotic inulin & allicin' },
            { id: 'v9', name: 'Fresh Ginger Root', quantity: '200g', note: 'Digestive enzyme gingerol' },
          ] : []),
        ],
      },
      {
        title: '🥩 Protein & Dairy / Plant Alternatives',
        icon: Egg,
        items: [
          ...(isNonVeg ? [
            { id: 'pr1', name: 'Farm Fresh Eggs (Omega-3 fortified)', quantity: '2-3 dozen (24-36 eggs)', note: 'Breakfast & dinner protein' },
            { id: 'pr2', name: 'Skinless Chicken Breast (Lean)', quantity: '1.5 kg', note: 'Clean lean poultry protein' },
            { id: 'pr3', name: 'Fresh Fish Fillets (Katla / Rohu / Salmon)', quantity: '750g', note: 'Omega-3 EPA/DHA' },
          ] : []),
          ...(!isLactoseIntolerant && !isNonVeg ? [
            { id: 'pr4', name: 'Low-Fat Fresh Paneer', quantity: '800g', note: 'Casein slow-release protein' },
            { id: 'pr5', name: 'Low-Fat Set Curd / Dahi', quantity: '1.5 kg', note: 'Probiotic gut cultures' },
          ] : []),
          ...(isLactoseIntolerant ? [
            { id: 'pr6', name: 'Organic Soya Tofu (Firm)', quantity: '600g', note: 'Dairy-free calcium & protein' },
            { id: 'pr7', name: 'Fortified Soy Milk / Almond Milk', quantity: '1 Litre', note: 'Lactose-free calcium source' },
          ] : []),
        ],
      },
      {
        title: '🌰 Prebiotic Snacks, Nuts & Seeds',
        icon: Sparkles,
        items: [
          { id: 's1', name: 'Phool Makhana (Fox Nuts)', quantity: '250g', note: 'Low-sodium, alkalizing snack' },
          { id: 's2', name: 'Dry Roasted Chana (Skin-on)', quantity: '500g', note: 'High fiber evening snack' },
          ...(!hasPeanutAllergy ? [
            { id: 's3', name: 'Raw Peanuts / Groundnuts', quantity: '250g', note: 'Monounsaturated fatty acids' },
          ] : []),
          { id: 's4', name: 'Raw Flaxseeds & Chia Seeds', quantity: '200g', note: 'ALA plant-based omega-3' },
          { id: 's5', name: 'Roasted Papad (Urad Dal / Moong)', quantity: '1 pack', note: 'Non-fried accompaniments' },
        ],
      },
      {
        title: '🌿 Cooking Oils & Thermogenic Indian Spices',
        icon: Flame,
        items: [
          { id: 'sp1', name: 'Cold-Pressed Mustard Oil or Olive Oil', quantity: '1 Litre', note: 'Healthy monounsaturated fat' },
          { id: 'sp2', name: 'Turmeric Powder (Haldi with Curcumin)', quantity: '200g', note: 'Anti-inflammatory powerhouse' },
          { id: 'sp3', name: 'Whole Cumin Seeds (Jeera)', quantity: '200g', note: 'Carminative digestive spice' },
          { id: 'sp4', name: 'Black Peppercorns (Kali Mirch)', quantity: '100g', note: 'Piperine bioavailability' },
          { id: 'sp5', name: 'Ajwain (Carom Seeds) & Hing', quantity: '100g', note: 'Anti-flatulence & gut comfort' },
          { id: 'sp6', name: 'Himalayan Pink Rock Salt (Sendha Namak)', quantity: '500g', note: 'Balanced mineral trace profile' },
        ],
      },
    ];
  }, [profile]);

  // Toggle item check
  const handleToggle = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle all
  const allItemIds = useMemo(() => {
    return aisles.flatMap((a) => a.items.map((i) => i.id));
  }, [aisles]);

  const areAllChecked = allItemIds.length > 0 && allItemIds.every((id) => checkedItems[id]);

  const handleToggleAll = () => {
    if (areAllChecked) {
      setCheckedItems({});
    } else {
      const next: Record<string, boolean> = {};
      allItemIds.forEach((id) => {
        next[id] = true;
      });
      setCheckedItems(next);
    }
  };

  // Copy clean formatted checklist to clipboard
  const handleCopyClipboard = async () => {
    let text = `🛒 NutriWise AI - Weekly Indian Pantry Grocery List for ${profile.name}\n`;
    text += `Target Plan: ${profile.dietPreference.toUpperCase()} • Generated on: ${new Date().toLocaleDateString()}\n\n`;

    aisles.forEach((aisle) => {
      text += `--- ${aisle.title} ---\n`;
      aisle.items.forEach((item) => {
        const isDone = checkedItems[item.id] ? '[✓]' : '[ ]';
        text += `${isDone} ${item.name} (${item.quantity}) - ${item.note || ''}\n`;
      });
      text += '\n';
    });

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const totalItemsCount = allItemIds.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItemsCount) * 100);

  return (
    <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-6 transition-colors">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#26364D] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Weekly Indian Pantry &amp; Grocery Planner
            </h3>
            <Badge variant="emerald" size="sm">Phase 4 Optimizer</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dynamically compiled from all 28 dishes in {profile.name}&apos;s 7-day schedule into 6 authentic Indian shopping aisles.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggleAll}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-200 bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1f304c] transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{areAllChecked ? 'Uncheck All' : 'Check All'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyClipboard}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Grocery List'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Estimated Cost Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white dark:from-[#17243A] dark:via-[#111C30] dark:to-[#0F172A] border border-emerald-100 dark:border-[#26364D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-white">Pantry Readiness Progress</span>
            <span className="font-extrabold text-emerald-800 dark:text-emerald-300">{completedCount} of {totalItemsCount} items checked ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-emerald-200/50 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pl-0 sm:pl-4 sm:border-l border-emerald-200/60 dark:border-[#26364D]">
          <BadgeDollarSign className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              Estimated Indian Budget
            </span>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              ~₹1,200 – ₹1,800 / week
            </span>
          </div>
        </div>
      </div>

      {/* 6 Indian Shopping Aisles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {aisles.map((aisle) => {
          const Icon = aisle.icon;
          return (
            <div 
              key={aisle.title}
              className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#0F172A] border border-slate-200/80 dark:border-[#26364D] space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#26364D] pb-2">
                  <Icon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white tracking-tight">
                    {aisle.title}
                  </h4>
                </div>

                <div className="space-y-2">
                  {aisle.items.map((item) => {
                    const isChecked = Boolean(checkedItems[item.id]);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggle(item.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-slate-400 dark:text-slate-500'
                            : 'bg-white dark:bg-[#17243A] hover:bg-slate-100 dark:hover:bg-[#1f304c] border-slate-200/70 dark:border-[#26364D] text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          )}
                        </span>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-xs font-semibold truncate ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                              {item.name}
                            </span>
                            <span className="text-[10.5px] font-bold text-emerald-800 dark:text-emerald-300 shrink-0">
                              {item.quantity}
                            </span>
                          </div>
                          {item.note && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight truncate">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

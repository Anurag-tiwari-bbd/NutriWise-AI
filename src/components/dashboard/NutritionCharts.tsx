import React, { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  NutritionMetrics, 
  WeeklyPlan, 
  UserProfile 
} from '../../types/nutrition';
import { Badge } from '../common/Badge';
import { InfoTooltip } from '../common/InfoTooltip';
import { 
  PieChart as PieIcon, 
  BarChart3, 
  Droplets, 
  ShieldCheck, 
  Scale, 
  Flame, 
  Wheat, 
  Plus, 
  Minus 
} from 'lucide-react';

interface NutritionChartsProps {
  metrics: NutritionMetrics;
  plan: WeeklyPlan;
  profile: UserProfile;
}

export const NutritionCharts: React.FC<NutritionChartsProps> = ({
  metrics,
  plan,
  profile,
}) => {
  // Glass tracker state for hydration progress
  const totalGlassesTarget = Math.round(metrics.waterTargetLitres * 4); // ~250ml per glass
  const [consumedGlasses, setConsumedGlasses] = useState(0);

  // Automatically reset water tracker when profile changes
  useEffect(() => {
    setConsumedGlasses(0);
  }, [profile.id]);

  // Macro Donut Data
  const macroData = [
    { 
      name: 'Protein', 
      percent: metrics.macroRatios.proteinPercent, 
      grams: metrics.proteinGrams, 
      calories: Math.round(metrics.proteinGrams * 4),
      color: '#059669', // Emerald
    },
    { 
      name: 'Carbohydrates', 
      percent: metrics.macroRatios.carbsPercent, 
      grams: metrics.carbsGrams, 
      calories: Math.round(metrics.carbsGrams * 4),
      color: '#0d9488', // Teal
    },
    { 
      name: 'Healthy Fats', 
      percent: metrics.macroRatios.fatPercent, 
      grams: metrics.fatGrams, 
      calories: Math.round(metrics.fatGrams * 9),
      color: '#d97706', // Amber
    },
  ];

  // 7-Day Consistency Data
  const weeklyData = plan.days.map((d) => ({
    day: d.dayName.slice(0, 3),
    fullName: d.dayName,
    calories: d.totalCalories,
    protein: d.totalProtein,
    fiber: d.totalFiber,
  }));

  // Average weekly fiber
  const avgFiber = Math.round(
    plan.days.reduce((acc, d) => acc + d.totalFiber, 0) / plan.days.length
  );
  const fiberPercent = Math.min(Math.round((avgFiber / 30) * 100), 100);

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <BarChart3 className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Clinical Nutrition Analytics &amp; Macro Distribution
              </h3>
              <Badge variant="emerald" size="sm">Phase 4 Analytics</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive visualizations of caloric energy, macronutrient splits, and 7-day consistency.
            </p>
          </div>
        </div>
      </div>

      {/* Top Row: Macro Donut Chart & 7-Day Energy Variance Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Caloric Macro Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-[#26364D] shadow-sm flex flex-col justify-between space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#26364D] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Caloric Macro Distribution
              <InfoTooltip termKey="educationalEstimate" size="sm" />
            </span>
            <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
              {metrics.targetCalories} kcal
            </span>
          </div>

          {/* Donut Chart with Centered Target */}
          <div className="relative h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="calories"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: any, name: any, item: any) => [
                    `${value} kcal (${item.payload.grams}g - ${item.payload.percent}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '16px',
                    color: '#ffffff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                  itemStyle={{ color: '#ffffff' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {metrics.targetCalories}
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                kcal / day
              </span>
            </div>
          </div>

          {/* Detailed Macro Pills Breakdown */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            {macroData.map((m) => (
              <div 
                key={m.name}
                className="p-3 rounded-2xl border text-center space-y-0.5"
                style={{ 
                  backgroundColor: `${m.color}0D`,
                  borderColor: `${m.color}33`,
                }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: m.color }}>
                  {m.name}
                </span>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  {m.grams}g
                </div>
                <div className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                  {m.percent}% ({m.calories} kcal)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 7-Day Caloric & Protein Variance Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-[#26364D] shadow-sm flex flex-col justify-between space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-[#26364D] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              7-Day Energy &amp; Protein Consistency
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Safe Caloric Oscillation (±50 kcal) to prevent metabolic plateau
            </span>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.4} />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={{ stroke: '#475569' }} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={{ stroke: '#475569' }} 
                  tick={{ fill: '#94a3b8', fontSize: 10 }} 
                />
                <RechartsTooltip
                  formatter={(val: any, name: any) => [
                    name === 'calories' ? `${val} kcal` : `${val}g`,
                    name === 'calories' ? 'Total Energy' : 'Protein',
                  ]}
                  labelFormatter={(label) => {
                    const item = weeklyData.find((d) => d.day === label);
                    return item ? item.fullName : label;
                  }}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '16px',
                    color: '#ffffff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                />
                <Bar 
                  dataKey="calories" 
                  fill="#059669" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={36} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-[#26364D]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block" />
              <span>Daily Meal Energy Total (kcal)</span>
            </div>
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Weekly Avg: ~{Math.round(weeklyData.reduce((a, b) => a + b.calories, 0) / 7)} kcal/day
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Micronutrient & Health Indicator Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Gauge 1: Prebiotic Dietary Fiber Progress */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Dietary Fiber Standard
              <InfoTooltip termKey="dietaryFiber" size="sm" />
            </span>
            <Badge variant="emerald" size="sm">ICMR Target</Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                ~{avgFiber}g <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/ 30g goal</span>
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {fiberPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${fiberPercent}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Sourced naturally from whole pulses, flaxseed, and green leafy vegetables for optimal short-chain fatty acid (SCFA) gut fermentation.
          </p>
        </div>

        {/* Gauge 2: Sodium Restriction / DASH Guideline */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Sodium Safety Ceiling
              <InfoTooltip termKey="dietaryCaution" size="sm" />
            </span>
            <Badge 
              variant={profile.healthConditions.includes('hypertension') ? 'amber' : 'slate'} 
              size="sm"
            >
              {profile.healthConditions.includes('hypertension') ? 'DASH Active' : 'Normal Limit'}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                &lt; 2,000 <span className="text-xs font-normal text-slate-400 dark:text-slate-500">mg / day</span>
              </span>
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                Clinical Cap
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Restricts added table salt, processed papads, and canned pickles. Prioritizes natural potassium to relax arterial tension.
          </p>
        </div>

        {/* Gauge 3: Interactive Daily Hydration Tracker */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              Daily Water Hydration
              <InfoTooltip termKey="hydrationTarget" size="sm" />
            </span>
            <span className="text-xs font-extrabold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800/60">
              {metrics.waterTargetLitres} L / day
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {consumedGlasses}{' '}
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">/ {totalGlassesTarget} glasses logged</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setConsumedGlasses((prev) => Math.max(prev - 1, 0))}
                  className="p-1 rounded-lg bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1f304c] text-slate-600 dark:text-slate-200 transition-colors"
                  aria-label="Decrease logged glass"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setConsumedGlasses((prev) => Math.min(prev + 1, totalGlassesTarget + 4))}
                  className="p-1 rounded-lg bg-sky-100 dark:bg-sky-950/60 hover:bg-sky-200 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 transition-colors"
                  aria-label="Increase logged glass"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(Math.round((consumedGlasses / totalGlassesTarget) * 100), 100)}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Computed at 35 ml/kg for optimal cellular filtration. Click (+) after every ~250 ml glass consumed.
          </p>
        </div>
      </div>
    </div>
  );
};

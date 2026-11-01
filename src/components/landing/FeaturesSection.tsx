import React from 'react';
import { 
  Calculator, 
  UtensilsCrossed, 
  AlertTriangle, 
  Droplets, 
  Repeat, 
  FileDown, 
  Sparkles 
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { InfoTooltip } from '../common/InfoTooltip';
import { TermKey } from '../../data/plainLanguageTerms';

export const FeaturesSection: React.FC = () => {
  const features: Array<{
    icon: React.ReactNode;
    bg: string;
    title: string;
    badge: string;
    description: string;
    termKey?: TermKey;
  }> = [
    {
      icon: <Calculator className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
      title: 'Mifflin-St Jeor BMR & TDEE Math',
      badge: 'Evidence-Informed Estimate',
      description: 'Estimates resting and total daily energy expenditure based on biometrics, activity multipliers, and moderate calorie adjustments.',
      termKey: 'bmr',
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50',
      title: '55+ Indian Food Database',
      badge: 'Hindi + English',
      description: 'Realistic dishes—from Dal Tadka, Palak Paneer, and Khichdi to Moong Sprouts and Multigrain Rotis with accurate macro breakdowns.',
      termKey: 'personalizedNutrition',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
      title: 'Dietary Preference & Caution Filters',
      badge: 'Dietary Cautions',
      description: 'Applies dietary caution rules such as prioritizing lower-GI carbs for diabetes awareness, moderating sodium, and excluding dairy for lactose intolerance.',
      termKey: 'dietaryCaution',
    },
    {
      icon: <Droplets className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50',
      title: 'Persistent Water Tracker',
      badge: 'LocalStorage',
      description: 'Dynamic hydration target based on body weight with one-tap +250ml logging buttons and real-time visual progress percentage.',
      termKey: 'localStorage',
    },
    {
      icon: <Repeat className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50',
      title: 'Interactive Meal Swaps',
      badge: 'Flexibility',
      description: 'Do not like a suggested dish? Click "Swap Item" to select from safe alternative dishes matching the identical calorie and macro profile.',
      termKey: 'mealSwaps',
    },
    {
      icon: <FileDown className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-50',
      title: 'Nutrition Summary PDF',
      badge: 'jsPDF + html2canvas',
      description: 'Download a clean nutrition summary chart with estimated BMR vitals, macro distribution, and 7-day meal schedule for offline review.',
      termKey: 'pdfReport',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white dark:bg-[#0B1220] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="emerald" size="md" icon={<Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}>
            Core Engineering Features
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Reliable, Personalized Nutrition Guidance
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every module in NutriWise AI is built with modular TypeScript components and zero external API dependencies, ensuring fast local calculations after the app is loaded.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-emerald-200 dark:bg-[#111C30] dark:border-[#26364D] dark:hover:bg-[#17243A] dark:hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${feat.bg} dark:bg-opacity-20 flex items-center justify-center transition-transform group-hover:scale-110`}>
                    {feat.icon}
                  </div>
                  <Badge variant="slate" size="sm">{feat.badge}</Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center">
                  <span>{feat.title}</span>
                  {feat.termKey && <InfoTooltip termKey={feat.termKey} size="sm" />}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-[#26364D] flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Computed locally in browser</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

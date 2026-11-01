import React from 'react';
import { 
  Globe2, 
  Heart, 
  Activity, 
  AlertCircle, 
  ShieldCheck, 
  TrendingUp, 
  Apple, 
  Droplet 
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { InfoTooltip } from '../common/InfoTooltip';

export const SDGImpactSection: React.FC = () => {
  return (
    <section id="sdg-impact-section" className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0B1220] dark:via-[#0F172A] dark:to-[#0B1220] border-y border-slate-200/80 dark:border-[#26364D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2">
            <Badge variant="mint" size="md" icon={<Globe2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />}>
              United Nations Framework
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center flex-wrap gap-1">
            <span>Aligned with <span className="text-emerald-600 dark:text-emerald-400">UN SDG 3</span>: Good Health and Well-being</span>
            <InfoTooltip termKey="sdg3" size="md" />
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Non-Communicable Diseases (NCDs) such as cardiovascular disease, Type 2 diabetes, and hypertension account for a substantial burden of chronic health challenges in India. NutriWise AI provides educational dietary guidance and awareness to support balanced nutritional lifestyle choices.
          </p>
          <span className="inline-block text-[11px] text-slate-400 dark:text-slate-400 font-medium">
            Reference context: WHO India Noncommunicable Diseases Profile & ICMR Guidelines
          </span>
        </div>

        {/* 3 Pillars of SDG 3 Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Pillar 1: Target 3.4 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-card dark:shadow-none hover:shadow-lg dark:hover:border-emerald-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                SDG Target 3.4
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <span>Dietary Awareness for Lifestyle Conditions</span>
                <InfoTooltip termKey="dietaryCaution" size="sm" />
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Suggests balanced macronutrient distributions prioritizing complex carbohydrates and healthy fats, supporting dietary caution awareness for glycemic and metabolic wellness.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-[#26364D] flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <span>✓ Dietary caution heuristics</span>
            </div>
          </div>

          {/* Pillar 2: Preventative Nutrition Literacy */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-card dark:shadow-none hover:shadow-lg dark:hover:border-teal-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold text-lg">
              <Apple className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Preventative Science
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <span>Sustainable Caloric Estimation</span>
                <InfoTooltip termKey="calorieTarget" size="sm" />
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Encourages steady nutritional habits rather than restrictive crash diets by estimating Basal Metabolic Rate (BMR) and establishing baseline calorie reference thresholds (~1,200 kcal female / ~1,500 kcal male).
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-[#26364D] flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-400">
              <span>✓ Baseline calorie reference thresholds</span>
            </div>
          </div>

          {/* Pillar 3: Accessible & Indian Food Grounding */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#111C30] border border-slate-200/90 dark:border-[#26364D] shadow-card dark:shadow-none hover:shadow-lg dark:hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Cultural Inclusion
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Culturally Adapted Indian Cuisines
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Western diets often prescribe inaccessible ingredients. NutriWise AI relies on familiar staple foods—dal, roti, paneer, sprouts, curd, millets, and seasonal sabzi—making nutrition practical and sustainable.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-[#26364D] flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400">
              <span>✓ Vegetarian, Jain & Regional friendly</span>
            </div>
          </div>

        </div>

        {/* Statistical Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 p-8 sm:p-10 text-white shadow-xl border border-slate-800 dark:border-[#26364D]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                77M+
              </div>
              <div className="text-xs font-medium text-slate-300">
                Adults Living with Diabetes in India
              </div>
              <div className="text-[10px] text-slate-400">
                (Source: ICMR-INDIAB Study)
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300">
                1 in 5
              </div>
              <div className="text-xs font-medium text-slate-300">
                Estimated PCOS Prevalence in Reproductive Age Women in India
              </div>
              <div className="text-[10px] text-slate-400">
                (Source: AIIMS / Endocrine Society of India)
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
                ~450 kcal
              </div>
              <div className="text-xs font-medium text-slate-300">
                Moderate calorie adjustment (estimate) for gradual change
              </div>
              <div className="text-[10px] text-slate-400">
                (Source: ICMR Dietary Guidelines for Indians)
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
                100%
              </div>
              <div className="text-xs font-medium text-slate-300">
                Client-side local calculation — no external API required
              </div>
              <div className="text-[10px] text-slate-400">
                (Runs entirely in your web browser)
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

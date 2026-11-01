import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Activity
} from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';

interface HeroSectionProps {
  onStartAssessment: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToSDG: () => void;
  onOpenVivaDefense?: () => void;
  hasActiveProfile?: boolean;
  activeProfileName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAssessment,
  onScrollToHowItWorks,
  onOpenVivaDefense,
  hasActiveProfile,
  activeProfileName,
}) => {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-white dark:bg-[#0B1220] transition-colors">
      {/* Background Soft Glow Accents */}
      {/* 1. Large, Smooth Multi-Stop Radial Gradient Layer on Full-Width Wrapper */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle 700px at 0% 100%, rgba(16, 185, 129, 0.16) 0%, rgba(45, 212, 191, 0.10) 28%, rgba(167, 243, 208, 0.04) 55%, transparent 75%),
            radial-gradient(circle 650px at 100% 45%, rgba(20, 184, 166, 0.15) 0%, rgba(52, 211, 153, 0.09) 28%, rgba(153, 246, 228, 0.03) 55%, transparent 75%)
          `,
        }}
        aria-hidden="true"
      />

      {/* 2. Soft Ambient Diffuse Glow Orbs for Natural Atmospheric Depth */}
      <div 
        className="absolute -bottom-24 -left-20 w-80 sm:w-96 lg:w-[500px] h-80 sm:h-96 lg:h-[500px] bg-gradient-to-tr from-emerald-300/25 via-teal-200/20 to-transparent dark:from-emerald-500/10 dark:via-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 -right-20 w-80 sm:w-96 lg:w-[480px] h-80 sm:h-96 lg:h-[480px] bg-gradient-to-bl from-teal-300/25 via-emerald-200/20 to-transparent dark:from-teal-500/10 dark:via-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Hero Content */}
        <div className="max-w-5xl mx-auto text-center space-y-7 sm:space-y-9">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[66px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            AI-Powered Nutrition<br className="hidden sm:inline" /> Recommendation for{' '}
            <span className="text-[#059669] dark:text-emerald-400 inline-flex items-center whitespace-nowrap">
              Indian Diets
              <InfoTooltip termKey="personalizedNutrition" size="md" />
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            Estimate your BMR<InfoTooltip termKey="bmr" size="sm" /> &amp; TDEE<InfoTooltip termKey="tdee" size="sm" /> using the{' '}
            <strong className="text-slate-800 dark:text-white font-bold">Mifflin-St Jeor estimation equation</strong>
            <br className="hidden sm:inline" />
            {' '}and receive a customized{' '}
            <strong className="text-slate-800 dark:text-white font-bold">7-day Indian meal plan</strong> tailored to your health goals,
            <br className="hidden sm:inline" />
            {' '}allergies, and lifestyle.
          </p>

          {/* 4 Feature Highlights in a Single Horizontal Row */}
          <div className="pt-2 sm:pt-4">
            <div className="flex flex-wrap lg:flex-nowrap items-start justify-center gap-6 lg:gap-8 max-w-6xl mx-auto text-left text-slate-700 dark:text-slate-300 text-xs sm:text-[13px] leading-snug">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-2.5 max-w-[210px]">
                <CheckCircle2 className="w-5 h-5 text-[#059669] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Vegetarian, Jain, Vegan &amp; Non-Veg options</span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-2.5 max-w-[240px]">
                <CheckCircle2 className="w-5 h-5 text-[#059669] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Local, rule-based recommendation engine — no external API required
                  <InfoTooltip termKey="ruleBasedEngine" size="sm" />
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-2.5 max-w-[230px]">
                <CheckCircle2 className="w-5 h-5 text-[#059669] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Selected dietary cautions (e.g., diabetes, PCOS, hypertension)
                  <InfoTooltip termKey="dietaryCaution" size="sm" />
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-2.5 max-w-[210px]">
                <CheckCircle2 className="w-5 h-5 text-[#059669] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Nutrition Summary PDF export with estimated macros</span>
              </div>

            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Button */}
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5"
            >
              <span>{hasActiveProfile ? `View / Retake Assessment (${activeProfileName})` : 'Start Free Assessment'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={onScrollToHowItWorks}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-[#111C30] hover:bg-slate-50 dark:hover:bg-[#17243A] text-slate-800 dark:text-slate-100 font-bold text-base border border-slate-200/90 dark:border-[#26364D] shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Clinical Algorithm & Formula Inspector Pill */}
          {onOpenVivaDefense && (
            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenVivaDefense}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800/80 transition-all shadow-2xs hover:scale-[1.02] group"
                title="Open Clinical Algorithm Inspector: View live Mifflin-St Jeor math & rule firing audit"
              >
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Clinical Algorithm &amp; Formula Inspector</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

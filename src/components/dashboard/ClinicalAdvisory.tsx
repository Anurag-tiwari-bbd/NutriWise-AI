import React from 'react';
import { 
  HeartHandshake, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Footprints, 
  UtensilsCrossed, 
  Moon, 
  Flame, 
  Heart,
  Droplets,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, NutritionMetrics } from '../../types/nutrition';
import { Badge } from '../common/Badge';
import { InfoTooltip } from '../common/InfoTooltip';

interface ClinicalAdvisoryProps {
  profile: UserProfile;
  metrics: NutritionMetrics;
}

export const ClinicalAdvisory: React.FC<ClinicalAdvisoryProps> = ({
  profile,
  metrics,
}) => {
  const hasDiabetes = profile.healthConditions.includes('diabetes');
  const hasHypertension = profile.healthConditions.includes('hypertension');
  const hasPCOS = profile.healthConditions.includes('pcos');
  const hasThyroid = profile.healthConditions.includes('thyroid');
  const hasLactose = profile.healthConditions.includes('lactose_intolerance');

  return (
    <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-6 transition-colors">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#26364D] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
            <HeartHandshake className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Evidence-Based Clinical &amp; Lifestyle Advisory
              </h3>
              <Badge variant="mint" size="sm">ICMR/WHO Aligned</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized medical lifestyle interventions customized to {profile.name}&apos;s profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="sm">
            {profile.healthGoal.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Advisory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Diabetes Post-Prandial Protocol */}
        {hasDiabetes && (
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                Glucose Excursion Protocol
              </span>
              <Badge variant="amber" size="sm">Diabetes</Badge>
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
              <strong>15-Minute Post-Meal Walk:</strong> A light, non-strenuous 15-minute stroll immediately following lunch and dinner activates GLUT-4 glucose transporters in skeletal muscle, reducing postprandial glucose spikes by up to 35%.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-amber-900 dark:text-amber-300">
              🍽️ <strong>Meal Sequencing:</strong> Salad/Fiber first ➔ Dal/Protein second ➔ Roti/Rice last.
            </div>
          </div>
        )}

        {/* Card 2: Hypertension DASH Sodium Protocol */}
        {hasHypertension && (
          <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-950 dark:text-teal-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                DASH Sodium Budgeting
              </span>
              <Badge variant="mint" size="sm">Hypertension</Badge>
            </div>
            <p className="text-xs text-teal-900 dark:text-teal-300 leading-relaxed">
              <strong>Hidden Sodium Audit:</strong> Eliminate packaged namkeens, papads, and mango pickles which account for ~60% of excess dietary sodium. Keep added table salt strictly under 1 level teaspoon (~4g salt / &lt;1,800mg sodium) per day.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-teal-900 dark:text-teal-300">
              🥥 <strong>Potassium Balance:</strong> Natural coconut water, bottle gourd (lauki), and spinach help dilate blood vessels.
            </div>
          </div>
        )}

        {/* Card 3: PCOS Hormonal Sensitivity */}
        {hasPCOS && (
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                PCOS Circadian &amp; Hormone Care
              </span>
              <Badge variant="emerald" size="sm">PCOS Care</Badge>
            </div>
            <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
              <strong>Spearmint &amp; Cinnamon Infusions:</strong> Drinking steeped spearmint tea and warm cinnamon water helps reduce free testosterone and enhances peripheral insulin sensitivity in ovarian tissues.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-emerald-900 dark:text-emerald-300">
              😴 <strong>Circadian Sleep:</strong> Aim for 7.5–8 hours of consistent sleep to normalize cortisol and LH/FSH ratios.
            </div>
          </div>
        )}

        {/* Card 4: Lactose Intolerance Protocol */}
        {hasLactose && (
          <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-200 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                Dairy-Free Calcium Fortification
              </span>
              <Badge variant="slate" size="sm">Lactose-Free</Badge>
            </div>
            <p className="text-xs text-sky-900 dark:text-sky-300 leading-relaxed">
              <strong>Non-Dairy Calcium Sources:</strong> Incorporate roasted white sesame seeds (til - 1 tsp daily), finger millet (ragi), firm organic tofu, and fortified plant milks to easily exceed the 800mg/day RDA for calcium without lactose distress.
            </p>
            <div className="pt-1 text-[11px] font-semibold text-sky-900 dark:text-sky-300">
              🌱 <strong>Zero Bloating:</strong> All meals in your plan strictly omit milk, paneer, and curd.
            </div>
          </div>
        )}

        {/* Card 5: General Metabolic Pacing (Weight Loss or Gain) */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200/80 dark:border-[#26364D] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              Metabolic Rate Protection
            </span>
            <Badge variant="slate" size="sm">Pacing</Badge>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {profile.healthGoal === 'weight_loss' ? (
              <>
                <strong className="text-slate-900 dark:text-white">Preserving Resting Metabolic Rate (RMR):</strong> A moderate 450 kcal deficit avoids leptin crashes and thyroid suppression. Never engage in crash starvation diets below your calculated safety floor ({profile.gender === 'female' ? '1,200 kcal' : '1,500 kcal'}).
              </>
            ) : profile.healthGoal === 'weight_gain' ? (
              <>
                <strong className="text-slate-900 dark:text-white">Clean Hypertrophic Surplus:</strong> Your +300 to +400 kcal surplus is calibrated to prioritize lean muscle hypertrophy over visceral adipose accumulation when paired with 3-4 days of progressive resistance training.
              </>
            ) : (
              <>
                <strong className="text-slate-900 dark:text-white">Isocaloric Maintenance Stability:</strong> Your caloric budget sustains body mass at steady-state equilibrium while improving body composition through high-fiber and optimal protein density.
              </>
            )}
          </div>
          <div className="pt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            ⚖️ <strong>Weigh-in Protocol:</strong> Check body weight once a week on an empty stomach after waking.
          </div>
        </div>

        {/* Card 6: Doctor & Clinical Review Note */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-teal-50/60 dark:from-[#17243A] dark:to-[#111C30] border border-emerald-200/70 dark:border-[#26364D] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Doctor / Clinical Dietitian Review
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This personalized plan is an educational decision-support framework aligned with ICMR-NIN &amp; WHO guidelines. If you take prescription medications (e.g. Metformin, Insulin, ACE inhibitors), consult your physician before making rapid macronutrient shifts.
            </p>
          </div>
          <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">
            ✓ Clinical Decision Support Ready
          </div>
        </div>
      </div>
    </div>
  );
};

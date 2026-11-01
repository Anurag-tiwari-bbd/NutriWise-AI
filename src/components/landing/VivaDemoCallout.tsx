import React from 'react';
import { 
  Sparkles, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  Activity
} from 'lucide-react';
import { DEMO_PROFILES } from '../../data/demoProfiles';
import { UserProfile } from '../../types/nutrition';
import { Badge } from '../common/Badge';

interface VivaDemoCalloutProps {
  onSelectDemoProfile: (profile: UserProfile) => void;
  onStartAssessment: () => void;
  onOpenVivaDefense?: () => void;
}

export const VivaDemoCallout: React.FC<VivaDemoCalloutProps> = ({
  onSelectDemoProfile,
  onStartAssessment,
  onOpenVivaDefense,
}) => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0B1220] border-t border-slate-200/80 dark:border-[#26364D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-emerald-800/40 dark:border-[#26364D]">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="mint" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-teal-300" />}>
                Clinical Scenario Simulator
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Try Instant Demo Scenarios with Pre-configured Profiles
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Explore how NutriWise AI personalizes nutrition across diverse demographics, dietary practices, and clinical conditions by selecting a sample profile below.
            </p>

            {/* Clinical Algorithm & Formula Inspector Dedicated Callout Card */}
            {onOpenVivaDefense && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-400/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Activity className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-white">
                        Clinical Algorithm &amp; Formula Inspector
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wide">
                        Transparency Audit
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Audit live Mifflin-St Jeor arithmetic substitution, inspect the deterministic rule-firing log, and cross-reference UN SDG 3.4 evidence mapping.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenVivaDefense}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02]"
                >
                  <Activity className="w-4 h-4" />
                  <span>Launch Inspector</span>
                </button>
              </div>
            )}

            {/* Persona Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {DEMO_PROFILES.map((p) => {
                const getProfileSummary = () => {
                  if (p.id.includes('rajesh')) {
                    return 'Rajesh Sharma, 48 — vegetarian preference, selected diabetes and hypertension dietary cautions.';
                  }
                  if (p.id.includes('priya')) {
                    return 'Priya Patel, 26 — Jain preference, selected PCOS dietary cautions.';
                  }
                  return 'Aman Verma, 22 — non-vegetarian preference, selected lactose intolerance dietary cautions.';
                };

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectDemoProfile(p)}
                    className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-emerald-400/50 backdrop-blur-sm cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                          Sample Profile
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-300">
                          {p.age} years • {p.gender} • {p.weightKg}kg ({p.heightCm}cm)
                        </div>
                      </div>

                      <div className="text-xs text-emerald-200/90 font-medium leading-relaxed">
                        {getProfileSummary()}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-300">
                      <span>Load Scenario Plan</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Alternative Link */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Deterministic clinical rules provide consistent, transparent, and reproducible nutritional plans.</span>
              </div>
              <button
                onClick={onStartAssessment}
                className="font-bold text-white hover:text-emerald-300 underline underline-offset-4 transition-colors"
              >
                Or enter custom biometrics manually →
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

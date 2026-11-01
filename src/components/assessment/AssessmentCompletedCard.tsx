import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Activity, 
  ShieldCheck, 
  Scale, 
  Flame, 
  UserPlus,
  Sparkles,
  HeartPulse,
  History
} from 'lucide-react';
import { UserProfile, NutritionMetrics } from '../../types/nutrition';
import { Badge } from '../common/Badge';

interface AssessmentCompletedCardProps {
  profile: UserProfile;
  metrics: NutritionMetrics;
  onGoToDashboard: () => void;
  onReassess: () => void;
  onStartFresh: () => void;
  onOpenHistory?: () => void;
}

export const AssessmentCompletedCard: React.FC<AssessmentCompletedCardProps> = ({
  profile,
  metrics,
  onGoToDashboard,
  onReassess,
  onStartFresh,
  onOpenHistory,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in space-y-6">
      {/* Main Status Container */}
      <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-[#26364D] shadow-xl space-y-6 relative overflow-hidden transition-colors">
        {/* Subtle decorative background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 dark:bg-emerald-950/30 rounded-full blur-3xl -z-10 pointer-events-none opacity-70" />

        {/* Top Status Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-md shadow-emerald-600/10 ring-4 ring-emerald-50 dark:ring-emerald-950/40">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="emerald" size="sm">
                ASSESSMENT COMPLETED &amp; ACTIVE
              </Badge>
              <Badge variant="mint" size="sm">
                {profile.dietPreference.toUpperCase()}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Health Assessment Already Completed
            </h1>
            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
              आपका न्यूट्रिशन असेसमेंट सफलतापूर्वक सेव हो चुका है
            </p>
          </div>
        </div>

        {/* Reassuring Clinical Explanatory Paragraph */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#17243A]/60 border border-slate-200 dark:border-[#26364D] text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
          <p>
            You have already submitted your health and biometrics assessment for{' '}
            <strong className="text-slate-900 dark:text-white font-bold">{profile.name}</strong>. Your customized{' '}
            <strong className="text-emerald-800 dark:text-emerald-300 font-bold">7-day Indian meal schedule</strong>,{' '}
            <strong className="text-teal-800 dark:text-teal-300 font-bold">Recharts metabolic analytics</strong>, and{' '}
            <strong className="text-amber-800 dark:text-amber-300 font-bold">pantry grocery checklist</strong> are fully active and saved in your session.
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-[12px]">
            You do not need to fill out this form again to use NutriWise AI. If your body weight, health cautions, or dietary preferences have changed, you can update your assessment anytime.
          </p>
        </div>

        {/* Active Profile Snapshot Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-emerald-200/80 dark:border-[#26364D] shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-emerald-100 dark:border-[#26364D] pb-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 dark:text-emerald-300">
                Active Profile Snapshot: {profile.name}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Goal: {profile.healthGoal.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#26364D]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Age &amp; Gender</span>
              <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white capitalize">
                {profile.age}y • {profile.gender}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#26364D]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Height &amp; Weight</span>
              <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                {profile.heightCm}cm • {profile.weightKg}kg
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#26364D]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">BMI &amp; Category</span>
              <span className="font-extrabold text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">
                {metrics.bmi} ({metrics.bmiCategory})
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-100 dark:border-[#26364D]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Daily Target</span>
              <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                {metrics.targetCalories} kcal
              </span>
            </div>
          </div>

          {profile.healthConditions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Active Dietary Cautions:</span>
              {profile.healthConditions.map((cond) => (
                <span
                  key={cond}
                  className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800/60 capitalize"
                >
                  {cond.replace('_', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Primary CTA: Go to Dashboard */}
          <button
            type="button"
            onClick={onGoToDashboard}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <span>Go to Nutrition Dashboard</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Give Assessment Again */}
          <button
            type="button"
            onClick={onReassess}
            className="py-3.5 px-5 rounded-2xl bg-white dark:bg-[#17243A] hover:bg-slate-100 dark:hover:bg-[#1f304c] text-slate-800 dark:text-white font-bold text-sm border border-slate-300 dark:border-[#26364D] shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Re-Assess / Edit</span>
          </button>

          {/* Sub-option: Past Records Vault */}
          {onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              className="py-3.5 px-4 rounded-2xl bg-slate-50 dark:bg-[#17243A]/80 hover:bg-slate-100 dark:hover:bg-[#1f304c] text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-[#26364D] shadow-xs transition-all flex items-center justify-center gap-2"
              title="View saved assessment records vault"
            >
              <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Past Records</span>
            </button>
          )}
        </div>

        {/* Bottom subtle action: Start fresh for another person */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-[#26364D]">
          <button
            type="button"
            onClick={onStartFresh}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Want to create an assessment for a different family member? Start fresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

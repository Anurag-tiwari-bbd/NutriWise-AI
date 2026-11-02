import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MedicalDisclaimerModal } from './components/common/MedicalDisclaimerModal';
import { LandingPage } from './components/landing/LandingPage';
import { UserProfile, NutritionMetrics, WeeklyPlan, MealItem, AssessmentRecord } from './types/nutrition';
import { calculateNutritionMetrics } from './utils/calculations';
import { generateWeeklyPlan } from './utils/recommendationEngine';
import { WeeklyPlanPreview } from './components/dashboard/WeeklyPlanPreview';
import { NutritionCharts } from './components/dashboard/NutritionCharts';
import { GroceryPlanner } from './components/dashboard/GroceryPlanner';
import { ClinicalAdvisory } from './components/dashboard/ClinicalAdvisory';
import { exportClinicalNutritionReport } from './utils/pdfExport';
import { AssessmentWizard } from './components/assessment/AssessmentWizard';
import { AssessmentCompletedCard } from './components/assessment/AssessmentCompletedCard';
import { RecipeDetailModal } from './components/modals/RecipeDetailModal';
import { ThemeToggle } from './components/common/ThemeToggle';
import { FastingModeToggle } from './components/dashboard/FastingModeToggle';
import { FastingMode, adaptPlanForFasting } from './utils/fastingEngine';
import { FoodExplorer } from './components/explorer/FoodExplorer';
import { VivaDefenseModal } from './components/common/VivaDefenseModal';
import { AssessmentHistoryModal } from './components/history/AssessmentHistoryModal';
import { saveAssessmentRecord } from './utils/historyStorage';
import { getAccurateTimestamp } from './utils/timeService';
import { DEMO_PROFILES } from './data/demoProfiles';
import { INDIAN_MEALS } from './data/indianMeals';
import { 
  Sparkles, 
  ArrowLeft, 
  Activity, 
  CheckCircle, 
  Scale, 
  Flame, 
  Droplets,
  HeartHandshake,
  Download,
  Loader2,
  BookOpen,
  GraduationCap,
  History
} from 'lucide-react';
import { Badge } from './components/common/Badge';
import { InfoTooltip } from './components/common/InfoTooltip';

export interface AppNavState {
  view: 'landing' | 'assessment' | 'dashboard' | 'explorer';
  isReassessing?: boolean;
  modal?: 'inspector' | 'history' | 'disclaimer' | null;
  recipeId?: string | null;
  hash?: string | null;
}

const getUrlForNavState = (state: AppNavState): string => {
  const params = new URLSearchParams();
  if (state.view !== 'landing') {
    params.set('view', state.view);
  }
  if (state.isReassessing) {
    params.set('reassess', '1');
  }
  if (state.modal) {
    params.set('modal', state.modal);
  }
  if (state.recipeId) {
    params.set('recipe', state.recipeId);
  }
  const qs = params.toString();
  const hashPart = state.hash || '';
  return qs ? `${window.location.pathname}?${qs}${hashPart}` : `${window.location.pathname}${hashPart}`;
};

const getNavStateFromUrl = (): AppNavState => {
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view');
  const validViews = ['landing', 'assessment', 'dashboard', 'explorer'] as const;
  const view = (viewParam && (validViews as readonly string[]).includes(viewParam))
    ? (viewParam as 'landing' | 'assessment' | 'dashboard' | 'explorer')
    : 'landing';

  const isReassessing = params.get('reassess') === '1';

  const modalParam = params.get('modal');
  const validModals = ['inspector', 'history', 'disclaimer'] as const;
  const modal = (modalParam && (validModals as readonly string[]).includes(modalParam))
    ? (modalParam as 'inspector' | 'history' | 'disclaimer')
    : null;

  const recipeId = params.get('recipe') || null;
  const hash = window.location.hash || null;

  return { view, isReassessing, modal, recipeId, hash };
};

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'landing' | 'assessment' | 'dashboard' | 'explorer'>('landing');
  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
  const [activeMetrics, setActiveMetrics] = useState<NutritionMetrics | null>(null);
  const [activePlan, setActivePlan] = useState<WeeklyPlan | null>(null);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [selectedMealForRecipe, setSelectedMealForRecipe] = useState<MealItem | null>(null);
  const [fastingMode, setFastingMode] = useState<FastingMode>('none');
  const [isReassessing, setIsReassessing] = useState(false);

  // Keep a ref to current nav state to avoid race conditions and redundant pushStates
  const navStateRef = useRef<AppNavState>({
    view: 'landing',
    isReassessing: false,
    modal: null,
    recipeId: null,
    hash: null,
  });

  // Apply a nav state to React state
  const applyNavState = useCallback((target: AppNavState) => {
    setActiveView(target.view);
    setIsReassessing(Boolean(target.isReassessing));

    setIsDefenseModalOpen(target.modal === 'inspector');
    setIsHistoryModalOpen(target.modal === 'history');
    setIsDisclaimerOpen(target.modal === 'disclaimer');

    if (target.recipeId) {
      const found = INDIAN_MEALS.find(
        (m) => m.id === target.recipeId || m.nameEn.toLowerCase() === target.recipeId?.toLowerCase()
      );
      setSelectedMealForRecipe(found || null);
    } else {
      setSelectedMealForRecipe(null);
    }

    if (target.hash === '#how-it-works') {
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, []);

  // Central navigate function that synchronizes with window.history
  const navigateTo = useCallback((next: Partial<AppNavState>, options?: { replace?: boolean }) => {
    const current = navStateRef.current;
    const target: AppNavState = {
      view: next.view !== undefined ? next.view : current.view,
      isReassessing: next.isReassessing !== undefined ? next.isReassessing : false,
      modal: next.modal !== undefined ? next.modal : null,
      recipeId: next.recipeId !== undefined ? next.recipeId : null,
      hash: next.hash !== undefined ? next.hash : null,
    };

    // If target is completely identical to current, don't push a duplicate history entry
    if (
      target.view === current.view &&
      Boolean(target.isReassessing) === Boolean(current.isReassessing) &&
      target.modal === current.modal &&
      target.recipeId === current.recipeId &&
      target.hash === current.hash
    ) {
      return;
    }

    const previousView = current.view;
    navStateRef.current = target;
    applyNavState(target);

    const url = getUrlForNavState(target);
    if (options?.replace) {
      window.history.replaceState(target, '', url);
    } else {
      window.history.pushState(target, '', url);
    }

    if (target.view !== previousView && !target.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [applyNavState]);

  // Central close handler for info modals
  const handleCloseModal = useCallback(() => {
    if (window.history.state && window.history.state.modal) {
      window.history.back();
    } else {
      navigateTo({ modal: null }, { replace: true });
    }
  }, [navigateTo]);

  // Central close handler for recipe detail drawer
  const handleCloseRecipeModal = useCallback(() => {
    if (window.history.state && window.history.state.recipeId) {
      window.history.back();
    } else {
      navigateTo({ recipeId: null }, { replace: true });
    }
  }, [navigateTo]);

  // View navigation handler from navbar or footer
  const handleNavigateView = useCallback((
    view: 'landing' | 'assessment' | 'dashboard' | 'explorer',
    reassess?: boolean
  ) => {
    navigateTo({
      view,
      isReassessing: Boolean(reassess),
      modal: null,
      recipeId: null,
      hash: null,
    });
  }, [navigateTo]);

  // Dynamically adapt active plan if user switches to a Cultural Fasting Mode
  const displayedPlan = useMemo(() => {
    if (!activePlan || !activeProfile) return null;
    return adaptPlanForFasting(activePlan, activeProfile, fastingMode);
  }, [activePlan, activeProfile, fastingMode]);

  // Restore saved active session from LocalStorage and sync initial history state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nutriwise_active_session');
      if (saved) {
        const { profile, metrics, plan } = JSON.parse(saved);
        // CRITICAL: Demo profiles are transient evaluation personas and MUST NOT restore on fresh app open!
        const isDemo = profile?.id?.startsWith('demo-') || profile?.isDemo;
        if (isDemo) {
          // Permanently purge any leftover demo profile from localStorage
          localStorage.removeItem('nutriwise_active_session');
          setActiveProfile(null);
          setActiveMetrics(null);
          setActivePlan(null);
        } else if (profile && metrics && plan) {
          // Genuine personal user profile: automatically restore
          setActiveProfile(profile);
          setActiveMetrics(metrics);
          setActivePlan(plan);
        }
      }
    } catch {
      // Ignore parse error
    }

    const initial = getNavStateFromUrl();
    navStateRef.current = initial;
    applyNavState(initial);
    // Stamp the initial history entry with replaceState
    window.history.replaceState(initial, '', getUrlForNavState(initial));

    const handlePopState = (event: PopStateEvent) => {
      const state: AppNavState = event.state || getNavStateFromUrl();
      const prevView = navStateRef.current.view;
      navStateRef.current = state;
      applyNavState(state);
      if (state.view !== prevView && !state.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [applyNavState]);

  // Handle selecting a sample demo profile
  const handleSelectDemoProfile = async (profile: UserProfile) => {
    const metrics = calculateNutritionMetrics(profile);
    const plan = generateWeeklyPlan(profile, metrics);
    setActiveProfile(profile);
    setActiveMetrics(metrics);
    setActivePlan(plan);
    setFastingMode('none');

    // DO NOT save demo profile to permanent localStorage!
    // Demo profiles are purely for exploring the app and should never persist across app exits.
    try {
      const existing = localStorage.getItem('nutriwise_active_session');
      if (existing) {
        const parsed = JSON.parse(existing);
        if (parsed.profile?.id?.startsWith('demo-')) {
          localStorage.removeItem('nutriwise_active_session');
        }
      }
    } catch {
      // Ignore
    }

    // Capture online network timestamp with offline device fallback
    const timeInfo = await getAccurateTimestamp();

    // Archive to persistent assessment history vault marked as demo
    saveAssessmentRecord({
      id: `rec-${profile.id}-${Date.now()}`,
      timestamp: timeInfo.timestamp,
      profile,
      metrics,
      plan,
      isDemo: true,
      timeSource: timeInfo.timeSource,
      dayOfWeek: timeInfo.dayOfWeek,
      formattedTime: timeInfo.formattedDate,
    });

    navigateTo({ view: 'dashboard', isReassessing: false, modal: null, recipeId: null, hash: null });
  };

  // Handle completing the multi-step health assessment wizard
  const handleCompleteAssessment = async (profile: UserProfile) => {
    const metrics = calculateNutritionMetrics(profile);
    const plan = generateWeeklyPlan(profile, metrics);

    setActiveProfile(profile);
    setActiveMetrics(metrics);
    setActivePlan(plan);
    setFastingMode('none');

    try {
      localStorage.setItem('nutriwise_active_session', JSON.stringify({
        profile,
        metrics,
        plan,
      }));
    } catch {
      // Ignore quota errors
    }

    // Capture online network timestamp with offline device fallback
    const timeInfo = await getAccurateTimestamp();

    // Archive to persistent assessment history vault marked as personal user assessment
    saveAssessmentRecord({
      id: `rec-user-${Date.now()}`,
      timestamp: timeInfo.timestamp,
      profile,
      metrics,
      plan,
      isDemo: false,
      timeSource: timeInfo.timeSource,
      dayOfWeek: timeInfo.dayOfWeek,
      formattedTime: timeInfo.formattedDate,
    });

    navigateTo({ view: 'dashboard', isReassessing: false, modal: null, recipeId: null, hash: null });
  };

  // Handle restoring a historical plan from the Assessment History Vault
  const handleRestoreRecord = (record: AssessmentRecord) => {
    setActiveProfile(record.profile);
    setActiveMetrics(record.metrics);
    setActivePlan(record.plan);
    setFastingMode('none');

    const isDemo = record.isDemo || record.profile.id?.startsWith('demo-');
    if (!isDemo) {
      try {
        localStorage.setItem('nutriwise_active_session', JSON.stringify({
          profile: record.profile,
          metrics: record.metrics,
          plan: record.plan,
        }));
      } catch {
        // Ignore quota errors
      }
    } else {
      try {
        const existing = localStorage.getItem('nutriwise_active_session');
        if (existing) {
          const parsed = JSON.parse(existing);
          if (parsed.profile?.id?.startsWith('demo-')) {
            localStorage.removeItem('nutriwise_active_session');
          }
        }
      } catch {
        // Ignore
      }
    }

    navigateTo({ view: 'dashboard', isReassessing: false, modal: null, recipeId: null, hash: null });
  };

  // Generate and download publication-grade clinical nutrition PDF report
  const handleExportPDF = async () => {
    const planToExport = displayedPlan || activePlan;
    if (!activeProfile || !activeMetrics || !planToExport) return;
    try {
      setIsExportingPdf(true);
      await exportClinicalNutritionReport(activeProfile, activeMetrics, planToExport);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0B1220] text-slate-800 dark:text-[#F8FAFC] antialiased w-full max-w-full overflow-x-hidden">
      {/* Navigation Bar with Phase 6 Controls */}
      <Navbar
        activeView={activeView}
        setActiveView={handleNavigateView}
        onSelectDemoProfile={handleSelectDemoProfile}
        onOpenDisclaimer={() => navigateTo({ modal: 'disclaimer' })}
        onOpenHistory={() => navigateTo({ modal: 'history' })}
        hasActivePlan={Boolean(activeProfile && !activeProfile.id?.startsWith('demo-'))}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 sm:pb-12">
        {activeView === 'landing' && (
          <LandingPage
            onStartAssessment={() => {
              navigateTo({
                view: 'assessment',
                isReassessing: false,
              });
            }}
            onSelectDemoProfile={handleSelectDemoProfile}
            onOpenVivaDefense={() => navigateTo({ modal: 'inspector' })}
            hasActiveProfile={Boolean(activeProfile && !activeProfile.id?.startsWith('demo-'))}
            activeProfileName={activeProfile?.id?.startsWith('demo-') ? undefined : activeProfile?.name}
            onScrollToHowItWorks={() => {
              const el = document.getElementById('how-it-works');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                navigateTo({ hash: '#how-it-works' });
              }
            }}
          />
        )}

        {/* Phase 3: Interactive Multi-Step Health Assessment Wizard or Completed Status */}
        {activeView === 'assessment' && (
          activeProfile && !activeProfile.id?.startsWith('demo-') && activeMetrics && !isReassessing ? (
            <AssessmentCompletedCard
              profile={activeProfile}
              metrics={activeMetrics}
              onGoToDashboard={() => {
                navigateTo({ view: 'dashboard', isReassessing: false });
              }}
              onReassess={() => {
                navigateTo({ view: 'assessment', isReassessing: true });
              }}
              onStartFresh={() => {
                setActiveProfile(null);
                setActiveMetrics(null);
                setActivePlan(null);
                setFastingMode('none');
                localStorage.removeItem('nutriwise_active_session');
                navigateTo({ view: 'assessment', isReassessing: true });
              }}
              onOpenHistory={() => navigateTo({ modal: 'history' })}
            />
          ) : (
            <AssessmentWizard
              onComplete={(p) => {
                handleCompleteAssessment(p);
              }}
              onCancel={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  navigateTo({ view: activeProfile ? 'dashboard' : 'landing', isReassessing: false });
                }
              }}
              initialProfile={isReassessing && !activeProfile?.id?.startsWith('demo-') ? activeProfile : null}
            />
          )
        )}

        {/* Phase 5: Indian Food & Nutrient Encyclopedia Explorer */}
        {activeView === 'explorer' && (
          <FoodExplorer
            onSelectMealForRecipe={(meal) => navigateTo({ recipeId: meal.id })}
          />
        )}

        {/* Dashboard View Preview */}
        {activeView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
            {activeProfile && activeMetrics ? (
              <div className="space-y-6">
                {/* Profile Overview Banner */}
                <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#26364D] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {activeProfile.name}
                      </h2>
                      <Badge variant={activeProfile.id.startsWith('demo-') ? 'emerald' : 'mint'} size="sm">
                        {activeProfile.id.startsWith('demo-') ? 'DEMO PROFILE' : 'PERSONAL PLAN'}
                      </Badge>
                      <Badge variant="mint" size="sm">
                        {activeProfile.dietPreference.toUpperCase()}
                      </Badge>
                      <Badge variant="slate" size="sm">
                        BMI: {activeMetrics.bmi} ({activeMetrics.bmiCategory})
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {activeProfile.id.includes('rajesh')
                        ? 'Rajesh Sharma, 48 — vegetarian preference, selected diabetes and hypertension dietary cautions.'
                        : activeProfile.id.includes('priya')
                        ? 'Priya Patel, 26 — Jain preference, selected PCOS dietary cautions.'
                        : activeProfile.id.includes('demo')
                        ? 'Aman Verma, 22 — non-vegetarian preference, selected lactose intolerance dietary cautions.'
                        : `${activeProfile.name}, ${activeProfile.age}y — ${activeProfile.dietPreference} preference${activeProfile.healthConditions.length > 0 ? ', selected ' + activeProfile.healthConditions.join(', ') + ' dietary cautions.' : '.'}`}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-400">
                      {activeProfile.age}y • {activeProfile.gender} • {activeProfile.weightKg}kg • {activeProfile.heightCm}cm • Goal: {activeProfile.healthGoal.replace('_', ' ')}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => navigateTo({ view: 'landing' })}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-200 bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1f304c] rounded-xl transition-all"
                    >
                      Home
                    </button>
                    
                    {/* Phase 6: Past Records Vault Trigger */}
                    <button
                      onClick={() => navigateTo({ modal: 'history' })}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1f304c] border border-slate-200 dark:border-[#26364D] rounded-xl transition-all flex items-center gap-1.5"
                      title="Open Saved Assessment Records"
                    >
                      <History className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>History</span>
                    </button>

                    {/* Clinical Algorithm Inspector Trigger */}
                    <button
                      onClick={() => navigateTo({ modal: 'inspector' })}
                      className="px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/60 rounded-xl transition-all flex items-center gap-1.5"
                      title="Open Clinical Algorithm & Formula Inspector"
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Algorithm Inspector</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo({ view: 'assessment', isReassessing: true });
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Edit Assessment</span>
                    </button>
                    <button
                      onClick={handleExportPDF}
                      disabled={isExportingPdf}
                      className="px-4 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700/60 rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                      title="Download Clinical Nutrition PDF with ICMR/WHO Disclaimers"
                    >
                      {isExportingPdf ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700 dark:text-emerald-400" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      )}
                      <span>{isExportingPdf ? 'Exporting...' : 'Export PDF Report'}</span>
                    </button>
                  </div>
                </div>

                {/* Vitals & Calculation Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] shadow-sm space-y-1 transition-colors">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center">
                        Basal Metabolic Rate
                        <InfoTooltip termKey="bmr" size="sm" />
                      </span>
                      <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {activeMetrics.bmr} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">kcal</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium inline-flex items-center">
                      Mifflin-St Jeor Estimation Base
                      <InfoTooltip termKey="bmrFormula" size="sm" />
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] shadow-sm space-y-1 transition-colors">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center">
                        Total Daily Expenditure (TDEE)
                        <InfoTooltip termKey="tdee" size="sm" />
                      </span>
                      <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {activeMetrics.tdee} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">kcal</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                      Activity: {activeProfile.activityLevel.replace('_', ' ')}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] shadow-sm space-y-1 transition-colors">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center">
                        Target Caloric Intake
                        <InfoTooltip termKey="tdeeGoal" size="sm" />
                      </span>
                      <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {activeMetrics.targetCalories} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">kcal/day</span>
                    </div>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold leading-tight">
                      {activeMetrics.calorieAdjustmentNote}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] shadow-sm space-y-1 transition-colors">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center">
                        Hydration Target
                        <InfoTooltip termKey="hydrationStandard" size="sm" />
                      </span>
                      <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                      {activeMetrics.waterTargetLitres} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">L/day</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      35 ml per kg body mass
                    </p>
                  </div>
                </div>

                {/* Cultural & Religious Fasting Adaptation Engine */}
                <FastingModeToggle
                  currentMode={fastingMode}
                  onSelectMode={(mode: FastingMode) => setFastingMode(mode)}
                />

                {/* Caloric & Macronutrient Distribution Charts */}
                {(displayedPlan || activePlan) && (
                  <NutritionCharts
                    key={`charts-${activeProfile.id}-${fastingMode}`}
                    metrics={activeMetrics}
                    plan={(displayedPlan || activePlan)!}
                    profile={activeProfile}
                  />
                )}

                {/* Phase 2: Personalized 7-Day Indian Meal Schedule */}
                {displayedPlan && (
                  <WeeklyPlanPreview
                    key={`weekly-plan-${activeProfile.id}-${fastingMode}`}
                    plan={displayedPlan}
                    profile={activeProfile}
                    onSelectMealForRecipe={(meal: MealItem) => navigateTo({ recipeId: meal.id })}
                  />
                )}

                {/* Dynamic 6-Aisle Weekly Indian Pantry & Grocery Planner */}
                {displayedPlan && (
                  <GroceryPlanner 
                    key={`grocery-${activeProfile.id}-${fastingMode}`}
                    profile={activeProfile}
                    plan={displayedPlan}
                  />
                )}

                {/* Phase 4: Evidence-Based Clinical & Lifestyle Advisory */}
                <ClinicalAdvisory 
                  key={`clinical-advisory-${activeProfile.id}`}
                  profile={activeProfile} 
                  metrics={activeMetrics} 
                />
              </div>
            ) : (
              <div className="bg-white dark:bg-[#111C30] rounded-3xl p-10 text-center border border-slate-200 dark:border-[#26364D] shadow-xl space-y-4 max-w-lg mx-auto transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Assessment Profile Loaded</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Select a pre-configured demo persona or complete the health assessment to view your tailored nutrition metrics.
                </p>
                <button
                  onClick={() => handleSelectDemoProfile(DEMO_PROFILES[0])}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Load Demo: Rajesh Sharma (Vegetarian, Dietary Cautions)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDisclaimer={() => navigateTo({ modal: 'disclaimer' })}
        setActiveView={handleNavigateView}
      />

      {/* Medical Disclaimer Dialog Modal */}
      <MedicalDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={handleCloseModal}
      />

      {/* Phase 5: Interactive Recipe & Micronutrient Detail Drawer Modal */}
      <RecipeDetailModal
        meal={selectedMealForRecipe}
        isOpen={Boolean(selectedMealForRecipe)}
        onClose={handleCloseRecipeModal}
      />

      {/* Phase 6: Clinical Algorithm & Calculation Inspector Modal */}
      <VivaDefenseModal
        isOpen={isDefenseModalOpen}
        onClose={handleCloseModal}
        profile={activeProfile}
        metrics={activeMetrics}
        plan={displayedPlan || activePlan}
      />

      {/* Phase 6: Patient Assessment History Vault Modal */}
      <AssessmentHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={handleCloseModal}
        onRestoreRecord={handleRestoreRecord}
        currentActiveProfileId={activeProfile?.id}
      />

      {/* Floating 1-Click Dark/Light Mode FAB */}
      <ThemeToggle />
    </div>
  );
};

export default App;

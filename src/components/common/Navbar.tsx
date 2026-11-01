import React, { useState, useRef, useEffect } from 'react';
import { 
  HeartPulse, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  UserCheck, 
  ShieldCheck, 
  Activity,
  Flame,
  ArrowRight,
  BookOpen,
  History
} from 'lucide-react';
import { Badge } from './Badge';
import { InfoTooltip } from './InfoTooltip';
import { DEMO_PROFILES } from '../../data/demoProfiles';
import { UserProfile } from '../../types/nutrition';

interface NavbarProps {
  activeView: 'landing' | 'assessment' | 'dashboard' | 'explorer';
  setActiveView: (view: 'landing' | 'assessment' | 'dashboard' | 'explorer', isReassessing?: boolean) => void;
  onSelectDemoProfile: (profile: UserProfile) => void;
  onOpenDisclaimer: () => void;
  onOpenHistory?: () => void;
  hasActivePlan: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onSelectDemoProfile,
  onOpenDisclaimer,
  onOpenHistory,
  hasActivePlan,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [assessmentDropdownOpen, setAssessmentDropdownOpen] = useState(false);

  const assessmentRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assessmentRef.current && !assessmentRef.current.contains(event.target as Node)) {
        setAssessmentDropdownOpen(false);
      }
      if (demoRef.current && !demoRef.current.contains(event.target as Node)) {
        setDemoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (view: 'landing' | 'assessment' | 'dashboard' | 'explorer', isReassessing: boolean = false) => {
    setActiveView(view, isReassessing);
    setMobileMenuOpen(false);
    setAssessmentDropdownOpen(false);
  };

  const handleDemoSelect = (profile: UserProfile) => {
    onSelectDemoProfile(profile);
    setDemoDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#26364D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#14b8a6] flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  NutriWise <span className="text-[#059669] dark:text-[#10b981]">AI</span>
                </span>
                <span className="hidden sm:inline-flex shrink-0">
                  <Badge variant="emerald" size="sm" icon={<Activity className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}>
                    SDG&nbsp;3
                  </Badge>
                </span>
                <InfoTooltip termKey="sdg3" size="sm" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 hidden xs:block">
                Personalized Nutrition Recommendation Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors ${
                activeView === 'landing'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 dark:border dark:border-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#17243A]'
              }`}
            >
              Home
            </button>

            {/* Health Assessment Dropdown Menu with Records as a Sub-Option */}
            <div 
              className="relative group"
              ref={assessmentRef}
              onMouseEnter={() => setAssessmentDropdownOpen(true)}
              onMouseLeave={() => setAssessmentDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  handleNavClick('assessment');
                }}
                className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeView === 'assessment'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 dark:border dark:border-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#17243A]'
                }`}
                aria-expanded={assessmentDropdownOpen}
                aria-haspopup="true"
              >
                <span>Health Assessment</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${assessmentDropdownOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              </button>

              {assessmentDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-72 bg-white dark:bg-[#111C30] rounded-2xl shadow-xl border border-slate-200 dark:border-[#26364D] py-2 z-50 animate-fade-in"
                >
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Health Assessment Options
                  </div>

                  {/* Sub-option 1: Health Assessment Form */}
                  <button
                    onClick={() => {
                      handleNavClick('assessment', true);
                    }}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50/80 dark:hover:bg-[#17243A] transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                        <span>Assessment Form</span>
                        {activeView === 'assessment' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        Start new or edit metabolic profile
                      </div>
                    </div>
                  </button>

                  {/* Sub-option 2: Past Records Vault */}
                  {onOpenHistory && (
                    <button
                      onClick={() => {
                        onOpenHistory();
                        setAssessmentDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50/80 dark:hover:bg-[#17243A] transition-colors flex items-start gap-2.5 group border-t border-slate-100 dark:border-[#26364D]/60"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <History className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 flex items-center gap-1.5">
                          <span>Past Records Vault</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            Sub-Option
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          View saved evaluations &amp; delta trends
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeView === 'dashboard'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 dark:border dark:border-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#17243A]'
              }`}
            >
              Nutrition Dashboard
              {hasActivePlan && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('explorer')}
              className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeView === 'explorer'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 dark:border dark:border-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#17243A]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Food Explorer</span>
            </button>

            <button
              onClick={onOpenDisclaimer}
              className="px-2.5 lg:px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#17243A] transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Disclaimer
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* 1-Click Sample Demo Selector */}
            <div className="relative" ref={demoRef}>
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#111C30] hover:bg-slate-200 dark:hover:bg-[#17243A] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#26364D] flex items-center gap-2 transition-all"
                aria-expanded={demoDropdownOpen}
                aria-haspopup="true"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>1-Click Sample Demo</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111C30] rounded-2xl shadow-xl border border-slate-200 dark:border-[#26364D] py-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-[#26364D] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select a Pre-configured Demo Profile
                  </div>
                  {DEMO_PROFILES.map((profile) => {
                    const getSummary = () => {
                      if (profile.id.includes('rajesh')) {
                        return 'Vegetarian preference, selected diabetes & hypertension dietary cautions';
                      }
                      if (profile.id.includes('priya')) {
                        return 'Jain preference, selected PCOS dietary cautions';
                      }
                      return 'Non-vegetarian preference, selected lactose intolerance dietary cautions';
                    };

                    return (
                      <button
                        key={profile.id}
                        onClick={() => handleDemoSelect(profile)}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50/80 dark:hover:bg-[#17243A] transition-colors flex items-start gap-2.5 group"
                      >
                        <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                            {profile.name}, {profile.age} (Demo)
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            {getSummary()}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('assessment', true)}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#059669] hover:bg-[#047857] text-white shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Flame className="w-4 h-4 text-emerald-200" />
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4 text-emerald-100" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#17243A]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-[#26364D] bg-white dark:bg-[#0F172A] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${
              activeView === 'landing' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Home
          </button>

          {/* Mobile Health Assessment with Sub-Option */}
          <div className="rounded-xl bg-slate-50 dark:bg-[#17243A]/40 p-2 space-y-1.5 border border-slate-100 dark:border-[#26364D]">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
              Health Assessment
            </div>
            <button
              onClick={() => handleNavClick('assessment', true)}
              className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${
                activeView === 'assessment' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Assessment Form</span>
            </button>
            {onOpenHistory && (
              <button
                onClick={() => {
                  onOpenHistory();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left pl-6 pr-3 py-2 rounded-lg font-medium text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-2"
              >
                <History className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>↳ Past Assessment Records Vault</span>
              </button>
            )}
          </div>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${
              activeView === 'dashboard' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Nutrition Dashboard
          </button>

          <button
            onClick={() => handleNavClick('explorer')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 ${
              activeView === 'explorer' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Indian Food Explorer (112+ Dishes)</span>
          </button>

          <button
            onClick={() => {
              onOpenDisclaimer();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Health & Educational Disclaimer
          </button>

          <div className="pt-2 border-t border-slate-100 dark:border-[#26364D]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Sample Demo Profiles
            </p>
            {DEMO_PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleDemoSelect(p)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#17243A] flex items-center justify-between"
              >
                <span>{p.name} (Demo, {p.dietPreference})</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Load</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

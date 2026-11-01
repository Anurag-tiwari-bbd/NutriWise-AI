import React from 'react';
import { HeartPulse, Globe2, ShieldAlert, Cpu, Heart } from 'lucide-react';
import { Badge } from './Badge';
import { InfoTooltip } from './InfoTooltip';

interface FooterProps {
  onOpenDisclaimer: () => void;
  setActiveView: (view: 'landing' | 'assessment' | 'dashboard' | 'explorer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDisclaimer, setActiveView }) => {
  return (
    <footer className="bg-slate-900 dark:bg-[#070D18] text-slate-300 border-t border-slate-800 dark:border-[#26364D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                NutriWise <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An evidence-informed, rule-based nutritional recommendation system engineered to support educational awareness and balanced dietary habits.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="mint" size="sm" icon={<Globe2 className="w-3 h-3 text-teal-400" />}>
                UN SDG 3 Benchmark
              </Badge>
              <InfoTooltip termKey="sdg3" size="sm" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('landing')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  System Overview & Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('assessment')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Interactive Health Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Nutrition & Macro Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('explorer')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Indian Food Explorer (112+ Dishes)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDisclaimer}
                  className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Health & Educational Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: SDG 3 Mission */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              SDG 3 Impact Target
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Target 3.4: By 2030, promote awareness of healthy dietary practices to help address chronic lifestyle-related health challenges.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-emerald-300">
              ✓ Local BMR Estimation Engine<br />
              ✓ 55+ Indian Regional Cuisine Dataset<br />
              ✓ Zero External API Key Latency
            </div>
          </div>

          {/* Col 4: Project Info & Technology */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Architecture &amp; Design
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered with modern reactive architecture using React 18, TypeScript, Tailwind CSS, and Recharts. Built with deterministic offline-first calculation engines.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Local Rule-Based Recommendation Engine</span>
              <InfoTooltip termKey="ruleBasedEngine" size="sm" />
            </div>
          </div>
        </div>

        {/* Bottom Banner with Medical Caution */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} NutriWise AI — AI-Based Personalized Nutrition Recommendation Engine aligned with UN SDG 3.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDisclaimer}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-4 transition-colors font-medium"
            >
              Health & Educational Disclaimer (Educational Guidance Only)
            </button>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Healthcare
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

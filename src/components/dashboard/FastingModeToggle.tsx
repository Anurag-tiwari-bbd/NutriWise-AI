import React from 'react';
import { 
  Moon, 
  Sparkles, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FastingMode, FASTING_MODES, FastingModeConfig } from '../../utils/fastingEngine';
import { Badge } from '../common/Badge';

interface FastingModeToggleProps {
  currentMode: FastingMode;
  onSelectMode: (mode: FastingMode) => void;
}

export const FastingModeToggle: React.FC<FastingModeToggleProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const activeConfig = FASTING_MODES.find((m) => m.id === currentMode) || FASTING_MODES[0];

  return (
    <div className="bg-white dark:bg-[#111C30] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#26364D] shadow-sm space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#26364D] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Cultural &amp; Religious Fasting Adaptation Engine
              </h3>
              <Badge variant="amber" size="sm">Phase 5 Engine</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adapts your 7-day nutrition plan to Indian fasting traditions without sacrificing caloric or protein targets.
            </p>
          </div>
        </div>

        {currentMode !== 'none' && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              {activeConfig.badge} Active
            </span>
          </div>
        )}
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {FASTING_MODES.map((config) => {
          const isSelected = currentMode === config.id;
          return (
            <button
              key={config.id}
              type="button"
              onClick={() => onSelectMode(config.id)}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3 relative group ${
                isSelected
                  ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                  : 'bg-slate-50/60 dark:bg-[#0F172A] hover:bg-slate-100/80 dark:hover:bg-[#17243A] border-slate-200 dark:border-[#26364D]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-amber-800 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {config.badge}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  )}
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                  {config.title}
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                  {config.hindiTitle}
                </p>
              </div>

              <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
                {config.shortDescription}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Fasting Mode Clinical Summary Banner */}
      {currentMode !== 'none' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-[#0F172A] border border-amber-200 dark:border-amber-800/60 text-xs space-y-3 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 dark:border-amber-800/60 pb-2.5">
            <span className="font-extrabold text-amber-950 dark:text-amber-200 text-sm flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              Clinical Adaptation Strategy: {activeConfig.title}
            </span>
            <button
              type="button"
              onClick={() => onSelectMode('none')}
              className="text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white underline self-start sm:self-auto"
            >
              Switch back to standard plan
            </button>
          </div>

          <p className="text-amber-900 dark:text-amber-300 leading-relaxed font-normal">
            {activeConfig.clinicalRationale}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="bg-white/80 dark:bg-[#17243A] p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/60">
              <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider block mb-1">
                ⛔ Strictly Excluded Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeConfig.prohibitedItems.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-[10.5px] font-semibold border border-rose-200 dark:border-rose-800/60">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#17243A] p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/60">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                ✅ Therapeutic Fasting Substitutes Injected:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeConfig.recommendedSubstitutes.map((sub, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-[10.5px] font-semibold border border-emerald-200 dark:border-emerald-800/60">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

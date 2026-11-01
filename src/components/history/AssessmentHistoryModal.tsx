import React, { useEffect, useState } from 'react';
import { 
  History, 
  X, 
  Trash2, 
  FileDown, 
  RotateCcw, 
  Calendar, 
  Activity, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  ShieldCheck, 
  User,
  Sparkles,
  Loader2
} from 'lucide-react';
import { AssessmentRecord } from '../../types/nutrition';
import { getAssessmentHistory, deleteAssessmentRecord } from '../../utils/historyStorage';
import { exportClinicalNutritionReport } from '../../utils/pdfExport';

interface AssessmentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreRecord: (record: AssessmentRecord) => void;
  currentActiveProfileId?: string;
}

export const AssessmentHistoryModal: React.FC<AssessmentHistoryModalProps> = ({
  isOpen,
  onClose,
  onRestoreRecord,
  currentActiveProfileId,
}) => {
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [exportingId, setExportingId] = useState<string | null>(null);

  // Load records on mount & when modal opens
  useEffect(() => {
    if (isOpen) {
      setRecords(getAssessmentHistory());
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this historical assessment record?')) {
      const updated = deleteAssessmentRecord(id);
      setRecords(updated);
    }
  };

  const handleExportPDF = async (record: AssessmentRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setExportingId(record.id);
      await exportClinicalNutritionReport(record.profile, record.metrics, record.plan);
    } catch (err) {
      console.error('Failed to export PDF from history:', err);
    } finally {
      setExportingId(null);
    }
  };

  // Compute longitudinal delta between most recent two assessments
  const renderLongitudinalDelta = () => {
    if (records.length < 2) return null;

    const latest = records[0];
    const previous = records[1];

    const weightDiff = +(latest.profile.weightKg - previous.profile.weightKg).toFixed(1);
    const bmiDiff = +(latest.metrics.bmi - previous.metrics.bmi).toFixed(1);
    const calDiff = latest.metrics.targetCalories - previous.metrics.targetCalories;

    return (
      <div className="mb-6 p-4 rounded-2xl bg-emerald-50/80 dark:bg-[#17243A] border border-emerald-200 dark:border-[#26364D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              Longitudinal Assessment Trend
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-extrabold">
                {records.length} Records Stored
              </span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Comparing latest assessment ({new Date(latest.timestamp).toLocaleDateString()}) with previous evaluation ({new Date(previous.timestamp).toLocaleDateString()}).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
          {/* Weight Delta */}
          <div className="text-center px-3 py-1.5 rounded-xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D]">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Weight Delta</div>
            <div className={`text-xs font-bold flex items-center justify-center gap-1 ${
              weightDiff < 0 ? 'text-emerald-600 dark:text-emerald-400' : weightDiff > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'
            }`}>
              {weightDiff < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : weightDiff > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              {weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg
            </div>
          </div>

          {/* BMI Delta */}
          <div className="text-center px-3 py-1.5 rounded-xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D]">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">BMI Delta</div>
            <div className={`text-xs font-bold flex items-center justify-center gap-1 ${
              bmiDiff < 0 ? 'text-emerald-600 dark:text-emerald-400' : bmiDiff > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'
            }`}>
              {bmiDiff > 0 ? `+${bmiDiff}` : bmiDiff}
            </div>
          </div>

          {/* Caloric Delta */}
          <div className="text-center px-3 py-1.5 rounded-xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D]">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Target Cal Delta</div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {calDiff > 0 ? `+${calDiff}` : calDiff} kcal
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#111C30] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#26364D] p-6 sm:p-8 overflow-hidden transition-all my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-[#26364D] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-sm">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 id="history-modal-title" className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Patient Assessment Vault
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-[#17243A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#26364D]">
                  {records.length} Saved Records
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Archived clinical assessment snapshots and longitudinal metabolic records stored client-side in localStorage.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#17243A] rounded-xl transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            aria-label="Close Assessment History"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body with Scroll */}
        <div className="overflow-y-auto pt-6 pr-1 flex-1">
          {renderLongitudinalDelta()}

          {records.length === 0 ? (
            <div className="py-16 text-center space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#17243A] text-slate-400 flex items-center justify-center mx-auto">
                <History className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No Assessment History Records Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Complete a personalized health assessment or load one of the sample demo profiles to automatically archive clinical snapshots in this audit vault.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((rec) => {
                const isActive = rec.profile.id === currentActiveProfileId;
                const formattedDate = new Date(rec.timestamp).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={rec.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-md'
                        : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-[#26364D] hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      {/* Left: Patient Info & Snapshot Date */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                            <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            {rec.profile.name}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            ({rec.profile.age} yrs • {rec.profile.gender.toUpperCase()})
                          </span>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                              Active in Dashboard
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#26364D]">
                            {rec.profile.dietPreference.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                          </span>
                          <span>•</span>
                          <span>{rec.profile.heightCm} cm</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{rec.profile.weightKg} kg</span>
                          <span>•</span>
                          <span>BMI: <strong className="text-slate-800 dark:text-white">{rec.metrics.bmi}</strong> ({rec.metrics.bmiCategory})</span>
                        </div>

                        {/* Health Conditions / Cautions */}
                        {rec.profile.healthConditions.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cautions:</span>
                            {rec.profile.healthConditions.map((c) => (
                              <span key={c} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                                {c.replace('_', ' ').toUpperCase()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Vitals Metrics & Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-[#26364D]">
                        <div className="text-right px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#17243A] border border-slate-200 dark:border-[#26364D]">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Daily Calorie Target</div>
                          <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                            ~{rec.metrics.targetCalories} kcal
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onRestoreRecord(rec);
                              onClose();
                            }}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            title="Restore this plan to active dashboard"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore Plan</span>
                          </button>

                          <button
                            type="button"
                            disabled={exportingId === rec.id}
                            onClick={(e) => handleExportPDF(rec, e)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-[#17243A] hover:bg-slate-200 dark:hover:bg-[#1e2f4a] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#26364D] transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            title="Download Clinical PDF for this record"
                            aria-label="Download Clinical PDF for this record"
                          >
                            {exportingId === rec.id ? (
                              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                            ) : (
                              <FileDown className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDelete(rec.id, e)}
                            className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            title="Delete this record"
                            aria-label="Delete this record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-5 mt-4 border-t border-slate-200 dark:border-[#26364D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted local browser storage (Zero Cloud Server Dependency).</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-[#17243A] hover:bg-slate-300 dark:hover:bg-[#20324f] text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors focus:ring-2 focus:ring-slate-400 focus:outline-none"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};

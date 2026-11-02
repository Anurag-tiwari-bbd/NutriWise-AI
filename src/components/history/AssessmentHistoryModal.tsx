import React, { useEffect, useState, useMemo } from 'react';
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
  Loader2,
  Clock,
  Wifi,
  Filter,
  CheckCircle2,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { AssessmentRecord } from '../../types/nutrition';
import { 
  getAssessmentHistory, 
  deleteAssessmentRecord, 
  getUniquePatients, 
  createFollowupAssessment 
} from '../../utils/historyStorage';
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

  // Filters & Longitudinal Controls
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'personal' | 'demo'>('all');
  const [selectedIntervalWeeks, setSelectedIntervalWeeks] = useState<number | 'baseline'>('baseline');

  // Load records on mount & when modal opens
  useEffect(() => {
    if (isOpen) {
      const history = getAssessmentHistory();
      setRecords(history);
      
      // Auto-select active user patient if present
      if (currentActiveProfileId && history.length > 0) {
        const activeMatch = history.find(r => r.profile.id === currentActiveProfileId);
        if (activeMatch) {
          setSelectedPatient(activeMatch.profile.name);
        } else if (history.length > 0) {
          setSelectedPatient(history[0].profile.name);
        }
      } else if (history.length > 0) {
        setSelectedPatient(history[0].profile.name);
      }
    }
  }, [isOpen, currentActiveProfileId]);

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

  // Unique patients across all records
  const uniquePatients = useMemo(() => {
    return getUniquePatients(records);
  }, [records]);

  // Filtered records by Type (Personal vs Demo)
  const typeFilteredRecords = useMemo(() => {
    return records.filter(r => {
      const isDemoRecord = !!r.isDemo || r.profile.id.includes('demo') || r.profile.id.includes('rajesh') || r.profile.id.includes('priya') || r.profile.id.includes('aman');
      if (typeFilter === 'personal') return !isDemoRecord;
      if (typeFilter === 'demo') return isDemoRecord;
      return true;
    });
  }, [records, typeFilter]);

  // Filtered records for current display (by Selected Patient)
  const displayedRecords = useMemo(() => {
    if (selectedPatient === 'all') {
      return typeFilteredRecords;
    }
    return typeFilteredRecords.filter(
      r => r.profile.name.toLowerCase().trim() === selectedPatient.toLowerCase().trim()
    );
  }, [typeFilteredRecords, selectedPatient]);

  // Records specifically for the selected individual (for intra-user comparison)
  const activePatientTimeline = useMemo(() => {
    if (selectedPatient === 'all') return [];
    return records
      .filter(r => r.profile.name.toLowerCase().trim() === selectedPatient.toLowerCase().trim())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [records, selectedPatient]);

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

  // Helper to simulate follow-up assessment for the active patient
  const handleSimulateFollowup = (weeks: number, weightDeltaKg: number) => {
    if (activePatientTimeline.length === 0) return;
    const baseline = activePatientTimeline[activePatientTimeline.length - 1]; // Oldest baseline
    const newRecord = createFollowupAssessment(baseline, weeks, weightDeltaKg);
    setRecords([newRecord, ...records]);
    setSelectedIntervalWeeks(weeks);
  };

  // Compute longitudinal delta strictly within the SAME individual
  const renderLongitudinalDelta = () => {
    if (selectedPatient === 'all') {
      return (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
          <Activity className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Clinical Longitudinal Guidance:</span> Select an individual patient from the tabs below to view their personal metabolic trajectory. Comparing different people against each other (e.g. cross-gender or differing baseline metrics) is clinically invalid.
          </div>
        </div>
      );
    }

    if (activePatientTimeline.length === 0) {
      return null;
    }

    const latest = activePatientTimeline[0];

    // Single record scenario: Baseline established
    if (activePatientTimeline.length < 2) {
      const dateLatest = new Date(latest.timestamp);
      const dayName = latest.dayOfWeek || dateLatest.toLocaleDateString('en-IN', { weekday: 'long' });
      const formattedDate = latest.formattedTime || dateLatest.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      return (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-50/70 dark:bg-[#17243A] border border-emerald-200 dark:border-[#26364D] space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Baseline Assessment Established: {latest.profile.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-extrabold">
                    Baseline (Day 0)
                  </span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Recorded on <strong>{dayName}, {formattedDate}</strong> ({latest.profile.weightKg} kg • BMI {latest.metrics.bmi} • ~{latest.metrics.targetCalories} kcal/day).
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Awaiting Longitudinal Follow-up
              </span>
            </div>
          </div>

          {/* Quick Follow-Up Simulation Buttons */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-[#26364D]/60 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Track Interval Progress for {latest.profile.name}:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => handleSimulateFollowup(1, -0.6)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1 transition-colors"
                title="Simulate 1-Week Follow-up Assessment"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+1 Week (-0.6 kg)</span>
              </button>
              <button
                onClick={() => handleSimulateFollowup(4, -2.2)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1 transition-colors"
                title="Simulate 4-Week Follow-up Assessment"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+4 Weeks (-2.2 kg)</span>
              </button>
              <button
                onClick={() => handleSimulateFollowup(8, -4.0)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1 transition-colors"
                title="Simulate 8-Week Follow-up Assessment"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+8 Weeks (-4.0 kg)</span>
              </button>
              <button
                onClick={() => handleSimulateFollowup(12, -5.5)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1 transition-colors"
                title="Simulate 12-Week Follow-up Assessment"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+12 Weeks (-5.5 kg)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Multiple records for the same individual: Calculate interval comparison
    const latestRec = activePatientTimeline[0];
    let comparisonRec = activePatientTimeline[activePatientTimeline.length - 1]; // Default to baseline

    if (selectedIntervalWeeks !== 'baseline') {
      const targetDeltaMs = selectedIntervalWeeks * 7 * 86400000;
      const latestMs = new Date(latestRec.timestamp).getTime();
      
      // Find assessment closest to target interval
      let closestDiff = Infinity;
      for (let i = 1; i < activePatientTimeline.length; i++) {
        const itemMs = new Date(activePatientTimeline[i].timestamp).getTime();
        const diff = Math.abs((latestMs - itemMs) - targetDeltaMs);
        if (diff < closestDiff) {
          closestDiff = diff;
          comparisonRec = activePatientTimeline[i];
        }
      }
    }

    const weightDiff = +(latestRec.profile.weightKg - comparisonRec.profile.weightKg).toFixed(1);
    const bmiDiff = +(latestRec.metrics.bmi - comparisonRec.metrics.bmi).toFixed(1);
    const calDiff = latestRec.metrics.targetCalories - comparisonRec.metrics.targetCalories;

    const daysElapsed = Math.max(1, Math.round(
      Math.abs(new Date(latestRec.timestamp).getTime() - new Date(comparisonRec.timestamp).getTime()) / 86400000
    ));

    const latestDateFormatted = latestRec.formattedTime || new Date(latestRec.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const compDateFormatted = comparisonRec.formattedTime || new Date(comparisonRec.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
      <div className="mb-6 p-5 rounded-2xl bg-emerald-50/80 dark:bg-[#17243A] border border-emerald-200 dark:border-[#26364D] space-y-4">
        {/* Top Header & Interval Filter Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>Longitudinal Assessment Trend: {latestRec.profile.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-extrabold">
                  {activePatientTimeline.length} Timeline Snapshots
                </span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Comparing latest evaluation ({latestDateFormatted}) with baseline ({compDateFormatted}) • <strong>{daysElapsed} Days Elapsed (~{Math.round(daysElapsed / 7)} Wks)</strong>.
              </p>
            </div>
          </div>

          {/* Timeframe Comparison Selection Buttons (1w, 4w, 8w, 12w, Baseline) */}
          <div className="flex items-center gap-1 bg-white/80 dark:bg-[#111C30] p-1 rounded-xl border border-slate-200 dark:border-[#26364D] shrink-0">
            <button
              onClick={() => setSelectedIntervalWeeks('baseline')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedIntervalWeeks === 'baseline'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              Baseline
            </button>
            <button
              onClick={() => setSelectedIntervalWeeks(1)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedIntervalWeeks === 1
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              1 Week
            </button>
            <button
              onClick={() => setSelectedIntervalWeeks(4)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedIntervalWeeks === 4
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              4 Weeks
            </button>
            <button
              onClick={() => setSelectedIntervalWeeks(8)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedIntervalWeeks === 8
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              8 Weeks
            </button>
            <button
              onClick={() => setSelectedIntervalWeeks(12)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedIntervalWeeks === 12
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              12 Weeks
            </button>
          </div>
        </div>

        {/* Delta Metrics Display */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          {/* Weight Delta */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] text-center">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Weight Trajectory ({comparisonRec.profile.weightKg} kg &rarr; {latestRec.profile.weightKg} kg)
            </div>
            <div className={`text-base font-extrabold flex items-center justify-center gap-1.5 mt-0.5 ${
              weightDiff < 0 ? 'text-emerald-600 dark:text-emerald-400' : weightDiff > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'
            }`}>
              {weightDiff < 0 ? <TrendingDown className="w-4 h-4" /> : weightDiff > 0 ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              <span>{weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg</span>
            </div>
          </div>

          {/* BMI Delta */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] text-center">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              BMI Delta ({comparisonRec.metrics.bmi} &rarr; {latestRec.metrics.bmi})
            </div>
            <div className={`text-base font-extrabold flex items-center justify-center gap-1.5 mt-0.5 ${
              bmiDiff < 0 ? 'text-emerald-600 dark:text-emerald-400' : bmiDiff > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'
            }`}>
              <span>{bmiDiff > 0 ? `+${bmiDiff}` : bmiDiff}</span>
              <span className="text-[10px] font-normal text-slate-400">({latestRec.metrics.bmiCategory})</span>
            </div>
          </div>

          {/* Caloric Delta */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#111C30] border border-slate-200 dark:border-[#26364D] text-center">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Target Caloric Adjustment
            </div>
            <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
              {calDiff > 0 ? `+${calDiff}` : calDiff} kcal/day
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
                <span>Patient Assessment Vault</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-[#17243A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#26364D]">
                  {records.length} Total Saved
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Archived clinical assessment snapshots and individual longitudinal metabolic tracking records.
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

        {/* Filters & Patient Selector Bar */}
        <div className="py-4 border-b border-slate-100 dark:border-[#26364D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          {/* Patient Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Patient:
            </span>
            <button
              onClick={() => setSelectedPatient('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPatient === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1f304c]'
              }`}
            >
              All Records ({records.length})
            </button>
            {uniquePatients.map((p) => {
              const isSelected = selectedPatient.toLowerCase() === p.name.toLowerCase();
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1f304c]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{p.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {p.recordCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Type Filter: All vs Personal vs Demo */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#17243A] p-1 rounded-xl text-xs shrink-0">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                typeFilter === 'all' ? 'bg-white dark:bg-[#111C30] text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('personal')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                typeFilter === 'personal' ? 'bg-white dark:bg-[#111C30] text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setTypeFilter('demo')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                typeFilter === 'demo' ? 'bg-white dark:bg-[#111C30] text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Demo Samples
            </button>
          </div>
        </div>

        {/* Content Body with Scroll */}
        <div className="overflow-y-auto pt-6 pr-1 flex-1">
          {renderLongitudinalDelta()}

          {displayedRecords.length === 0 ? (
            <div className="py-16 text-center space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#17243A] text-slate-400 flex items-center justify-center mx-auto">
                <History className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No Assessment History Records Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Complete a personalized health assessment or select another filter to inspect historical clinical snapshots.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedRecords.map((rec) => {
                const isActive = rec.profile.id === currentActiveProfileId;
                const dateObj = new Date(rec.timestamp);
                const dayName = rec.dayOfWeek || dateObj.toLocaleDateString('en-IN', { weekday: 'long' });
                const formattedDate = rec.formattedTime || `${dayName}, ${dateObj.toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })} • ${dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

                const isDemo = !!rec.isDemo || rec.profile.id.includes('demo') || rec.profile.id.includes('rajesh') || rec.profile.id.includes('priya') || rec.profile.id.includes('aman');

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

                          {/* Personal vs Demo Badge */}
                          {isDemo ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>Sample Demo</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-sky-500" />
                              <span>Personal Assessment</span>
                            </span>
                          )}

                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                              Active in Dashboard
                            </span>
                          )}

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#26364D]">
                            {rec.profile.dietPreference.toUpperCase()}
                          </span>
                        </div>

                        {/* Date, Time & Source Verification */}
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            {formattedDate}
                          </span>
                          <span>•</span>

                          {/* Online Network vs Device Offline Badge */}
                          {rec.timeSource === 'online' ? (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1">
                              <Wifi className="w-3 h-3 text-emerald-500" />
                              <span>Online Synced</span>
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-[#17243A] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#26364D] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>Device Time (Offline Safe)</span>
                            </span>
                          )}

                          {rec.notes && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
                              {rec.notes}
                            </span>
                          )}
                        </div>

                        {/* Physical Vitals */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                          <span>Height: {rec.profile.heightCm} cm</span>
                          <span>•</span>
                          <span>Weight: <strong className="text-slate-700 dark:text-slate-200">{rec.profile.weightKg} kg</strong></span>
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
        <div className="pt-5 mt-4 border-t border-slate-200 dark:border-[#26364D] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted local browser storage (Zero Cloud Server Dependency). Online network time verified with automatic local device fallback.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-[#17243A] hover:bg-slate-300 dark:hover:bg-[#20324f] text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors focus:ring-2 focus:ring-slate-400 focus:outline-none shrink-0"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};

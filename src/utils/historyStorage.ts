import { AssessmentRecord } from '../types/nutrition';
import { calculateNutritionMetrics } from './calculations';
import { generateWeeklyPlan } from './recommendationEngine';

const STORAGE_KEY = 'nutriwise_assessment_history';

/**
 * Retrieve all saved assessment history records from localStorage.
 */
export function getAssessmentHistory(): AssessmentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return [];
  } catch (err) {
    console.error('Failed to load assessment history:', err);
    return [];
  }
}

/**
 * Save or prepend a new assessment record to the immutable history vault.
 */
export function saveAssessmentRecord(record: AssessmentRecord): void {
  try {
    const existing = getAssessmentHistory();
    // Prevent duplicate entries within 5 seconds with same user ID
    const isDuplicate = existing.some(
      (r) => r.profile.id === record.profile.id && 
             Math.abs(new Date(r.timestamp).getTime() - new Date(record.timestamp).getTime()) < 5000
    );
    if (isDuplicate) return;

    const updated = [record, ...existing].slice(0, 30); // Keep up to 30 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save assessment record to history:', err);
  }
}

/**
 * Delete a specific record by its ID.
 */
export function deleteAssessmentRecord(id: string): AssessmentRecord[] {
  try {
    const existing = getAssessmentHistory();
    const filtered = existing.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete assessment record:', err);
    return getAssessmentHistory();
  }
}

/**
 * Clear all records from history.
 */
export function clearAssessmentHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear assessment history:', err);
  }
}

/**
 * Extract unique patients from assessment history records.
 */
export function getUniquePatients(records: AssessmentRecord[]): {
  id: string;
  name: string;
  isDemo: boolean;
  recordCount: number;
  latestDate: string;
}[] {
  const map = new Map<string, {
    id: string;
    name: string;
    isDemo: boolean;
    recordCount: number;
    latestDate: string;
  }>();

  for (const rec of records) {
    const key = rec.profile.name.toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, {
        id: rec.profile.id,
        name: rec.profile.name,
        isDemo: !!rec.isDemo || rec.profile.id.includes('demo') || rec.profile.id.includes('rajesh') || rec.profile.id.includes('priya') || rec.profile.id.includes('aman'),
        recordCount: 1,
        latestDate: rec.timestamp
      });
    } else {
      const existing = map.get(key)!;
      existing.recordCount += 1;
    }
  }

  return Array.from(map.values());
}

/**
 * Simulate an authentic follow-up assessment for longitudinal clinical tracking
 * at 1 week, 4 weeks, 8 weeks, or 12 weeks intervals.
 */
export function createFollowupAssessment(
  baseline: AssessmentRecord,
  weeks: number,
  weightDeltaKg: number
): AssessmentRecord {
  const targetDate = new Date(new Date(baseline.timestamp).getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
  const updatedWeight = Math.max(35, +(baseline.profile.weightKg + weightDeltaKg).toFixed(1));

  const updatedProfile = {
    ...baseline.profile,
    id: baseline.profile.id,
    weightKg: updatedWeight
  };

  const updatedMetrics = calculateNutritionMetrics(updatedProfile);
  const updatedPlan = generateWeeklyPlan(updatedProfile, updatedMetrics);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[targetDate.getDay()];
  const formattedDate = `${dayOfWeek}, ${targetDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })} • ${targetDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;

  const followupRecord: AssessmentRecord = {
    id: `rec-${baseline.profile.id}-w${weeks}-${Date.now()}`,
    timestamp: targetDate.toISOString(),
    profile: updatedProfile,
    metrics: updatedMetrics,
    plan: updatedPlan,
    isDemo: baseline.isDemo,
    timeSource: baseline.timeSource || 'device',
    dayOfWeek,
    formattedTime: formattedDate,
    notes: `${weeks}-Week Follow-up Assessment (${weightDeltaKg > 0 ? '+' : ''}${weightDeltaKg} kg progress)`
  };

  saveAssessmentRecord(followupRecord);
  return followupRecord;
}

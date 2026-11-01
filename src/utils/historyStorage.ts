import { AssessmentRecord } from '../types/nutrition';

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

    const updated = [record, ...existing].slice(0, 20); // Keep up to 20 records
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

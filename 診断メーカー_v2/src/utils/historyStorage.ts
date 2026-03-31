import type { QuizHistory, QuizHistoryItem } from '../types';

const STORAGE_KEY = 'student-habit-check-history';

/**
 * 履歴をLocalStorageから取得
 */
export function getHistory(): QuizHistory {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * 履歴をLocalStorageに保存
 */
export function saveHistory(history: QuizHistory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // LocalStorageが使用できない場合は無視
  }
}

/**
 * 新しい診断結果を履歴に追加（最新10件保持）
 */
export function addToHistory(item: QuizHistoryItem): QuizHistory {
  const history = getHistory();
  const newHistory = [item, ...history].slice(0, 10);
  saveHistory(newHistory);
  return newHistory;
}

/**
 * 履歴をクリア
 */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 履歴が存在するかチェック
 */
export function hasHistory(): boolean {
  return getHistory().length > 0;
}

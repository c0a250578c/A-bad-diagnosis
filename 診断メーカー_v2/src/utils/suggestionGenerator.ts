import type { CategoryScores, Category, SuggestionItem } from '../types';
import { suggestions } from '../data/suggestions';
import { getScoreLevel } from './scoreCalculator';

interface PrioritizedSuggestion extends SuggestionItem {
  priority: number;
  category: string;
}

/**
 * 改善提案を生成
 * @param scores - カテゴリ別スコア
 * @returns 優先度付き提案リスト（最大5件）
 */
export function generateSuggestions(scores: CategoryScores): SuggestionItem[] {
  const allSuggestions: PrioritizedSuggestion[] = [];

  Object.entries(scores).forEach(([key, score]) => {
    const category = key as Category;
    const level = getScoreLevel(score, category);
    const categorySuggestions = suggestions[category][level];
    
    const priorityBase = level === 'low' ? 0 : level === 'medium' ? 10 : 20;

    categorySuggestions.forEach((suggestion, index) => {
      allSuggestions.push({
        ...suggestion,
        priority: priorityBase + index,
        category
      });
    });
  });

  // 優先度順にソートし、上位5件を返す
  return allSuggestions
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5)
    .map(({ icon, text }) => ({ icon, text }));
}

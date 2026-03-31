import type { CategoryScores } from '../types';
import { suggestions } from '../data/suggestions';
import { getScoreLevel } from './scoreCalculator';
import type { SuggestionItem } from '../types';

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

  Object.entries(scores).forEach(([category, score]) => {
    const level = getScoreLevel(score);
    const categorySuggestions = suggestions[category as keyof typeof suggestions][level];
    
    categorySuggestions.forEach((suggestion, index) => {
      allSuggestions.push({
        ...suggestion,
        priority: level === 'high' ? index : index + 10,
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

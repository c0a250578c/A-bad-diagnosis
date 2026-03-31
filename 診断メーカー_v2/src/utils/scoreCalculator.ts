import type { CategoryScores, Category } from '../types';
import { categoryInfo } from '../data/categoryInfo';

/**
 * スコア計算の定数
 */
const CONSTANTS = {
  MAX_SCORE_PER_QUESTION: 15,
  QUESTIONS_PER_CATEGORY: 2,
  get MAX_SCORE_PER_CATEGORY() {
    return this.MAX_SCORE_PER_QUESTION * this.QUESTIONS_PER_CATEGORY;
  }
} as const;

/**
 * スコアレベルの閾値
 * 80-100点：良好、50-79点：要注意、0-49点：改善が必要
 */
const SCORE_THRESHOLDS = {
  HIGH: 80,    // 良好
  MEDIUM: 50,  // 要注意
  LOW: 0       // 改善必要
} as const;

/**
 * カテゴリスコアを正規化（0-100）
 * @param rawScore - 生スコア（低いほど良い）
 * @returns 正規化スコア（高いほど良い）
 */
export function normalizeScore(rawScore: number): number {
  return Math.round(
    ((CONSTANTS.MAX_SCORE_PER_CATEGORY - rawScore) / CONSTANTS.MAX_SCORE_PER_CATEGORY) * 100
  );
}

/**
 * 総合スコアを計算
 * @param scores - カテゴリ別スコア
 * @returns 0-100の正規化スコア
 */
export function calculateTotalScore(scores: CategoryScores): number {
  const categoryCount = Object.keys(scores).length;
  const totalRawScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  const maxTotal = categoryCount * CONSTANTS.MAX_SCORE_PER_CATEGORY;
  const normalizedScore = Math.round(((maxTotal - totalRawScore) / maxTotal) * 100);
  
  return Math.max(0, normalizedScore);
}

/**
 * 評価メッセージの定義
 * 80-100点：良好、50-79点：要注意、0-49点：改善が必要
 */
const EVALUATION_MESSAGES = {
  EXCELLENT: { threshold: 80, message: '生活習慣は非常に良好です 🌟' },
  GOOD: { threshold: 50, message: '全体的に良好ですが、一部改善の余地があります 👍' },
  NEEDS_IMPROVEMENT: { threshold: 0, message: '改善ポイントが見られます。意識的な見直しをお勧めします 📋' }
} as const;

/**
 * 評価メッセージを取得
 * @param score - 総合スコア
 * @returns 評価メッセージ
 */
export function getEvaluationMessage(score: number): string {
  if (score >= EVALUATION_MESSAGES.EXCELLENT.threshold) {
    return EVALUATION_MESSAGES.EXCELLENT.message;
  }
  if (score >= EVALUATION_MESSAGES.GOOD.threshold) {
    return EVALUATION_MESSAGES.GOOD.message;
  }
  return EVALUATION_MESSAGES.NEEDS_IMPROVEMENT.message;
}

/**
 * カテゴリ名の日本語表示を取得
 * @param category - カテゴリキー
 * @returns 日本語カテゴリ名
 */
export function getCategoryName(category: Category): string {
  return categoryInfo[category]?.name ?? category;
}

/**
 * スコアレベルを判定
 * @param score - カテゴリスコア（生スコア）
 * @returns スコアレベル
 */
export function getScoreLevel(score: number): 'high' | 'medium' | 'low' {
  const normalizedScore = normalizeScore(score);
  
  if (normalizedScore >= SCORE_THRESHOLDS.HIGH) return 'high';
  if (normalizedScore >= SCORE_THRESHOLDS.MEDIUM) return 'medium';
  return 'low';
}

type CategoryAnalysis = {
  issues: string[];
  strengths: string[];
};

/**
 * カテゴリ別の分析を実行
 * @param scores - カテゴリ別スコア
 * @returns 分析結果
 */
function analyzeCategories(scores: CategoryScores): CategoryAnalysis {
  const issues: string[] = [];
  const strengths: string[] = [];

  (Object.keys(scores) as Category[]).forEach((category) => {
    const score = scores[category];
    const normalizedScore = normalizeScore(score);
    const categoryName = getCategoryName(category);

    if (normalizedScore < SCORE_THRESHOLDS.MEDIUM) {
      issues.push(categoryName);
    } else if (normalizedScore >= SCORE_THRESHOLDS.HIGH) {
      strengths.push(categoryName);
    }
  });

  return { issues, strengths };
}

/**
 * 分析コメントを生成
 * @param scores - カテゴリ別スコア
 * @returns 分析テキスト
 */
export function generateAnalysis(scores: CategoryScores): string {
  const { issues, strengths } = analyzeCategories(scores);

  const parts: string[] = [];

  if (issues.length > 0) {
    parts.push(`${issues.join('、')}に改善の余地があります。`);
  }

  if (strengths.length > 0) {
    if (issues.length === 0 && strengths.length === 4) {
      // 全カテゴリ良好な場合
      parts.push(`${strengths.join('、')}は良好に管理されています。全体的にバランスの取れた生活習慣です。`);
    } else {
      const prefix = issues.length > 0 ? '一方、' : '';
      parts.push(`${prefix}${strengths.join('、')}は良好に管理されています。`);
    }
  }

  if (parts.length === 0) {
    return '全体的にバランスの取れた生活習慣です。現状を維持しながら、さらなる向上を目指しましょう。';
  }

  return parts.join('');
}

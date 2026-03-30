/**
 * 学生生活習慣チェック - 型定義
 * すべてのTypeScript型をこのファイルで一元管理
 */

// =============================================================================
// カテゴリ関連
// =============================================================================

/**
 * カテゴリの型定義
 * 4つの生活習慣カテゴリを表す
 */
export type Category = 'sleep' | 'study' | 'phone' | 'planning';

/**
 * カテゴリ情報の型
 */
export interface CategoryInfo {
  key: Category;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

// =============================================================================
// 質問・選択肢関連
// =============================================================================

/**
 * 選択肢（オプション）の型
 */
export interface Option {
  /** スコア（低いほど良い） */
  score: number;
  /** 表示テキスト */
  text: string;
}

/**
 * 質問の型
 */
export interface Question {
  /** 一意のID */
  id: string;
  /** 所属カテゴリ */
  category: Category;
  /** カテゴリ名 */
  categoryName: string;
  /** CSSクラス名 */
  categoryClass: string;
  /** 質問文 */
  text: string;
  /** 選択肢配列 */
  options: Option[];
}

// =============================================================================
// スコア・評価関連
// =============================================================================

/**
 * カテゴリ別スコアの型
 */
export type CategoryScores = Record<Category, number>;

/**
 * 画面状態の型
 */
export type Screen = 'start' | 'quiz' | 'result';

/**
 * クイズ状態の型
 */
export interface QuizState {
  /** 現在の画面 */
  currentScreen: Screen;
  /** 現在の質問インデックス */
  currentQuestionIndex: number;
  /** カテゴリ別スコア */
  categoryScores: CategoryScores;
  /** 回答履歴 */
  answers: { questionId: string; score: number }[];
}

// =============================================================================
// 改善提案関連
// =============================================================================

/**
 * 改善提案アイテムの型
 */
export interface SuggestionItem {
  /** アイコン絵文字 */
  icon: string;
  /** アドバイステキスト */
  text: string;
}

/**
 * カテゴリ別改善提案データの型
 */
export interface CategorySuggestions {
  /** スコア高（改善必要） */
  high: SuggestionItem[];
  /** スコア中（要注意） */
  medium: SuggestionItem[];
  /** スコア低（良好） */
  low: SuggestionItem[];
}

/**
 * 全改善提案データの型
 */
export type Suggestions = Record<Category, CategorySuggestions>;

// =============================================================================
// 履歴・LocalStorage関連
// =============================================================================

/**
 * 個別の診断結果記録
 */
export interface QuizHistoryItem {
  /** ユニークID */
  id: string;
  /** 診断実施日時 */
  date: string;
  /** 総合スコア */
  totalScore: number;
  /** カテゴリ別スコア */
  categoryScores: CategoryScores;
  /** 評価メッセージ */
  evaluationMessage: string;
}

/**
 * 履歴一覧
 */
export type QuizHistory = QuizHistoryItem[];

/**
 * LocalStorageのキー
 */
export const STORAGE_KEY = 'student-habit-check-history';


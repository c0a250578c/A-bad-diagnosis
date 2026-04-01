import { describe, it, expect } from 'vitest';
import { calculateTotalScore, generateAnalysis, normalizeScore, getScoreLevel, getEvaluationMessage } from './scoreCalculator';
import type { CategoryScores } from '../types';

describe('calculateTotalScore', () => {
  it('すべてのカテゴリで最高スコア（0点）の場合、100点を返す', () => {
    const scores: CategoryScores = {
      sleep: 0,
      study: 0,
      phone: 0,
      planning: 0
    };
    expect(calculateTotalScore(scores)).toBe(100);
  });

  it('すべてのカテゴリで最低スコア（30点）の場合、0点を返す', () => {
    const scores: CategoryScores = {
      sleep: 30,
      study: 30,
      phone: 30,
      planning: 30
    };
    expect(calculateTotalScore(scores)).toBe(0);
  });

  it('すべてのカテゴリで中間スコア（15点）の場合、50点を返す', () => {
    const scores: CategoryScores = {
      sleep: 15,
      study: 15,
      phone: 15,
      planning: 15
    };
    expect(calculateTotalScore(scores)).toBe(50);
  });

  it('バランスの取れたスコアの場合、正しく計算する', () => {
    const scores: CategoryScores = {
      sleep: 5,
      study: 10,
      phone: 15,
      planning: 20
    };
    // 合計生スコア: 50, 最大: 120, 正規化スコア: round((120-50)/120*100) = 58
    expect(calculateTotalScore(scores)).toBe(58);
  });
});

describe('generateAnalysis', () => {
  it('すべてのカテゴリが良好（80点以上）の場合、全体良好メッセージを返す', () => {
    const scores: CategoryScores = {
      sleep: 0,    // normalizeScore(0) = 100
      study: 0,
      phone: 0,
      planning: 0
    };
    const result = generateAnalysis(scores);
    expect(result).toContain('睡眠習慣、学習管理、スマホ使用、計画性は良好に管理されています');
    expect(result).toContain('全体的にバランスの取れた生活習慣です');
  });

  it('すべてのカテゴリが改善が必要（50点未満）の場合、改善メッセージを返す', () => {
    const scores: CategoryScores = {
      sleep: 30,   // normalizeScore(30) = 0
      study: 30,
      phone: 30,
      planning: 30
    };
    const result = generateAnalysis(scores);
    expect(result).toContain('睡眠習慣、学習管理、スマホ使用、計画性に改善の余地があります');
  });

  it('混合スコアの場合、強みと改善点の両方を含む', () => {
    const scores: CategoryScores = {
      sleep: 0,    // 100点 - 良好
      study: 0,    // 100点 - 良好
      phone: 25,   // normalizeScore(25) = 17 - 改善必要
      planning: 25 // 17点 - 改善必要
    };
    const result = generateAnalysis(scores);
    expect(result).toContain('スマホ使用、計画性に改善の余地があります');
    expect(result).toContain('一方、睡眠習慣、学習管理は良好に管理されています');
  });

  it('一部良好・一部中間の場合、適切に分類する', () => {
    const scores: CategoryScores = {
      sleep: 0,   // 100点 - 良好
      study: 10,  // normalizeScore(10) = 67 - 中間（要注意）
      phone: 10,
      planning: 10
    };
    const result = generateAnalysis(scores);
    expect(result).toContain('睡眠習慣は良好に管理されています');
  });
});

describe('normalizeScore', () => {
  it('生スコア0点は100点に正規化される', () => {
    expect(normalizeScore(0)).toBe(100);
  });

  it('生スコア30点は0点に正規化される', () => {
    expect(normalizeScore(30)).toBe(0);
  });

  it('生スコア15点は50点に正規化される', () => {
    expect(normalizeScore(15)).toBe(50);
  });
});

describe('getScoreLevel', () => {
  it('80点以上はhighを返す', () => {
    expect(getScoreLevel(0)).toBe('high');   // normalizeScore(0) = 100
    expect(getScoreLevel(5)).toBe('high');    // normalizeScore(5) = 83
  });

  it('50-79点はmediumを返す', () => {
    expect(getScoreLevel(10)).toBe('medium');  // normalizeScore(10) = 67
    expect(getScoreLevel(15)).toBe('medium'); // normalizeScore(15) = 50
  });

  it('49点以下はlowを返す', () => {
    expect(getScoreLevel(20)).toBe('low');    // normalizeScore(20) = 33
    expect(getScoreLevel(30)).toBe('low');    // normalizeScore(30) = 0
  });
});

describe('getEvaluationMessage', () => {
  it('80点以上はEXCELLENTメッセージを返す', () => {
    expect(getEvaluationMessage(80)).toContain('非常に良好');
    expect(getEvaluationMessage(100)).toContain('非常に良好');
  });

  it('50-79点はGOODメッセージを返す', () => {
    expect(getEvaluationMessage(50)).toContain('全体的に良好');
    expect(getEvaluationMessage(79)).toContain('全体的に良好');
  });

  it('49点以下はNEEDS_IMPROVEMENTメッセージを返す', () => {
    expect(getEvaluationMessage(49)).toContain('改善ポイント');
    expect(getEvaluationMessage(0)).toContain('改善ポイント');
  });
});

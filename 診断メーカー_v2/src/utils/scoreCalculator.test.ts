import { describe, it, expect } from 'vitest';
import { calculateTotalScore, generateAnalysis, normalizeScore } from './scoreCalculator';
import type { CategoryScores } from '../types';

describe('calculateTotalScore', () => {
  it('すべてのカテゴリで最高スコア（0点）の場合、100点を返す', () => {
    const scores: CategoryScores = {
      sleep: 0,
      study: 0,
      phone: 0,
      planning: 0,
      health: 0,
      social: 0
    };
    expect(calculateTotalScore(scores)).toBe(100);
  });

  it('すべてのカテゴリで最低スコアの場合、0点を返す', () => {
    // 全24問、各15点満点 = 合計360点
    const scores: CategoryScores = {
      sleep: 60,   // 4問 * 15
      study: 60,   // 4問 * 15
      phone: 60,   // 4問 * 15
      planning: 60, // 4問 * 15
      health: 60,  // 4問 * 15
      social: 60   // 4問 * 15
    };
    expect(calculateTotalScore(scores)).toBe(0);
  });
});

describe('generateAnalysis', () => {
  it('すべてのカテゴリが良好な場合、バランス良好メッセージを返す', () => {
    const scores: CategoryScores = {
      sleep: 0,
      study: 0,
      phone: 0,
      planning: 0,
      health: 0,
      social: 0
    };
    const result = generateAnalysis(scores);
    expect(result).toContain('は良好に管理されています');
  });
});

describe('normalizeScore', () => {
  it('質問数4の場合、生スコア0点は100点に正規化される', () => {
    expect(normalizeScore(0, 4)).toBe(100);
  });

  it('質問数4の場合、生スコア60点は0点に正規化される', () => {
    expect(normalizeScore(60, 4)).toBe(0);
  });
});

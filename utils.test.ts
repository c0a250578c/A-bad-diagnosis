import { describe, it, expect } from 'vitest';
import { 
  calculateTotalScore, 
  getEvaluationMessage, 
  generateAnalysis, 
  getScoreLevel,
  normalizeScore,
  getCategoryName 
} from '../src/utils/scoreCalculator';
import type { CategoryScores } from '../src/types';

describe('calculateTotalScore', () => {
  it('全カテゴリ最低スコア（0点）の場合、100点を返す', () => {
    const scores: CategoryScores = {
      sleep: 0,
      study: 0,
      phone: 0,
      planning: 0
    };
    expect(calculateTotalScore(scores)).toBe(100);
  });

  it('全カテゴリ最高スコア（30点）の場合、0点を返す', () => {
    const scores: CategoryScores = {
      sleep: 30,
      study: 30,
      phone: 30,
      planning: 30
    };
    expect(calculateTotalScore(scores)).toBe(0);
  });

  it('中間的なスコアの場合、正しく正規化される', () => {
    const scores: CategoryScores = {
      sleep: 15,
      study: 15,
      phone: 15,
      planning: 15
    };
    expect(calculateTotalScore(scores)).toBe(50);
  });

  it('少数スコアの場合、正しく四捨五入される', () => {
    const scores: CategoryScores = {
      sleep: 1,
      study: 1,
      phone: 1,
      planning: 1
    };
    expect(calculateTotalScore(scores)).toBe(97);
  });

  it('カテゴリ数が異なっても正しく計算される', () => {
    // 2カテゴリのケース
    const scores = { sleep: 15, study: 15 } as CategoryScores;
    expect(calculateTotalScore(scores)).toBe(50);
  });
});

describe('normalizeScore', () => {
  it('最低スコア(0)は100%を返す', () => {
    expect(normalizeScore(0)).toBe(100);
  });

  it('最高スコア(30)は0%を返す', () => {
    expect(normalizeScore(30)).toBe(0);
  });

  it('中間スコア(15)は50%を返す', () => {
    expect(normalizeScore(15)).toBe(50);
  });

  it('端数は四捨五入される', () => {
    expect(normalizeScore(7)).toBe(77);  // 30-7=23, 23/30*100=76.67
    expect(normalizeScore(8)).toBe(73);  // 30-8=22, 22/30*100=73.33
  });
});

describe('getEvaluationMessage', () => {
  it('80点以上の場合、最高評価メッセージを返す', () => {
    expect(getEvaluationMessage(80)).toContain('非常に良好');
    expect(getEvaluationMessage(100)).toContain('非常に良好');
  });

  it('60〜79点の場合、良好メッセージを返す', () => {
    expect(getEvaluationMessage(60)).toContain('全体的に良好');
    expect(getEvaluationMessage(79)).toContain('全体的に良好');
  });

  it('40〜59点の場合、改善メッセージを返す', () => {
    expect(getEvaluationMessage(40)).toContain('改善ポイント');
    expect(getEvaluationMessage(59)).toContain('改善ポイント');
  });

  it('40点未満の場合、要注意メッセージを返す', () => {
    expect(getEvaluationMessage(39)).toContain('見直し');
    expect(getEvaluationMessage(0)).toContain('見直し');
  });
});

describe('getScoreLevel', () => {
  it('75%以上はhigh（良好）', () => {
    expect(getScoreLevel(0)).toBe('high');
    expect(getScoreLevel(7)).toBe('high');
  });

  it('50%以上75%未満はmedium（要注意）', () => {
    expect(getScoreLevel(15)).toBe('medium');
    expect(getScoreLevel(8)).toBe('medium');
  });

  it('50%未満はlow（改善必要）', () => {
    expect(getScoreLevel(16)).toBe('low');
    expect(getScoreLevel(30)).toBe('low');
  });
});

describe('generateAnalysis', () => {
  it('全カテゴリ良好な場合、バランス良好メッセージを返す', () => {
    const scores: CategoryScores = {
      sleep: 5,
      study: 5,
      phone: 5,
      planning: 5
    };
    const analysis = generateAnalysis(scores);
    expect(analysis).toContain('バランスの取れた');
  });

  it('問題カテゴリがある場合、課題を指摘する', () => {
    const scores: CategoryScores = {
      sleep: 20,
      study: 20,
      phone: 20,
      planning: 20
    };
    const analysis = generateAnalysis(scores);
    expect(analysis).toContain('改善の余地');
  });

  it('強みと弱みが混在する場合、両方を言及する', () => {
    const scores: CategoryScores = {
      sleep: 0,
      study: 0,
      phone: 25,
      planning: 25
    };
    const analysis = generateAnalysis(scores);
    expect(analysis).toContain('一方');
  });
});

describe('getCategoryName', () => {
  it('カテゴリキーに対応する日本語名を返す', () => {
    expect(getCategoryName('sleep')).toBe('睡眠習慣');
    expect(getCategoryName('study')).toBe('学習管理');
    expect(getCategoryName('phone')).toBe('スマホ使用');
    expect(getCategoryName('planning')).toBe('計画性');
  });
});

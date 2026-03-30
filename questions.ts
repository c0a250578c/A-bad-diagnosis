import type { Question } from '../types';

/**
 * 質問データ
 * 各質問はカテゴリ、質問文、選択肢配列を持つ
 * 選択肢はスコア（低いほど良い）と表示テキストを持つ
 */
export const questions: Question[] = [
  // 睡眠カテゴリ
  {
    id: 'sleep_1',
    category: 'sleep',
    categoryName: '睡眠習慣',
    categoryClass: 'category-sleep',
    text: '普段の就寝時間は？',
    options: [
      { score: 0, text: '22時〜23時' },
      { score: 5, text: '24時前後' },
      { score: 10, text: '深夜1時〜2時' },
      { score: 15, text: '深夜3時以降' }
    ]
  },
  {
    id: 'sleep_2',
    category: 'sleep',
    categoryName: '睡眠習慣',
    categoryClass: 'category-sleep',
    text: '起床時間は？',
    options: [
      { score: 0, text: '6時〜7時' },
      { score: 5, text: '7時〜8時' },
      { score: 10, text: '9時〜10時' },
      { score: 15, text: '10時以降' }
    ]
  },
  // 学習管理カテゴリ
  {
    id: 'study_1',
    category: 'study',
    categoryName: '学習管理',
    categoryClass: 'category-study',
    text: '1日の学習時間は？',
    options: [
      { score: 0, text: '3時間以上' },
      { score: 5, text: '1〜2時間' },
      { score: 10, text: '30分〜1時間' },
      { score: 15, text: 'ほとんどしない' }
    ]
  },
  {
    id: 'study_2',
    category: 'study',
    categoryName: '学習管理',
    categoryClass: 'category-study',
    text: '課題の提出は？',
    options: [
      { score: 0, text: '期限前に余裕を持って提出' },
      { score: 5, text: '期限前日に提出' },
      { score: 10, text: '期限当日にギリギリ提出' },
      { score: 15, text: '提出が遅れることもある' }
    ]
  },
  // スマホ使用カテゴリ
  {
    id: 'phone_1',
    category: 'phone',
    categoryName: 'スマホ使用',
    categoryClass: 'category-phone',
    text: '1日のスマホ使用時間は？',
    options: [
      { score: 0, text: '2時間以下' },
      { score: 5, text: '3〜5時間' },
      { score: 10, text: '6〜8時間' },
      { score: 15, text: '9時間以上' }
    ]
  },
  {
    id: 'phone_2',
    category: 'phone',
    categoryName: 'スマホ使用',
    categoryClass: 'category-phone',
    text: '寝る前のスマホ使用は？',
    options: [
      { score: 0, text: '寝る30分前には使わない' },
      { score: 5, text: '寝る10分前まで使用' },
      { score: 10, text: '布団に入ってからも使用' },
      { score: 15, text: '使いながら寝落ちすることもある' }
    ]
  },
  // 計画性カテゴリ
  {
    id: 'planning_1',
    category: 'planning',
    categoryName: '計画性',
    categoryClass: 'category-planning',
    text: '日々の予定管理は？',
    options: [
      { score: 0, text: 'スケジュール帳やアプリで管理' },
      { score: 5, text: '頭の中で管理' },
      { score: 10, text: '必要になったら考える' },
      { score: 15, text: '予定を立てることは少ない' }
    ]
  },
  {
    id: 'planning_2',
    category: 'planning',
    categoryName: '計画性',
    categoryClass: 'category-planning',
    text: '将来の目標は？',
    options: [
      { score: 0, text: '具体的に設定している' },
      { score: 5, text: '漠然と考えている' },
      { score: 10, text: 'たまに考える' },
      { score: 15, text: 'あまり考えていない' }
    ]
  }
];

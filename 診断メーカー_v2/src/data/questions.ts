import type { Question } from '../types';

/**
 * 質問データ
 * 各質問はカテゴリ、質問文、選択肢配列を持つ
 * 選択肢はスコア（低いほど良い）と表示テキストを持つ
 */
export const questions: Question[] = [
  // ========================================
  // 睡眠習慣カテゴリ（4問）
  // ========================================
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
  {
    id: 'sleep_3',
    category: 'sleep',
    categoryName: '睡眠習慣',
    categoryClass: 'category-sleep',
    text: '睡眠の質は？',
    options: [
      { score: 0, text: 'よく眠れてスッキリ起きられる' },
      { score: 5, text: '大体眠れている' },
      { score: 10, text: '時々眠りが浅い' },
      { score: 15, text: 'よく眠れないことが多い' }
    ]
  },
  {
    id: 'sleep_4',
    category: 'sleep',
    categoryName: '睡眠習慣',
    categoryClass: 'category-sleep',
    text: '昼寝・仮眠は？',
    options: [
      { score: 0, text: 'しない、または15分以内' },
      { score: 5, text: '30分程度' },
      { score: 10, text: '1時間程度' },
      { score: 15, text: '2時間以上、または夜に影響する' }
    ]
  },

  // ========================================
  // 学習管理カテゴリ（4問）
  // ========================================
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
  {
    id: 'study_3',
    category: 'study',
    categoryName: '学習管理',
    categoryClass: 'category-study',
    text: '集中して学習できる時間帯は？',
    options: [
      { score: 0, text: '朝（午前中）' },
      { score: 5, text: '午後' },
      { score: 10, text: '夜（18時〜24時）' },
      { score: 15, text: '深夜（24時以降）' }
    ]
  },
  {
    id: 'study_4',
    category: 'study',
    categoryName: '学習管理',
    categoryClass: 'category-study',
    text: '学習した内容の復習は？',
    options: [
      { score: 0, text: '当日または翌日に必ず行う' },
      { score: 5, text: '週末にまとめて行う' },
      { score: 10, text: 'テスト前に行う' },
      { score: 15, text: 'ほとんど行わない' }
    ]
  },

  // ========================================
  // スマホ使用カテゴリ（4問）
  // ========================================
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
  {
    id: 'phone_3',
    category: 'phone',
    categoryName: 'スマホ使用',
    categoryClass: 'category-phone',
    text: 'SNSの使用時間は？',
    options: [
      { score: 0, text: '30分以内' },
      { score: 5, text: '1時間程度' },
      { score: 10, text: '2〜3時間' },
      { score: 15, text: '4時間以上' }
    ]
  },
  {
    id: 'phone_4',
    category: 'phone',
    categoryName: 'スマホ使用',
    categoryClass: 'category-phone',
    text: 'ゲームアプリの使用は？',
    options: [
      { score: 0, text: 'ほとんどしない' },
      { score: 5, text: '1時間以内' },
      { score: 10, text: '2〜3時間' },
      { score: 15, text: '4時間以上' }
    ]
  },

  // ========================================
  // 計画性カテゴリ（4問）
  // ========================================
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
  },
  {
    id: 'planning_3',
    category: 'planning',
    categoryName: '計画性',
    categoryClass: 'category-planning',
    text: '大きなタスクは？',
    options: [
      { score: 0, text: '小さく分割して計画する' },
      { score: 5, text: '部分的に分割する' },
      { score: 10, text: '全体像を把握して取り組む' },
      { score: 15, text: 'その場の気分で進める' }
    ]
  },
  {
    id: 'planning_4',
    category: 'planning',
    categoryName: '計画性',
    categoryClass: 'category-planning',
    text: '1日の振り返りは？',
    options: [
      { score: 0, text: '毎日必ず行う' },
      { score: 5, text: '週に1〜2回行う' },
      { score: 10, text: '月に数回行う' },
      { score: 15, text: 'ほとんど行わない' }
    ]
  },

  // ========================================
  // 運動・健康カテゴリ（3問）- 新規追加
  // ========================================
  {
    id: 'health_1',
    category: 'health',
    categoryName: '運動・健康',
    categoryClass: 'category-health',
    text: '1週間の運動頻度は？',
    options: [
      { score: 0, text: '4回以上' },
      { score: 5, text: '2〜3回' },
      { score: 10, text: '1回程度' },
      { score: 15, text: 'ほとんどしない' }
    ]
  },
  {
    id: 'health_2',
    category: 'health',
    categoryName: '運動・健康',
    categoryClass: 'category-health',
    text: '食事のバランスは？',
    options: [
      { score: 0, text: '朝昼晩3食バランスよく摂る' },
      { score: 5, text: '基本的に3食摂るが偏りがある' },
      { score: 10, text: '1〜2食抜くことが多い' },
      { score: 15, text: '不規則で偏った食事が多い' }
    ]
  },
  {
    id: 'health_3',
    category: 'health',
    categoryName: '運動・健康',
    categoryClass: 'category-health',
    text: '水分摂取は？',
    options: [
      { score: 0, text: '1日2L以上意識して摂る' },
      { score: 5, text: '喉が渇いたら飲む程度' },
      { score: 10, text: '食事時のみ飲む' },
      { score: 15, text: 'あまり水分を摂らない' }
    ]
  },
  {
    id: 'health_4',
    category: 'health',
    categoryName: '運動・健康',
    categoryClass: 'category-health',
    text: '心身の疲れを感じた際、適切にリフレッシュできていますか？',
    options: [
      { score: 0, text: '自分なりの解消法がある' },
      { score: 5, text: 'ある程度できている' },
      { score: 10, text: '疲れが溜まりやすい' },
      { score: 15, text: '解消できずストレスが多い' }
    ]
  },

  // ========================================
  // 人間関係カテゴリ（4問）- 新規追加
  // ========================================
  {
    id: 'social_1',
    category: 'social',
    categoryName: '人間関係',
    categoryClass: 'category-social',
    text: '友人との交流は？',
    options: [
      { score: 0, text: '定期的に顔を合わせて話す' },
      { score: 5, text: 'メッセージで頻繁に連絡を取る' },
      { score: 10, text: '必要な時だけ連絡する' },
      { score: 15, text: 'あまり交流がない' }
    ]
  },
  {
    id: 'social_2',
    category: 'social',
    categoryName: '人間関係',
    categoryClass: 'category-social',
    text: 'ストレスの発散方法は？',
    options: [
      { score: 0, text: '適切な方法（運動・趣味など）で発散している' },
      { score: 5, text: '友人に相談して解消する' },
      { score: 10, text: '我慢して過ごすことが多い' },
      { score: 15, text: '暴飲暴食や買い物などで発散している' }
    ]
  },
  {
    id: 'social_3',
    category: 'social',
    categoryName: '人間関係',
    categoryClass: 'category-social',
    text: '対人コミュニケーションは？',
    options: [
      { score: 0, text: '積極的に自分から話しかける' },
      { score: 5, text: '話しかけられたら快く応対する' },
      { score: 10, text: '必要最小限のやり取りにとどめる' },
      { score: 15, text: '人と話すことに疲れやすい' }
    ]
  },
  {
    id: 'social_4',
    category: 'social',
    categoryName: '人間関係',
    categoryClass: 'category-social',
    text: 'グループワークや集団行動での協力は？',
    options: [
      { score: 0, text: '円滑に協力できる' },
      { score: 5, text: '特に苦ではない' },
      { score: 10, text: '少し負担を感じる' },
      { score: 15, text: '非常に苦痛、または避けたい' }
    ]
  }
];

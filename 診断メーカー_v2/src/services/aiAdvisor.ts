import type { CategoryScores } from '../types';
import { categoryInfo } from '../data/categoryInfo';
import { normalizeScore } from '../utils/scoreCalculator';

const MODEL = 'gemini-1.5-flash';

import { questions } from '../data/questions';

/**
 * 診断結果に基づいたAIアドバイスを生成
 */
export async function generateAIAdvice(
  scores: CategoryScores, 
  totalScore: number, 
  mode: 'kind' | 'sarcastic' = 'kind'
): Promise<string> {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  // v1beta から v1 に変更して安定性を向上
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;

  console.log('Using API Key (first 5 chars):', API_KEY?.substring(0, 5));

  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY') {
    throw new Error('APIキーが設定されていません。');
  }

  const categoriesList = Object.entries(scores)
    .map(([key, score]) => {
      const info = categoryInfo[key as keyof typeof categoryInfo];
      const count = questions.filter(q => q.category === key).length;
      return `- ${info.name}: ${normalizeScore(score, count)}点`;
    })
    .join('\n');

  const kindPrompt = `
あなたは世界最高峰のメンタルコーチ兼生活習慣アドバイザーです。
以下の学生生活習慣診断の結果を「データ」としてだけでなく、一人の学生の「人生の羅針盤」として深く分析してください。

【診断データ】
総合スコア: ${totalScore}点 / 100点
カテゴリ別詳細:
${categoriesList}

【生成ガイドライン】
1. **総評**: 冒頭で、現在の状態をポジティブかつ本質を突いた言葉で1文で表現してください。
2. **共感と分析**: 単なる結果の羅列ではなく、「なぜそのスコアになったのか」という背景に寄り添った分析をしてください。
3. **具体的な3ステップ**: スコアが低いカテゴリを中心に、今日から始められる「ベビーステップ」を3つ提案してください。
4. **維持の秘訣**: スコアが良いカテゴリについては、それを維持することで将来どんな素晴らしいメリット（就活、健康、QOL向上など）があるかを伝えてください。
5. **トーン**: 読後感が「明日が楽しみになる」ような、温かくもプロフェッショナルなトーンにしてください。
6. **形式**: Markdownを使用して、視覚的に整理してください（###や-を使用）。返答はアドバイス本文のみとしてください。
`;

  const sarcasticPrompt = `
あなたは「自称・地獄の毒舌教育評論家」です。甘えきった大学生を更生させるのが唯一の趣味です。
以下の、見るに堪えない（あるいは奇跡的にマシな）診断結果をメッタ斬りにしてください。

【惨めな診断データ】
総合スコア: ${totalScore}点 / 100点
カテゴリ別詳細:
${categoriesList}

【処刑ガイドライン】
1. **絶望のキャッチコピー**: 冒頭1行で、この結果を象徴する「目を逸らしたくなるような称号」を授けてください（例：「将来が不透明な粗大ゴミ」「歩く怠惰のカタログ」など）。
2. **現実の直視**: 「自分なりに頑張っている」という言い訳を先回りして論破してください。
3. **冷酷な未来予測**: 低いスコアのカテゴリを放置した場合、数年後にどのような「悲惨な末路（留年、内定ゼロ、健康崩壊など）」が待っているかを容赦なく描写してください。
4. **マシな部分への皮肉**: 高スコアのカテゴリがあっても「ここだけは人間らしいが、他が全滅なので意味がない」といった具合に追い打ちをかけてください。
5. **ドSな締め文句**: 最後は「ま、せいぜい地獄の底を這いずり回りなさい（嘲笑）」といったニュアンスで突き放してください。
6. **形式**: Markdownを使用して読みやすく、かつ威圧感のある構成にしてください。返答はアドバイス本文のみとしてください。
`;

  const prompt = mode === 'kind' ? kindPrompt : sarcasticPrompt;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error Response:', errorData);
      throw new Error(errorData.error?.message || `APIエラー (Status: ${response.status})`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Detailed fetch error:', error);
    throw error;
  }
}

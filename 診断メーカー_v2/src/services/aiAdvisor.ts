import type { CategoryScores } from '../types';
import { categoryInfo } from '../data/categoryInfo';
import { normalizeScore } from '../utils/scoreCalculator';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-1.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

import { questions } from '../data/questions';

/**
 * 診断結果に基づいたAIアドバイスを生成
 */
export async function generateAIAdvice(scores: CategoryScores, totalScore: number): Promise<string> {
  const categoriesList = Object.entries(scores)
    .map(([key, score]) => {
      const info = categoryInfo[key as keyof typeof categoryInfo];
      const count = questions.filter(q => q.category === key).length;
      return `- ${info.name}: ${normalizeScore(score, count)}点`;
    })
    .join('\n');

  const prompt = `
あなたは誠実で専門的な生活習慣アドバイザーです。
以下の学生生活習慣診断の結果に基づいて、非常に具体的でパーソナライズされた、親しみやすくも的確な改善アドバイスを日本語で作成してください。

【診断結果】
総合スコア: ${totalScore}点 / 100点

カテゴリ別詳細:
${categoriesList}

【制約事項】
1. 最初に総合的な評価を1文で伝えてください。
2. スコアが低いカテゴリ（50点未満）に対して、具体的なアクションプランを提案してください。
3. スコアが高いカテゴリ（80点以上）に対しては、その習慣を維持するための励ましの言葉をかけてください。
4. 全体のトーンは、大学生の心に寄り添い、モチベーションを高める温かいものにしてください。
5. Markdown形式で読みやすく構成してください。
6. 返答には余計な挨拶やメタデータを含めず、アドバイス本文のみを返してください。
`;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AIとの通信に失敗しました');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

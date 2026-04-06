import React, { useEffect, useState } from 'react';
import type { CategoryScores } from '../types';
import { generateAIAdvice } from '../services/aiAdvisor';

interface AIAdvisorProps {
  scores: CategoryScores;
  totalScore: number;
}

/**
 * AIアドバイザーによる分析を表示するコンポーネント
 */
export const AIAdvisor: React.FC<AIAdvisorProps> = ({ scores, totalScore }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdvice() {
      try {
        setLoading(true);
        const result = await generateAIAdvice(scores, totalScore);
        setAdvice(result);
        setError(null);
      } catch (err) {
        setError('AIアドバイスの取得に失敗しました。時間をおいて再度お試しください。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [scores, totalScore]);

  return (
    <div className="card ai-advisor-section">
      <h3 className="card-title">🤖 AIアドバイザーの特別分析</h3>
      
      {loading && (
        <div className="ai-loading">
          <div className="ai-spinner"></div>
          <p>Gemini AI があなたの生活習慣を詳しく分析しています...</p>
        </div>
      )}

      {error && (
        <div className="ai-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      {advice && !loading && (
        <div className="ai-content fade-in">
          {advice.split('\n').map((line, i) => (
            <p key={i}>{line || '\u00A0'}</p>
          ))}
        </div>
      )}
    </div>
  );
};

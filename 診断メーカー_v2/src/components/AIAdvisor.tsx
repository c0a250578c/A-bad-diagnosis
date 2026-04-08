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
      // APIキーの簡易チェック
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.length < 10) {
        setError('Gemini APIキーが設定されていないか、正しくありません。.envファイルを確認してください。');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await generateAIAdvice(scores, totalScore);
        setAdvice(result);
        setError(null);
      } catch (err) {
        setError('AIアドバイスの取得に失敗しました。APIキーの有効性を確認するか、時間をおいて再度お試しください。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [scores, totalScore]);

  return (
    <div className="card ai-advisor-section">
      <div className="card-title-container">
        <h3 className="card-title">
          <span>🤖</span> AIアドバイザーの個別分析
        </h3>
        <span className="ai-badge">Powered by Gemini AI</span>
      </div>
      
      {loading && (
        <div className="ai-loading">
          <div className="ai-spinner"></div>
          <p>あなたの回答を深く分析して、最適なアドバイスを生成しています...</p>
        </div>
      )}

      {error && (
        <div className="ai-error">
          <p>⚠️ {error}</p>
          <div className="ai-error-hint">
            <small>ヒント: APIキーは Google AI Studio から取得し、.env ファイルに VITE_GEMINI_API_KEY として設定してください。</small>
          </div>
        </div>
      )}

      {advice && !loading && (
        <div className="ai-content fade-in">
          {advice.split('\n').map((line, i) => {
            // シンプルなMarkdown対応（太字や見出し風）
            if (line.startsWith('###')) {
              return <h4 key={i} className="ai-h4">{line.replace('###', '').trim()}</h4>;
            }
            if (line.startsWith('##')) {
              return <h3 key={i} className="ai-h3">{line.replace('##', '').trim()}</h3>;
            }
            if (line.startsWith('-') || line.startsWith('*')) {
              return <li key={i} className="ai-li">{line.substring(1).trim()}</li>;
            }
            return <p key={i} className="ai-p">{line || '\u00A0'}</p>;
          })}
        </div>
      )}
    </div>
  );
};

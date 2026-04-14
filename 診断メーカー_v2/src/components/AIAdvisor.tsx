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
  const [mode, setMode] = useState<'kind' | 'sarcastic'>('kind');
  const [adviceMap, setAdviceMap] = useState<Record<'kind' | 'sarcastic', string | null>>({
    kind: null,
    sarcastic: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdvice() {
      // 既に取得済みの場合はスキップ
      if (adviceMap[mode]) return;

      // APIキーの簡易チェック
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.length < 10) {
        setError('Gemini APIキーが設定されていないか、正しくありません。.envファイルを確認してください。');
        return;
      }

      try {
        setLoading(true);
        const result = await generateAIAdvice(scores, totalScore, mode);
        setAdviceMap(prev => ({ ...prev, [mode]: result }));
        setError(null);
      } catch (err) {
        setError('AIアドバイスの取得に失敗しました。APIキーの有効性を確認するか、時間をおいて再度お試しください。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [scores, totalScore, mode]);

  const currentAdvice = adviceMap[mode];

  return (
    <div className={`card ai-advisor-section ${mode === 'sarcastic' ? 'mode-sarcastic' : ''}`}>
      <div className="card-title-container">
        <h3 className="card-title">
          <span>{mode === 'kind' ? '🤖' : '🔥'}</span> AIアドバイザーの個別分析
        </h3>
        <span className="ai-badge">Powered by Gemini AI</span>
      </div>

      {/* モード切り替えボタン */}
      <div className="ai-mode-toggle">
        <button 
          className={`mode-btn ${mode === 'kind' ? 'active' : ''}`}
          onClick={() => setMode('kind')}
        >
          <span>🌱</span> 優しめ
        </button>
        <button 
          className={`mode-btn sarcastic ${mode === 'sarcastic' ? 'active' : ''}`}
          onClick={() => setMode('sarcastic')}
        >
          <span>👿</span> 毒舌
        </button>
      </div>
      
      {loading && (
        <div className="ai-loading">
          <div className="ai-spinner"></div>
          <p>
            {mode === 'kind' 
              ? 'あなたの回答を深く分析して、最適なアドバイスを生成しています...' 
              : '現実を直視させるための、愛の鞭を準備しています...'}
          </p>
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

      {currentAdvice && !loading && (
        <div className="ai-content fade-in" key={mode}>
          {currentAdvice.split('\n').map((line, i) => {
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

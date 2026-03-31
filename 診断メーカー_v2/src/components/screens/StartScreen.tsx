import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { getHistory, clearHistory } from '../../utils/historyStorage';
import { HistoryList, HistorySummary } from '../history/HistoryComponents';
import type { QuizHistory, QuizHistoryItem } from '../../types';

interface FeatureItemProps {
  icon: string;
  label: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, label }) => (
  <div className="feature-item">
    <div className="feature-icon">{icon}</div>
    <div>{label}</div>
  </div>
);

export const StartScreen: React.FC = () => {
  const { startQuiz } = useQuiz();
  const [history, setHistory] = useState<QuizHistory>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleSelectHistory = (item: QuizHistoryItem) => {
    // 履歴項目を選択した場合の処理（拡張用）
    console.log('Selected history:', item);
  };

  const features = [
    { icon: '😴', label: '睡眠習慣' },
    { icon: '📚', label: '学習管理' },
    { icon: '📱', label: 'スマホ使用' },
    { icon: '📅', label: '計画性' }
  ];

  return (
    <div className="start-screen fade-in">
      <div className="card">
        <div className="intro">
          <p>
            このアプリでは、学生の日常生活習慣を<br />
            「睡眠」「勉強」「スマホ使用」「計画性」の4カテゴリで評価します。
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureItem 
              key={feature.label}
              icon={feature.icon} 
              label={feature.label} 
            />
          ))}
        </div>

        <button className="btn btn-primary" onClick={startQuiz}>
          診断を始める →
        </button>

        {/* 履歴表示セクション */}
        {history.length > 0 && (
          <div className="history-section">
            <button 
              className="btn btn-text"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? '▼ 履歴を隠す' : '▶ 過去の診断結果を見る'}
            </button>
            
            {showHistory && (
              <div className="history-content fade-in">
                <HistorySummary history={history} />
                <HistoryList 
                  history={history.slice(0, 5)} 
                  onSelect={handleSelectHistory}
                />
                {history.length > 0 && (
                  <button 
                    className="btn btn-danger-small"
                    onClick={handleClearHistory}
                  >
                    履歴をクリア
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import type { QuizHistory, QuizHistoryItem, Category } from '../../types';
import { categoryInfo } from '../../data/categoryInfo';

interface HistoryListProps {
  history: QuizHistory;
  onSelect?: (item: QuizHistoryItem) => void;
}

/**
 * 日付をフォーマット
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * 履歴一覧コンポーネント
 */
export const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="history-empty">
        <p>まだ診断履歴がありません。</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      {history.map((item) => (
        <div 
          key={item.id} 
          className="history-item"
          onClick={() => onSelect?.(item)}
          style={{ cursor: onSelect ? 'pointer' : 'default' }}
        >
          <div className="history-header">
            <span className="history-date">{formatDate(item.date)}</span>
            <span className={`history-score score-${item.totalScore >= 80 ? 'high' : item.totalScore >= 60 ? 'medium' : 'low'}`}>
              {item.totalScore}点
            </span>
          </div>
          <div className="history-categories">
            {(Object.keys(item.categoryScores) as Category[]).map(cat => {
              const normalizedScore = Math.round(((30 - item.categoryScores[cat]) / 30) * 100);
              return (
                <span key={cat} className="history-category-badge">
                  {categoryInfo[cat].icon} {Math.max(0, normalizedScore)}点
                </span>
              );
            })}
          </div>
          <p className="history-message">{item.evaluationMessage}</p>
        </div>
      ))}
    </div>
  );
};

interface HistorySummaryProps {
  history: QuizHistory;
}

/**
 * 履歴サマリーコンポーネント
 * 統計情報を表示
 */
export const HistorySummary: React.FC<HistorySummaryProps> = ({ history }) => {
  if (history.length === 0) return null;

  const scores = history.map(h => h.totalScore);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const maxScore = Math.max(...scores);
  const trend = scores[0] - scores[scores.length - 1];

  return (
    <div className="history-summary">
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">診断回数</span>
          <span className="summary-value">{history.length}回</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">平均スコア</span>
          <span className="summary-value">{avgScore}点</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">最高スコア</span>
          <span className="summary-value">{maxScore}点</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">前回比</span>
          <span className={`summary-value ${trend > 0 ? 'improved' : trend < 0 ? 'declined' : 'neutral'}`}>
            {trend > 0 ? '↗ +' : trend < 0 ? '↘ ' : '→ '}{trend}点
          </span>
        </div>
      </div>
    </div>
  );
};

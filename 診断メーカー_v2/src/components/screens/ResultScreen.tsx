import React, { useEffect, useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { calculateTotalScore, getEvaluationMessage, generateAnalysis, normalizeScore } from '../../utils/scoreCalculator';
import { generateSuggestions } from '../../utils/suggestionGenerator';
import { addToHistory } from '../../utils/historyStorage';
import { categoryInfo } from '../../data/categoryInfo';
import { ScoreRadarChart, ScoreHistoryChart } from '../charts/ScoreCharts';
import { HistorySummary } from '../history/HistoryComponents';
import type { QuizHistoryItem, Category } from '../../types';
import { AIAdvisor } from '../AIAdvisor';

interface ScoreBarProps {
  score: number;
  color: string;
  delay: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, color, delay }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(score);
    }, delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="score-bar">
      <div 
        className="score-fill" 
        style={{ 
          width: `${width}%`, 
          backgroundColor: color,
          transition: 'width 1s ease'
        }}
      />
    </div>
  );
};

interface AnimatedScoreProps {
  targetScore: number;
}

const AnimatedScore: React.FC<AnimatedScoreProps> = ({ targetScore }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentScore = Math.round(targetScore * easeProgress);
      
      setDisplayScore(currentScore);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [targetScore]);

  return <div className="total-score">{displayScore}</div>;
};

interface CategoryScoreItemProps {
  category: Category;
  rawScore: number;
  index: number;
}

/**
 * カテゴリ別スコア表示コンポーネント
 */
const CategoryScoreItem: React.FC<CategoryScoreItemProps> = ({ category, rawScore, index }) => {
  const info = categoryInfo[category];
  const displayScore = Math.max(0, normalizeScore(rawScore));

  return (
    <div className="category-item">
      <div className="category-header">
        <span className="category-name">
          <span>{info.icon}</span> {info.name}
        </span>
        <span className="category-score">{displayScore}点</span>
      </div>
      <ScoreBar 
        score={displayScore} 
        color={info.color}
        delay={300 + index * 100}
      />
    </div>
  );
};

const SuggestionList: React.FC<{ suggestions: { icon: string; text: string }[] }> = ({ suggestions }) => (
  <ul className="suggestions-list">
    {suggestions.map((suggestion, index) => (
      <li key={index}>
        <span className="suggestion-icon">{suggestion.icon}</span>
        <span className="suggestion-text">{suggestion.text}</span>
      </li>
    ))}
  </ul>
);

const ScoreLegend: React.FC = () => (
  <div className="score-legend">
    <div className="legend-item">
      <div className="legend-dot" style={{ background: '#10b981' }}></div>
      <span>80-100点: 良好</span>
    </div>
    <div className="legend-item">
      <div className="legend-dot" style={{ background: '#f59e0b' }}></div>
      <span>50-79点: 要注意</span>
    </div>
    <div className="legend-item">
      <div className="legend-dot" style={{ background: '#ef4444' }}></div>
      <span>0-49点: 改善が必要</span>
    </div>
  </div>
);

export const ResultScreen: React.FC = () => {
  const { categoryScores, restartQuiz } = useQuiz();
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  
  const totalScore = calculateTotalScore(categoryScores);
  const message = getEvaluationMessage(totalScore);
  const analysis = generateAnalysis(categoryScores);
  const suggestionList = generateSuggestions(categoryScores);

  // 結果をLocalStorageに保存
  useEffect(() => {
    const newItem: QuizHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      totalScore,
      categoryScores: { ...categoryScores },
      evaluationMessage: message
    };
    const updatedHistory = addToHistory(newItem);
    setHistory(updatedHistory);
  }, []);

  return (
    <div className="result-screen fade-in">
      {/* 総合スコア */}
      <div className="card result-summary">
        <AnimatedScore targetScore={totalScore} />
        <div className="total-score-label">総合スコア / 100点</div>
        <div className="result-message">{message}</div>
      </div>

      {/* AIアドバイザーによる特別分析 */}
      <AIAdvisor scores={categoryScores} totalScore={totalScore} />

      {/* カテゴリ別スコア */}
      <div className="card category-scores">
        <h3 className="card-title">📈 カテゴリ別スコア</h3>
        
        {/* レーダーチャート */}
        <ScoreRadarChart scores={categoryScores} />
        
        {(Object.keys(categoryScores) as Category[]).map((category, index) => (
          <CategoryScoreItem
            key={category}
            category={category}
            rawScore={categoryScores[category]}
            index={index}
          />
        ))}
        
        <ScoreLegend />
      </div>

      {/* 履歴グラフ（2回目以降） */}
      {history.length > 1 && (
        <div className="card">
          <h3 className="card-title">📊 過去の診断結果</h3>
          <ScoreHistoryChart history={history.slice(0, 5)} />
          <HistorySummary history={history} />
        </div>
      )}

      {/* 分析コメント */}
      <div className="card analysis-section">
        <div className="analysis-title">🔍 分析結果</div>
        <p className="analysis-text">{analysis}</p>
      </div>

      {/* 改善提案 */}
      <div className="card">
        <h3 className="card-title">💡 改善提案</h3>
        <SuggestionList suggestions={suggestionList} />
      </div>

      {/* 再診断ボタン */}
      <button className="btn btn-secondary mb-4" onClick={restartQuiz}>
        ← もう一度診断する
      </button>
    </div>
  );
};

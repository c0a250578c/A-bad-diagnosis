import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { categoryInfo } from '../../data/categoryInfo';
import type { CategoryScores, Category } from '../../types';

/**
 * カテゴリ別スコアをRecharts用データに変換
 */
function convertToRadarData(scores: CategoryScores): Array<{ subject: string; score: number; fullMark: number }> {
  return (Object.keys(scores) as Category[]).map((category) => {
    const normalizedScore = Math.round(((30 - scores[category]) / 30) * 100);
    return {
      subject: categoryInfo[category].name,
      score: Math.max(0, normalizedScore),
      fullMark: 100
    };
  });
}

interface ScoreRadarChartProps {
  scores: CategoryScores;
}

/**
 * レーダーチャートコンポーネント
 * 4カテゴリのスコアを可視化
 */
export const ScoreRadarChart: React.FC<ScoreRadarChartProps> = ({ scores }) => {
  const data = convertToRadarData(scores);

  return (
    <div className="chart-container" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="スコア"
            dataKey="score"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * 履歴用データ型
 */
interface HistoryDataPoint {
  date: string;
  score: number;
}

interface ScoreHistoryChartProps {
  history: Array<{ date: string; totalScore: number }>;
}

/**
 * スコア履歴折れ線グラフ
 */
export const ScoreHistoryChart: React.FC<ScoreHistoryChartProps> = ({ history }) => {
  // 日付を短縮して表示
  const data: HistoryDataPoint[] = history.map(item => ({
    date: new Date(item.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
    score: item.totalScore
  })).reverse();

  return (
    <div className="chart-container" style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip formatter={(value) => [`${value}点`, '総合スコア']} />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.score >= 80 ? '#10b981' : entry.score >= 60 ? '#3b82f6' : entry.score >= 40 ? '#f59e0b' : '#ef4444'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

import React from 'react';
import { useQuiz } from './context/QuizContext';
import { StartScreen } from './components/screens/StartScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { ResultScreen } from './components/screens/ResultScreen';

/**
 * メインアプリケーションコンポーネント
 * 現在の画面状態に応じて適切な画面をレンダリング
 */
export const App: React.FC = () => {
  const { currentScreen } = useQuiz();

  return (
    <div className="container">
      <header className="app-header">
        <h1>📊 学生生活習慣チェック</h1>
        <p>6つのカテゴリで生活習慣を分析し、改善ポイントを提案します</p>
      </header>

      {currentScreen === 'start' && <StartScreen />}
      {currentScreen === 'quiz' && <QuizScreen />}
      {currentScreen === 'result' && <ResultScreen />}
    </div>
  );
};

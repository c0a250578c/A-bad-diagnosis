import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { questions } from '../../data/questions';
import type { Category } from '../../types';

interface ProgressBarProps {
  current: number;
  total: number;
}

/**
 * 進捗バーコンポーネント
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div 
      className="progress-bar" 
      role="progressbar" 
      aria-valuenow={Math.round(progress)} 
      aria-valuemin={0} 
      aria-valuemax={100}
      aria-label={`進捗: ${current} / ${total}`}
    >
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

interface OptionButtonProps {
  text: string;
  onClick: () => void;
  index: number;
}

/**
 * 選択肢ボタンコンポーネント
 * フェードインアニメーション付き
 */
const OptionButton: React.FC<OptionButtonProps> = ({ text, onClick, index }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      className={`option-btn ${isVisible ? 'visible' : ''}`}
      onClick={onClick}
      aria-label={`${text}を選択`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.3s ease'
      }}
    >
      {text}
    </button>
  );
};

export const QuizScreen: React.FC = () => {
  const { currentQuestionIndex, answerQuestion, totalQuestions } = useQuiz();
  const question = questions[currentQuestionIndex];

  const handleOptionClick = (score: number, category: Category) => {
    answerQuestion(score, category);
  };

  return (
    <div className="quiz-screen fade-in">
      <div className="card">
        <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />

        <div className="question-header">
          <span className={`question-category ${question.categoryClass}`}>
            {question.categoryName}
          </span>
          <h2 className="question-text">{question.text}</h2>
        </div>

        <div className="options" role="radiogroup" aria-label="選択肢">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              text={option.text}
              index={index}
              onClick={() => handleOptionClick(option.score, question.category)}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-secondary">
        質問 {currentQuestionIndex + 1} / {totalQuestions}
      </p>
    </div>
  );
};

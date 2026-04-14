import React, { createContext, useContext, useState, useCallback } from 'react';
import type { CategoryScores, Screen, QuizState, Category } from '../types';

interface QuizContextType extends QuizState {
  startQuiz: () => void;
  answerQuestion: (score: number, category: Category) => void;
  finishLoading: () => void;
  restartQuiz: () => void;
  totalQuestions: number;
}

const initialScores: CategoryScores = {
  sleep: 0,
  study: 0,
  phone: 0,
  planning: 0,
  health: 0,
  social: 0
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode; totalQuestions: number }> = ({ 
  children, 
  totalQuestions 
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [categoryScores, setCategoryScores] = useState<CategoryScores>(initialScores);
  const [answers, setAnswers] = useState<{ questionId: string; score: number }[]>([]);

  const startQuiz = useCallback(() => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setCategoryScores(initialScores);
    setAnswers([]);
  }, []);

  const answerQuestion = useCallback((score: number, category: Category) => {
    setCategoryScores(prev => ({
      ...prev,
      [category]: prev[category] + score
    }));

    setAnswers(prev => [...prev, { questionId: `q_${prev.length}`, score }]);

    setCurrentQuestionIndex(prev => {
      const next = prev + 1;
      if (next >= totalQuestions) {
        setCurrentScreen('loading');
      }
      return next;
    });
  }, [totalQuestions]);

  const finishLoading = useCallback(() => {
    setCurrentScreen('result');
  }, []);

  const restartQuiz = useCallback(() => {
    setCurrentScreen('start');
    setCurrentQuestionIndex(0);
    setCategoryScores(initialScores);
    setAnswers([]);
  }, []);

  const value: QuizContextType = {
    currentScreen,
    currentQuestionIndex,
    categoryScores,
    answers,
    startQuiz,
    answerQuestion,
    finishLoading,
    restartQuiz,
    totalQuestions
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

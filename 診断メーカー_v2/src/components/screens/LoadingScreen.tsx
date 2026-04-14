import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * 診断結果の計算中・AI分析準備中のローディング画面
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('診断結果を計算中...');

  const messages = [
    '回答データを正規化しています...',
    'カテゴリ別の傾向を分析しています...',
    'AIアドバイザーにデータを送信中...',
    '改善アドバイスを生成しています...',
    'レポートを準備しています...'
  ];

  useEffect(() => {
    const duration = 2500; // 2.5秒
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const messageInterval = setInterval(() => {
      setMessage(prev => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 500);

    const completionTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearInterval(messageInterval);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen fade-in">
      <div className="loading-content">
        <div className="loading-spinner-large"></div>
        <h2 className="loading-title">分析中</h2>
        <div className="loading-progress-container">
          <div 
            className="loading-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

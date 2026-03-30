import type { Category, CategoryInfo } from '../types';

/**
 * カテゴリ情報の定義
 */
export const categoryInfo: Record<Category, CategoryInfo> = {
  sleep: {
    key: 'sleep',
    name: '睡眠習慣',
    icon: '😴',
    color: '#8b5cf6',
    bgColor: '#ede9fe'
  },
  study: {
    key: 'study',
    name: '学習管理',
    icon: '📚',
    color: '#06b6d4',
    bgColor: '#cffafe'
  },
  phone: {
    key: 'phone',
    name: 'スマホ使用',
    icon: '📱',
    color: '#f59e0b',
    bgColor: '#fef3c7'
  },
  planning: {
    key: 'planning',
    name: '計画性',
    icon: '📅',
    color: '#10b981',
    bgColor: '#d1fae5'
  }
};

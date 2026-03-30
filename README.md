# 学生生活習慣チェック - Student Habit Check

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Test%20Passing-6E9F18?logo=vitest)](https://vitest.dev/)
[![CI/CD](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=github-actions)](.github/workflows/ci.yml)

React + TypeScript + Vite で構築した、学生の生活習慣を分析する診断型Webアプリケーション。LocalStorageによる履歴保存とRechartsによる可視化機能を搭載。

**🔗 デモURL**: （デプロイ後に追記）

---

## 🎯 アプリ概要

4つのカテゴリ（睡眠習慣・学習管理・スマホ使用・計画性）で学生の生活習慣を多角的に評価し、パーソナライズされた改善提案を提供します。

### 主な機能

- **8つの質問**で生活習慣をスコア化（各カテゴリ2問）
- **レーダーチャート**で4カテゴリのバランスを可視化
- **履歴保存**（LocalStorage）で過去の診断結果を比較
- **傾向分析**で生活習慣の変化を追跡
- **AIライクな分析コメント**と改善提案（最大5件）

---

## 🛠 技術スタック

| カテゴリ           | 技術                     | 選定理由                                      |
| ------------------ | ------------------------ | --------------------------------------------- |
| **フレームワーク** | React 18                 | コンポーネントベース設計、Hooksによる状態管理 |
| **言語**           | TypeScript (Strict Mode) | 型安全性、IDEサポート、リファクタリング容易性 |
| **ビルドツール**   | Vite                     | 高速HMR、最適化ビルド、モダンな開発体験       |
| **テスト**         | Vitest                   | Jest互換、Vite統合、高速実行                  |
| **グラフ**         | Recharts                 | React対応、カスタマイズ性、レスポンシブ対応   |
| **CI/CD**          | GitHub Actions           | 自動テスト・ビルド、品質担保                  |

---

## 📁 プロジェクト構成

```
src/
├── components/
│   ├── charts/
│   │   └── ScoreCharts.tsx      # Recharts: レーダー・棒グラフ
│   ├── history/
│   │   └── HistoryComponents.tsx # 履歴一覧・統計表示
│   └── screens/
│       ├── StartScreen.tsx      # トップ画面（履歴表示付き）
│       ├── QuizScreen.tsx       # 質問画面
│       └── ResultScreen.tsx     # 結果画面（グラフ付き）
├── context/
│   └── QuizContext.tsx          # グローバル状態管理
├── data/
│   ├── questions.ts             # 質問データ
│   ├── suggestions.ts           # 改善提案データ
│   └── categoryInfo.ts          # カテゴリ設定
├── types/
│   ├── index.ts                 # 主要型定義
│   └── history.ts               # 履歴型定義
├── utils/
│   ├── scoreCalculator.ts       # スコア計算・正規化
│   ├── suggestionGenerator.ts   # 提案生成ロジック
│   └── historyStorage.ts        # LocalStorage操作
├── App.tsx
└── index.css

tests/
└── utils.test.ts                # 20+ テストケース

.github/workflows/
└── ci.yml                       # CI/CDパイプライン
```

---

## � 工夫した点・技術的チャレンジ

### 1. スコア計算の正規化ロジック

低いスコアほど「良い」という逆転現象を、0-100%の「高いほど良い」に正規化する独自アルゴリズムを実装。

```typescript
// 生スコア（0-30）を正規化（0-100）
export function normalizeScore(rawScore: number): number {
  return Math.round(((30 - rawScore) / 30) * 100);
}
```

### 2. LocalStorageの型安全性

履歴データの構造をTypeScriptで厳密に定義し、読み書き時の型安全性を確保。

```typescript
// 型付きで安全にLocalStorage操作
export interface QuizHistoryItem {
  id: string;
  date: string;
  totalScore: number;
  categoryScores: CategoryScores;
  evaluationMessage: string;
}
```

### 3. React Context + useReducerパターン

複雑な状態遷移（start → quiz → result → restart）を型安全に管理。

### 4. データ駆動設計

質問データ・提案データを配列として分離し、新規追加時の修正範囲を最小化。

### 5. アニメーション実装

`requestAnimationFrame`を使用したスムーズなスコアカウントアップ。

### 6. レスポンシブなグラフ

Rechartsの`ResponsiveContainer`で自動サイズ調整。

---

## � 改善の軌跡（HTML→React化）

| 項目               | Before（HTML/JS）   | After（React/TS）                   |
| ------------------ | ------------------- | ----------------------------------- |
| **アーキテクチャ** | 1ファイル（1094行） | コンポーネント分割（10+ファイル）   |
| **型安全性**       | なし                | TypeScript Strict Mode              |
| **状態管理**       | グローバル変数      | React Context + Hooks               |
| **ロジック分離**   | インライン          | utils関数として分離・単体テスト可能 |
| **可視化**         | テキストのみ        | Rechartsレーダー/棒グラフ           |
| **データ永続化**   | なし                | LocalStorage履歴保存（最新10件）    |
| **テスト**         | なし                | Vitest 20+テストケース              |
| **CI/CD**          | なし                | GitHub Actions自動化                |

---

## � セットアップ手順

### 必要条件

- Node.js 18+
- npm 9+

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd 診断メーカー_v2
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

---

## 🧪 テスト実行

```bash
# テストを1回実行
npm test -- --run

# または
npx vitest run

# ウォッチモード（開発時）
npm test

# UIモードで詳細確認
npx vitest --ui
```

**テストカバレッジ**: `calculateTotalScore`, `normalizeScore`, `getScoreLevel`, `getEvaluationMessage`, `generateAnalysis`, `getCategoryName`

---

## 📦 ビルド・デプロイ

```bash
# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# 型チェック
npm run type-check
```

---

## 🎤 面接での説明テンプレート

```
「学生生活習慣チェック」は、React + TypeScript + Viteで構築した
診断型Webアプリケーションです。

【技術的なポイント】
1. 型安全性：TypeScript Strict Modeで全データ構造を型定義し、
   実行時エラーをゼロに近づけました

2. コンポーネント設計：画面単位で分割し、責務を明確に。
   さらにcharts/historyなど機能単位でディレクトリ分割

3. 状態管理：React Contextでグローバル状態を管理し、
   コンポーネント間のprops drillingを回避

4. データ永続化：LocalStorageで履歴を保存し、
   過去の診断結果と比較できる機能を実装

5. 可視化：Rechartsでレーダーチャートを実装し、
   4カテゴリのバランスを直感的に表示

6. テスト駆動：Vitestで20+テストケースを実装。
   スコア計算ロジックの境界値を網羅的に検証

7. CI/CD：GitHub Actionsでテスト・ビルドを自動化

【工夫した点】
・HTML/CSS/JSの1ファイル構成から、Reactコンポーネント設計へリファクタリング
・「低いスコア=良い」という逆転現象を「100%が最高」の正規化ロジックに変換
・データ駆動設計で質問・提案の追加を容易に
・アニメーションでUX向上（スコアカウントアップ、選択肢のフェードイン）
```

---

## 🌟 今後の拡張予定

- [ ] スコア履歴の折れ線グラフ（時系列推移）
- [ ] カテゴリ別の詳細アドバイスページ
- [ ] シェア機能（OGP画像生成）
- [ ] バックエンド連携（永続化）
- [ ] PWA対応（オフライン診断）

---

## 📄 ライセンス

MIT License

---

## 👤 作者

**[あなたの名前]** - フロントエンドエンジニア志望

- GitHub: [@yourusername]
- Portfolio: [your-portfolio-url]
- Contact: [your-email]

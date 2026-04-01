# 学生生活習慣チェック

[![Vercel Deploy](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://student-habit-check.vercel.app)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=github)](https://github.com/c0a250578c/A-bad-diagnosis/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Test Coverage](https://img.shields.io/badge/Tests-Vitest%2BPlaywright-brightgreen?logo=vitest)]()

> **6つの生活習慣カテゴリ**（睡眠・学習・スマホ・計画性・運動・健康・人間関係）を診断し、パーソナライズされた改善提案を提供するReactアプリケーション

🔗 **ライブデモ**: https://student-habit-check.vercel.app

---

## 📸 スクリーンショット

| 開始画面 | 診断中 | 結果表示 |
|:---:|:---:|:---:|
| 診断の概要と履歴表示 | 20問のインタラクティブ診断 | レーダーチャート + 改善提案 |

---

## ✨ 主な機能

- **6カテゴリ×20問の総合診断** - 学生生活の全側面をカバー
- **インタラクティブな可視化** - Rechartsによるレーダーチャート表示
- **パーソナライズされた提案** - スコアに応じた具体的な改善アドバイス
- **診断履歴管理** - LocalStorageでの永続化
- **アニメーションUX** - Framer Motion同等のCSSアニメーション

---

## 🛠 技術スタックと選定理由

| 技術 | 選定理由 |
|------|----------|
| **React 18** | 関数コンポーネント + Hooksによるシンプルな状態管理。業界標準のため就活アピール力が高い |
| **TypeScript** | 厳格な型チェックにより、データ構造の整合性を保証。大規模開発の練習として導入 |
| **Vite** | 速い開発サーバー起動（<300ms）と最適化された本番ビルド。Create React Appより軽量 |
| **Vitest** | Jest互換でViteネイティブ。テスト実行が高速で、React Testing Libraryと相性が良い |
| **Playwright** | E2Eテストの業界標準。ブラウザ自動化・スクリーンショット・CI連携が充実 |
| **Recharts** | 宣言的なAPIで、Reactの思想と統一的。カスタマイズ性と軽量性のバランスが良い |
| **Vercel** | ゼロコンフィグデプロイ + Git連携。フロントエンドエンジニアの標準スキルとして習得 |

---

## 🏗 設計・実装の工夫

### 1. スコアロジックの統一設計
```typescript
// 生スコア（低いほど良い）→ 表示スコア（高いほど良い）への正規化
const normalizedScore = Math.round(((maxTotal - totalRawScore) / maxTotal) * 100);
```
**工夫ポイント**: 内部計算とユーザー表示で「良い方向」を統一し、混乱を防止。閾値80/50/0で3段階評価。

### 2. コンポーネント責務の分離
```
src/
├── components/
│   ├── screens/          # ページ単位（Start/Quiz/Result）
│   ├── charts/           # 純粋な表示コンポーネント
│   └── history/          # 機能単位コンポーネント
├── context/
│   └── QuizContext.tsx   # グローバル状態一括管理
├── data/                 # 定数・設定データ（ビジネスロジック分離）
└── utils/                # 純粋関数（テスト容易）
```

### 3. 型安全性の徹底
- `Category`型をUnion Typeで定義し、存在しないカテゴリをコンパイル時に防止
- `CategoryScores`は`Record<Category, number>`で、すべてのカテゴリにスコアが必須に
- スコア計算関数は純粋関数（副作用なし）で単体テストが容易

### 4. UX改善ポイント
- **進捗バー** - 20問中何問目かを視覚的に表示
- **選択肢アニメーション** - ホバー時のフィードバックで操作感を向上
- **結果画面の段階表示** - スコア→グラフ→提案の順に表示し情報過多を防止
- **カテゴリカラー統一** - 6カテゴリそれぞれに固有カラーを割り当て可視性向上

---

## 🧪 テスト戦略

### 単体テスト（Vitest）

```typescript
// scoreCalculator.test.ts
- calculateTotalScore: 4パターン（満点/良好/要注意/改善が必要）
- normalizeScore: 境界値テスト
- getScoreLevel: 閾値テスト（80, 50, 0境界）
- generateAnalysis: カテゴリ組み合わせパターン
```

**カバレッジ対象**: スコア計算・正規化・評価メッセージ生成（ビジネスロジックの核心）

### E2Eテスト（Playwright）

```typescript
// e2e/quiz.spec.ts
- 診断フロー通し: 開始→20問回答→結果表示→再診断
- スコア検証: 最良回答→高スコア、最悪回答→低スコア
- 履歴機能: 診断後に履歴が保存される
```

**テスト方針**: ユーザーフローの「クリティカルパス」を網羅。UIの細部より動線の検証を優先。

---

## 📊 CI/CDパイプライン

```
Push → Type Check → Unit Test → Build → E2E Test → Deploy
```

- **GitHub Actions**で自動化
- **Vercel**との連携でmainブランチプッシュ時に自動デプロイ
- Pull Request作成時にPreview環境に自動デプロイ

---

## 🔮 今後の改善（成長性アピール）

### 短期（1-2週間）
- [ ] **レスポンシブ対応の強化** - スマホ表示の最適化
- [ ] **アクセシビリティ対応** - WAI-ARIA属性の追加
- [ ] **パフォーマンス計測** - Lighthouse CI導入

### 中期（1-2ヶ月）
- [ ] **バックエンド連携** - 診断結果の永続化（Firebase/Supabase）
- [ ] **認証機能** - ユーザー別履歴管理
- [ ] **データ分析** - 診断結果の統計・傾向分析

### 長期（3-6ヶ月）
- [ ] **AI活用** - OpenAI APIでパーソナライズ提案の強化
- [ ] **モバイルアプリ** - React Nativeでのクロスプラットフォーム展開
- [ ] **コミュニティ機能** - 同じ課題を持つユーザー同士の交流

---

## 🚀 ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 型チェック
npm run type-check

# 単体テスト実行
npm test

# E2Eテスト実行
npm run test:e2e

# ビルド
npm run build
```

---

## 📝 開発者メモ

**このプロジェクトで学んだこと**:
- TypeScriptの厳格モード（`strict: true`）による堅牢な型設計
- テストファーストの開発（Vitest + React Testing Library）
- CI/CD構築による開発効率向上
- UXデザインとテクニカルデザインの両立

---

## Vercelへのデプロイ方法

### 1. GitHubにコードをプッシュ

```bash
# 初めての場合
gh repo create student-habit-check --public --source=. --remote=origin --push

# または既存の場合
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/student-habit-check.git
git push -u origin main
```

### 2. Vercelアカウント作成

1. [vercel.com](https://vercel.com) にアクセス
2. GitHubアカウントで「Continue with GitHub」をクリック
3. 認可を許可

### 3. プロジェクト連携・デプロイ

1. Vercel Dashboardで「Add New Project」
2. GitHubリポジトリ一覧から `student-habit-check` を選択
3. Framework Preset: **Vite**（自動検出される）
4. 「Deploy」ボタンをクリック

約1-2分でデプロイ完了。URLが発行されます。

### 4. 自動デプロイ設定

- `main`ブランチへのプッシュ → 自動で本番デプロイ
- Pull Request作成 → Preview環境に自動デプロイ

---

## 📄 ライセンス

MIT © 2024

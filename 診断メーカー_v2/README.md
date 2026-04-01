# 学生生活習慣チェック

学生の日常生活習慣を4つのカテゴリ（睡眠・学習管理・スマホ使用・計画性）で評価し、改善ポイントを提案するReactアプリケーション。

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **Vitest** - ユニットテスト
- **Playwright** - E2Eテスト
- **Recharts** - グラフ可視化
- **Vercel** - デプロイ・ホスティング

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 型チェック
npm run type-check

# テスト実行（Vitest - 単体テスト）
npm test

# E2Eテスト実行（Playwright）
npm run test:e2e

# E2Eテスト実行（UIモードで確認）
npm run test:e2e:ui

# ビルド
npm run build
```

## Vercelへのデプロイ方法（初心者向け）

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

## プロジェクト構成

```
src/
├── components/
│   ├── screens/          # 画面コンポーネント
│   │   ├── StartScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   └── ResultScreen.tsx
│   ├── charts/           # グラフコンポーネント
│   └── history/          # 履歴表示コンポーネント
├── context/
│   └── QuizContext.tsx   # 状態管理
├── data/
│   ├── questions.ts      # 質問データ
│   ├── categoryInfo.ts   # カテゴリ情報
│   └── suggestions.ts    # 改善提案データ
├── utils/
│   ├── scoreCalculator.ts      # スコア計算
│   ├── scoreCalculator.test.ts # テスト
│   ├── suggestionGenerator.ts  # 提案生成
│   └── historyStorage.ts       # LocalStorage操作
└── types/
    └── index.ts          # 型定義
```

## スコア評価基準

| スコア   | 評価          | 色    |
| -------- | ------------- | ----- |
| 80-100点 | 良好 🌟       | 🟢 緑 |
| 50-79点  | 要注意 ⚠️     | 🟡 黄 |
| 0-49点   | 改善が必要 📋 | 🔴 赤 |

## スクリプト一覧

| コマンド              | 説明                         |
| --------------------- | ---------------------------- |
| `npm run dev`         | 開発サーバー起動             |
| `npm run build`       | 本番用ビルド                 |
| `npm run type-check`  | TypeScript型チェック         |
| `npm test`            | 単体テスト（ウォッチモード） |
| `npm run test:run`    | 単体テスト（1回のみ）        |
| `npm run test:e2e`    | E2Eテスト実行                |
| `npm run test:e2e:ui` | E2Eテスト（UIモード）        |
| `npm run lint`        | ESLint実行                   |

## ライセンス

MIT

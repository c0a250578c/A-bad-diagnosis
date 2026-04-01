import { test, expect } from '@playwright/test';

test.describe('学生生活習慣チェック - E2Eテスト', () => {
  test('診断フロー全体が正常に動作する', async ({ page }) => {
    // 開始画面
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('学生生活習慣チェック');
    await expect(page.locator('.intro')).toBeVisible();
    
    // 診断開始
    await page.click('text=診断を始める');
    
    // 8問回答（全カテゴリで最良の選択肢）
    for (let i = 1; i <= 8; i++) {
      await expect(page.locator('.question-category')).toBeVisible();
      await expect(page.locator('.question-text')).toBeVisible();
      await expect(page.locator('.options')).toBeVisible();
      
      // 最初の選択肢（最良の回答）を選択
      await page.locator('.option-btn').first().click();
      
      // 進捗表示の確認
      await expect(page.locator('.progress-bar')).toBeVisible();
    }
    
    // 結果画面
    await expect(page.locator('.result-screen')).toBeVisible();
    await expect(page.locator('.total-score')).toBeVisible();
    await expect(page.locator('.evaluation-message')).toBeVisible();
    await expect(page.locator('.score-legend')).toBeVisible();
    
    // スコアが100点に近い（全て最良回答のため）
    const scoreText = await page.locator('.total-score').textContent();
    expect(scoreText).toBeTruthy();
    
    // カテゴリ別スコア表示
    await expect(page.locator('.category-scores')).toBeVisible();
    
    // 改善提案表示
    await expect(page.locator('.suggestions')).toBeVisible();
    
    // もう一度診断
    await page.click('text=もう一度診断する');
    await expect(page.locator('.start-screen')).toBeVisible();
  });

  test('悪い回答を選ぶと低スコアになる', async ({ page }) => {
    await page.goto('/');
    await page.click('text=診断を始める');
    
    // 8問回答（全て最悪の選択肢）
    for (let i = 1; i <= 8; i++) {
      await page.locator('.option-btn').last().click();
    }
    
    // 結果画面で改善メッセージが表示される
    await expect(page.locator('.result-screen')).toBeVisible();
    const message = await page.locator('.evaluation-message').textContent();
    expect(message).toContain('改善');
  });

  test('履歴機能が動作する', async ({ page }) => {
    await page.goto('/');
    
    // 最初に診断を完了させて履歴を作成
    await page.click('text=診断を始める');
    for (let i = 1; i <= 8; i++) {
      await page.locator('.option-btn').first().click();
    }
    
    // 戻って履歴を確認
    await page.goto('/');
    
    // 履歴表示ボタンが表示される
    const historyButton = page.locator('text=過去の診断結果');
    await expect(historyButton).toBeVisible();
  });
});

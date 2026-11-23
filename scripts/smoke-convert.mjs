import { chromium } from 'playwright';
import { join } from 'node:path';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const results = [];

try {
  await page.goto(base, { waitUntil: 'networkidle', timeout: 120_000 });
  const body = await page.content();
  results.push({ step: 'title', ok: body.includes('Free Video Converter') });
  results.push({ step: 'no-youtube-download', ok: !/youtube\.com|tiktok/i.test(body) });
  results.push({ step: 'wf-more-tools', ok: body.includes('wf-more-tools') });

  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: /Choose a file/i }).click(),
  ]);
  await fileChooser.setFiles(join(process.cwd(), 'test-media', 'test.webm'));
  await page.waitForTimeout(3000);
  await page.waitForSelector('text=time=', { timeout: 300_000 }).catch(() => null);
  const logHasProgress = (await page.locator('#addContent, .conversion, pre').allTextContents())
    .join(' ')
    .toLowerCase();
  results.push({
    step: 'conversion-started',
    ok: logHasProgress.includes('ffmpeg') || logHasProgress.includes('duration') || logHasProgress.includes('time='),
  });
} catch (e) {
  results.push({ step: 'error', ok: false, message: String(e) });
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (!results.every(r => r.ok)) process.exit(1);
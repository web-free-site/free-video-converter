import { chromium } from 'playwright';
import { join } from 'node:path';
import { readFileSync, statSync } from 'node:fs';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173';

async function convertAndDownload(page, mediaPath) {
  const downloadPromise = page.waitForEvent('download', { timeout: 600_000 });
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: /Choose a file/i }).click(),
  ]);
  await fileChooser.setFiles(mediaPath);
  const download = await downloadPromise;
  const savePath = join('/tmp', download.suggestedFilename());
  await download.saveAs(savePath);
  const size = statSync(savePath).size;
  const head = readFileSync(savePath).subarray(0, 12);
  const isMp4 = head[4] === 0x66 && head[5] === 0x74 && head[6] === 0x79 && head[7] === 0x70;
  return { filename: download.suggestedFilename(), size, isMp4, savePath };
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage({ viewport: { width: 390, height: 844 } });
const results = [];

try {
  const resp = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  const headers = resp?.headers() ?? {};
  results.push({ step: 'no-coop', ok: !headers['cross-origin-opener-policy'] });
  results.push({ step: 'no-coep', ok: !headers['cross-origin-embedder-policy'] });

  const sab = await page.evaluate(() => typeof SharedArrayBuffer);
  results.push({ step: 'sharedarraybuffer-absent', ok: sab === 'undefined' });

  const webm = await convertAndDownload(page, join(process.cwd(), 'test-media', 'test.webm'));
  results.push({
    step: 'webm-to-mp4-download',
    ok: webm.isMp4 && webm.size > 1000,
    filename: webm.filename,
    size: webm.size,
  });

  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  const mov = await convertAndDownload(page, join(process.cwd(), 'test-media', 'test.mov'));
  results.push({
    step: 'mov-to-mp4-download',
    ok: mov.isMp4 && mov.size > 1000,
    filename: mov.filename,
    size: mov.size,
  });
} catch (e) {
  results.push({ step: 'error', ok: false, message: String(e) });
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (!results.every(r => r.ok)) process.exit(1);
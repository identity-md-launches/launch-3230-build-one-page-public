import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const sans = await readFile(new URL('../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2', import.meta.url), 'base64');
const serif = await readFile(new URL('../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2', import.meta.url), 'base64');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  @font-face {font-family:Sans;src:url(data:font/woff2;base64,${sans});font-weight:100 1000}
  @font-face {font-family:Serif;src:url(data:font/woff2;base64,${serif});font-weight:200 800}
  *{box-sizing:border-box}body{margin:0;background:#f8f7f2;color:#25352c;font-family:Sans,sans-serif;padding:48px 64px;width:1200px;height:630px}
  header{font-size:24px;font-weight:600}h1{font:600 102px/1.03 Serif,serif;letter-spacing:-.035em;margin:48px 0 24px}h1 span{color:#2b604c}
  p{font-size:25px;line-height:1.5;width:720px;margin:0}footer{border-top:1px solid #d1d5ca;position:absolute;left:64px;right:64px;bottom:38px;padding-top:20px;font-size:18px;color:#5c655e}
  .cards{position:absolute;right:78px;top:184px;width:240px;height:190px}.card{position:absolute;top:0;left:0;width:110px;height:160px;border:2px solid #2b604c;border-radius:10px}.card+ .card{left:130px}.join{position:absolute;left:85px;top:60px;width:70px;height:42px;background:#2b604c;border-radius:6px}
  </style></head><body><header>swarmcard.</header><h1>Two swarms,<br><span>one card.</span></h1><p>a proposal for Claus to become the second swarm beside IMD, adjacent and not a copy.</p><div class="cards" aria-hidden="true"><div class="card"></div><div class="card"></div><div class="join"></div></div><footer>Independent proposal by ultrapara of uxp-labs.</footer></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/share.png' });
  console.log('Generated public/share.png at 1200 × 630.');
} finally {
  await browser.close();
}

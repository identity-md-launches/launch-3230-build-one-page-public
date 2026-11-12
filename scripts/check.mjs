import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const out = resolve('test/scratch/interaction');
await mkdir(out, { recursive: true });
const root = resolve('dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8' };
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!path.startsWith('/preview/')) { res.writeHead(404).end(); return; }
    const file = resolve(root, path.slice('/preview/'.length) || 'index.html');
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}/preview/`;
const results = { checks: [], measurements: {}, limitations: [] };
let browser;
async function check(name, action) {
  try {
    await action();
    results.checks.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.checks.push({ name, passed: false, error: String(error.message) });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
const sectionIds = ['idea', 'thesis', 'today', 'gap', 'design', 'work', 'swarm-card', 'chains', 'phases', 'keys', 'questions', 'review'];
const expectedAddresses = [
  '0xa43e6f75ee006411f79ac1c84120606c2330de82',
  '0x047F606fD5b2BaA5f5C6c4aB8958E45CB6B054B7',
  '0x3d3C0Df7C1a17d384545e9D7C8228897bD9625CB',
  '0x163015276f3244bC2CcB78b4D69cc8A4069EfFAC',
  '0x979D5810D32292358639f25294472f01c95bDc46',
  '0xBb145cA83272c3806D4dDc75cA1D5514789cF1C5',
];

try {
  const engineName = process.env.CHECK_ENGINE || 'chromium';
  const engine = engineName === 'webkit' ? webkit : chromium;
  browser = await engine.launch(engineName === 'chromium' ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined } : {});
  results.measurements.engine = engineName;
  results.measurements.version = browser.version();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, deviceScaleFactor: 1, acceptDownloads: true });
  const errors = [], external = [], failures = [];
  const page = await context.newPage();
  page.setDefaultTimeout(7000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${new URL(response.url()).pathname}`); });
  await context.route('**/*', route => {
    if (route.request().url().startsWith(base) || route.request().url().startsWith('data:')) return route.continue();
    external.push(new URL(route.request().url()).host);
    return route.abort();
  });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  await check('All proposal sections are present in the requested order', async () => {
    assert.deepEqual(await page.locator('main > section').evaluateAll(nodes => nodes.map(node => node.id)), sectionIds);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' '), 'Two swarms, one card.');
    assert.equal(await page.locator('.work-list > li').count(), 7);
    assert.equal(await page.locator('.gap-grid > li').count(), 5);
    assert.equal(await page.locator('.card-questions > li').count(), 7);
    assert.equal(await page.locator('.chain-list > li').count(), 5);
    assert.equal(await page.locator('.phase-list > li').count(), 5);
    assert.equal(await page.locator('.founder-questions li').count(), 10);
    assert.deepEqual(await page.locator('.address').allTextContents(), expectedAddresses);
  });

  await check('The product and main action are on the first 390 wide screen', async () => {
    const title = await page.locator('h1').boundingBox();
    const action = await page.getByRole('link', { name: 'Read the proposal', exact: true }).boundingBox();
    assert.ok(title && title.y + title.height <= 844);
    assert.ok(action && action.y + action.height <= 844);
    results.measurements.mobileAction = action;
    await page.screenshot({ path: `${out}/${engineName}-390.png` });
  });

  await check('Keyboard skip navigation reaches main with visible focus', async () => {
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').innerText(), 'Skip to proposal');
    await page.screenshot({ path: `${out}/${engineName}-focus.png` });
    await page.keyboard.press('Enter');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
  });

  await check('Contents opens by keyboard and Escape returns focus', async () => {
    await page.goto(base);
    await page.locator('#contents summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#contents').getAttribute('open'), '');
    assert.equal(await page.getByRole('navigation', { name: 'Mobile contents' }).getByRole('link').count(), 12);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#contents').getAttribute('open'), null);
    assert.equal(await page.locator(':focus').evaluate(node => node.tagName), 'SUMMARY');
  });

  await check('Choosing a contents link closes the menu and focuses its section', async () => {
    await page.locator('#contents summary').click();
    await page.getByRole('navigation', { name: 'Mobile contents' }).getByRole('link', { name: 'Founder questions', exact: true }).click();
    await page.waitForURL('**/#questions');
    assert.equal(await page.locator('#contents').getAttribute('open'), null);
    assert.equal(await page.locator(':focus').getAttribute('id'), 'questions-title');
    assert.ok((await page.locator('#questions h2').boundingBox()).y >= 0);
  });

  await check('Read, founder questions, back to top and browser history navigate', async () => {
    await page.goto(base);
    await page.getByRole('link', { name: 'Read the proposal', exact: true }).click();
    await page.waitForURL('**/#idea');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'idea-title');
    await page.goBack();
    await page.getByRole('link', { name: 'Go to founder questions' }).click();
    await page.waitForURL('**/#questions');
    await page.locator('footer').getByRole('link', { name: 'Back to top' }).click();
    await page.waitForURL('**/#top');
    assert.ok(await page.evaluate(() => scrollY < 5));
  });

  await check('The proposal download contains the exported text and source links', async () => {
    const event = page.waitForEvent('download');
    await page.locator('.download-link').click();
    const download = await event;
    assert.equal(download.suggestedFilename(), 'swarmcard-proposal-v0.3.txt');
    const path = `${out}/${engineName}-download.txt`;
    await download.saveAs(path);
    const text = await readFile(path, 'utf8');
    assert.equal(text, await readFile('dist/swarmcard-proposal-v0.3.txt', 'utf8'));
    assert.ok(text.includes('https://x.com/matthuang/status/2120209025099043286'));
    assert.equal((text.match(/https:\/\/explorer\.imd\.fun\/jobs\//g) || []).length, 3);
    assert.ok(text.includes('Who holds the keys, and what happens when it fails?'));
    for (const address of expectedAddresses) assert.ok(text.includes(address));
  });

  await check('Metadata assets resolve from a static hosting subpath', async () => {
    assert.equal(await page.title(), 'Two swarms, one card. | swarmcard');
    const paths = await page.locator('meta[property="og:image"], link[rel="icon"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('content') || node.getAttribute('href')));
    for (const path of paths) {
      assert.ok(path.startsWith('./'));
      const response = await context.request.get(new URL(path, base).href);
      assert.equal(response.status(), 200);
    }
    const png = await (await context.request.get(new URL('./share.png', base).href)).body();
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  });

  await check('No page overflow across phone, tablet and desktop widths', async () => {
    const widths = [320, 390, 640, 768, 1056, 1057, 1440];
    const measurements = [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      const measure = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
      measurements.push(measure);
      assert.ok(measure.content <= measure.viewport + 1, `${width}: ${measure.content}px content`);
    }
    results.measurements.reflow = measurements;
    await page.screenshot({ path: `${out}/${engineName}-1440.png` });
    await page.locator('.reading-nav nav a[href="#swarm-card"]').click();
    assert.equal(await page.locator('.reading-nav nav a[aria-current]').getAttribute('href'), '#swarm-card');
  });

  await check('Both local variable fonts load at the implemented weights', async () => {
    assert.ok(await page.evaluate(() => ['400 16px "DM Sans Variable"', '600 16px "DM Sans Variable"', '600 40px "Newsreader Variable"'].every(font => document.fonts.check(font))));
  });

  await check('Rendered text, controls and the focus token have sufficient contrast', async () => {
    const pairs = await page.evaluate(() => {
      const channels = color => (color.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
      const luminance = color => {
        const values = channels(color).map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
        return .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
      };
      const ratio = (a, b) => { const values = [luminance(a), luminance(b)].sort((a, b) => b - a); return Math.round((values[0] + .05) / (values[1] + .05) * 100) / 100; };
      const background = node => {
        for (let current = node; current; current = current.parentElement) {
          const value = getComputedStyle(current).backgroundColor;
          if (value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') return value;
        }
        return 'rgb(255, 255, 255)';
      };
      const selectors = ['main', '.byline', '.gap-grid p', '.source-link', '.button-primary'];
      const output = selectors.map(selector => {
        const node = document.querySelector(selector);
        const foreground = getComputedStyle(node).color;
        const bg = background(node);
        return { selector, foreground, background: bg, ratio: ratio(foreground, bg) };
      });
      const node = document.querySelector('.button-primary');
      const focus = getComputedStyle(document.documentElement).getPropertyValue('--color-focus').trim();
      const probe = document.createElement('span');
      probe.style.color = focus;
      document.body.append(probe);
      output.push({ selector: 'focus token against page', foreground: getComputedStyle(probe).color, background: background(node.parentElement), ratio: ratio(getComputedStyle(probe).color, background(node.parentElement)) });
      probe.remove();
      return output;
    });
    results.measurements.contrast = pairs;
    assert.ok(pairs.every(pair => pair.ratio >= 4.5), JSON.stringify(pairs));
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const pointerPage = await desktop.newPage();
    await pointerPage.goto(base);
    const button = pointerPage.getByRole('link', { name: 'Read the proposal', exact: true });
    await button.focus();
    const focus = await button.evaluate(node => ({ width: getComputedStyle(node).outlineWidth, style: getComputedStyle(node).outlineStyle, color: getComputedStyle(node).outlineColor }));
    assert.deepEqual(focus, { width: '2px', style: 'solid', color: 'rgb(43, 96, 76)' });
    await pointerPage.screenshot({ path: `${out}/${engineName}-desktop-focus.png` });
    await button.hover();
    assert.equal(await button.evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(32, 75, 58)');
    await pointerPage.mouse.down();
    assert.equal(await button.evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(23, 59, 45)');
    await pointerPage.mouse.up();
    results.measurements.controlStates = { focus, hover: '#204b3a', pressed: '#173b2d' };
    await desktop.close();
  });

  await check('Text enlargement to 200 percent keeps content within the page', async () => {
    results.measurements.textEnlargement = [];
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base);
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      const measurement = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        offenders: [...document.querySelectorAll('body *')].filter(node => node.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 8).map(node => `${node.tagName}.${node.className} ${node.textContent?.slice(0, 40)}`),
      }));
      results.measurements.textEnlargement.push(measurement);
      if (measurement.content > measurement.viewport + 1) await page.screenshot({ path: `${out}/${engineName}-text-enlargement-failure.png` });
      assert.ok(measurement.content <= measurement.viewport + 1, `overflow at ${width}px with 200% text: ${measurement.offenders.join('; ')}`);
    }
  });

  await check('Axe finds no WCAG A or AA violations on mobile or desktop', async () => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base);
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(node => node.target) })), []);
    }
  });

  await check('Reduced motion, readable keys and the diagram render on a phone', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(base);
    assert.equal(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length), 0);
    await page.locator('.diagram').scrollIntoViewIfNeeded();
    await page.locator('.diagram').screenshot({ path: `${out}/${engineName}-diagram.png` });
    await page.locator('#keys').screenshot({ path: `${out}/${engineName}-keys.png` });
  });

  await check('The complete document and native navigation work without JavaScript', async () => {
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const staticPage = await noJs.newPage();
    await staticPage.goto(base);
    assert.equal(await staticPage.locator('main > section').count(), 12);
    await staticPage.getByRole('link', { name: 'Read the proposal', exact: true }).click();
    await staticPage.waitForURL('**/#idea');
    await staticPage.locator('#contents summary').click();
    assert.equal(await staticPage.locator('#contents').getAttribute('open'), '');
    await staticPage.getByRole('navigation', { name: 'Mobile contents' }).getByRole('link', { name: 'Founder questions', exact: true }).click();
    await staticPage.waitForURL('**/#questions');
    await noJs.close();
  });

  await check('No runtime exceptions, failed local resources or external requests', async () => {
    assert.deepEqual(errors, []);
    assert.deepEqual(failures, []);
    assert.deepEqual(external, []);
  });
  results.limitations.push('Text enlargement is not a browser native zoom test. Emulation is not physical device or screen reader testing. External source availability is not tested.');
  await context.close();
} catch (error) {
  results.checks.push({ name: 'Browser setup or verification', passed: false, error: error.message });
  console.error(error.message);
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
  await writeFile(`${out}/${process.env.CHECK_ENGINE || 'chromium'}-results.json`, JSON.stringify(results, null, 2) + '\n');
}
if (results.checks.some(check => !check.passed)) process.exitCode = 1;

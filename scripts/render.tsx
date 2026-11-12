import { mkdir, writeFile } from 'node:fs/promises';
import { renderToStaticMarkup } from 'react-dom/server';
import { parseHTML } from 'linkedom';
import App from '../src/App';

const markup = renderToStaticMarkup(<App />);
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f8f7f2" />
    <title>Two swarms, one card. | swarmcard</title>
    <meta name="description" content="An independent proposal by ultrapara of uxp-labs for Claus to become the second swarm beside IMD, adjacent and not a copy." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Two swarms, one card." />
    <meta property="og:description" content="An independent proposal by ultrapara of uxp-labs for Claus to become the second swarm beside IMD, adjacent and not a copy." />
    <meta property="og:image" content="./share.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Two swarms, one card. An independent proposal by ultrapara of uxp-labs." />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <script type="module" src="/src/main.ts"></script>
  </head>
  <body>${markup}</body>
</html>
`;

await mkdir('public', { recursive: true });
await writeFile('index.html', html);

// Export the same rendered copy, with source links retained, as a plain text proposal.
const { document } = parseHTML(html);
document.querySelectorAll('svg, .hero-actions, .section-number, .download-end').forEach(node => node.remove());
document.querySelectorAll('a[href^="https://"]').forEach(node => {
  node.textContent = `${node.textContent} (${node.getAttribute('href')})`;
});
const blocks = new Set(['HEADER', 'FOOTER', 'SECTION', 'H1', 'H2', 'H3', 'P', 'UL', 'OL', 'LI', 'DL', 'DT', 'DD', 'DIV']);
function textOf(node: Node): string {
  if (node.nodeType === 3) return node.textContent ?? '';
  if (node.nodeName === 'BR') return '\n';
  const text = Array.from(node.childNodes).map(textOf).join('');
  if (node.nodeName === 'LI') return `\n• ${text.trim()}\n`;
  return blocks.has(node.nodeName) ? `\n${text}\n` : text;
}
const main = document.querySelector('main');
const footer = document.querySelector('footer');
if (!main || !footer) throw new Error('The proposal must include main content and a footer.');
const download = `Independent proposal by ultrapara of uxp-labs.\n${textOf(main)}\n${textOf(footer)}`
  .replace(/Back to top\s*$/, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
await writeFile('public/swarmcard-proposal-v0.3.txt', download);
console.log('Rendered the full proposal and its plain text download.');

import assert from 'node:assert/strict';
import { lstat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const entries = ['.gitignore', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'index.html', 'README.md', 'DESIGN.md', 'src', 'scripts', 'public', 'dist', 'artifacts'];
const files = [];
async function walk(path) {
  const info = await lstat(path);
  assert.ok(!info.isSymbolicLink(), `Symlinks are not expected in the submission: ${path}`);
  if (info.isDirectory()) {
    assert.ok(!['node_modules', '.cache', '.vite', '.npm', '.pnpm-store'].includes(path.split('/').at(-1)), `Generated directory: ${path}`);
    for (const name of await readdir(path)) await walk(join(path, name));
  } else {
    assert.ok(!/\.(tgz|zip|deb)$/.test(path), `Unnecessary dependency archive: ${path}`);
    files.push({ path, bytes: info.size });
  }
}
for (const path of entries) await walk(path);
const total = files.reduce((sum, file) => sum + file.bytes, 0);
const exportBytes = files.filter(file => file.path.startsWith('dist/')).reduce((sum, file) => sum + file.bytes, 0);
assert.ok(files.find(file => file.path === '.gitignore').bytes <= 512, '.gitignore exceeds its explicit 512 byte budget');
assert.ok(total <= 8_388_608, `Submission exceeds 8 MiB: ${total} bytes`);
assert.ok(files.some(file => file.path === 'dist/index.html'));
console.log(JSON.stringify({ passed: true, files: files.length, bytes: total, distBytes: exportBytes, limit: 8_388_608, gitignoreBudget: 512 }, null, 2));

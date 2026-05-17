import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = fs.readFileSync(path.join(__dirname, 'src', 'Data', 'regionalFoods.js'), 'utf8');
const regex = /^\s*([a-zA-Z0-9_]+):\s*"[^"]+",?/gm;
const keys = new Set();
let match;
while ((match = regex.exec(content)) !== null) {
  keys.add(match[1]);
}

const missing = [];
for (const key of keys) {
  const dest = path.join(__dirname, 'public', 'food-images', `${key}.jpg`);
  if (!fs.existsSync(dest)) {
    missing.push(key);
  }
}

console.log('Missing count:', missing.length);
console.log(missing);

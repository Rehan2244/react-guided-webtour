import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const srcTypesFile = join(rootDir, 'src', 'index.d.ts');
const distTypesFile = join(rootDir, 'dist', 'index.d.ts');

try {
  // Ensure dist directory exists
  if (!existsSync(join(rootDir, 'dist'))) {
    mkdirSync(join(rootDir, 'dist'), { recursive: true });
  }

  // Copy TypeScript definitions
  if (existsSync(srcTypesFile)) {
    copyFileSync(srcTypesFile, distTypesFile);
    console.log('✓ TypeScript definitions copied to dist/');
  } else {
    console.warn('⚠ Source TypeScript definitions not found');
  }
} catch (error) {
  console.error('Error copying TypeScript definitions:', error);
  process.exit(1);
}

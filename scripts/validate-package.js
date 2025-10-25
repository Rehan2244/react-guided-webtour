import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Validating React Guided WebTour Package...\n');

let hasErrors = false;

// Check required files exist
const requiredFiles = [
  'dist/react-guided-webtour.es.js',
  'dist/react-guided-webtour.umd.js',
  'dist/style.css',
  'dist/index.d.ts',
  'README.md',
  'LICENSE',
  'package.json',
];

console.log('📁 Checking required files...');
requiredFiles.forEach((file) => {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    hasErrors = true;
  }
});

// Check package.json configuration
console.log('\n📦 Checking package.json configuration...');
const packageJson = JSON.parse(
  readFileSync(join(rootDir, 'package.json'), 'utf-8')
);

const requiredFields = {
  name: 'react-guided-webtour',
  main: './dist/react-guided-webtour.umd.js',
  module: './dist/react-guided-webtour.es.js',
  types: './dist/index.d.ts',
};

Object.entries(requiredFields).forEach(([key, expectedValue]) => {
  if (packageJson[key] === expectedValue) {
    console.log(`  ✓ ${key}: ${packageJson[key]}`);
  } else {
    console.log(`  ✗ ${key}: Expected "${expectedValue}", got "${packageJson[key]}"`);
    hasErrors = true;
  }
});

// Check exports
console.log('\n🔗 Checking package exports...');
if (packageJson.exports && packageJson.exports['.']) {
  console.log('  ✓ Main export configured');
  if (packageJson.exports['.'].types) {
    console.log('  ✓ TypeScript types export configured');
  } else {
    console.log('  ⚠ TypeScript types export missing');
  }
} else {
  console.log('  ✗ Main export not configured');
  hasErrors = true;
}

// Check peerDependencies
console.log('\n🔗 Checking peer dependencies...');
if (packageJson.peerDependencies) {
  if (packageJson.peerDependencies.react && packageJson.peerDependencies['react-dom']) {
    console.log('  ✓ React peer dependencies configured');
  } else {
    console.log('  ⚠ React peer dependencies missing or incomplete');
  }
} else {
  console.log('  ⚠ No peer dependencies defined');
}

// Check file sizes
console.log('\n📊 Checking file sizes...');
const filesToCheck = [
  'dist/react-guided-webtour.es.js',
  'dist/react-guided-webtour.umd.js',
  'dist/style.css',
  'dist/index.d.ts',
];

filesToCheck.forEach((file) => {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    const stats = readFileSync(filePath);
    const sizeKB = (stats.length / 1024).toFixed(2);
    console.log(`  📄 ${file}: ${sizeKB} KB`);
  }
});

// Final result
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Validation FAILED - Please fix the errors above');
  process.exit(1);
} else {
  console.log('✅ Validation PASSED - Package is ready!');
  console.log('\n📝 Next steps:');
  console.log('  1. Test locally: npm pack && npm install <tarball>');
  console.log('  2. Login to npm: npm login');
  console.log('  3. Publish: npm publish');
}

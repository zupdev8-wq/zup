'use strict';
// Installs only this project's app, stops at the first error, and never uses --force.
// Run from any working directory with: node path/to/ZUP/scripts/setup.cjs
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const app = path.join(root, 'app');
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 13)) {
  console.error('ZUP SDK 57 requer Node.js 22.13 ou superior. Atualize o Node e reabra o VS Code.');
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(path.join(app, 'package.json'), 'utf8'));
if (pkg.name !== 'zup-mobile' || !pkg.dependencies.expo.startsWith('~57.')) {
  console.error('Pasta incorreta: este instalador e exclusivo do ZUP SDK 57.');
  process.exit(1);
}
function run(command, args) {
  console.log(`\n> ${command} ${args.join(' ')}\n`);
  // npm/npx are .cmd launchers on Windows. All arguments below are constant.
  const result = spawnSync(command, args, {
    cwd: app, stdio: 'inherit', shell: process.platform === 'win32',
    env: process.env
  });
  if (result.error || result.status !== 0) {
    console.error('\nPreparacao interrompida. Corrija o erro acima; o Metro nao foi iniciado.');
    if (result.error) console.error(result.error.message);
    console.error('Nao use --force nem --legacy-peer-deps. Veja docs/EXPO-SDK57.md.');
    process.exit(result.status || 1);
  }
}
console.log('ZUP! 1.7.0 | Expo SDK 57 | Node ' + process.versions.node);
// Reject node_modules/lock left by SDK 55 instead of silently mixing dependencies.
const oldExpo = path.join(app, 'node_modules', 'expo', 'package.json');
const lockPath = path.join(app, 'package-lock.json');
let stale = false;
try {
  if (fs.existsSync(oldExpo)) {
    const installed = JSON.parse(fs.readFileSync(oldExpo, 'utf8')).version;
    stale = !installed.startsWith('57.');
  }
  if (fs.existsSync(lockPath)) {
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    const locked = lock.packages?.['node_modules/expo']?.version;
    stale ||= Boolean(locked && !locked.startsWith('57.'));
  }
} catch (error) {
  console.error('Nao foi possivel ler a instalacao anterior: ' + error.message);
  process.exit(1);
}
if (stale) {
  console.error('Esta pasta ainda tem dependencias do SDK antigo.');
  console.error('Extraia este ZIP em uma pasta NOVA, sem copiar node_modules ou package-lock.json.');
  process.exit(1);
}
run('npm', ['install']);
run('npx', ['expo', 'install', '--fix']);
run('npm', ['run', 'validate']);
run('npx', ['--yes', 'expo-doctor@latest']);
console.log('\nPreparacao concluida. Na pasta ZUP, rode: npm start');
console.log('No terminal, use o QR NOVO. O comando start abre explicitamente no Expo Go.');

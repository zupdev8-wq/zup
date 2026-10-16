'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const testsDir = path.resolve(__dirname, '../tests');
const tests = fs.readdirSync(testsDir).filter(name => name.endsWith('.test.cjs'))
  .sort().map(name => path.join(testsDir, name));
if (!tests.length) throw new Error('No test files found');
const result = spawnSync(process.execPath, ['--test', ...tests], {stdio:'inherit'});
if (result.error) { console.error(result.error); process.exit(1); }
process.exit(result.status ?? 1);

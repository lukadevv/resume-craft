const fs = require('node:fs');
const path = require('node:path');

const tempDir = path.join(process.cwd(), '.vitest-temp');
fs.mkdirSync(tempDir, { recursive: true });

process.env.TMPDIR = tempDir;
process.env.TMP = tempDir;
process.env.TEMP = tempDir;

const patchArg = `--require ${__filename}`;
const existingNodeOptions = process.env.NODE_OPTIONS || '';
if (!existingNodeOptions.includes(patchArg)) {
  process.env.NODE_OPTIONS = existingNodeOptions
    ? `${existingNodeOptions} ${patchArg}`
    : patchArg;
}

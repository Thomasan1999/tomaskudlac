import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getChangedFiles } from './changed-files.ts';

const check = process.argv.includes('--check');
const files = getChangedFiles(process.env.FORMAT_BASE, process.env.FORMAT_HEAD);

if (files.length === 0) {
    console.log('No changed files to format.');
} else {
    if (check) console.log(files.join('\n'));

    const result = spawnSync(
        process.execPath,
        [
            fileURLToPath(import.meta.resolve('prettier/bin/prettier.cjs')),
            check ? '--check' : '--write',
            '--ignore-unknown',
            '--',
            ...files,
        ],
        { stdio: 'inherit' },
    );
    if (result.error) throw result.error;
    process.exitCode = result.status ?? 1;
}

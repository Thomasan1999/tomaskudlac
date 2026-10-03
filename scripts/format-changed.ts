import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const check = process.argv.includes('--check');
const base = process.env.FORMAT_BASE;
const head = process.env.FORMAT_HEAD;
const gitFiles = (args: string[]): string[] =>
    execFileSync('git', args, { encoding: 'utf8' }).split('\0').filter(Boolean);
const comparison = base
    ? `${base}...${head || 'HEAD'}`
    : execFileSync('git', ['merge-base', 'origin/master', 'HEAD'], { encoding: 'utf8' }).trim();
const files = new Set([
    ...gitFiles(['diff', '--name-only', '--diff-filter=ACMR', '-z', comparison]),
    ...(base ? [] : gitFiles(['ls-files', '--others', '--exclude-standard', '-z'])),
]);

if (files.size === 0) {
    console.log('No changed files to format.');
} else {
    if (check) console.log([...files].join('\n'));

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

import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

export const repositoryRoot = resolve(import.meta.dirname, '..');

export function getChangedFiles(base?: string, head = 'HEAD', includeDeleted = false): string[] {
    const git = (args: string[]): string => execFileSync('git', args, { cwd: repositoryRoot, encoding: 'utf8' });
    const comparison = base ? `${base}...${head}` : git(['merge-base', 'origin/master', 'HEAD']).trim();
    const files = git(['diff', '--name-only', `--diff-filter=${includeDeleted ? 'ACMRD' : 'ACMR'}`, '-z', comparison]);
    const untracked = base ? '' : git(['ls-files', '--others', '--exclude-standard', '-z']);
    return [...new Set((files + untracked).split('\0').filter(Boolean))];
}

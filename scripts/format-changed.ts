import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import * as prettier from 'prettier';

const check = process.argv.includes('--check');
const base = process.env.FORMAT_BASE;
const head = process.env.FORMAT_HEAD;
const gitFiles = (args: string[]): string[] =>
    execFileSync('git', args, { encoding: 'utf8' }).split('\0').filter(Boolean);
const files = new Set(
    base
        ? gitFiles(['diff', '--name-only', '--diff-filter=ACMR', '-z', `${base}...${head || 'HEAD'}`])
        : [
              ...gitFiles(['diff', 'HEAD', '--name-only', '--diff-filter=ACMR', '-z']),
              ...gitFiles(['ls-files', '--others', '--exclude-standard', '-z']),
          ],
);

let count = 0;
for (const file of files) {
    const info = await prettier.getFileInfo(file, { ignorePath: '.prettierignore' });
    if (info.ignored || !info.inferredParser) continue;

    const options = { ...(await prettier.resolveConfig(file)), filepath: file };
    const source = await readFile(file, 'utf8');
    count++;
    if (check) {
        if (!(await prettier.check(source, options))) {
            console.error(`Formatting required: ${file}`);
            process.exitCode = 1;
        }
    } else {
        const formatted = await prettier.format(source, options);
        if (formatted !== source) await writeFile(file, formatted);
        console.log(file);
    }
}

console.log(`${check ? 'Checked' : 'Formatted'} ${count} changed files.`);

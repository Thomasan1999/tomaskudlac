import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { getChangedFiles, repositoryRoot } from './changed-files.ts';

const changed = getChangedFiles(process.env.LINT_BASE, process.env.LINT_HEAD, true);
const fullLint = changed.some(
    (file) =>
        /^(?:client\/)?(?:package\.json|eslint\.config\.[cm]?[jt]s|tsconfig[^/]*\.json)$/.test(file) ||
        [
            'package-lock.json',
            '.nvmrc',
            '.prettierrc.json',
            'scripts/changed-files.ts',
            'scripts/lint-changed.ts',
        ].includes(file),
);
const files = fullLint
    ? ['.']
    : changed
          .filter(
              (file) => /^client\/.*\.(?:[cm]?[jt]sx?|vue)$/.test(file) && existsSync(resolve(repositoryRoot, file)),
          )
          .map((file) => file.slice('client/'.length));

if (files.length === 0) {
    console.log('No changed frontend files to lint.');
} else {
    console.log(fullLint ? 'Lint configuration or dependencies changed; linting the full frontend.' : files.join('\n'));
    const require = createRequire(new URL('../client/package.json', import.meta.url));
    const eslint = resolve(dirname(require.resolve('eslint/package.json')), 'bin/eslint.js');
    const result = spawnSync(
        process.execPath,
        [eslint, ...process.argv.slice(2), '--no-warn-ignored', '--', ...files],
        {
            cwd: resolve(repositoryRoot, 'client'),
            stdio: 'inherit',
        },
    );
    if (result.error) throw result.error;
    process.exitCode = result.status ?? 1;
}

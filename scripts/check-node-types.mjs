import { readFileSync } from 'node:fs';

const nodeVersion = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
if (!/^v?\d+(?:\.\d+){0,2}$/.test(nodeVersion)) {
    throw new Error(`Expected a numeric Node.js version in .nvmrc, received: ${nodeVersion}`);
}
const nodeMajor = Number(nodeVersion.replace(/^v/, '').split('.')[0]);
const lockfile = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const nodeTypes = Object.entries(lockfile.packages).filter(([path]) =>
    /(?:^|\/)node_modules\/@types\/node$/.test(path),
);

if (nodeTypes.length === 0) {
    throw new Error('No @types/node package found in package-lock.json.');
}

// DefinitelyTyped patch versions are independent of Node.js patch versions.
// Compare major versions to prevent types from targeting a newer Node.js release line.
for (const [path, { version }] of nodeTypes) {
    if (!/^\d+\.\d+\.\d+$/.test(version) || Number(version.split('.')[0]) > nodeMajor) {
        console.error(
            `${path}: @types/node@${version} is incompatible with Node.js ${nodeVersion} from .nvmrc. ` +
                `Use @types/node major <= ${nodeMajor}, or upgrade Node.js in .nvmrc.`,
        );
        process.exitCode = 1;
    }
}

if (!process.exitCode) {
    console.log(`All locked @types/node versions are compatible with Node.js ${nodeVersion}.`);
}

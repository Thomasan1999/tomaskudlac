import { glob } from 'glob';
import { unlink } from 'fs/promises';

async function filterDtsFiles(): Promise<void> {
    const dtsFiles = await glob('src/**/*.d.ts');

    const dtsFilesToRemove = dtsFiles.filter((dtsFile) => !dtsFile.endsWith('vue.d.ts'));

    await Promise.all(
        dtsFilesToRemove.map((dtsFile) => {
            return unlink(dtsFile);
        }),
    );
}

filterDtsFiles();

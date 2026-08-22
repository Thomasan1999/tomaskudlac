import { createServer, type ViteDevServer } from 'vite';
import type { TestProject } from 'vitest/node';

/**
 * Boots the dev server the end-to-end tests drive.
 *
 * Started here rather than alongside the run with `run-p --race`, so that the tests begin only once the server is
 * actually listening and its address is known, instead of racing its startup and hardcoding a port.
 */
export default async function setup(project: TestProject): Promise<() => Promise<void>> {
    const server: ViteDevServer = await createServer({ server: { strictPort: false } });

    await server.listen();

    const baseUrl = server.resolvedUrls?.local[0];

    if (!baseUrl) {
        await server.close();
        throw new Error('The dev server started without a local address.');
    }

    project.provide('baseUrl', baseUrl);

    return async () => {
        await server.close();
    };
}

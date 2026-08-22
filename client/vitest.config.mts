import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
    test: {
        coverage: {
            exclude: [
                ...coverageConfigDefaults.exclude,
                '**/*.config.*',
                '**/main.ts',
                '**/register-service-worker.ts',
                '**/types.ts',
            ],
            provider: 'v8',
            reporter: ['text', 'lcov'],
            /**
             * Pinned just under the level the suite currently reaches, so a regression fails the build while normal
             * drift does not. Raise them when coverage rises; never lower them to make a red build green.
             */
            thresholds: {
                branches: 82,
                functions: 94,
                lines: 93,
                statements: 94,
            },
        },
        environment: 'jsdom',
        globals: true,
    },
});

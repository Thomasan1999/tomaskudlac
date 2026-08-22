import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

const alias = {
    '@': path.resolve(import.meta.dirname, './src'),
};

export default defineConfig({
    plugins: [vue()],
    resolve: { alias },
    test: {
        /**
         * The end-to-end spec used to run in the same jsdom project as the unit specs, which is why running the unit
         * tests at all meant booting a dev server and launching Chromium. Split apart, the unit project needs
         * neither.
         */
        projects: [
            {
                plugins: [vue()],
                resolve: { alias },
                test: {
                    environment: 'jsdom',
                    exclude: ['src/tests/e2e/**'],
                    globals: true,
                    include: ['src/**/*.spec.ts'],
                    name: 'unit',
                },
            },
            {
                resolve: { alias },
                test: {
                    // Puppeteer drives a real browser, so jsdom would only be overhead here.
                    environment: 'node',
                    globalSetup: ['src/tests/e2e/globalSetup.ts'],
                    globals: true,
                    hookTimeout: 30_000,
                    include: ['src/tests/e2e/**/*.spec.ts'],
                    name: 'e2e',
                    testTimeout: 30_000,
                },
            },
        ],
        coverage: {
            exclude: [
                ...coverageConfigDefaults.exclude,
                '**/*.config.*',
                '**/main.ts',
                '**/register-service-worker.ts',
                '**/types.ts',
                'src/tests/**',
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
    },
});

import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
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
            reporter: ['text'],
        },
        environment: 'jsdom',
        globals: true,
    },
});

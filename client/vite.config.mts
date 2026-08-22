import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import * as path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    build: {
        outDir: path.resolve(import.meta.dirname, '../server/public'),
    },
    plugins: [
        vue(),
        createHtmlPlugin(),
        VitePWA({
            manifest: false,
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
    server: {
        port: 8082,
        // The coverage run writes its lcov report while the dev server the e2e tests use is up, and every written
        // file would otherwise trigger a full page reload underneath them.
        watch: {
            ignored: ['**/coverage/**'],
        },
    },
});

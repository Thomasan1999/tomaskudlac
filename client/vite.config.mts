import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import * as path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../server/public'),
    },
    plugins: [
        eslintPlugin(),
        vue(),
        createHtmlPlugin(),
        VitePWA({
            manifest: false,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 8082,
    },
});

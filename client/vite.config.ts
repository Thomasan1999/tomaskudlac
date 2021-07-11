import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';
import * as path from 'path';
import {VitePWA} from 'vite-plugin-pwa';
import {minifyHtml} from 'vite-plugin-html';

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, '../server/public')
    },
    plugins: [
        vue(),
        minifyHtml(),
        VitePWA({
            manifest: false
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 8082
    }
});

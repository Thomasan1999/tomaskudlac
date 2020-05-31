import * as path              from 'path';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {GenerateSWOptions}    from 'workbox-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ProjectOptions}       from '@vue/cli-service';

function addStyleResource(rule): void
{
    rule.use(`style-resource`).loader(`style-resources-loader`).options({
        patterns: [
            path.resolve(__dirname, `./src/styles/variables.styl`),
            path.resolve(__dirname, `./src/styles/tomwork.functions.styl`)
        ]
    });
}

module.exports = {
    chainWebpack(config)
    {
        const types: string[] = [`vue-modules`, `vue`, `normal-modules`, `normal`];

        types.forEach((type) =>
        {
            addStyleResource(config.module.rule(`stylus`).oneOf(type));
        });
    },

    configureWebpack: {
        plugins: [
            ...(process.env.NODE_ENV === `production` ? [
                new BundleAnalyzerPlugin({
                    analyzerMode: `static`,
                    analyzerPort: 8888
                })
            ] : [])
        ]
    },

    devServer: {
        https: true,
        port: 8082
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: []
        }
    },

    pwa: {
        workboxPluginMode: `GenerateSW`,
        workboxOptions: {
            exclude: [/\.html$/, /node_modules/],
            skipWaiting: true
        } as GenerateSWOptions
    }
} as ProjectOptions;

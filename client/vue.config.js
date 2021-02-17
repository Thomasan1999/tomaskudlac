"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
function addStyleResource(rule) {
    rule.use(`style-resource`).loader(`style-resources-loader`).options({
        patterns: [
            path.resolve(__dirname, `./src/styles/tomwork.functions.styl`)
        ]
    });
}
module.exports = {
    chainWebpack(config) {
        const types = [`vue-modules`, `vue`, `normal-modules`, `normal`];
        types.forEach((type) => {
            addStyleResource(config.module.rule(`stylus`).oneOf(type));
        });
    },
    configureWebpack: {
        plugins: [
            ...(process.env.NODE_ENV === `production` ? [
                new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
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
            exclude: [/\.html$/, /node_modules/, /^\.htaccess$/],
            skipWaiting: true
        }
    }
};
//# sourceMappingURL=vue.config.js.map
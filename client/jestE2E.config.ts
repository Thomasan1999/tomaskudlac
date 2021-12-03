import {InitialOptionsTsJest} from 'ts-jest/dist/types';
import {pathsToModuleNameMapper} from 'ts-jest/utils';
import {compilerOptions} from './tsconfig.json';

const config = {
    displayName: 'e2e',
    globals: {
        'jest-puppeteer': {},
        'ts-jest': {},
        'vue-jest': {
            pug: {
                doctype: 'html'
            }
        }
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
    name: 'e2e',
    preset: './jestE2EPreset.ts',
    testMatch: [
        '**/src/tests/e2e/**/*.spec.ts'
    ],
    transform: {
        '.*\\.(vue)$': 'vue-jest'
    }
} as InitialOptionsTsJest;

export default config;

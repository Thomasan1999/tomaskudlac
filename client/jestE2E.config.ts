import {InitialOptionsTsJest} from 'ts-jest/dist/types';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

const config = {
    displayName: 'e2e',
    globals: {
        'jest-puppeteer': {},
        'ts-jest': {}
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
    preset: './jestE2EPreset.ts',
    testMatch: [
        '**/src/tests/e2e/**/*.spec.ts'
    ],
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest'
    }
} as InitialOptionsTsJest;

export default config;

import {InitialOptionsTsJest} from 'ts-jest/dist/types';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

const config = {
    displayName: 'unit',
    globals: {
        'ts-jest': {},
        '@vue/vue3-jest': {
            pug: {
                doctype: 'html'
            }
        }
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
        'src/tests/e2e'
    ],
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest'
    }
} as InitialOptionsTsJest;

export default config;

import {InitialOptionsTsJest} from 'ts-jest/dist/types';
import {pathsToModuleNameMapper} from 'ts-jest/utils';
import {compilerOptions} from './tsconfig.json';

const config = {
    globals: {
        'ts-jest': {},
        'vue-jest': {
            pug: {
                doctype: 'html'
            }
        }
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '.*\\.(vue)$': 'vue-jest'
    }
} as InitialOptionsTsJest;

export default config;

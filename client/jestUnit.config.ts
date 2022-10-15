import {JestConfigWithTsJest} from 'ts-jest/dist/types';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

const config = {
    displayName: 'unit',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons']
    },
    testPathIgnorePatterns: [
        'src/tests/e2e'
    ],
    transform: {
        '.*\\.(vue)$': '@vue/vue3-jest'
    }
} as JestConfigWithTsJest;

export default config;

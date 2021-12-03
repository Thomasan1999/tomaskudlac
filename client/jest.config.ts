import {InitialOptionsTsJest} from 'ts-jest/dist/types';

const config = {
    projects: [
        '<rootDir>/jestE2E.config.ts',
        '<rootDir>/jestUnit.config.ts'
    ]
} as InitialOptionsTsJest;

export default config;

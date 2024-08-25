import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [1, 'always', 100],
    },
};

export default config;

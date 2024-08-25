import tsEslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default tsEslint.config(
    ...pluginVue.configs['flat/base'],
    {
        languageOptions: {
            parserOptions: {
                parser: tsEslint.parser,
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
    },
    {
        rules: {
            'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
            'arrow-parens': ['error', 'always'],
            'arrow-spacing': ['error', { after: true, before: true }],
            camelcase: 'off',
            'class-methods-use-this': 'off',
            'consistent-return': 'off',
            'global-require': 'off',
            'import/extensions': 'off',
            'import/no-dynamic-require': 'off',
            'import/prefer-default-export': 'off',
            'newline-per-chained-call': 'off',
            'import/no-cycle': 'off',
            'import/no-extraneous-dependencies': 'off',
            'linebreak-style': ['error', 'unix'],
            'lines-between-class-members': 'off',
            'new-cap': 'off',
            'no-console': 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'no-floating-decimal': 'off',
            'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
            'no-multi-spaces': 'off',
            'no-param-reassign': ['error', { props: false }],
            'no-undef': 'off',
            'no-unused-vars': 'off',
            'no-use-before-define': 'off',
            'no-restricted-globals': 'off',
            'no-template-curly-in-string': 'off',
            'no-trailing-spaces': 'off',
            'no-underscore-dangle': 'off',
            'object-curly-newline': 'off',
            'object-shorthand': ['error', 'always'],
            'prefer-destructuring': 'off',
            'prefer-promise-reject-errors': 'off',
            'quote-props': 'off',
            quotes: ['error', 'single', { allowTemplateLiterals: true }],
            semi: ['error', 'always'],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    asyncArrow: 'always',
                    named: 'never',
                },
            ],
        },
    },
    {
        files: ['**/*.vue'],
        rules: {
            'vue/attribute-hyphenation': ['error', 'never'],
            'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
            'vue/prefer-true-attribute-shorthand': ['error', 'always'],
            'vue/experimental-script-setup-vars': 'off',
        },
    },
);

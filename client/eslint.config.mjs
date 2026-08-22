import tsEslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

export default tsEslint.config(
    ...tsEslint.configs.recommended,
    ...pluginVue.configs['flat/base'],
    ...pluginVueA11y.configs['flat/recommended'],
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
            camelcase: 'off',
            'class-methods-use-this': 'off',
            'consistent-return': 'off',
            'global-require': 'off',
            'lines-between-class-members': 'off',
            'new-cap': 'off',
            'no-console': 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
            'no-param-reassign': ['error', { props: false }],
            'no-undef': 'off',
            'no-use-before-define': 'off',
            'no-restricted-globals': 'off',
            'no-template-curly-in-string': 'off',
            'no-underscore-dangle': 'off',
            'object-shorthand': ['error', 'always'],
            'prefer-destructuring': 'off',
            'prefer-promise-reject-errors': 'off',
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        files: ['**/*.vue'],
        rules: {
            'vue/attribute-hyphenation': ['error', 'never'],
            // The control is rendered through `<Component :is>`, which the rule cannot resolve, so accept either
            // the wrapping label or an explicit `for`. Both are in place.
            'vuejs-accessibility/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
            'vue/attributes-order': 'error',
            'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
            'vue/no-empty-component-block': 'error',
            'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
            'vue/prefer-true-attribute-shorthand': ['error', 'always'],
            'vue/experimental-script-setup-vars': 'off',
        },
    },
);

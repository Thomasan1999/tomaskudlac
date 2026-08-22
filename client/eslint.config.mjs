import tsEslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import configPrettier from 'eslint-config-prettier/flat';

export default tsEslint.config(
    ...tsEslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    ...pluginVueA11y.configs['flat/recommended'],
    // Turns off every rule Prettier already decides. Must stay last of the shared configs.
    configPrettier,
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
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
            'no-param-reassign': ['error', { props: false }],
            'object-shorthand': ['error', 'always'],
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        files: ['**/*.vue'],
        rules: {
            'vue/attribute-hyphenation': ['error', 'never'],
            // Components here are named for what they are rather than padded to two words; renaming eight of them
            // to satisfy the rule would say less, not more.
            'vue/multi-word-component-names': 'off',
            // Matches attribute-hyphenation above - this codebase writes both in camelCase.
            'vue/v-on-event-hyphenation': ['error', 'never'],
            // The control is rendered through `<Component :is>`, which the rule cannot resolve, so accept either
            // the wrapping label or an explicit `for`. Both are in place.
            'vuejs-accessibility/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
            'vue/attributes-order': 'error',
            'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
            'vue/no-empty-component-block': 'error',
            'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
            'vue/prefer-true-attribute-shorthand': ['error', 'always'],
        },
    },
);

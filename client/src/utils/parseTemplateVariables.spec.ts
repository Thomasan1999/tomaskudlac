import { parseTemplateVariables } from '@/utils/parseTemplateVariables';

describe('parseTemplateVariables', () => {
    it('replaces all known placeholders', () => {
        const result = parseTemplateVariables('I am {{age}} years old. I know {{programmingLanguagesString}}.', {
            age: 25,
            programmingLanguagesString: 'Vue.js, TypeScript',
        });

        expect(result).toBe('I am 25 years old. I know Vue.js, TypeScript.');
    });

    it('works with numbers', () => {
        const result = parseTemplateVariables('{{age}}', { age: 42 });

        expect(result).toBe('42');
    });

    it('returns the original string when there are no placeholders', () => {
        const template = 'No variables.';
        const result = parseTemplateVariables(template, { x: 1 });

        expect(result).toBe(template);
    });
});

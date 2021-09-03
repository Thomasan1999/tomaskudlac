import {ProgrammingLanguage} from '@/store/ProgrammingLanguage';
import {DeepPartial} from 'ts-essentials';

describe('ProgrammingLanguage', () =>
{
    it('converts to string with no children languages', () =>
    {
        const languagesData: DeepPartial<ProgrammingLanguage>[] = [
            {title: 'CSS'},
            {title: 'JavaScript'}
        ];

        languagesData.forEach(({title}) =>
        {
            const language = new ProgrammingLanguage({title});

            expect(language.toString()).toBe(title);
        });
    });

    it('converts to string with children languages', () =>
    {
        const css = new ProgrammingLanguage({
            children: [{title: 'Less'}, new ProgrammingLanguage({title: 'Sass'}), {title: 'SCSS'}],
            title: 'CSS'
        });

        const js = new ProgrammingLanguage({
            children: [{title: 'Vue.js'}],
            title: 'JavaScript'
        });

        expect(css.toString()).toBe('CSS (Less, Sass, SCSS)');
        expect(js.toString()).toBe('JavaScript (Vue.js)');
    });
});

import HomeTextProgrammingLanguage from '@/components/main/home/HomeTextProgrammingLanguage.vue';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { HomeTextProgrammingLanguageProps } from '@/components/main/home/types';

describe('HomeTextProgrammingLanguage', () => {
    const createHomeTextProgrammingLanguageWrapper =
        buildCreateWrapper<HomeTextProgrammingLanguageProps>(HomeTextProgrammingLanguage);
    const setProps = buildSetProps<HomeTextProgrammingLanguageProps>();

    it('shows whole programming language', async () => {
        let programmingLanguage = 'n HTML';

        const wrapper = createHomeTextProgrammingLanguageWrapper({ programmingLanguage });

        // use 'textContent' instead of 'text' to include spaces
        expect(wrapper.element.textContent).toBe(programmingLanguage);

        programmingLanguage = 'PostgreSQL';

        await setProps(wrapper, { programmingLanguage });

        expect(wrapper.element.textContent).toBe(programmingLanguage);
    });
});

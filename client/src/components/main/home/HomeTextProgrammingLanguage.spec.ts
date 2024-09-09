import HomeTextProgrammingLanguage from '@/components/main/home/HomeTextProgrammingLanguage.vue';
import { buildCreateWrapper } from '@/utils/test';

describe('HomeTextProgrammingLanguage', () => {
    const createWrapper = buildCreateWrapper(HomeTextProgrammingLanguage);

    it('shows whole programming language', async () => {
        let programmingLanguage = 'n HTML';

        const wrapper = createWrapper({ programmingLanguage });

        // use 'textContent' instead of 'text' to include spaces
        expect(wrapper.element.textContent).toBe(programmingLanguage);

        programmingLanguage = 'PostgreSQL';

        await wrapper.setProps({ programmingLanguage });

        expect(wrapper.element.textContent).toBe(programmingLanguage);
    });
});

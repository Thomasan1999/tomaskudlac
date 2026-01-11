import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import NavbarLanguageSwitcher from '@/components/main/navbar/NavbarLanguageSwitcher.vue';
import { SiteLanguage } from '@/store/types';
import router from '@/router';

const createWrapper = buildCreateWrapper(NavbarLanguageSwitcher, undefined, {
    global: {
        plugins: [router],
    },
});

describe('NavbarLanguageSwitcher', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('displays button for each language', async () => {
        const wrapper = createWrapper();

        Object.values(SiteLanguage).forEach((language) => {
            expect(wrapper.find(getTestingSelector(`navbar-lang-${language}`)).exists()).toBe(true);
        });
    });
});

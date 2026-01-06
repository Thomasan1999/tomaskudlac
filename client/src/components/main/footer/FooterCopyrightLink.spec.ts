import mockInitStore from '@/mocks/mockInitStore';
import FooterCopyrightLink from '@/components/main/footer/FooterCopyrightLink.vue';
import { buildCreateWrapper } from '@/utils/test';
import useStore from '@/store';
import { SiteLanguage } from '@/store/types';
import ExternalLink from '@/components/ExternalLink.vue';

const createWrapper = buildCreateWrapper(FooterCopyrightLink, { text: '' });

describe('FooterCopyrightLink', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('renders text', async () => {
        const wrapper = createWrapper({ text: 'Some text' });

        expect(wrapper.text()).toBe('Some text');

        await wrapper.setProps({ text: 'Lorem ipsum' });

        expect(wrapper.text()).toBe('Lorem ipsum');
    });

    it('uses external link for English', async () => {
        const store = useStore();

        store.language = SiteLanguage.EN;

        const wrapper = createWrapper();

        expect(wrapper.findComponent(ExternalLink).exists()).toBe(true);
    });

    it('uses just span for Slovak', async () => {
        const store = useStore();

        store.language = SiteLanguage.SK;

        const wrapper = createWrapper();

        expect(wrapper.findComponent(ExternalLink).exists()).toBe(false);
        expect(wrapper.find('span').exists()).toBe(true);
    });
});

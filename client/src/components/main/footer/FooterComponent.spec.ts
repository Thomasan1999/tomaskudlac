import mockInitStore from '@/mocks/mockInitStore';
import { nextTick } from 'vue';
import FooterComponent from '@/components/main/footer/FooterComponent.vue';
import useStore from '@/store';
import ExternalLink from '@/components/ExternalLink.vue';
import { SiteLanguage } from '@/store/types';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const COPYRIGHT_LINK_SELECTOR = getTestingSelector('copyright-link');

const createWrapper = buildCreateWrapper(FooterComponent, undefined, {
    global: {
        stubs: ['CookiesModal'],
    },
});

describe('FooterComponent', () => {
    beforeAll(async () => {
        await mockInitStore();
        Object.defineProperty(window, 'location', {
            value: new URL('https://tomaskudlac.sk'),
        });
    });

    it('opens cookies modal on copyright link click in the Slovak version', async () => {
        const store = useStore();

        const wrapper = createWrapper();

        store.language = SiteLanguage.SK;

        await nextTick();

        let cookiesModal = wrapper.findComponent({ name: 'CookiesModal' });

        expect(cookiesModal.exists()).toBe(false);

        const copyrightLink = wrapper.get(COPYRIGHT_LINK_SELECTOR);

        await copyrightLink.trigger('click');

        cookiesModal = wrapper.findComponent({ name: 'CookiesModal' });

        expect(cookiesModal.exists()).toBe(true);
    });

    it('uses external link for cookies in the English version', async () => {
        const store = useStore();

        const wrapper = createWrapper();

        store.language = SiteLanguage.EN;

        await nextTick();

        const copyrightLink = wrapper.findComponent<typeof ExternalLink>(COPYRIGHT_LINK_SELECTOR);

        const copyrightLinkUrl = new URL((copyrightLink.element as HTMLAnchorElement).href);

        expect(location.hostname).toBe('tomaskudlac.sk');
        expect(copyrightLinkUrl.hostname).not.toEqual(location.hostname);
    });
});

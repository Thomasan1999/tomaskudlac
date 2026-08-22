import mockInitStore from '@/mocks/mockInitStore';
import { nextTick } from 'vue';
import FooterComponent from '@/components/main/footer/FooterComponent.vue';
import useStore from '@/store';
import ExternalLink from '@/components/ExternalLink.vue';
import enLocales from '@/locales/en';
import skLocales from '@/locales/sk';
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

    /**
     * The modal stays mounted across a client-side language switch, and English carries no cookies texts, so
     * without this it would be left rendering against nothing.
     */
    it('closes the cookies modal when switching to a language without cookies texts', async () => {
        const store = useStore();

        const wrapper = createWrapper();

        store.language = SiteLanguage.SK;
        store.locales = skLocales;
        await nextTick();

        await wrapper.get(COPYRIGHT_LINK_SELECTOR).trigger('click');

        expect(wrapper.findComponent({ name: 'CookiesModal' }).exists()).toBe(true);

        store.language = SiteLanguage.EN;
        store.locales = enLocales;
        await nextTick();

        expect(wrapper.findComponent({ name: 'CookiesModal' }).exists()).toBe(false);
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

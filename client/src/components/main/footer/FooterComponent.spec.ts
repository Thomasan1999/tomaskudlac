import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import {mount, VueWrapper} from '@vue/test-utils';
import {nextTick} from 'vue';
import FooterComponent from '@/components/main/footer/FooterComponent.vue';
import useStore from '@/store';
import ExternalLink from '@/components/ExternalLink.vue';
import {SiteLanguage} from '@/store/types';

describe('FooterComponent', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
        Object.defineProperty(window, 'location', {
            value: new URL('https://tomaskudlac.sk')
        });
    });

    function createFooterComponentWrapper(): VueWrapper
    {
        return mount(FooterComponent, {
            global: {
                plugins: [pinia],
                stubs: ['CookiesModal']
            }
        });
    }

    it('opens cookies modal on copyright link click in the Slovak version', async () =>
    {
        const store = useStore();

        const footerComponentWrapper = createFooterComponentWrapper();

        store.language = SiteLanguage.SK;

        await nextTick();

        let cookiesModal = footerComponentWrapper.findComponent({name: 'CookiesModal'});

        expect(cookiesModal.exists()).toBe(false);

        const copyrightLink = footerComponentWrapper.get('[data-testid="copyrightLink"]');

        await copyrightLink.trigger('click');

        cookiesModal = footerComponentWrapper.findComponent({name: 'CookiesModal'});

        expect(cookiesModal.exists()).toBe(true);
    });

    it('uses external link for cookies in the English version', async () =>
    {
        const store = useStore();

        const footerComponentWrapper = createFooterComponentWrapper();

        store.language = SiteLanguage.EN;

        await nextTick();

        const copyrightLink = footerComponentWrapper.findComponent<typeof ExternalLink>('[data-testid=copyrightLink]');

        const copyrightLinkUrl = new URL((copyrightLink.element as HTMLAnchorElement).href);

        expect(location.hostname).toBe('tomaskudlac.sk');
        expect(copyrightLinkUrl.hostname).not.toEqual(location.hostname);
    });
});

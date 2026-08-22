import router from '@/router/index';
import getLinkElement from '@/utils/getLinkElement';
import getMetaElement from '@/utils/getMetaElement';
import { createPinia, setActivePinia } from 'pinia';
import useStore from '@/store';
import mockImageSrc from '@/mocks/mockImageSrc';
import routes from '@/router/routes';
import { SITE_ORIGIN } from '@/router/syncDocumentHead';

vi.mock('@/router/routes', () => {
    return {
        default: [
            {
                path: '/',
                component: {},
                meta: {
                    canonicalPath: '/',
                    description: 'The description of the site.',
                    language: 'en',
                    ogLocale: 'en_US',
                    title: 'The site',
                },
            },
            {
                path: '/sk',
                component: {},
                meta: {
                    canonicalPath: '/sk/',
                    description: 'Popis stránky.',
                    language: 'sk',
                    ogLocale: 'sk_SK',
                    title: 'Stránka',
                },
            },
        ],
    };
});

describe('router', () => {
    beforeAll(async () => {
        mockImageSrc();

        document.head.innerHTML += '<link rel="manifest"><meta name="description">';

        setActivePinia(createPinia());

        const store = useStore();

        await store.init();
    });

    /**
     * The server renders these tags per language, but the language also changes client-side without a request. Any
     * tag the server varies has to be re-synced here, or a crawler following a switched route reads stale metadata.
     */
    it('syncs DOM with route metadata', async () => {
        for await (const route of routes) {
            await router.push(route.path);

            const { canonicalPath, description, language, ogLocale, title } = route.meta!;
            const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

            expect(document.title).toBe(title);
            expect(document.documentElement.lang).toBe(language);
            expect(getMetaElement('description').content).toBe(description);
            expect(getLinkElement('manifest').href).toContain(language as string);

            expect(getLinkElement('canonical').href).toBe(canonicalUrl);
            expect(getMetaElement('og:url', 'property').content).toBe(canonicalUrl);
            expect(getMetaElement('og:title', 'property').content).toBe(title);
            expect(getMetaElement('og:description', 'property').content).toBe(description);
            expect(getMetaElement('og:locale', 'property').content).toBe(ogLocale);
        }
    });
});

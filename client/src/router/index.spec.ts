import router from '@/router/index';
import getMetaElement from '@/utils/getMetaElement';
import { createPinia, setActivePinia } from 'pinia';
import useStore from '@/store';
import mockImageSrc from '@/mocks/mockImageSrc';
import routes from '@/router/routes';
import getManifestElement from '@/utils/getManifestElement';
import { SiteLanguage } from '@/store/types';

vi.mock('@/router/routes', () => {
    return {
        default: [
            {
                path: '/',
                component: {},
                meta: {
                    description: 'The description of the site.',
                    language: SiteLanguage.EN,
                    title: 'The site',
                },
            },
            {
                path: '/sk',
                component: {},
                meta: {
                    description: 'Popis stránky.',
                    language: SiteLanguage.SK,
                    title: 'Stránka',
                },
            },
        ],
    };
});

describe('router', () => {
    beforeAll(async () => {
        mockImageSrc();

        document.head.innerHTML += '<link rel="manifest">';

        setActivePinia(createPinia());

        const store = useStore();

        await store.init();
    });

    it('syncs DOM with route metadata', async () => {
        for await (const route of routes) {
            await router.push(route.path);

            expect(document.title).toBe(route.meta!.title!);
            expect(document.documentElement.lang).toBe(route.meta!.language!);
            expect(getMetaElement('description').content).toBe(route.meta!.description!);
            expect(getManifestElement().href).toContain(route.meta!.language!);
        }
    });
});

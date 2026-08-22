import { createRouter, createWebHistory, RouteLocationRaw } from 'vue-router';
import useStore from '@/store';
import { SiteLanguage } from '@/store/types';
import { Locales } from '@/locales/types';
import mainSections from '@/components/main/mainSections';
import routes from '@/router/routes';
import getManifestElement from '@/utils/getManifestElement';
import getMetaElement from '@/utils/getMetaElement';
import { parseTemplateVariables } from '@/utils/parseTemplateVariables';

/**
 * Loaders for the locale chunks.
 *
 * Listed explicitly rather than built from a template literal, because Vite resolves an interpolated import by
 * globbing the whole directory - which would bundle every file that lands in `locales/`, spec files included.
 */
const localeLoaders: Record<SiteLanguage, () => Promise<{ default: Locales }>> = {
    [SiteLanguage.CZ]: () => import('@/locales/cz'),
    [SiteLanguage.EN]: () => import('@/locales/en'),
    [SiteLanguage.SK]: () => import('@/locales/sk'),
};

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/** The language of the previous route. */
let lastLanguage: SiteLanguage | undefined;

router.beforeEach(async (to) => {
    const store = useStore();

    const language = to.meta.language;

    const languageUnchanged = lastLanguage === language;

    if (languageUnchanged) {
        return true;
    }

    lastLanguage = language;

    store.language = language;

    store.locales = (await localeLoaders[language]()).default;
    document.documentElement.lang = language;

    const metaDescription = getMetaElement('description');
    metaDescription.content = parseTemplateVariables(to.meta.description, {
        programmingLanguagesString: store.programmingLanguagesString,
    });

    const manifestElement = getManifestElement();
    manifestElement.href = `/manifest_${language}.webmanifest`;

    document.title = to.meta.title;

    const newRouteHash = store.activeSection && mainSections[store.activeSection].url;

    const hashChanged = newRouteHash && newRouteHash !== to.hash;

    return hashChanged
        ? ({ hash: newRouteHash, path: to.path, replace: true } as RouteLocationRaw)
        : (undefined as never);
});

export default router;

import { createRouter, createWebHistory, RouteLocationRaw } from 'vue-router';
import useStore from '@/store';
import { SiteLanguage } from '@/store/types';
import mainSections from '@/components/main/mainSections';
import routes from '@/router/routes';
import getManifestElement from '@/utils/getManifestElement';
import getMetaElement from '@/utils/getMetaElement';
import { parseTemplateVariables } from '@/utils/parseTemplateVariables';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/** The language of the previous route. */
let lastLanguage: SiteLanguage | undefined;

router.beforeEach(async (to, from, next) => {
    const store = useStore();

    const language = to.meta.language;

    const languageUnchanged = lastLanguage === language;

    if (languageUnchanged) {
        next();
        return;
    }

    lastLanguage = language;

    store.language = language;

    store.locales = (await import(`../locales/${store.language}.ts`)).default;
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

    const newRoute = hashChanged
        ? ({ hash: newRouteHash, path: to.path, replace: true } as RouteLocationRaw)
        : (undefined as never);

    next(newRoute);
});

export default router;

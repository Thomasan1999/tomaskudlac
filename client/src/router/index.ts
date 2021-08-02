import {createRouter, createWebHistory, NavigationGuardNext} from 'vue-router';
import store from '@/store';
import {SiteLanguage} from '@/store/types';
import mainSections from '@/components/main/mainSections';
import routes from '@/router/routes';
import getManifestElement from '@/utils/getManifestElement';
import getMetaElement from '@/utils/getMetaElement';

const router = createRouter({
    history: createWebHistory(),
    routes
});

/** The language of the previous route. */
let lastLanguage: SiteLanguage | undefined = undefined;

router.beforeEach(async (to, from, next) =>
{
    const language = to.meta.language;

    const languageUnchanged = lastLanguage === language;

    if (languageUnchanged)
    {
        next();
        return;
    }

    lastLanguage = language;

    store.language = language;

    store.locales = (await import(`./locales/${store.language}.ts`)).default;
    document.documentElement.lang = language;

    const metaDescription = getMetaElement('description');
    metaDescription.content = to.meta.description;

    const manifestElement = getManifestElement();
    manifestElement.href = `/manifest_${language}.webmanifest`;

    document.title = to.meta.title;

    const newRouteHash = store.activeSection && mainSections[store.activeSection].url;

    const hashChanged = newRouteHash && newRouteHash !== to.hash;

    const newRoute: NavigationGuardNext = hashChanged
        ? {hash: newRouteHash, path: to.path, replace: true}
        : undefined as any;

    next(newRoute);
});

export default router;

// routes.ts -> Main.vue -> @/router -> routes.ts is a cycle; importing routes first leaves the router with no
// routes at all. The component itself is irrelevant to what is asserted here.
vi.mock('@/components/main/Main.vue', () => ({ default: {} }));

import routes from '@/router/routes';
import { SiteLanguage } from '@/store/types';
import type { RouteRecordRaw } from 'vue-router';

const languageRoutes = routes.filter((route): route is RouteRecordRaw & { name: SiteLanguage } =>
    Object.values(SiteLanguage).includes(route.name as SiteLanguage),
);

describe('routes', () => {
    it('has one route per site language', () => {
        expect(languageRoutes.map((route) => route.name).sort()).toEqual(Object.values(SiteLanguage).sort());
    });

    /**
     * Canonical and og:locale are what stop the three language pages from reading as duplicates of one another, and
     * `syncDocumentHead` falls back to the current path when the canonical is missing - which for the Czech route
     * would resolve to whichever of its four aliases the visitor happened to arrive on.
     */
    it('gives every language route a canonical path and an Open Graph locale', () => {
        languageRoutes.forEach((route) => {
            expect(route.meta?.canonicalPath, `${route.name} canonicalPath`).toBeTruthy();
            expect(route.meta?.ogLocale, `${route.name} ogLocale`).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
        });
    });

    it('points every alias at the canonical path rather than at itself', () => {
        languageRoutes.forEach((route) => {
            const aliases = [route.path, ...[route.alias ?? []].flat()];

            expect(aliases, `${route.name} should serve its canonical path`).toContain(route.meta!.canonicalPath);
        });
    });

    it('resolves unknown paths to the English page', () => {
        const catchAll = routes.find((route) => String(route.path).includes('pathMatch'));

        expect(catchAll?.redirect).toBe('/en/');
    });
});

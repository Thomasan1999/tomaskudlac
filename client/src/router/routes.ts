import Main from '@/components/main/Main.vue';
import { RouteRecordRaw } from 'vue-router';
import { SiteLanguage } from '@/store/types';

/** List of routes used in the Vue Router. */
const routes = [
    {
        component: Main,
        meta: {
            canonicalPath: '/',
            description:
                'Mojou pracovnou náplňou je web development (vývoj webových stránok a aplikácií). Ovládam {{programmingLanguagesString}}. Rád sa učím novým technológiám a skúmam, ako sa vyvíjajú. Pomáha mi to byť v obraze a využiť každú novú príležitosť na to byť lepší vývojár.',
            language: SiteLanguage.SK,
            ogLocale: 'sk_SK',
            title: 'Tomáš Kudláč - Vývoj webových stránok a aplikácií',
        },
        name: SiteLanguage.SK,
        path: '/',
    },
    {
        component: Main,
        meta: {
            // The aliases below serve the same document, so they all have to point back at this one path.
            canonicalPath: '/cz/',
            description:
                'Mou pracovní náplní je web development (vývoj webových stránek a aplikácí). Ovládám {{programmingLanguagesString}}. Rád se učím novým technologiím a zkoumám, jak se vyvíjejí. Pomáhá mi to být v obraze a využít každou novou příležitost k tomu být lepším vývojářem.',
            language: SiteLanguage.CZ,
            ogLocale: 'cs_CZ',
            title: 'Tomáš Kudláč - Vývoj webových stránek a aplikací',
        },
        name: SiteLanguage.CZ,
        path: '/cz/',
        alias: ['/cz', '/cs', '/cs/'],
    },
    {
        alias: ['/sk'],
        path: '/sk/',
        redirect: '/',
    },
    {
        component: Main,
        meta: {
            canonicalPath: '/en/',
            description:
                'I work as a web developer. I know {{programmingLanguagesString}}. I like to learn new technologies and watch how do they turn out. It helps me to keep track with them and use every new opportunity to be a better developer.',
            language: SiteLanguage.EN,
            languageHasAnPrefix: true,
            ogLocale: 'en_US',
            title: 'Tomáš Kudláč - Website and web application development',
        },
        name: SiteLanguage.EN,
        path: '/en/',
    },
    {
        // Unknown paths land on the English page. Returning a real 404 status needs the server, which is not part
        // of this repository.
        path: '/:pathMatch(.*)',
        redirect: '/en/',
    },
] as RouteRecordRaw[];

export default routes;

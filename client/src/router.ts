import {createRouter, createWebHistory} from 'vue-router';
import Main from '@/components/main/Main.vue';
import store from '@/store';
import {SiteLanguage} from '@/store/types';
import mainSections from '@/components/main/mainSections';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: Main,
            meta: {
                description: `Mám ${store.age} rokov a pracujem na živnosť (freelance). Mojou pracovnou náplňou je web development (vývoj webových stránok a aplikácií). Ovládam ${store.programmingLanguagesString}. Rád sa učím novým technológiám a skúmám, ako sa vyvíjajú. Pomáha mi to byť v obraze a využiť každú novú príležitosť na to byť lepší vývojár.`,
                language: 'sk',
                title: 'Tomáš Kudláč - Vývoj webových stránok a aplikácií'
            },
            path: '/'
        },
        {
            alias: ['/sk', '/cz/', '/cz', '/cs', '/cs/'],
            path: '/sk/',
            redirect: '/'
        },
        {
            component: Main,
            meta: {
                description: `I'm ${store.age} years old and I'm self-employed (freelancer). I work as a web developer. I know ${store.programmingLanguagesString}. I like to learn new technologies and watch how do they turn out. It helps me to keep track with them and use every new opportunity to be a better developer.`,
                language: 'en',
                title: 'Tomáš Kudláč - Website and web application development'
            },
            path: '/en/'
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/en/'
        }
    ]
});

let lastLanguage: SiteLanguage | undefined = undefined;

router.beforeEach(async (to, from, next) =>
{
    const language = to.meta.language as 'sk' | 'en';

    if (lastLanguage === language)
    {
        next();
        return;
    }

    lastLanguage = language;

    store.language = language;
    store.locales = (await import(`./locales/${store.language}.ts`)).default;
    document.documentElement.lang = language;

    const getDescriptionTag = () =>
    {
        const existingTag = document.head.querySelector<HTMLMetaElement>('meta[name=description]');

        if (existingTag)
        {
            return existingTag;
        }

        const newTag = document.createElement('meta');

        newTag.name = 'description';

        document.head.appendChild(newTag);

        return newTag;
    };

    const getManifestTag = () =>
    {
        return document.head.querySelector<HTMLLinkElement>('link[rel=manifest]')!;
    };

    const descriptionTag = getDescriptionTag();
    descriptionTag.content = to.meta.description as string;

    const manifestTag = getManifestTag();

    manifestTag.href = `/manifest_${language}.webmanifest`;

    document.title = to.meta.title as string;

    if (store.activeSection)
    {
        next({hash: mainSections[store.activeSection].url, path: to.path});
        return;
    }

    next();
});

export default router;

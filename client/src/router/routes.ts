import Main from '@/components/main/Main.vue';
import {RouteRecordRaw} from 'vue-router';
import {SiteLanguage} from '@/store/types';

/** List of routes used in the Vue Router. */
const routes = [
    {
        component: Main,
        meta: {
            // eslint-disable-next-line max-len
            description: `Mám {{age}} rokov a pracujem na živnosť (freelance). Mojou pracovnou náplňou je web development (vývoj webových stránok a aplikácií). Ovládam {{programmingLanguagesString}}. Rád sa učím novým technológiám a skúmám, ako sa vyvíjajú. Pomáha mi to byť v obraze a využiť každú novú príležitosť na to byť lepší vývojár.`,
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
            // eslint-disable-next-line max-len
            description: `I'm {{age}}} years old and I'm self-employed (freelancer). I work as a web developer. I know {{programmingLanguagesString}}. I like to learn new technologies and watch how do they turn out. It helps me to keep track with them and use every new opportunity to be a better developer.`,
            language: SiteLanguage.EN,
            title: 'Tomáš Kudláč - Website and web application development'
        },
        path: '/en/'
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/en/'
    }
] as RouteRecordRaw[];

export default routes;

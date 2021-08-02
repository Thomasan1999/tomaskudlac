import Main from '@/components/main/Main.vue';
import store from '@/store';
import {RouteRecordRaw} from 'vue-router';

/** List of routes used in the Vue Router. */
const routes = [
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
] as RouteRecordRaw[];

export default routes;

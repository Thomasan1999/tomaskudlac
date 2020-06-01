import Vue                   from 'vue';
import Router, {RouteRecord} from 'vue-router';
import Home                  from '../views/Home.vue';
import store                 from '../store';

const {age} = store.state;
const {programmingLanguages} = store.getters;

Vue.use(Router);

const router = new Router({
    mode: `history`,
    base: process.env.BASE_URL,
    routes: [
        {
            path: `/`,
            name: `sk`,
            component: Home,
            meta: {
                title: `Tomáš Kudláč - Vývoj webových stránok a aplikácií`,
                metaTags: [
                    {
                        name: `description`,
                        content: `Mám ${age} rokov a som freelancer (živnostník). Mojou pracovnou náplňou je web development. Kódujem v ${programmingLanguages}. Čo sa týka rôznych frameworkov a knižníc, pokiaľ viem danú vec urobiť jednoducho a rýchlo sám, snažím sa im vyhnúť, ale ak mi vedia výrazne pomôcť, nemám problém ich použiť.`
                    }
                ]
            }
        },
        {
            path: `/en`,
            name: `en`,
            component: Home,
            meta: {
                title: `Tomáš Kudláč - Website and web application development`,
                metaTags: [
                    {
                        name: `description`,
                        content: `I'm ${age} years old, I"m a freelancer (self-employed). The scope of my work is web development. I code in ${programmingLanguages}. When it comes to various frameworks and libraries, if I'm able to do it simply and quickly on my own, I try to avoid them, but if they can help me significantly, I don't mind using them at all.`
                    }
                ]
            }
        },
        {
            path: `/cz`,
            redirect: `/`
        },
        {
            path: `/cs`,
            redirect: `/`
        },
        {
            path: `/:lang?/`,
            redirect: `/en`
        },
        {
            path: `/:lang?`,
            redirect: `/en`
        }
    ]
});

router.beforeEach((to, from, next) =>
{
    if (to.name)
    {
        document.documentElement.setAttribute(`lang`, to.name);
    }

    /** @description Type of the value of a HTML Meta Tag with name="title". */
    type metaTitle = string;
    /** @description  */
    type metaMetaTag = { content: string, name: string };

    /** @description The nearest object representing all metadata which has a title attribute. */
    const nearestWithTitle: Merge<RouteRecord, {
        meta: {
            title: metaTitle,
            metaTags?: metaMetaTag[]
        }
    }> | undefined = [...to.matched].reverse().find((r) =>
    {
        return r.meta && r.meta.title;
    });

    /** @description The nearest meta object which has a list of HTML Meta tags. */
    const nearestWithMeta: Merge<RouteRecord, {
        meta: {
            title?: metaTitle,
            metaTags: metaMetaTag[]
        }
    }> | undefined = [...to.matched].reverse().find((r) =>
    {
        return r.meta && r.meta.metaTags;
    });

    if (nearestWithTitle)
    {
        document.title = nearestWithTitle.meta.title;
    }

    [...document.querySelectorAll(`[data-vue-router-controlled]`)].map((el: Node) =>
    {
        return (el.parentNode as HTMLElement).removeChild(el);
    });

    if (!nearestWithMeta)
    {
        return next();
    }

    nearestWithMeta.meta.metaTags.forEach((tagDef) =>
    {
        const tag: HTMLElement = document.createElement(`meta`);

        Object.keys(tagDef).forEach((key) =>
        {
            tag.setAttribute(key, tagDef[key]);
        });

        tag.setAttribute(`data-vue-router-controlled`, ``);

        document.head.appendChild(tag);
    });

    next();
});

export default router;

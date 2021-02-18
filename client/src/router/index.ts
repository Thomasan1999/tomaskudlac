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
                        content: `Mám ${age} rokov a som freelancer (živnostník). Mojou pracovnou náplňou je web development. Kódujem v ${programmingLanguages}. Rád sa učím novým technológiám a skúmám, ako sa vyvíjajú. Pomáha mi to byť v obraze a využiť každú novú príležitosť na lepší vývoj..`
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
                        content: `I'm ${age} years old, I"m a freelancer (self-employed). The scope of my work is web development. I code in ${programmingLanguages}. I like to learn new technologies and watch how do they develop. It helps me to be keep track with them and use every new opportunity to better development..`
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
    type MetaTitle = string;
    /** @description  */
    type RouteMetaTagsData = { content: string, name: string };

    const destinationMatchedRoutes = to.matched;
    const destionationReversedMatchedRoutes = [...destinationMatchedRoutes].reverse();

    /** @description The nearest object representing all metadata which has a title attribute. */
    const nearestRouteWithTitle: Merge<RouteRecord, {
        meta: {
            title: MetaTitle,
            metaTags?: RouteMetaTagsData[]
        }
    }> | undefined = destionationReversedMatchedRoutes.find((routeRecord) =>
    {
        return routeRecord.meta?.title;
    });

    /** @description The nearest meta object which has a list of HTML Meta tags. */
    const nearestRouteWithMetaData: Merge<RouteRecord, {
        meta: {
            title?: MetaTitle,
            metaTags: RouteMetaTagsData[]
        }
    }> | undefined = destionationReversedMatchedRoutes.find((routeRecord) =>
    {
        return routeRecord.meta?.metaTags;
    });

    if (nearestRouteWithTitle)
    {
        document.title = nearestRouteWithTitle.meta.title;
    }

    const metaTagsNodeList = document.querySelectorAll<HTMLMetaElement>(`[data-vue-router-controlled]`);
    const metaTagsArray = [...metaTagsNodeList];

    metaTagsArray.map((metaTag) =>
    {
        const metaTagContainer = (metaTag.parentNode as HTMLElement);

        return metaTagContainer.removeChild(metaTag);
    });

    if (!nearestRouteWithMetaData)
    {
        return next();
    }

    nearestRouteWithMetaData.meta.metaTags.forEach((routeMetaTagsData) =>
    {
        const metaTag = document.createElement(`meta`);

        Object.keys(routeMetaTagsData).forEach((key) =>
        {
            metaTag.setAttribute(key, routeMetaTagsData[key]);
        });

        metaTag.setAttribute(`data-vue-router-controlled`, ``);

        document.head.appendChild(metaTag);
    });

    next();
});

export default router;

import { SiteLanguage } from '@/store/types';

declare module 'vue-router' {
    interface RouteMeta {
        /** Content of meta[name=description] */
        description: string;
        /** The site language. */
        language: SiteLanguage;
        /** The document title. */
        title: string;
    }
}

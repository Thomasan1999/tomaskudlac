import { SiteLanguage } from '@/store/types';

declare module 'vue-router' {
    interface RouteMeta {
        /** Content of meta[name=description] */
        description: string;
        /** The site language. */
        language: SiteLanguage;
        /** Whether the site language can have an 'an' prefix before a programming language. */
        languageUsesAnPrefix: boolean;
        /** The document title. */
        title: string;
    }
}

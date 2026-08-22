import { SiteLanguage } from '@/store/types';

declare module 'vue-router' {
    interface RouteMeta {
        /** Path this route should be indexed under, without the origin. */
        canonicalPath?: string;
        /** Content of meta[name=description] */
        description: string;
        /** The site language. */
        language: SiteLanguage;
        /** Whether the site language can have an 'an' prefix before a programming language. */
        languageHasAnPrefix: boolean;
        /** Value of meta[property=og:locale], in the language_TERRITORY form Open Graph expects. */
        ogLocale?: string;
        /** The document title. */
        title: string;
    }
}

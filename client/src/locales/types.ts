import { SiteLanguage } from '@/store/types';

/** A single heading-and-body block, used by the cookies modal and the about-myself section. */
export interface LocalesTextBlock {
    title: string;
    text: string;
}

export interface LocalesProject {
    backEndDesc: string;
    designDesc: string;
    frontEndDesc: string;
    href: string;
    title: string;
}

/**
 * The shape every locale file must have.
 *
 * Written out by hand rather than derived from one of the locale files, so that no single language is
 * privileged as the reference and a drift in any of them is a type error in that file.
 */
export interface Locales {
    /**
     * Only present in Slovak and Czech. English links out to an external explanation instead of opening the modal,
     * so there is nothing here to translate - see FooterCopyrightLink.
     */
    cookies?: {
        closeButtonTitle: string;
        paragraphs: LocalesTextBlock[];
    };
    footer: {
        copyrightLinkTitle: string;
        copyrightLinkText: string;
        copyrightText: string;
    };
    navbar: {
        hide: string;
        /**
         * Titles of the links switching to the other languages. Partial by design - each locale only lists the
         * languages other than itself, so the missing key is always the file's own language.
         */
        otherLangs: Partial<Record<SiteLanguage, string>>;
        show: string;
    };
    sections: {
        aboutMyself: {
            columns: LocalesTextBlock[];
            photoAlt: string;
            title: string;
        };
        contact: {
            briefText: string;
            form: {
                /** Keyed by the raw message the API returns, plus `success`. */
                apiMessages: Record<string, string>;
                email: string;
                errors: {
                    empty: string;
                    invalidFormat: string;
                };
                message: string;
                name: string;
                phone: string;
                required: string;
                requiredLegend: string;
                submitLabel: string;
                submitTitle: string;
                submitTitleDisabled: string;
            };
            phoneTitle: string;
            title: string;
        };
        home: {
            developer: string;
            title: string;
            welcome: string;
        };
        projects: {
            backEndLabel: string;
            designLabel: string;
            frontEndLabel: string;
            projects: Record<string, LocalesProject>;
            showProject: string;
            title: string;
            whatIveDone: string;
        };
    };
    toasts: {
        closeButtonTitle: string;
    };
}

/** Names of the page sections. Derived from the locales so the two cannot drift apart. */
export type MainSectionName = keyof Locales['sections'];

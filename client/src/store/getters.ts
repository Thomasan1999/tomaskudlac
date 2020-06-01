import VueString  from '@/plugins/VueString';
import textsSrc   from '@/locales';
import storeState from '@/store/state';

const getters = {
    /** @description The language which is not active. */
    langOther({lang}: typeof getters): Lang
    {
        return lang === `sk` ? `en` : `sk`;
    },
    /** @description Properties of the language which is not active. */
    langOtherProps({navItemActive, lang, texts}: typeof storeState, {langOther}: typeof getters): { href: string, nameUpper: string }
    {
        return {
            href: `${lang === `sk` ? `en` : ``}/#${new VueString(texts[langOther][navItemActive].title).urlTo()}`,
            nameUpper: langOther.toUpperCase()
        };
    },
    /** @description Height of the nav-bar. */
    navHeight({navSlidedDown}: typeof storeState, {touchscreen}: typeof getters): number
    {
        return ((60 + (Number(touchscreen) * 5)) + (300 * Number(navSlidedDown)));
    },
    /** @description String containing all programming languages. */
    programmingLanguages(state: typeof storeState): string
    {
        const {programmingLanguages: programmingLanguagesText} = state.texts;

        /**
         * @description Orders two programming languages by the order value.
         * @param langProps Properties of the first programming languages.
         * @param langProps1 Properties of the second programming languages.
         * @returns The difference of the order values of two programming languages.
         * */
        const compareFn = ([, langProps]: [string, ProgrammingLanguage], [, langProps1]: [string, ProgrammingLanguage]) =>
        {
            return langProps.order - langProps1.order;
        };

        /**
         * @description Gets the locale of a programming language.
         * @param langs Object containing programming languages.
         * @returns Locale of all programming languages.
         * */
        const textGet: (langs: { [s: string]: ProgrammingLanguage }) => string = (langs: { [s: string]: ProgrammingLanguage }) =>
        {
            return Object.entries(langs).sort(compareFn).map(([langName, langProps]) =>
            {
                return `${programmingLanguagesText[langName]}${langProps.children ? ` (${textGet(langProps.children)})` : ``}`;
            }).join(`, `);
        };

        return textGet(state.programmingLanguages);
    },
    /** @description All locales of the active language. */
    texts({lang, texts}: typeof storeState): typeof textsSrc.sk
    {
        return texts[lang] as typeof textsSrc.sk;
    },
    /** @description Determines whether the screen is narrower than 1024px. */
    touchscreen({windowWidth}: typeof storeState): boolean
    {
        return windowWidth < 1024;
    }
};

export default getters;

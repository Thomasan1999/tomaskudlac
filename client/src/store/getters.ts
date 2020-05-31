import VueString from '@/plugins/VueString';
import textsSrc  from '@/locales';

const getters = {
    langOther({lang}): Lang
    {
        return lang === `sk` ? `en` : `sk`;
    },
    langOtherProps({navItemActive, lang, texts}, {langOther}): { href: string, nameUpper: string }
    {
        return {
            href: `${lang === `sk` ? `en` : ``}/#${new VueString(texts[langOther][navItemActive].title).urlTo()}`,
            nameUpper: langOther.toUpperCase()
        };
    },
    navHeight({navSlidedDown}, {touchscreen}): number
    {
        return ((60 + (Number(touchscreen) * 5)) + (300 * Number(navSlidedDown)));
    },
    programmingLanguages(state): string
    {
        const {programmingLanguages: programmingLanguagesText} = state.texts;

        const compareFn = ([, langProps]: [string, ProgrammingLanguage], [, langProps1]: [string, ProgrammingLanguage]) =>
        {
            return langProps.order - langProps1.order;
        };

        const textGet: (langs: {[s: string]: ProgrammingLanguage}) => string = (langs: { [s: string]: ProgrammingLanguage }) =>
        {
            return Object.entries(langs).sort(compareFn).map(([langName, langProps]) =>
            {
                return `${programmingLanguagesText[langName]}${langProps.children ? ` (${textGet(langProps.children)})` : ``}`;
            }).join(`, `);
        };

        return textGet(state.programmingLanguages);
    },
    texts({lang, texts}): typeof textsSrc.sk
    {
        return texts[lang] as typeof textsSrc.sk;
    },
    touchscreen({windowWidth}): boolean
    {
        return windowWidth < 1024;
    }
};

export default getters;

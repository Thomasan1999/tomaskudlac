import dayjs    from 'dayjs';
import textsSrc from '@/locales';

/** @description Birth date of Tomáš Kudláč. */
const birthDate: string = `1999-06-30T08:30:00+02:00`;

const ageGet: () => number = () =>
{
    /** @description The current timestamp. */
    const now: dayjs.Dayjs = dayjs();

    return now.diff(birthDate, `y`);
};

export default {
    /** @description The current age of Tomáš Kudláč */
    age: ageGet(),
    /**
     * @description Calculates the age of Tomáš Kudláč.
     * @returns The current age of Tomáš Kudláč.
     * */
    ageGet,
    /** @description Birth date of Tomáš Kudláč. */
    birthDate: birthDate as string,
    /** @description The format of all images dependent on browser support. */
    imageFormat: `webp` as ImageFormat,
    /** @description The active language of the website. */
    lang: `sk` as Lang,
    /** @description The name of the active nav-bar item. */
    navItemActive: `home` as MainSectionName,
    /** @description Determines whether the nav-bar is slided down on screens narrower than 1024px. */
    navSlidedDown: false as boolean,
    /** @description Stores all data about programming languages. */
    programmingLanguages: {
        css: {
            children: {
                less: {
                    order: 2
                },
                sass: {
                    order: 1
                },
                stylus: {
                    order: 0
                }
            },
            home: true,
            order: 2
        },
        html: {
            an: true,
            home: true,
            order: 1
        },
        js: {
            children: {
                nodeJs: {
                    home: true,
                    order: 2
                },
                typescript: {
                    home: true,
                    order: 1
                },
                vueJs: {
                    home: true,
                    order: 0
                }
            },
            home: true,
            order: 0
        },
        noSql: {
            children: {
                mongoDb: {
                    home: true,
                    order: 0
                },
            },
            order: 4
        },
        php: {
            home: true,
            order: 5
        },
        sql: {
            children: {
                postgreSql: {
                    home: true,
                    order: 0
                }
            },
            order: 3
        }
    } as { [s: string]: ProgrammingLanguage },
    /** @description List of all sections. */
    sections: [`home`, `portfolio`, `aboutMyself`, `contact`] as MainSectionName[],
    /** @description Locales for all supported languages. */
    texts: textsSrc as typeof textsSrc,
    /** @description Window height in pixels. */
    windowHeight: window.innerHeight as number,
    /** @description Window width in pixels. */
    windowWidth: window.innerWidth as number
};

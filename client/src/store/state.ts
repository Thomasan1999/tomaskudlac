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
    navItemActive: `home` as SectionMainName,
    /** @description Determines whether the nav-bar is slided down on mobile devices. */
    navSlidedDown: false as boolean,
    /** @description Stores all data about programming languages. */
    programmingLanguages: {
        css: {
            children: {
                bootstrap: {
                    order: 3
                },
                less: {
                    order: 0
                },
                sass: {
                    order: 1
                },
                stylus: {
                    order: 2
                }
            },
            home: true,
            order: 1
        },
        html: {
            an: true,
            home: true,
            order: 0
        },
        js: {
            children: {
                babylonJs: {
                    home: true,
                    order: 3
                },
                jQuery: {
                    home: true,
                    order: 4
                },
                nodeJs: {
                    home: true,
                    order: 1
                },
                typescript: {
                    home: true,
                    order: 0
                },
                vueJs: {
                    home: true,
                    order: 2
                }
            },
            home: true,
            order: 2
        },
        noSql: {
            children: {
                mongoDb: {
                    home: true,
                    order: 3
                }
            },
            order: 5
        },
        php: {
            home: true,
            order: 3
        },
        sql: {
            children: {
                mySql: {
                    home: true,
                    order: 0
                },
                postgreSql: {
                    home: true,
                    order: 1
                }
            },
            order: 4
        }
    } as { [s: string]: ProgrammingLanguage },
    /** @description List of all sections. */
    sections: [`home`, `portfolio`, `aboutMyself`, `contact`] as SectionMainName[],
    /** @description Locales for all supported languages. */
    texts: textsSrc as typeof textsSrc,
    /** @description Window height in pixels. */
    windowHeight: window.innerHeight as number,
    /** @description Window width in pixels. */
    windowWidth: window.innerWidth as number
};

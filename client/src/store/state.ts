import dayjs    from 'dayjs';
import textsSrc from '@/locales';

const birthDate: string = `1999-06-30T08:30:00+02:00`;

const ageGet: () => number = () =>
{
    // @ts-ignore
    const now: dayjs.Dayjs = dayjs();

    return now.diff(birthDate, `y`);
};

export default {
    age: ageGet(),
    ageGet,
    birthDate: birthDate as string,
    imageFormat: `webp` as ImageFormat,
    lang: `sk` as Lang,
    navItemActive: `home` as SectionMainName,
    navSlidedDown: false as boolean,
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
    } as {[s: string]: ProgrammingLanguage},
    sections: [`home`, `portfolio`, `aboutMyself`, `contact`] as SectionMainName[],
    texts: textsSrc as typeof textsSrc,
    windowHeight: window.innerHeight as number,
    windowWidth: window.innerWidth as number
};

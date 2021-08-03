import {reactive} from 'vue';
import {DeepReadonly} from 'ts-essentials';
import skLocales from '@/locales/sk';
import enLocales from '@/locales/en';
import {ImageFormat, SiteLanguage} from '@/store/types';
import {ProgrammingLanguage} from '@/store/ProgrammingLanguage';
import dayjs from 'dayjs';

/**
 * Global store of the application. Vuex is not used because it requires manual typing and its usage with TypeScript
 * is more complicated than using a simple reactive object with Vue 3 'reactive' helper. If a next version of Vuex will
 * provide better support for TS, it might be exchanged for this custom store object.
 * */
class Store
{
    /** The scrolled page section. */
    activeSection?: string;
    /** The current age of Tomáš Kudláč. */
    age = null as any as number;
    /** The preferred image format of images. */
    imageFormat: ImageFormat = 'webp';

    get initialized(): boolean
    {
        return this.initState === 'initialized';
    }

    private initState: '' | 'initializing' | 'initialized' = '';

    get isTouchscreen()
    {
        return this.windowWidth < 1024;
    }

    language: SiteLanguage = 'sk';
    locales: typeof skLocales | typeof enLocales = null as any;
    navbarHeight = 60;
    readonly programmingLanguages: DeepReadonly<ProgrammingLanguage[]> = [
        {
            children: [
                {
                    home: true,
                    title: 'Vue.js'
                },
                {
                    home: true,
                    title: 'TypeScript'
                },
                {
                    home: true,
                    title: 'Node.js'
                }
            ],
            home: true,
            title: 'JS'
        },
        {
            an: true,
            home: true,
            title: 'HTML'
        },
        {
            children: [
                {
                    title: 'Stylus'
                },
                {
                    title: 'SCSS'
                },
                {
                    title: 'Less'
                }
            ],
            home: true,
            title: 'CSS'
        },
        {
            children: [
                {
                    home: true,
                    title: 'PostgreSQL'
                }
            ],
            title: 'SQL'
        },
        {
            children: [
                {
                    home: true,
                    title: 'MongoDB'
                }
            ],
            title: 'NoSQL'
        },
        {
            home: true,
            title: 'PHP'
        }
    ].map((language) => new ProgrammingLanguage(language));

    /** List of programming languages joined by commas. */
    get programmingLanguagesString()
    {
        return this.programmingLanguages
            .map((language) => language.toString())
            .join(', ');
    }

    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    /** Initializes the store. Must be ran before the app is mounted. Must be ran only once. */
    async init(): Promise<void>
    {
        if (this.initState)
        {
            return;
        }

        this.initState = 'initializing';

        this.initListeners();
        this.updateAge();
        await this.initImageFormat();

        this.initState = 'initialized';
    }

    /** Determines the preferred image format of all images. Checks if WebP is supported, if not, JPEG is used. */
    async getImageFormat(): Promise<ImageFormat>
    {
        return new Promise((resolve) =>
        {
            const webP = new Image();
            webP.onload = webP.onerror = function ()
            {
                resolve(webP.height === 2 ? 'webp' : 'jpg');
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    /** Initializes the function which checks for the preferred image format. */
    private async initImageFormat(): Promise<void>
    {
        let imageFormat = localStorage.getItem('imageFormat') as ImageFormat | null;

        if (!imageFormat)
        {
            imageFormat = await this.getImageFormat();
            localStorage.setItem('imageFormat', imageFormat);
        }

        this.imageFormat = imageFormat;
    }

    /** Initializes global event listeners. */
    private initListeners(): void
    {
        this.onWindowResize = this.onWindowResize.bind(this);

        window.addEventListener('resize', this.onWindowResize);
    }

    private onWindowResize(): void
    {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
    };

    /** Updates the current age. Fired on store initialization and birthday. */
    private updateAge(): void
    {
        /** @description Birth date of Tomáš Kudláč. */
        const birthDate: string = '1999-06-30T08:30:00+02:00';

        /** @description The current timestamp. */
        const now: dayjs.Dayjs = dayjs();

        this.age = now.diff(birthDate, 'y');

        const nextYear = now.year() + 1;

        const nextBirthday = dayjs(birthDate).year(nextYear);

        const timeUntilNextBirthday = nextBirthday.diff(now);

        setTimeout(() =>
        {
            this.updateAge();
        }, timeUntilNextBirthday);
    }
}

const store = reactive(new Store());

export default store;

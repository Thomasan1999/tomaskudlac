import skLocales from '@/locales/sk';
import enLocales from '@/locales/en';
import { ImageFormat, InitializingState, SiteLanguage, ToastData } from '@/store/types';
import { ProgrammingLanguage } from '@/store/ProgrammingLanguage';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

/** Global store of the application. */
const useStore = defineStore('main', {
    actions: {
        /** Initializes the store. Must be run before the app is mounted. Must be run only once. */
        async init(): Promise<void> {
            if (this.initState !== InitializingState.NOT_INITIALIZED) {
                return;
            }

            this.initState = InitializingState.INITIALIZING;

            await this.initListeners();
            await this.updateAge();
            await this.initImageFormat();

            this.initState = InitializingState.INITIALIZED;
        },
        addToast(toast: ToastData): void {
            this.toasts.push(toast);
        },
        /** Determines the preferred image format of all images. Checks if WebP is supported, if not, JPEG is used. */
        async getImageFormat(): Promise<ImageFormat> {
            return new Promise((resolve) => {
                const webP = new Image();
                webP.onload = webP.onerror = function () {
                    resolve(webP.height === 2 ? ImageFormat.WEBP : ImageFormat.JPG);
                };
                webP.src =
                    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            });
        },
        /** Initializes the function which checks for the preferred image format. */
        async initImageFormat(): Promise<void> {
            let imageFormat = localStorage.getItem('imageFormat') as ImageFormat | null;

            if (!imageFormat) {
                imageFormat = await this.getImageFormat();
                localStorage.setItem('imageFormat', imageFormat);
            }

            this.imageFormat = imageFormat;
        },
        /** Initializes global event listeners. */
        async initListeners(): Promise<void> {
            this.onWindowResize = this.onWindowResize.bind(this);

            window.addEventListener('resize', this.onWindowResize);
        },
        removeToast(toastIndex: number): void {
            this.toasts.splice(toastIndex, 1);
        },
        async onWindowResize(): Promise<void> {
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
        },
        /** Updates the current age. Fired on store initialization and birthday. */
        async updateAge(): Promise<void> {
            /** @description Birth date of Tomáš Kudláč. */
            const birthDate: string = '1999-06-30T08:30:00+02:00';

            /** @description The current timestamp. */
            const now: dayjs.Dayjs = dayjs();

            this.age = now.diff(birthDate, 'y');

            const nextBirthday = dayjs(birthDate).add(this.age + 1, 'y');

            const timeUntilNextBirthday = nextBirthday.diff(now);

            // prevent using higher value than allowed by Node.js
            if (timeUntilNextBirthday > 2 ** 32) {
                return;
            }

            setTimeout(() => {
                this.updateAge();
            }, timeUntilNextBirthday);
        },
    },
    getters: {
        initialized(): boolean {
            return this.initState === InitializingState.INITIALIZED;
        },
        isTouchscreen(): boolean {
            return this.windowWidth < 1024;
        },
        /** List of programming languages joined by commas. */
        programmingLanguagesString(): string {
            return this.programmingLanguages.map((language) => language.toString()).join(', ');
        },
    },
    state() {
        return {
            /** The scrolled page section. */
            activeSection: undefined as string | undefined,
            /** The current age of Tomáš Kudláč. */
            age: null as unknown as number,
            /** The preferred image format of images. */
            imageFormat: ImageFormat.WEBP,
            initState: InitializingState.NOT_INITIALIZED,
            language: 'sk' as SiteLanguage,
            locales: null as unknown as typeof skLocales | typeof enLocales,
            navbarHeight: 60,
            programmingLanguages: [
                {
                    children: [
                        {
                            home: true,
                            title: 'Vue.js',
                        },
                        {
                            home: true,
                            title: 'TypeScript',
                        },
                        {
                            home: true,
                            title: 'Node.js',
                        },
                    ],
                    home: true,
                    title: 'JS',
                },
                {
                    an: true,
                    home: true,
                    title: 'HTML',
                },
                {
                    children: [
                        {
                            title: 'Stylus',
                        },
                        {
                            title: 'SCSS',
                        },
                        {
                            title: 'Less',
                        },
                    ],
                    home: true,
                    title: 'CSS',
                },
                {
                    children: [
                        {
                            home: true,
                            title: 'PostgreSQL',
                        },
                    ],
                    title: 'SQL',
                },
                {
                    children: [
                        {
                            home: true,
                            title: 'MongoDB',
                        },
                    ],
                    title: 'NoSQL',
                },
                {
                    home: true,
                    title: 'PHP',
                },
            ].map((language) => new ProgrammingLanguage(language)) as ProgrammingLanguage[],
            scrollbarWidth: window.innerWidth > 1023 ? 17 : 0,
            toasts: [] as ToastData[],
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        };
    },
});

export default useStore;

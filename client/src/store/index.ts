import skLocales from '@/locales/sk';
import enLocales from '@/locales/en';
import { ImageFormat, InitializingState, SiteLanguage, ToastData } from '@/store/types';
import { ProgrammingLanguage } from '@/store/ProgrammingLanguage';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/** Global store of the application. */
const useStore = defineStore('main', () => {
    /** The scrolled page section. */
    const activeSection = ref<string | undefined>(undefined);
    /** The current age of Tomáš Kudláč. */
    const age = ref<number>(null as unknown as number);
    /** The preferred image format of images. */
    const imageFormat = ref(ImageFormat.WEBP);
    const initState = ref(InitializingState.NOT_INITIALIZED);
    const language = ref(SiteLanguage.SK);
    const locales = ref(null as unknown as typeof skLocales | typeof enLocales);
    const navbarHeight = ref(60);
    const programmingLanguages = ref<ProgrammingLanguage[]>(
        [
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
        ].map((language) => new ProgrammingLanguage(language)),
    );
    const scrollbarWidth = ref(window.innerWidth > 1023 ? 17 : 0);
    const toasts = ref<ToastData[]>([]);
    const windowHeight = ref(window.innerHeight);
    const windowWidth = ref(window.innerWidth);

    const isTouchscreen = computed<boolean>(() => {
        return windowWidth.value < 1024;
    });

    /** List of programming languages joined by commas. */
    const programmingLanguagesString = computed<string>(() => {
        return programmingLanguages.value.map((language) => language.toString()).join(', ');
    });

    /** Determines the preferred image format of all images. Checks if WebP is supported, if not, JPEG is used. */
    const getImageFormat = async (): Promise<ImageFormat> => {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = function () {
                resolve(webP.height === 2 ? ImageFormat.WEBP : ImageFormat.JPG);
            };
            webP.src =
                'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    };

    /** Initializes the function which checks for the preferred image format. */
    const initImageFormat = async (): Promise<void> => {
        let format = localStorage.getItem('imageFormat') as ImageFormat | null;

        if (!format) {
            format = await getImageFormat();
            localStorage.setItem('imageFormat', format);
        }

        imageFormat.value = format;
    };

    const onWindowResize = async (): Promise<void> => {
        windowHeight.value = window.innerHeight;
        windowWidth.value = window.innerWidth;
    };

    /** Initializes global event listeners. */
    const initListeners = async (): Promise<void> => {
        window.addEventListener('resize', onWindowResize);
    };

    /** Updates the current age. Fired on store initialization and birthday. */
    const updateAge = async (): Promise<void> => {
        /** Birth date of Tomáš Kudláč. */
        const birthDate: string = '1999-06-30T08:30:00+02:00';

        /** The current timestamp. */
        const now: dayjs.Dayjs = dayjs();

        age.value = now.diff(birthDate, 'y');

        const nextBirthday = dayjs(birthDate).add(age.value + 1, 'y');

        const timeUntilNextBirthday = nextBirthday.diff(now);

        // prevent using higher value than allowed by Node.js
        if (timeUntilNextBirthday > 2 ** 32) {
            return;
        }

        setTimeout(() => {
            updateAge();
        }, timeUntilNextBirthday);
    };

    /** Initializes the store. Must be run before the app is mounted. Must be run only once. */
    const init = async (): Promise<void> => {
        if (initState.value !== InitializingState.NOT_INITIALIZED) {
            return;
        }

        initState.value = InitializingState.INITIALIZING;

        await initListeners();
        await updateAge();
        await initImageFormat();

        initState.value = InitializingState.INITIALIZED;
    };

    const addToast = (toast: ToastData): void => {
        toasts.value.push(toast);
    };

    const removeToast = (toastIndex: number): void => {
        toasts.value.splice(toastIndex, 1);
    };

    return {
        activeSection,
        addToast,
        age,
        imageFormat,
        init,
        isTouchscreen,
        language,
        locales,
        navbarHeight,
        programmingLanguages,
        programmingLanguagesString,
        removeToast,
        scrollbarWidth,
        toasts,
        windowHeight,
        windowWidth,
    };
});

export default useStore;

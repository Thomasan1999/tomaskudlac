import { Locales } from '@/locales/types';
import { ImageFormat, InitializingState, SiteLanguage, Toast, ToastData } from '@/store/types';
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
    const locales = ref<Locales>(null as unknown as Locales);
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
    /** Source of toast ids. Only ever incremented, so an id is never reused within a session. */
    const lastToastId = ref(0);
    const toasts = ref<Toast[]>([]);
    const windowHeight = ref(window.innerHeight);
    const windowWidth = ref(window.innerWidth);

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
        const IMAGE_FORMAT_KEY = 'imageFormat';
        let format = localStorage.getItem(IMAGE_FORMAT_KEY) as ImageFormat | null;

        if (!format) {
            format = await getImageFormat();
            localStorage.setItem(IMAGE_FORMAT_KEY, format);
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

        /**
         * Delays above this overflow the 32-bit signed integer `setTimeout` stores them in, which makes the timer
         * fire immediately. Clamping instead of skipping keeps the age updating: every wake-up recomputes the
         * remaining time, so the timer re-arms until it finally lands on the birthday.
         */
        const MAX_TIMEOUT_DELAY = 2 ** 31 - 1;

        setTimeout(updateAge, Math.min(Math.max(timeUntilNextBirthday, 0), MAX_TIMEOUT_DELAY));
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
        lastToastId.value += 1;

        toasts.value.push({ ...toast, id: lastToastId.value });
    };

    const removeToast = (toastId: number): void => {
        toasts.value = toasts.value.filter((toast) => toast.id !== toastId);
    };

    const maxLg = computed<boolean>(() => {
        return windowWidth.value < 1024;
    });

    const maxXl = computed<boolean>(() => {
        return windowWidth.value < 1280;
    });

    /** List of programming languages joined by commas. */
    const programmingLanguagesString = computed<string>(() => {
        return programmingLanguages.value.map((language) => language.toString()).join(', ');
    });

    return {
        activeSection,
        addToast,
        age,
        imageFormat,
        language,
        locales,
        init,
        initState,
        maxLg,
        maxXl,
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

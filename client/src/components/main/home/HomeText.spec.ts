import mockInitStore from '@/mocks/mockInitStore';
import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import HomeText from '@/components/main/home/HomeText.vue';
import useStore from '@/store';
import { ProgrammingLanguage } from '@/store/ProgrammingLanguage';
import { SiteLanguage } from '@/store/types';
import _ from 'lodash';
import { ExistingDomWrapper } from '@/types/tests';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import { MockInstance } from 'vitest';
import HomeTextCursor from '@/components/main/home/HomeTextCursor.vue';
import router from '@/router';

const LOCALES_SELECTOR = getTestingSelector('locales');
const MARKED_TEXT_SELECTOR = getTestingSelector('marked-text');
const NON_MARKED_TEXT_SELECTOR = getTestingSelector('non-marked-text');
const PROGRAMMING_LANGUAGE_SELECTOR = getTestingSelector('programming-language');

const shuffleSpy = (vi.spyOn(_, 'shuffle') as MockInstance).mockImplementation((value) => value);

const createWrapper = buildCreateWrapper(HomeText, undefined, {
    global: {
        plugins: [router],
    },
});

beforeAll(() => {
    document.head.innerHTML += '<link rel="manifest">';
});

describe('HomeText', () => {
    const languageTitle = 'HTML';
    const languageTitleWithPrefix = 'n HTML';

    const timeout = window.setTimeout;

    async function changeStoreLanguage(store: ReturnType<typeof useStore>, value: SiteLanguage): Promise<void> {
        await router.push({ name: value });
        store.language = value;
        store.locales = (await import(`@/locales/${store.language}.ts`)).default;
    }

    beforeAll(async () => {
        vi.useFakeTimers();

        const setTimeout = window.setTimeout;

        window.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        } as never;

        await mockInitStore();
    });

    beforeEach(async () => {
        const store = useStore();

        store.programmingLanguages = [
            new ProgrammingLanguage({
                an: true,
                home: true,
                title: languageTitle,
            }),
            new ProgrammingLanguage({
                home: true,
                title: languageTitle,
            }),
        ];

        await changeStoreLanguage(store, SiteLanguage.SK);

        await nextTick();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.clearAllTimers();
    });

    afterAll(() => {
        window.setTimeout = timeout;
    });

    function getMarkedTextElement(wrapper: VueWrapper): Omit<DOMWrapper<HTMLDivElement>, 'exists'> {
        return wrapper.get<HTMLDivElement>(MARKED_TEXT_SELECTOR);
    }

    function getNonMarkedTextElement(wrapper: VueWrapper): Omit<DOMWrapper<HTMLDivElement>, 'exists'> {
        return wrapper.get<HTMLDivElement>(NON_MARKED_TEXT_SELECTOR);
    }

    async function awaitLanguageMarkingStart(markedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void> {
        while (!markedTextElement.text()) {
            vi.runOnlyPendingTimers();
            await nextTick();
        }
    }

    async function awaitTextRemovingStart(markedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void> {
        while (markedTextElement.text()) {
            vi.runOnlyPendingTimers();
            await nextTick();
        }
    }

    async function awaitNewLanguageWritingStart(
        nonMarkedTextElement: ExistingDomWrapper<HTMLDivElement>,
    ): Promise<void> {
        while (!nonMarkedTextElement.text()) {
            vi.runOnlyPendingTimers();
            await nextTick();
        }
    }

    async function awaitNewLanguageWritingEnd(nonMarkedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void> {
        await awaitNewLanguageWritingStart(nonMarkedTextElement);

        while (nonMarkedTextElement.text() !== languageTitle) {
            vi.runOnlyPendingTimers();
            await nextTick();
        }
    }

    describe('structure', () => {
        it('displays correct structure', () => {
            const wrapper = createWrapper();

            expect(wrapper.find(LOCALES_SELECTOR).exists()).toBe(true);
            expect(wrapper.find(NON_MARKED_TEXT_SELECTOR).exists()).toBe(true);
            expect(wrapper.find(MARKED_TEXT_SELECTOR).exists()).toBe(true);
            expect(wrapper.findComponent(HomeTextCursor).exists()).toBe(true);
        });
    });

    describe('site language change', () => {
        it("instantly toggles 'an' prefix", async () => {
            function expectLanguageToBePrefixed(languageElement: ExistingDomWrapper<Element>, value: boolean): void {
                if (value) {
                    expect(languageElement.text()).toContain(languageTitleWithPrefix);
                } else {
                    expect(languageElement.text()).not.toContain(languageTitleWithPrefix);
                    expect(languageElement.text()).toContain(languageTitle);
                }
            }

            const store = useStore();

            const wrapper = createWrapper();

            const languageElement = wrapper.get(PROGRAMMING_LANGUAGE_SELECTOR);

            expectLanguageToBePrefixed(languageElement, false);

            await changeStoreLanguage(store, SiteLanguage.EN);

            await nextTick();

            expectLanguageToBePrefixed(languageElement, true);

            await changeStoreLanguage(store, SiteLanguage.SK);

            await nextTick();

            expectLanguageToBePrefixed(languageElement, false);
        });
    });

    describe('programming language change', () => {
        it('shuffles list of all programming languages', () => {
            expect(shuffleSpy).not.toHaveBeenCalled();

            createWrapper();

            expect(shuffleSpy).toHaveBeenCalledTimes(1);
        });

        it('starts with marking language, removing and then writing new language', async () => {
            const wrapper = createWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);
            const nonMarkedTextElement = getNonMarkedTextElement(wrapper);

            expect(markedTextElement.text()).toBeFalsy();
            expect(nonMarkedTextElement.text()).toBeTruthy();

            await awaitLanguageMarkingStart(markedTextElement);

            expect(markedTextElement.text()).toBeTruthy();
            expect(nonMarkedTextElement.text()).toBeTruthy();

            await awaitTextRemovingStart(markedTextElement);

            expect(markedTextElement.text()).toBeFalsy();
            expect(nonMarkedTextElement.text()).toBeFalsy();

            await awaitNewLanguageWritingEnd(nonMarkedTextElement);

            expect(nonMarkedTextElement.text()).toBe(languageTitle);
            expect(markedTextElement.text()).toBeFalsy();
        });
    });

    describe('cursor', () => {
        it('stops blinking on text removing', async () => {
            const wrapper = createWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);

            expect(wrapper.findComponent(HomeTextCursor).props('blinking')).toBe(false);
        });

        it('stops blinking on text writing', async () => {
            const wrapper = createWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);
            await awaitNewLanguageWritingStart(markedTextElement);

            expect(wrapper.findComponent(HomeTextCursor).props('blinking')).toBe(false);
        });

        it('stops blinking on text marking', async () => {
            const wrapper = createWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);

            expect(wrapper.findComponent(HomeTextCursor).props('blinking')).toBe(false);
        });

        it('starts blinking on written text idle', async () => {
            const wrapper = createWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);
            const nonMarkedTextElement = getNonMarkedTextElement(wrapper);

            expect(wrapper.findComponent(HomeTextCursor).props('blinking')).toBe(true);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);
            await awaitNewLanguageWritingEnd(nonMarkedTextElement);

            expect(wrapper.findComponent(HomeTextCursor).props('blinking')).toBe(false);
        });
    });
});

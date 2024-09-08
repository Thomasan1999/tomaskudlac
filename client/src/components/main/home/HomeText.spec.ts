import mockInitStore from '@/mocks/mockInitStore';
import { VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import HomeText from '@/components/main/home/HomeText.vue';
import useStore from '@/store';
import { ProgrammingLanguage } from '@/store/ProgrammingLanguage';
import { SiteLanguage } from '@/store/types';
import _ from 'lodash';
import { ExistingDomWrapper } from '@/types/tests';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import { MockInstance } from 'vitest';

const CURSOR_SELECTOR = getTestingSelector('cursor');
const MARKED_TEXT_SELECTOR = getTestingSelector('markedText');
const NON_MARKED_TEXT_SELECTOR = getTestingSelector('nonMarkedText');
const PROGRAMMING_LANGUAGE_SELECTOR = getTestingSelector('programmingLanguage');

const shuffleSpy = (vi.spyOn(_, 'shuffle') as MockInstance).mockImplementation((value) => value);

describe('HomeText', () => {
    const languageTitle = 'HTML';
    const languageTitleWithPrefix = 'n HTML';

    const timeout = window.setTimeout;

    async function changeStoreLanguage(store: ReturnType<typeof useStore>, value: SiteLanguage): Promise<void> {
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

    const createHomeTextWrapper = buildCreateWrapper(HomeText);

    function getMarkedTextElement(wrapper: VueWrapper) {
        return wrapper.get<HTMLDivElement>(MARKED_TEXT_SELECTOR);
    }

    function getNonMarkedTextElement(wrapper: VueWrapper) {
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

            const wrapper = createHomeTextWrapper();

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

            createHomeTextWrapper();

            expect(shuffleSpy).toHaveBeenCalledTimes(1);
        });

        it('starts with marking language, removing and then writing new language', async () => {
            const wrapper = createHomeTextWrapper();

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
        function getCursorElement(wrapper: VueWrapper) {
            return wrapper.get<HTMLSpanElement>(CURSOR_SELECTOR);
        }

        it('stops blinking on text removing', async () => {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });

        it('stops blinking on text writing', async () => {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);
            await awaitNewLanguageWritingStart(markedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });

        it('stops blinking on text marking', async () => {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });

        it('starts blinking on written text idle', async () => {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);
            const nonMarkedTextElement = getNonMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            expect(cursorElement.classes()).toContain('blinking');

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);
            await awaitNewLanguageWritingEnd(nonMarkedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });
    });
});

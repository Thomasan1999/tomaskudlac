import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import {mount, VueWrapper} from '@vue/test-utils';
import {nextTick} from 'vue';
import HomeText from '@/components/main/home/HomeText.vue';
import useStore from '@/store';
import {ProgrammingLanguage} from '@/store/ProgrammingLanguage';
import {SiteLanguage} from '@/store/types';
import _ from 'lodash';
import {ExistingDomWrapper} from '@/types/tests';

jest.resetModules();

jest.mock('lodash', () =>
{
    return {
        shuffle(value)
        {
            return value;
        }
    };
});

describe('HomeText', () =>
{
    let pinia: Pinia;

    let currentLanguageIndex: number;

    const languageTitle = 'HTML';
    const languageTitleWithPrefix = 'n HTML';

    const timeout = window.setTimeout;

    async function changeStoreLanguage(store: ReturnType<typeof useStore>, value: SiteLanguage): Promise<void>
    {
        store.language = value;
        store.locales = (await import(`@/locales/${store.language}.ts`)).default;
    }

    beforeAll(async () =>
    {
        jest.useFakeTimers();

        const setTimeout = window.setTimeout;

        // @ts-ignore
        window.setTimeout = function (callback, timeout)
        {
            if (callback.name === 'changeProgrammingLanguage')
            {
                currentLanguageIndex += 1;
            }

            setTimeout(callback, timeout);
        };

        pinia = await mockInitStore();
    });

    beforeEach(async () =>
    {
        currentLanguageIndex = -1;

        const store = useStore();

        store.programmingLanguages = [
            new ProgrammingLanguage({
                an: true,
                home: true,
                title: languageTitle
            }),
            new ProgrammingLanguage({
                home: true,
                title: languageTitle
            })
        ];

        await changeStoreLanguage(store, 'sk');

        await nextTick();
    });

    afterAll(() =>
    {
        window.setTimeout = timeout;
    });

    function createHomeTextWrapper(): VueWrapper
    {
        return mount(HomeText, {
            global: {
                plugins: [pinia]
            }
        });
    }

    function getMarkedTextElement(wrapper: VueWrapper)
    {
        return wrapper.get<HTMLDivElement>('[data-testid="markedText"]');
    }

    function getNonMarkedTextElement(wrapper: VueWrapper)
    {
        return wrapper.get<HTMLDivElement>('[data-testid="nonMarkedText"]');
    }

    async function awaitLanguageMarkingStart(markedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void>
    {
        while (!markedTextElement.text())
        {
            jest.runOnlyPendingTimers();
            await nextTick();
        }
    }

    async function awaitTextRemovingStart(markedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void>
    {
        while (markedTextElement.text())
        {
            jest.runOnlyPendingTimers();
            await nextTick();
        }
    }

    async function awaitNewLanguageWritingStart(nonMarkedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void>
    {
        while (!nonMarkedTextElement.text())
        {
            jest.runOnlyPendingTimers();
            await nextTick();
        }
    }

    async function awaitNewLanguageWritingEnd(nonMarkedTextElement: ExistingDomWrapper<HTMLDivElement>): Promise<void>
    {
        await awaitNewLanguageWritingStart(nonMarkedTextElement);

        while (nonMarkedTextElement.text() !== languageTitle)
        {
            jest.runOnlyPendingTimers();
            await nextTick();
        }
    }

    describe('site language change', () =>
    {
        it('instantly toggles \'an\' prefix', async () =>
        {
            function expectLanguageToBePrefixed(languageElement: ExistingDomWrapper<Element>, value: boolean): void
            {
                if (value)
                {
                    expect(languageElement.text()).toContain(languageTitleWithPrefix);
                }
                else
                {
                    expect(languageElement.text()).not.toContain(languageTitleWithPrefix);
                    expect(languageElement.text()).toContain(languageTitle);
                }
            }

            const store = useStore();

            const wrapper = createHomeTextWrapper();

            const languageElement = wrapper.get('[data-testid="programmingLanguage"]');

            expectLanguageToBePrefixed(languageElement, false);

            await changeStoreLanguage(store, 'en');

            await nextTick();

            expectLanguageToBePrefixed(languageElement, true);

            await changeStoreLanguage(store, 'sk');

            await nextTick();

            expectLanguageToBePrefixed(languageElement, false);
        });
    });

    describe('programming language change', () =>
    {
        it('shuffles list of all programming languages', () =>
        {
            const shuffleSpy = jest.spyOn(_, 'shuffle');

            expect(shuffleSpy).not.toHaveBeenCalled();

            createHomeTextWrapper();

            expect(shuffleSpy).toHaveBeenCalledTimes(1);
        });

        it('starts with marking language, removing and then writing new language', async () =>
        {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);
            const nonMarkedTextElement = getNonMarkedTextElement(wrapper);

            expect(markedTextElement.text()).toBeFalsy();
            expect(nonMarkedTextElement.text()).toBeTruthy();

            await awaitLanguageMarkingStart(markedTextElement);

            expect(markedTextElement.text()).toBeTruthy();
            expect(nonMarkedTextElement.text()).toBeFalsy();

            await awaitTextRemovingStart(markedTextElement);

            expect(markedTextElement.text()).toBeFalsy();
            expect(nonMarkedTextElement.text()).toBeFalsy();

            await awaitNewLanguageWritingEnd(nonMarkedTextElement);

            expect(nonMarkedTextElement.text()).toBe(languageTitle);
            expect(markedTextElement.text()).toBeFalsy();
        });
    });

    describe('cursor', () =>
    {
        function getCursorElement(wrapper: VueWrapper)
        {
            return wrapper.get<HTMLSpanElement>('[data-testid="cursor"]');
        }

        it('stops blinking on text removing', async () =>
        {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });

        it('stops blinking on text writing', async () =>
        {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);
            await awaitTextRemovingStart(markedTextElement);
            await awaitNewLanguageWritingStart(markedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });

        it('stops blinking on text marking', async () =>
        {
            const wrapper = createHomeTextWrapper();

            const markedTextElement = getMarkedTextElement(wrapper);

            const cursorElement = getCursorElement(wrapper);

            await awaitLanguageMarkingStart(markedTextElement);

            expect(cursorElement.classes()).not.toContain('blinking');
        });

        it('starts blinking on written text idle', async () =>
        {
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

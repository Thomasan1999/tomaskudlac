<template>
    <p class="home-text">
        <span>{{ locales.welcome }}</span>
        <span class="home-programming-language" data-testid="programmingLanguage">
            <span class="home-programming-language-non-marked" data-testid="nonMarkedText">
                <HomeTextProgrammingLanguage :programmingLanguage="nonMarkedText"/>
            </span>
            <mark class="home-programming-language-marked" data-testid="markedText">
                <HomeTextProgrammingLanguage :programmingLanguage="markedText"/>
            </mark>
        </span>
        <span class="home-text-cursor" :class="{blinking: cursorIsBlinking}" data-testid="cursor"/>
        <span>{{ ' ' }}</span>
        <span>{{ locales.developer }}.</span>
    </p>
</template>

<script lang="ts" setup>
    import {computed, ref, watch} from 'vue';
    import useStore from '@/store';
    import {shuffle} from 'lodash';
    import {DeepReadonly} from 'ts-essentials';
    import Rand from '@/utils/Rand';
    import sleep from '@/utils/sleep';
    import HomeTextProgrammingLanguage from '@/components/main/home/HomeTextProgrammingLanguage.vue';
    import {ProgrammingLanguage} from '@/store/ProgrammingLanguage';
    import {SiteLanguage} from '@/store/types';

    const store = useStore();

    const baseInterval = 50;

    const changeProgrammingLanguage = async () =>
    {
        setCursorBlinking(false);

        await markProgrammingLanguage();

        clearMarkedText();

        await sleep(800);

        await writeNextProgrammingLanguage();

        setCursorBlinking(true);

        setTimeout(changeProgrammingLanguage, Rand.int({min: 3000, max: 5000}));
    };

    const clearMarkedText = () =>
    {
        markedText.value = '';
    };

    function* createProgrammingLanguageGenerator()
    {
        let counter = -1;

        while (true)
        {
            counter++;
            yield shuffledProgrammingLanguages.value[counter % (shuffledProgrammingLanguages.value.length)];
        }
    }

    const flattenProgrammingLanguage = (programmingLanguage: ProgrammingLanguage) =>
    {
        if (!programmingLanguage.children)
        {
            return programmingLanguage;
        }

        return [
            programmingLanguage,
            ...programmingLanguage.children.map(flattenProgrammingLanguage) as ProgrammingLanguage[]
        ].flat();
    };

    const generateNextProgrammingLanguage = () =>
    {
        currentProgrammingLanguage.value = nextProgrammingLanguage.value;

        nextProgrammingLanguage.value = programmingLanguageGenerator.next().value!;
    };

    const getNonMarkedText = (programmingLanguage: ProgrammingLanguage) =>
    {
        const prefix = languageHasAnPrefix(programmingLanguage) ? 'n ' : ' ';

        return `${prefix}${programmingLanguage.title}`;
    };

    const languageHasAnPrefix = (programmingLanguage: ProgrammingLanguage) => (
        programmingLanguage.an && store.language === SiteLanguage.EN
    );

    const markProgrammingLanguage = async () =>
    {
        const markCharTimeout = baseInterval;

        return new Promise<void>((resolve) =>
        {
            const markChar = () =>
            {
                const timeout = markCharTimeout + Rand.int({min: 0, max: markCharTimeout * .2});

                const languageIsMarked = nonMarkedText.value.length === nonMarkedTextNonRemovable.value.length;

                if (languageIsMarked)
                {
                    window.setTimeout(() =>
                    {
                        resolve();
                    }, timeout);
                    return;
                }

                const nextMarkedChar = nonMarkedText.value[nonMarkedText.value.length - 1];

                nonMarkedText.value = nonMarkedText.value.slice(0, -1);
                markedText.value = `${nextMarkedChar}${markedText.value}`;

                window.setTimeout(() =>
                {
                    markChar();
                }, timeout);
            };

            markChar();
        });
    };

    const addAnPrefix = (text: string) => `n${text}`;

    const removeAnPrefix = (text: string) => text.replace(/^n$|^n /, ' ');

    const setCursorBlinking = (value: boolean) =>
    {
        cursorIsBlinking.value = value;
    };

    const writeNextProgrammingLanguage = async () =>
    {
        const writeCharTimeout = baseInterval * 1.8;

        generateNextProgrammingLanguage();

        const currentLanguageTitle = computed(() => getNonMarkedText(currentProgrammingLanguage.value));

        return new Promise<void>((resolve) =>
        {
            const writeChar = () =>
            {
                const languageIsWritten = nonMarkedText.value.length === currentLanguageTitle.value.length;

                if (languageIsWritten)
                {
                    return resolve();
                }

                const timeout = writeCharTimeout + Rand.int({min: 0, max: writeCharTimeout * .2});

                nonMarkedText.value = currentLanguageTitle.value.slice(0, nonMarkedText.value.length + 1);

                setTimeout(() =>
                {
                    writeChar();
                }, timeout);
            };

            writeChar();
        });
    };

    const cursorIsBlinking = ref(true);

    const markedText = ref('');

    const flattenedProgrammingLanguages = computed<DeepReadonly<ProgrammingLanguage[]>>(() =>
        programmingLanguages
            .value
            .flatMap(flattenProgrammingLanguage)
            .filter((programmingLanguage) => programmingLanguage.home)
    );

    const programmingLanguages = computed(() => store.programmingLanguages);

    const shuffledProgrammingLanguages = computed(() => (
        shuffle(flattenedProgrammingLanguages.value) as ProgrammingLanguage[]
    ));

    const programmingLanguageGenerator = createProgrammingLanguageGenerator();

    const currentProgrammingLanguage = ref(programmingLanguageGenerator.next().value!);

    const nextProgrammingLanguage = ref(programmingLanguageGenerator.next().value!);

    const nonMarkedText = ref(getNonMarkedText(currentProgrammingLanguage.value));

    const locales = computed(() => store.locales.sections.home);

    const nonMarkedTextNonRemovable = computed(() =>
    {
        const currentAn = languageHasAnPrefix(currentProgrammingLanguage.value);
        const nextAn = languageHasAnPrefix(nextProgrammingLanguage.value);

        if (!currentAn && nextAn)
        {
            return '';
        }

        if (currentAn && nextAn)
        {
            return 'n ';
        }

        if (currentAn && !nextAn)
        {
            return '';
        }

        return ' ';
    });

    setTimeout(changeProgrammingLanguage, Rand.int({min: 3000, max: 5000}));

    watch(() => store.language, () =>
    {
        if (store.language === 'sk')
        {
            nonMarkedText.value = removeAnPrefix(nonMarkedText.value);
            markedText.value = removeAnPrefix(markedText.value);
        }
        else
        {
            if (languageHasAnPrefix(nextProgrammingLanguage.value))
            {
                if (nonMarkedText.value === ' ')
                {
                    nonMarkedText.value = '';
                }
            }
            else if (languageHasAnPrefix(currentProgrammingLanguage.value))
            {
                if (nonMarkedText.value)
                {
                    nonMarkedText.value = addAnPrefix(nonMarkedText.value);
                }
                else if (markedText.value)
                {
                    markedText.value = addAnPrefix(markedText.value);
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .home-text
    {
        --home-text-font-size: 70px;
        --home-text-line-height: 1.2em;

        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: var(--home-text-font-size);
        line-height: var(--home-text-line-height);
        margin-bottom: var(--navbar-height);
        position: relative;
        white-space: break-spaces;

        @media (max-width: 767px)
        {
            font-size: 9vw;
        }
    }

    .home-text-cursor
    {
        background-color: currentColor;
        display: inline-flex;
        height: var(--home-text-line-height);
        width: 2px;

        &.blinking
        {
            animation: blinking 1.06s infinite step-end;
        }

        @keyframes blinking
        {
            0%
            {
                opacity: 1;
            }

            50%
            {
                opacity: 0;
            }
        }
    }
</style>

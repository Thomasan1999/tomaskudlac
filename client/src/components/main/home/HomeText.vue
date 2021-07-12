<template lang="pug">
p.home-text
    span {{locales.welcome}}
    span.home-programming-language
        span.home-programming-language-non-marked
            home-text-programming-language(:programming-language="nonMarkedText")
        mark.home-programming-language-marked
            home-text-programming-language(:programming-language="markedText")
    span.home-text-cursor(:class="{blinking: cursorIsBlinking}")
    span {{' '}}
    span {{locales.developer}}.
</template>

<script lang="ts">
import {computed, ref, watch} from 'vue';
import store from '@/store';
import {shuffle} from 'lodash';
import {DeepReadonly} from 'ts-essentials';
import Rand from '@/utils/Rand';
import sleep from '@/utils/sleep';
import HomeTextProgrammingLanguage from '@/components/main/home/HomeTextProgrammingLanguage.vue';
import {ProgrammingLanguage} from '@/store/types';

export default {
    name: 'HomeText',
    components: {
        HomeTextProgrammingLanguage
    },
    setup()
    {
        const baseInterval = 50;

        const changeProgrammingLanguage = async () =>
        {
            setCursorBlinking(false);

            await markProgrammingLanguage();

            clearMarkedText();

            await sleep(800);

            await writeNextProgrammingLanguage();

            setCursorBlinking(true);

            setTimeout(() =>
            {
                changeProgrammingLanguage();
            }, Rand.int({min: 3000, max: 5000}));
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

        const languageHasAnPrefix = (programmingLanguage: ProgrammingLanguage) =>
        {
            return programmingLanguage.an && store.language === 'en';
        };

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

        const removeAnPrefix = (text: string) =>
        {
            return text.replace(/^n$|^n /, ' ');
        };

        const setCursorBlinking = (value: boolean) =>
        {
            cursorIsBlinking.value = value;
        };

        const writeNextProgrammingLanguage = async () =>
        {
            const writeCharTimeout = baseInterval * 1.8;

            generateNextProgrammingLanguage();

            const currentLanguageTitle = computed(() =>
            {
                return getNonMarkedText(currentProgrammingLanguage.value);
            });

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
        {
            return programmingLanguages
                .value
                .flatMap(flattenProgrammingLanguage)
                .filter((programmingLanguage) =>
                {
                    return programmingLanguage.home;
                });
        });

        const programmingLanguages = computed(() =>
        {
            return store.programmingLanguages;
        });

        const shuffledProgrammingLanguages = computed(() =>
        {
            return shuffle(flattenedProgrammingLanguages.value) as ProgrammingLanguage[];
        });

        const programmingLanguageGenerator = createProgrammingLanguageGenerator();

        const nextProgrammingLanguage = ref(programmingLanguageGenerator.next().value! as ProgrammingLanguage);

        const currentProgrammingLanguage = ref(nextProgrammingLanguage.value);

        const nonMarkedText = ref(getNonMarkedText(currentProgrammingLanguage.value));

        const locales = computed(() =>
        {
            return store.locales.sections.home;
        });

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
            } else
            {
                if (languageHasAnPrefix(nextProgrammingLanguage.value))
                {
                    if (nonMarkedText.value === ' ')
                    {
                        nonMarkedText.value = '';
                    }
                } else if (languageHasAnPrefix(currentProgrammingLanguage.value))
                {
                    if (nonMarkedText.value)
                    {
                        nonMarkedText.value = `n${nonMarkedText.value}`;
                    } else if (markedText.value)
                    {
                        markedText.value = `n${markedText.value}`;
                    }
                }
            }
        });

        return {
            currentProgrammingLanguage,
            cursorIsBlinking,
            locales,
            markedText,
            nonMarkedText
        };
    }
};
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

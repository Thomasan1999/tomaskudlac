<script lang="ts" setup>
    import { computed, ref, watch } from 'vue';
    import useStore from '@/store';
    import { shuffle } from 'lodash';
    import Rand from '@/utils/Rand';
    import sleep from '@/utils/sleep';
    import HomeTextProgrammingLanguage from '@/components/main/home/HomeTextProgrammingLanguage.vue';
    import { ProgrammingLanguage } from '@/store/ProgrammingLanguage';
    import { SiteLanguage } from '@/store/types';
    import HomeTextCursor from '@/components/main/home/HomeTextCursor.vue';

    const store = useStore();

    const baseInterval = 50;

    const changeProgrammingLanguage = async (): Promise<void> => {
        setCursorBlinking(false);

        await markProgrammingLanguage();

        clearMarkedText();

        await sleep(800);

        await writeNextProgrammingLanguage();

        setCursorBlinking(true);

        setTimeout(changeProgrammingLanguage, Rand.int({ min: 3000, max: 5000 }));
    };

    const clearMarkedText = (): void => {
        markedText.value = '';
    };

    function* createProgrammingLanguageGenerator(): Generator<ProgrammingLanguage, ProgrammingLanguage> {
        let counter = -1;

        while (true) {
            counter++;
            yield shuffledProgrammingLanguages.value[counter % shuffledProgrammingLanguages.value.length];
        }
    }

    const flattenProgrammingLanguage = (
        programmingLanguage: ProgrammingLanguage,
    ): ProgrammingLanguage | ProgrammingLanguage[] => {
        if (!programmingLanguage.children) {
            return programmingLanguage;
        }

        return [
            programmingLanguage,
            ...(programmingLanguage.children.map(flattenProgrammingLanguage) as ProgrammingLanguage[]),
        ].flat();
    };

    const generateNextProgrammingLanguage = (): void => {
        currentProgrammingLanguage.value = nextProgrammingLanguage.value;

        nextProgrammingLanguage.value = programmingLanguageGenerator.next().value!;
    };

    const getNonMarkedText = (programmingLanguage: ProgrammingLanguage): string => {
        const prefix = languageHasAnPrefix(programmingLanguage) ? 'n ' : ' ';

        return `${prefix}${programmingLanguage.title}`;
    };

    const languageHasAnPrefix = (programmingLanguage: ProgrammingLanguage): boolean =>
        programmingLanguage.an && store.language === SiteLanguage.EN;

    const markProgrammingLanguage = async (): Promise<void> => {
        const markCharTimeout = baseInterval;

        return new Promise<void>((resolve) => {
            const markChar = (): void => {
                const timeout = markCharTimeout + Rand.int({ min: 0, max: markCharTimeout * 0.2 });

                const languageIsMarked = nonMarkedText.value.length === nonMarkedTextNonRemovable.value.length;

                if (languageIsMarked) {
                    window.setTimeout(() => {
                        resolve();
                    }, timeout);
                    return;
                }

                const nextMarkedChar = nonMarkedText.value[nonMarkedText.value.length - 1];

                nonMarkedText.value = nonMarkedText.value.slice(0, -1);
                markedText.value = `${nextMarkedChar}${markedText.value}`;

                window.setTimeout(() => {
                    markChar();
                }, timeout);
            };

            markChar();
        });
    };

    const addAnPrefix = (text: string): string => `n${text}`;

    const removeAnPrefix = (text: string): string => text.replace(/^n$|^n /, ' ');

    const setCursorBlinking = (value: boolean): void => {
        cursorIsBlinking.value = value;
    };

    const writeNextProgrammingLanguage = async (): Promise<void> => {
        const writeCharTimeout = baseInterval * 1.8;

        generateNextProgrammingLanguage();

        const currentLanguageTitle = computed(() => getNonMarkedText(currentProgrammingLanguage.value));

        return new Promise<void>((resolve) => {
            const writeChar = (): void => {
                const languageIsWritten = nonMarkedText.value.length === currentLanguageTitle.value.length;

                if (languageIsWritten) {
                    return resolve();
                }

                const timeout = writeCharTimeout + Rand.int({ min: 0, max: writeCharTimeout * 0.2 });

                nonMarkedText.value = currentLanguageTitle.value.slice(0, nonMarkedText.value.length + 1);

                setTimeout(() => {
                    writeChar();
                }, timeout);
            };

            writeChar();
        });
    };

    const cursorIsBlinking = ref(true);

    const markedText = ref('');

    const flattenedProgrammingLanguages = computed<ProgrammingLanguage[]>(() =>
        programmingLanguages.value
            .flatMap(flattenProgrammingLanguage)
            .filter((programmingLanguage) => programmingLanguage.home),
    );

    const programmingLanguages = computed(() => store.programmingLanguages);

    const shuffledProgrammingLanguages = computed(
        () => shuffle(flattenedProgrammingLanguages.value) as ProgrammingLanguage[],
    );

    const programmingLanguageGenerator = createProgrammingLanguageGenerator();

    const currentProgrammingLanguage = ref(programmingLanguageGenerator.next().value);

    const nextProgrammingLanguage = ref(programmingLanguageGenerator.next().value);

    const nonMarkedText = ref(getNonMarkedText(currentProgrammingLanguage.value));

    const locales = computed(() => store.locales.sections.home);

    const nonMarkedTextNonRemovable = computed(() => {
        const currentAn = languageHasAnPrefix(currentProgrammingLanguage.value);
        const nextAn = languageHasAnPrefix(nextProgrammingLanguage.value);

        if (!currentAn && nextAn) {
            return '';
        }

        if (currentAn && nextAn) {
            return 'n ';
        }

        if (currentAn && !nextAn) {
            return '';
        }

        return ' ';
    });

    setTimeout(changeProgrammingLanguage, Rand.int({ min: 3000, max: 5000 }));

    watch(
        () => store.language,
        () => {
            if (store.language === SiteLanguage.SK) {
                nonMarkedText.value = removeAnPrefix(nonMarkedText.value);
                markedText.value = removeAnPrefix(markedText.value);
            } else {
                if (languageHasAnPrefix(nextProgrammingLanguage.value)) {
                    if (nonMarkedText.value === ' ') {
                        nonMarkedText.value = '';
                    }
                } else if (languageHasAnPrefix(currentProgrammingLanguage.value)) {
                    if (nonMarkedText.value) {
                        nonMarkedText.value = addAnPrefix(nonMarkedText.value);
                    } else if (markedText.value) {
                        markedText.value = addAnPrefix(markedText.value);
                    }
                }
            }
        },
    );
</script>

<template>
    <p
        data-testid="home-text"
        class="mb-navbar-height relative flex flex-wrap items-center leading-[1.2] whitespace-break-spaces max-md:text-[9vw] md:text-[4.375rem]"
    >
        <span>{{ locales.welcome }}</span>
        <span data-testid="programming-language">
            <span data-testid="non-marked-text">
                <HomeTextProgrammingLanguage :programmingLanguage="nonMarkedText" />
            </span>
            <mark data-testid="marked-text">
                <HomeTextProgrammingLanguage :programmingLanguage="markedText" />
            </mark>
        </span>
        <HomeTextCursor :blinking="cursorIsBlinking" />
        <span>{{ ' ' }}</span>
        <span data-testid="locales">{{ locales.developer }}.</span>
    </p>
</template>

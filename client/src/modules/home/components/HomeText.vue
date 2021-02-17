<template>
    <h1 class="home-text">
        <span class="home-text-left-part">{{ homeText[0] }}</span>
        <span class="home-text-programming-language">
            <span class="home-text-current-non-marked-programming-language"
                  v-html="htmlParse(currentProgrammingLanguage.nonMarked)"/>
            <mark class="home-text-current-marked-programming-language"
                  v-html="htmlParse(currentProgrammingLanguage.marked)"/>
            <span class="home-text-cursor" :class="{'home-text-cursor-blinking': cursorBlinking}"/>
        </span>
        <span class="home-text-right-part">{{ homeText[1] }}</span>
    </h1>
</template>

<script lang="ts">
    import {mixins}           from 'vue-class-component';
    import {Component, Watch} from 'vue-property-decorator';
    import MainMixin          from '@/mixins/Main';
    import text               from '@/locales';

    /** @description The component containing the dynamic text which is displayed in the Home section. */
    @Component({
        name: `HomeText`
    })
    export default class HomeText extends mixins(MainMixin)
    {
        /**
         *  @description Determines whether the active programming language is preceded by an 'an' article in English.
         *  @param val The active programming language template string.
         *  @returns Boolean which determines whether the active programming language is preceded by an 'an' article in English.
         *  */
        public programmingLanguageHasAnArticle(val: string): boolean
        {
            return Boolean(val.match(/^ ?n/));
        }

        /**
         * @description Parses the template string into an HTML string.
         * @param val The template string to be parsed.
         * @returns Parsed HTML string.
         * */
        public htmlParse(val: string): string
        {
            if (!this.programmingLanguageHasAnArticle(val))
            {
                return val;
            }

            return val.replace(/^n/, `<span style="font-weight: 400">n</span>`);
        }

        /** Marks the programming language displayed in the home section. */
        public currentProgrammingLanguageMark(): void
        {
            for (let index = 0; index < this.textLength; index += 1)
            {
                const baseTimeout = this.interval * index;

                const randomExtraTimeout = this.$Rand.int({min: 0, max: 50});

                const markCharTimeout = baseTimeout + randomExtraTimeout;

                setTimeout(() =>
                {
                    const {marked, nonMarked} = this.currentProgrammingLanguage;
                    const nonMarkedExceptLastChar = nonMarked.slice(0, -1);
                    const nonMarkedLastChar = nonMarked.slice(-1);

                    this.cursorBlinking = false;
                    this.currentProgrammingLanguage.marked = `${nonMarkedLastChar}${marked}`;
                    this.currentProgrammingLanguage.nonMarked = nonMarkedExceptLastChar;
                }, markCharTimeout);
            }
        }

        /** Writes the next programming language, it is used after the current programming language is removed. */
        public nextProgrammingLanguageWrite(): void
        {
            const oldTextRemovingDuration = this.interval * this.textLength;

            const timeoutForNextTextWriting = 800;

            for (let index = 0; index < this.nextText.length; index += 1)
            {
                const baseIntervalTimeout = this.interval * 1.8 * index;

                const randomExtraTimeout = this.$Rand.int({
                    min: 0,
                    max: 50
                });

                const writeCharTimeout = oldTextRemovingDuration
                    + baseIntervalTimeout
                    + timeoutForNextTextWriting
                    + randomExtraTimeout;

                setTimeout(() =>
                {
                    const {nonMarked} = this.currentProgrammingLanguage;
                    const nextChar = this.nextText[index];

                    this.currentProgrammingLanguage.nonMarked = `${nonMarked}${nextChar}`;

                    const charIsLast: boolean = index === this.nextText.length - 1;

                    if (charIsLast)
                    {
                        const nextRewriteTimeout = this.$Rand.int({min: 3000, max: 5000});

                        this.cursorBlinking = true;
                        setTimeout(this.rewriteText, nextRewriteTimeout);
                    }
                }, writeCharTimeout);
            }
        }

        /** Removes the programming language displayed in the home section. */
        public currentProgrammingLanguageRemove(): void
        {
            const unmarkTimeout = (this.textLength * this.interval) + 200;

            setTimeout(() =>
            {
                this.currentProgrammingLanguage.marked = ``;
            }, unmarkTimeout);
        }

        /**
         * @description Rewrites the home text.
         * */
        public rewriteText(): void
        {
            this.programmingLanguageCounter += 1;

            this.currentProgrammingLanguageMark();

            this.currentProgrammingLanguageRemove();

            this.nextProgrammingLanguageWrite();
        }

        /**
         * @description Randomizes the order of the programming languages which makes it possible to shuffle.
         * @returns A pseudorandom number between -0.5 and 0.5.
         * */
        public shuffleSortFunction(): number
        {
            return 0.5 - Math.random();
        }

        /**
         * @description Returns an array with shuffled indices.
         * @param length The number of programming languages to be shuffled.
         * @returns A list which will assign an order to a programming language by the order in which they are accessed
         * from Object.entries method, if the first programming
         * language is JS and the first element of the returned array is 3, the JS will be shown as the 4th programming
         * language, if 1, it will be 2nd, etc.
         * */
        public shuffleArrayIndices(length: number): number[]
        {
            return Array.from({length}, (_: undefined, index: number) =>
            {
                return index;
            }).sort(this.shuffleSortFunction);
        }

        /**
         * @description Shuffles the order of the programming languages.
         * @param programmingLanguages An object containing all programming languages to be shuffled.
         * @returns An object of all shuffled programming languages.
         * */
        public programmingLanguagesShuffle(
            programmingLanguages: Record<string, ProgrammingLanguage>
        ): Record<string, ProgrammingLanguage>
        {
            /** @description Cloned object containing the programming languages. */
            const programmingLanguagesCopy = this.$Tomwork.clone(programmingLanguages);

            /** @description Object entries of the programming languages. */
            const programmingLanguagesCopyEntries = Object.entries(programmingLanguagesCopy);

            /** @description Number of all programming languages contained in the programming languages object. */
            const programmingLanguagesCount: number = programmingLanguagesCopyEntries.reduce((
                acc,
                programmingLanguage
            ) =>
            {
                const {children} = programmingLanguage[1];

                const thisCount = children ? Object.keys(children).length : 1;

                return acc + thisCount;
            }, 0);

            /** @description List of order numbers which will be assigned to the programming languages. */
            const shuffledIndices: number[] = this.shuffleArrayIndices(programmingLanguagesCount);

            /** @description Assigns the order numbers. */
            programmingLanguagesCopyEntries.forEach(([, programmingLanguageData], programmingLanguageIndex) =>
            {
                programmingLanguageData.order = shuffledIndices[programmingLanguageIndex];

                if (!programmingLanguageData.children)
                {
                    return;
                }

                /** @description All frameworks and libraries which are related to the (parent) programming languages. */
                const children: Record<string, ProgrammingLanguage> = {...programmingLanguageData.children};

                const homeSectionChildren = this.programmingLanguageHomeSectionChildrenGet(children);

                homeSectionChildren.forEach(([, childData], childIndex) =>
                {
                    childData.order = shuffledIndices[childIndex];
                });

                programmingLanguageData.children = children;
            });

            return programmingLanguagesCopy;
        }

        /** The object containing marked and non-marked parts of the active programming language. */
        public currentProgrammingLanguage = {
            /** @description The marked part of the active programming language of the home text. */
            marked: ``,
            /** @description The non-marked part of the active programming language of the home text. */
            nonMarked: ``
        };

        /** @description Determines whether the cursor next to the programming language is blinking. */
        public cursorBlinking: boolean = true;

        /** @description Counter which determines which programming language is shown. */
        public programmingLanguageCounter: number = 1;

        /** @description The basic interval value in milliseconds by which the speed of rewriting of
         * the active programming language is executed. */
        public readonly interval: number = 50;

        /** @description The object containing all programming languages in a pseudorandom order. */
        public readonly programmingLanguages: Record<string, ProgrammingLanguage> = this.programmingLanguagesShuffle(
            this.$store.state.programmingLanguages
        );

        /** @description The current home text. */
        public get homeText(): string[]
        {
            return this.text.text.split(/\${programmingLanguage}/);
        }

        /** @description Returns programming language children which are included in the home section. */
        public programmingLanguageHomeSectionChildrenGet(
            children: Record<string, ProgrammingLanguage>
        ): [string, ProgrammingLanguage][]
        {
            return Object.entries(children)
                .filter(([, programmingLanguageChildProps]) =>
                {
                    return programmingLanguageChildProps.home;
                });
        }

        /**
         * @description Returns all children of a programming language, if the language has any,
         * otherwise, an error is thrown.
         * @returns All children of a programming language.
         * */
        public programmingLanguageChildrenGet(data: ProgrammingLanguage): { order: number, value: string }[]
        {
            const homeSectionChildren = this.programmingLanguageHomeSectionChildrenGet(data.children!);

            return homeSectionChildren
                .map(([programmingLanguageChild, programmingLanguageChildProps]) =>
                {
                    return {
                        order: programmingLanguageChildProps.order,
                        value: this.programmingLanguageHtmlGet(
                            programmingLanguageChild,
                            programmingLanguageChildProps
                        )
                    };
                });
        }

        /**
         * @description Returns the HTML string of a programming language.
         * @param name The key of the programming language by which it is accessed in the object
         * containing all programming languages.
         * @param data The data related to the programming language.
         * @returns The HTML string of a programming language.
         * */
        public programmingLanguageHtmlGet(
            name: string,
            data: ProgrammingLanguage
        ): string
        {
            const {programmingLanguages} = this.$store.state.texts;

            const shouldHaveArticle: boolean = Boolean(data.an && this.$store.state.lang === `en`);

            const article: string = shouldHaveArticle ? `n ` : ` `;

            const html: string = programmingLanguages[name];

            return `${article}${html}`;
        }

        /** @description List of HTML strings of all programming languages. */
        public get programmingLanguagesList(): string[]
        {
            const programmingLanguages = this.programmingLanguageHomeSectionChildrenGet(this.programmingLanguages);

            const programmingLanguagesFlattened = programmingLanguages.flatMap((
                [programmingLanguage, programmingLanguageProps]
            ) =>
            {
                return [
                    {
                        order: programmingLanguageProps.order,
                        value: this.programmingLanguageHtmlGet(
                            programmingLanguage,
                            programmingLanguageProps
                        )
                    },
                    ...(programmingLanguageProps.children ? this.programmingLanguageChildrenGet(
                        programmingLanguageProps
                    ) : [])
                ];
            });

            const programmingLanguagesSorted = programmingLanguagesFlattened.sort((
                data,
                data1
            ) =>
            {
                return data.order - data1.order;
            });

            return programmingLanguagesSorted.map((programmingLanguageProps) =>
            {
                return programmingLanguageProps.value;
            });
        }

        /** @description The programming language which will be shown after the active one. */
        public get nextText(): string
        {
            const nextProgrammingLanguageIndex = this.programmingLanguageCounter % this.programmingLanguagesList.length;

            /** @description The value of the home text which will be shown after the active programming language will
             *  be removed. */
            const nextText: string = this.programmingLanguagesList[nextProgrammingLanguageIndex];

            const hasArticle: boolean = nextText[0] === `n`;

            return `${hasArticle ? `` : ` `}${nextText}`;
        }

        /** @description Locales of the Home section. */
        public get text(): typeof text.sk.home
        {
            return this.texts.home;
        }

        /** @description Length of the home text. */
        public get textLength(): number
        {
            return this.currentProgrammingLanguage.nonMarked.length;
        }

        /**
         * @description Watches the change of the active language, if English is active the languages are preceded by an
         * article, that's why the new values of the dynamic part
         * of the home text must be reevaluated.
         * */
        @Watch('lang')
        public langChangeOn()
        {
            if (this.currentProgrammingLanguage.marked.length === 0)
            {
                return;
            }

            const {marked, nonMarked} = this.currentProgrammingLanguage;

            const newNonMarkedLength: number = nonMarked.length - marked.length;

            this.currentProgrammingLanguage.nonMarked = this.nextText.slice(
                0,
                newNonMarkedLength
            );
            this.currentProgrammingLanguage.marked = this.nextText.slice(
                nonMarked.length
            );
        }

        public beforeMount()
        {
            [this.currentProgrammingLanguage.nonMarked] = this.programmingLanguagesList;
        }

        public mounted()
        {
            setTimeout(this.rewriteText, 2000);
        }
    }
</script>

<style lang="stylus" scoped>
    .home-text
        font-color #ffffff
        display inline-block
        font-size 70px
        line-height 1.2

        @media (max-width 767px)
            font-size 9vw

    .home-text-programming-language
        font-weight 700
        position relative

        *
            vertical-align top

    .home-text-cursor
        background-color #ffffff
        display inline-block
        height 1.2em
        opacity 1
        position relative
        right 0
        width 2px

    .home-text-cursor-blinking
        animation blinking 1.06s infinite step-end

    @keyframes blinking
        0%
            opacity 1

        50%
            opacity 0
</style>

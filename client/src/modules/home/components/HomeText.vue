<template>
    <h1 class="home-text">
        <span v-html="homeText[0]"/>
        <span class="programming-language">
            <span v-html="htmlParse(current)"/>
            <mark v-html="htmlParse(marked)"/>
            <span :class="{blinking}" class="cursor"/>
        </span>
        <span v-html="homeText[1]"/>
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
        public anIs(val: string): boolean
        {
            return val.slice(0, 2) === `n ` || val === `n`;
        }

        /**
         * @description Parses the template string into an HTML string.
         * @param val The template string to be parsed.
         * @returns Parsed HTML string.
         * */
        public htmlParse(val: string): string
        {
            if (!this.anIs(val))
            {
                return val;
            }

            return val.replace(/^n/, `<span style="font-weight: 400">n</span>`);
        }

        /**
         * @description Rewrites the home text.
         * */
        public rewriteText(): void
        {
            this.c += 1;

            Array(this.textLength).fill(null).forEach((_: null, index: number) =>
            {
                setTimeout(() =>
                {
                    this.blinking = false;
                    this.marked = `${this.current.slice(-1)}${this.marked}`;
                    this.current = this.current.slice(0, -1);
                }, (this.interval * index) + this.$Rand.int({min: 0, max: 50}));
            });

            setTimeout(() =>
            {
                this.marked = ``;
            }, (this.textLength * this.interval) + 200);

            Array(this.nextText.length).fill(null).forEach((_: null, index: number) =>
            {
                setTimeout(() =>
                {
                    this.current = `${this.current}${this.nextText[index]}`;

                    if (index === this.nextText.length - 1)
                    {
                        this.blinking = true;
                        setTimeout(this.rewriteText, this.$Rand.int({min: 3000, max: 5000}));
                    }
                }, (this.interval * this.textLength) + (this.interval * 1.8 * index) + this.$Rand.int({min: 800, max: 850}));
            });
        }

        /**
         * @description Shuffles the order of the programming languages.
         * @param programmingLanguages An object containing all programming languages to be shuffled.
         * @returns An object of all shuffled programming languages.
         * */
        public shuffle(programmingLanguages: { [s: string]: ProgrammingLanguage }): { [s: string]: ProgrammingLanguage }
        {
            /**
             * @description Randomizes the order of the programming languages which makes it possible to shuffle.
             * @returns A pseudorandom number between -0.5 and 0.5\
             * */
            const shuffle: () => number = () =>
            {
                return 0.5 - Math.random();
            };

            /**
             * @description Gets a shuffled order.
             * @param length The number of programming languages to be shuffled.
             * @returns A list which will assign an order to a programming language by the order in which they are accessed from Object.entries method, if the first programming
             * language is JS and the first element of the returned array is 3, the JS will be shown as the 4th programming language, if 1, it will be 2nd, etc.
             * */
            const orderShuffledGet: (length: number) => number[] = (length) =>
            {
                return Array(length).fill(null).map((_: null, index: number) =>
                {
                    return index;
                }).sort(shuffle);
            };

            /** @description Cloned object containing the programming languages. */
            const programmingLanguagesCopy = this.$Tomwork.clone(programmingLanguages);
            /** @description Object entries of the programming languages. */
            const entries = Object.entries(programmingLanguagesCopy);

            /** @description Number of all programming languages contained in the programming languages object. */
            const length: number = entries.reduce((a: number, programmingLanguage: [string, ProgrammingLanguage]) =>
            {
                return a + (programmingLanguage[1].children ? Object.keys(programmingLanguage[1].children).length : 1);
            }, 0);

            /** @description List of order numbers which will be assigned to the programming languages. */
            const order: number[] = orderShuffledGet(length);

            /** @description Assigns the order numbers. */
            entries.forEach((programmingLanguage: [string, ProgrammingLanguage], programmingLanguageIndex: number) =>
            {
                programmingLanguage[1].order = order[programmingLanguageIndex];

                if (programmingLanguage[1].children)
                {
                    /** @description All frameworks and libraries which are related to the (parent) programming languages. */
                    const children: { [s: string]: ProgrammingLanguage } = {...programmingLanguage[1].children};

                    Object.entries(children).filter(([, programmingLanguageChildProps]: [string, ProgrammingLanguage]) =>
                    {
                        return programmingLanguageChildProps.home;
                    }).forEach((programmingLanguageChild: [string, ProgrammingLanguage], programmingLanguageChildIndex: number) =>
                    {
                        programmingLanguageChild[1].order = order[programmingLanguageChildIndex];
                    });

                    programmingLanguage[1].children = children;
                }
            });

            return programmingLanguagesCopy;
        }

        /** @description Determines whether the cursor next to the programming language is blinking. */
        public blinking: boolean = true;
        /** @description Counter which determines which programming language is shown. */
        public c: number = 1;
        /** @description The non-marked part of the active programming language of the home text. */
        public current: string = ``;
        /** @description The marked part of the active programming language of the home text. */
        public marked: string = ``;
        /** @description The basic interval value in milliseconds by which the speed of rewriting of the active programming language is executed. */
        public readonly interval: number = 50;
        /** @description The object containing all programming languages in a pseudorandom order. */
        public readonly programmingLanguages: { [s: string]: ProgrammingLanguage } = this.shuffle(this.$store.state.programmingLanguages);

        /** @description The current home text. */
        public get homeText(): string[]
        {
            return this.text.text.split(/\${programmingLanguage}/);
        }

        /** @description List of HTML strings of all programming languages. */
        public get list(): string[]
        {
            const {programmingLanguages} = this.$store.state.texts;

            /**
             * @description Returns the HTML string of a programming language.
             * @param programmingLanguage The key of the programming language by which it is accessed in the object containing all programming languages.
             * @param programmingLanguageProps The data related to the programming language.
             * @returns The HTML string of a programming language.
             * */
            const htmlGet: (args: { programmingLanguage: string, programmingLanguageProps: ProgrammingLanguage }) => string = ({programmingLanguage, programmingLanguageProps}) =>
            {
                return `${programmingLanguageProps.an && this.$store.state.lang === `en` ? `n ` : ` `}${programmingLanguages[programmingLanguage]}`;
            };

            return Object.entries(this.programmingLanguages).filter(([, programmingLanguageChildProps]) =>
            {
                return programmingLanguageChildProps.home;
            }).flatMap(([programmingLanguage, programmingLanguageProps]) =>
            {
                /**
                 * @description Returns all children of a programming language, if the language has any, otherwise, an error is thrown.
                 * @returns All children of a programming language.
                 * */
                const childrenGet: () => {order: number, value: string}[] = () =>
                {
                    return Object.entries(programmingLanguageProps.children as { [s: string]: ProgrammingLanguage }).filter(([, programmingLanguageChildProps]) =>
                    {
                        return programmingLanguageChildProps.home;
                    }).map(([programmingLanguageChild, programmingLanguageChildProps]: [string, ProgrammingLanguage]) =>
                    {
                        return {
                            order: programmingLanguageChildProps.order,
                            value: htmlGet({programmingLanguage: programmingLanguageChild, programmingLanguageProps: programmingLanguageChildProps})
                        };
                    });
                };

                return [
                    {
                        order: programmingLanguageProps.order,
                        value: htmlGet({programmingLanguage, programmingLanguageProps})
                    },
                    ...(programmingLanguageProps.children ? childrenGet() : [])
                ];
            }).sort((programmingLanguageProps, programmingLanguageProps1) =>
            {
                return programmingLanguageProps.order - programmingLanguageProps1.order;
            }).map((programmingLanguageProps) =>
            {
                return programmingLanguageProps.value;
            });
        }

        /** @description The programming language which will be shown after the active one. */
        public get nextText(): string
        {
            /** @description The value of the home text which will be shown after the active programming language will be removed. */
            const nextText: string = this.list[this.c % this.list.length];
            return `${nextText[0] === `n` ? `` : ` `}${nextText}`;
        }

        /** @description Locales of the Home section. */
        public get text(): typeof text.sk.home
        {
            return this.texts.home;
        }

        /** @description Length of the home text. */
        public get textLength(): number
        {
            return this.current.length;
        }

        /** @description Watches the change of the active language, if English is active the languages are preceded by an article, that's why the new values of the dynamic part
         * of the home text must be reevaluated. */
        @Watch('lang')
        public langChangeOn()
        {
            if (this.marked.length === 0)
            {
                return;
            }

            this.current = this.nextText.slice(0, this.current.length - this.marked.length);
            this.marked = this.nextText.slice(this.current.length);
        }

        public beforeMount()
        {
            [this.current] = this.list;
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

    .programming-language
        font-weight 700
        position relative

        *
            vertical-align top

    .cursor
        background-color #ffffff
        display inline-block
        height 1.2em
        opacity 1
        position relative
        right 0
        width 2px

    .blinking
        animation blinking 1.06s infinite step-end

    @keyframes blinking
        0%
            opacity 1

        50%
            opacity 0
</style>

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

    @Component({
        name: `HomeText`
    })
    export default class HomeText extends mixins(MainMixin)
    {
        public anIs(val: string): boolean
        {
            return val.slice(0, 2) === `n ` || val === `n`;
        }

        public htmlParse(val: string): string
        {
            if (!this.anIs(val))
            {
                return val;
            }

            return val.replace(/^n/, `<span style="font-weight: 400">n</span>`);
        }

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

        public shuffle(programmingLanguages: { [s: string]: ProgrammingLanguage }): { [s: string]: ProgrammingLanguage }
        {
            const shuffle: () => number = () =>
            {
                return 0.5 - Math.random();
            };

            const orderShuffledGet = (length: number) =>
            {
                return Array(length).fill(null).map((_: null, index: number) =>
                {
                    return index;
                }).sort(shuffle);
            };

            const programmingLanguagesCopy = this.$Tomwork.clone(programmingLanguages);
            const entries = Object.entries(programmingLanguagesCopy);

            const length: number = entries.reduce((a: number, programmingLanguage: [string, ProgrammingLanguage]) =>
            {
                return a + (programmingLanguage[1].children ? Object.keys(programmingLanguage[1].children).length : 1);
            }, 0);

            const order: number[] = orderShuffledGet(length);

            entries.forEach((programmingLanguage: [string, ProgrammingLanguage], programmingLanguageIndex: number) =>
            {
                programmingLanguage[1].order = order[programmingLanguageIndex];

                if (programmingLanguage[1].children)
                {
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

        public blinking: boolean = true;
        public c: number = 1;
        public current: string = ``;
        public marked: string = ``;
        public readonly interval: number = 50;
        public readonly programmingLanguages: { [s: string]: ProgrammingLanguage } = this.shuffle(this.$store.state.programmingLanguages);

        public get homeText(): string[]
        {
            return this.text.text.split(/\${programmingLanguage}/);
        }

        public get list(): string[]
        {
            const {programmingLanguages} = this.$store.state.texts;

            const htmlGet = ({programmingLanguage, programmingLanguageProps}: { programmingLanguage: string, programmingLanguageProps: ProgrammingLanguage }) =>
            {
                return `${programmingLanguageProps.an && this.$store.state.lang === `en` ? `n ` : ` `}${programmingLanguages[programmingLanguage]}`;
            };

            return Object.entries(this.programmingLanguages as { [s: string]: ProgrammingLanguage })
                .filter(([, programmingLanguageChildProps]: [string, ProgrammingLanguage]) =>
                {
                    return programmingLanguageChildProps.home;
                }).flatMap(([programmingLanguage, programmingLanguageProps]: [string, ProgrammingLanguage]) =>
                {
                    const childrenGet = () =>
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

        public get nextText(): string
        {
            const nextText: string = this.list[this.c % this.list.length];
            return `${nextText[0] === `n` ? `` : ` `}${nextText}`;
        }

        public get text(): typeof text.sk.home
        {
            return this.texts.home;
        }

        public get textLength(): number
        {
            return this.current.length;
        }

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

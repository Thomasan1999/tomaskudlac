<template>
    <div class="about-myself-column">
        <p
            v-for="part in parts"
            :key="part"
            class="about-myself-column-paragraph"
            :class="part === 'title' ? 'about-myself-column-heading' : 'about-myself-column-body'"
            v-html="columnPartTextGet(part)">
        </p>
    </div>
</template>

<script lang="ts">
    import {mixins}          from 'vue-class-component';
    import {Component, Prop} from 'vue-property-decorator';
    import MainMixin         from '@/mixins/Main';
    import text              from '@/locales';
    import smile             from '@/modules/about-myself/assets/smile';

    /** @description Component containing a column of the About myself section. */
    @Component({
        name: `AboutMyselfColumn`
    })
    export default class AboutMyselfColumn extends mixins(MainMixin)
    {
        /** @description Name of the column. */
        @Prop(String) public readonly name!: string;

        public readonly parts: string[] = [`title`, `text`]

        /** @description HTML of the smile emoji. */
        public readonly smile: string = smile

        public columnPartTextGet(part: string): string
        {
            const columnPartText = this.text[this.name][part];

            const {age} = this.$store.state;
            const {programmingLanguages} = this.$store.getters;

            return new this.$String(columnPartText)
                .htmlParse({
                    age,
                    programmingLanguages,
                    smile: this.smile
                })
                .toString();
        }

        /** @description Locales of the component. */
        public get text(): typeof text.sk.aboutMyself
        {
            return this.texts.aboutMyself;
        }
    }
</script>

<style lang="stylus" scoped>
    .about-myself-column
        box-sizing border-box
        max-width 500px
        padding-horizontal 25px

        @media (min-width 1024px)
            flex 1

        @media (max-width 1023px)
            padding-horizontal 0
            width 100%

        & >>> strong
            font-color var(--primary-anchor-hover-color)
            font-weight 600

    .about-myself-column-heading
        font-size 30px
        font-weight 700
        text-transform uppercase
</style>

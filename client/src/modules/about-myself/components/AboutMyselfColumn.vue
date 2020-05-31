<template>
    <div class="about-myself-column">
        <p v-for="part in [`title`, `text`]" :key="part" :class="part"
           v-html="new $String(text[name][part]).htmlParse({age: $store.state.age, programmingLanguages: $store.getters.programmingLanguages, smile}).toString()"></p>
    </div>
</template>

<script lang="ts">
    import {mixins}          from 'vue-class-component';
    import {Component, Prop} from 'vue-property-decorator';
    import MainMixin         from '@/mixins/Main';
    import text              from '@/locales';

    @Component({
        name: `AboutMyselfColumn`
    })
    export default class AboutMyselfColumn extends mixins(MainMixin)
    {
        @Prop(String) public readonly name!: string;

        public readonly smile: string =
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-smile fa-w-16"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>`;

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
            font-color $anchor_hover
            font-weight 600

    .title
        font-size 30px
        font-weight 700
        text-transform uppercase
</style>

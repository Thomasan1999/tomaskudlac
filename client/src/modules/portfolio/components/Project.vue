<template>
    <a target="_blank" rel="noopener noreferrer" :href="href" class="project"
       :title="text[name].title" :style="{backgroundImage: `url('${require(`@/modules/portfolio/assets/${new $String(name).urlTo()}.${$store.state.imageFormat}`)}')`}">
        <div class="curtain"></div>
        <div class="text-container">
            <p class="title" v-html="text[name].title"></p>
            <div class="text">
                <p>
                    <span class="what-ive-done" v-html="`${text.whatIveDone}:`"></span><br>
                    <span v-for="projectPart in projectParts" :key="projectPart.id"
                          v-html="`${text[projectPart]}: ${text[new $String(name).caseCamelTo()][projectPart] || `100%`}<br>`"></span>
                </p>
            </div>
        </div>
    </a>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import {mixins}  from 'vue-class-component';
    import MainMixin from '@/mixins/Main';
    import text      from '@/locales';

    /** @description A component containing a project in the Portfolio section. The project represents a reference, contains an image from the website which it refers to, some
     * basic information about my contribution to the development of the website and the name of the referred website. */
    @Component({
        name: `Project`
    })
    export default class Project extends mixins(MainMixin)
    {
        /** @description The key of the project by which it is accessed in the locales object. */
        @Prop(String) public readonly name!: string;

        /** @description List of all project parts. */
        public projectParts: ProjectPart[] =  [`design`, `frontEnd`, `backEnd`];

        /** @description The href attribute of the project which points to the referred website. */
        public get href(): string
        {
            return (this.text[this.name] as Project).href;
        }

        /** @description Locales of the Portfolio section. */
        public get text(): typeof text.sk.portfolio
        {
            return this.texts.portfolio;
        }
    }
</script>

<style lang="stylus" scoped>
    p
        margin-vertical 0

    .project
        align-items center
        background-size cover
        display inline-flex
        font-color #ffffff
        min-height 300px
        position relative

        &:after
            content ''
            display block
            padding-top (9 / 16 * 100%)

        &:hover
            .curtain
                background-color rgba(14, 33, 175, .55)

                @media (max-width 1023px)
                    background-color rgba(14, 33, 175, .75)

            .text
                height 115.2px
                opacity 1
                padding-horizontal 25px

    .curtain
        background-color rgba(0, 0, 0, .55)
        transition all .25s

        @media (max-width 1023px)
            background-color rgba(0, 0, 0, .75)

    .text-container
        width 100%
        z 1

    .title
        font-size 45px
        font-weight 700
        text-transform uppercase

        @media (max-width 440px)
            font-size 35px

    .text
        height 0
        line-height 1.2
        opacity 0
        padding-horizontal 0
        transition all .25s

        p
            font-size 20px
            line-height 1.2

        @media (max-width 1023px)
            box-sizing border-box
            height 115.2px
            opacity 1
            padding-horizontal 25px

        @media (max-width 440px)
            font-size 16px

    .what-ive-done
        font-weight 700
</style>

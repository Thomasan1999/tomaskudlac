<template>
    <div class="cookies-info">
        <button class="cookies-close button-transparent">
            <font-awesome-icon :icon="cookiesCloseIcon" @click="clickOn"/>
        </button>
        <div v-for="(paragraph, index) in text.text" :key="index">
            <h3 v-html="paragraph.title"></h3>
            <p v-html="new $String(paragraph.text).htmlParse().toString()"></p>
        </div>
    </div>
</template>

<script lang="ts">
    import {mixins}    from 'vue-class-component';
    import {Component} from 'vue-property-decorator';
    import MainMixin   from '@/mixins/Main';
    import text        from '@/locales';

    /** @description The component containing a popup with the information about cookies. */
    @Component({
        name: `CookiesInfo`
    })
    export default class CookiesInfo extends mixins(MainMixin)
    {
        /** @description Listener of the click on the close button in the popup. */
        public clickOn(): void
        {
            this.$emit(`close`);
        }

        /** @description An array of 2 strings which determine what Font Awesome icon is used to create the close button icon. */
        public readonly cookiesCloseIcon: [string, string] = [`fas`, `times`];

        /** @description Locales of the component. */
        public get text(): typeof text.sk.footer.cookiesInfo
        {
            return this.texts.footer.cookiesInfo;
        }
    }
</script>

<style lang="stylus" scoped>
    .cookies-info
        background-color #222222
        box-sizing border-box
        font-color #ffffff
        font-size 16px
        left 50%
        max-height calc(100% - 30px)
        max-width 1000px
        padding 50px
        position fixed
        text-align center
        transform translate(-50%, -50%)
        top 50%
        width calc(100% - 30px)
        z 5

        @media (max-width 1023px)
            overflow-y scroll
            padding 30px

        div
            margin 25px auto

    h3
        font-weight 700

    .cookies-close
        float right
        font-size 25px
        transition .25s

        &:hover
            cursor pointer
            font-color $anchor_hover
</style>

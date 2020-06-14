<template>
    <section class="footer">
        <footer>
            <div class="copyright">
                <p>
                    <span>{{`© 2017 - 2020 ${text.copyright}. `}}</span>
                    <span v-html="new $String(text.cookies).htmlParse().toString()" @click="clickOn"></span>
                </p>
            </div>
        </footer>
    </section>
</template>

<script lang="ts">
    import {mixins}          from 'vue-class-component';
    import {Component, Prop} from 'vue-property-decorator';
    import text      from '@/locales';
    import MainMixin from '@/mixins/Main';

    /** @description The component containing the footer of the website located under the Contact section. */
    @Component({
        name: `FooterSection`
    })
    export default class FooterSection extends mixins(MainMixin)
    {
        /** @description Determines whether the cookies info popup is shown. */
        @Prop(Boolean) public readonly cookiesShow!: boolean;

        /** @description Listener of the click on the link which opens a cookies info popup. */
        public clickOn(): void
        {
            this.$emit(`click`, !this.cookiesShow);
        }

        /** @description Locales of the component. */
        public get text(): typeof text.sk.footer
        {
            return this.texts.footer;
        }
    }
</script>

<style lang="stylus" scoped>
    footer
        background-color $primary_color

    .copyright
        font-color #ffffff
        font-weight 500
        line-height 40px
        margin-top 50px

        p
            margin-vertical 0

        >>> button
            background-color transparent
            border 0
            font inherit

            &:hover
                font-color $anchor_hover

    >>> .cookies
        cursor pointer
        text-decoration underline
</style>

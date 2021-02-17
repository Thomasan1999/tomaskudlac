<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {mixins}    from 'vue-class-component';
    import MainMixin   from '@/mixins/Main';

    /** @description The component wrapping the whole application. */
    @Component({
        name: `App`
    })
    export default class App extends mixins(MainMixin)
    {
        /** @description Initializes the router. */
        public routerInit(): void
        {
            /** @description If any query parameters exist, remove them from the URL. */
            if (Object.keys(this.$route.query).length)
            {
                this.$router.replace({hash: this.$route.hash, query: {}});
            }
        }

        /** Initializes the store. */
        public storeInit(): void
        {
            const {dispatch} = this.$store;

            Promise.all([
                dispatch(`ageUpdate`),
                dispatch(`imageFormatSet`),
                dispatch(`langUpdate`)
            ]).catch((err) =>
            {
                console.error(err);
            });
        }

        public created()
        {
            this.storeInit();

            this.routerInit();
        }
    }
</script>

<style lang="stylus">
    @import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,700|Montserrat|Inconsolata:400,700&display=swap');
    @import './styles/reset.styl';
    @import './styles/tomwork.styl';

    html, body
        --primary-color #191970
        --primary-color-light lighten(#191970, 16)
        --primary-red #da0b24
        --primary-green #1e9f31
        --contact-form-label-width 100px
        --selection-color #0e6beb
        --primary-orange #cc7832
        --primary-anchor-hover-color var(--primary-orange)

    +selection()
        background-color var(--selection-color)

    mark
        background-color var(--selection-color)
        font-color #ffffff

    #app
        background-color #1c1c1c
        font-color #ffffff
        font-family 'Raleway', sans-serif
        overflow hidden
        text-align center

    h2
        font-family 'Inconsolata', monospace
        font-size 50px
        font-weight 700

    form
        margin-horizontal auto

    h1, h2, p
        margin 25px auto
        width calc(100% - 30px)

    img
        margin-vertical 25px

    .content
        padding 0 30px

    .background-image, .background-image::before
        background-attachment fixed
        background-position center
        height 100%

    .button-transparent
        background-color transparent
        border 0
        font inherit
</style>

<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {mixins}    from 'vue-class-component';
    import MainMixin   from '@/mixins/Main';

    @Component({
        name: `App`
    })
    export default class App extends mixins(MainMixin)
    {
        public beforeCreate()
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

            if (Object.keys(this.$route.query).length)
            {
                this.$router.replace({hash: this.$route.hash, query: {}});
            }

            // @ts-ignore
            window._vm = this;
        }
    }
</script>

<style lang="stylus">
    @import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,700|Montserrat|Inconsolata:400,700&display=swap');
    @import './styles/reset.styl';
    @import './styles/tomwork.styl';

    +selection()
        background-color $selection_color

    mark
        background-color $selection_color
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

<template>
    <div class="scrollbar-container">
        <slot class="scrollbar-content"/>
    </div>
</template>

<script lang="ts">
    import {mixins}    from 'vue-class-component';
    import {Component} from 'vue-property-decorator';
    import MainMixin   from '@/mixins/Main';

    /** @description A component containing helper methods for HTML Elements with a vertical scrollbar. */
    @Component({
        name: `ScrollbarContainer`
    })
    export default class ScrollbarContainer extends mixins(MainMixin)
    {
        /** @description Listener of the scroll event targeted at the scrollbar-content. */
        public scrollOn(): void
        {
            this.$emit(`scroll`, this.$el.scrollTop);
        }

        public mounted()
        {
            this.$el.addEventListener(`scroll`, this.scrollOn);
        }

        public destroyed()
        {
            this.$el.removeEventListener(`scroll`, this.scrollOn);
        }
    }
</script>

<style lang="stylus" scoped>
    .scrollbar-container
        box-sizing border-box
        height 100%
        overflow-y auto
        position relative
        scrollbar-color var(--scrollbar-thumb-color) var(--scrollbar-color)
        width 100%
        --scrollbar-thumb-color #444444
        --scrollbar-thumb-hover-color #666666
        --scrollbar-thumb-active-color #959595
        --scrollbar-color #eeeeee

        @media (max-width 1023px)
            margin-right 0

    .scrollbar-content
        display flex
        flex-direction column
        height 100%
        position relative
        width 100%

    ::-webkit-scrollbar
        background var(--scrollbar-color)

    ::-webkit-scrollbar-thumb
        background var(--scrollbar-thumb-color)

        &:hover
            background var(--scrollbar-thumb-hover-color)

        &:active
            background var(--scrollbar-thumb-active-color)
</style>

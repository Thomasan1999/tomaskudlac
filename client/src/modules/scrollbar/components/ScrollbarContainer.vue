<template>
    <div class="scrollbar-container">
        <slot class="scrollbar-content"/>
    </div>
</template>

<script lang="ts">
    import {mixins}    from 'vue-class-component';
    import {Component} from 'vue-property-decorator';
    import MainMixin   from '@/mixins/Main';

    @Component({
        name: `ScrollbarContainer`
    })
    export default class ScrollbarContainer extends mixins(MainMixin)
    {
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
    $scrollbarThumbColor = #444444;
    $scrollbarThumbHoverColor = #666666;
    $scrollbarThumbActiveColor = #959595;
    $scrollbarColor = #eeeeee;

    .scrollbar-container
        box-sizing border-box
        height 100%
        overflow-y auto
        position relative
        scrollbar-color $scrollbarThumbColor $scrollbarColor
        width 100%

        @media (max-width 1023px)
            margin-right 0

    .scrollbar-content
        display flex
        flex-direction column
        height 100%
        position relative
        width 100%

    ::-webkit-scrollbar
        background $scrollbarColor

    ::-webkit-scrollbar-thumb
        background $scrollbarThumbColor

        &:hover
            background $scrollbarThumbHoverColor

        &:active
            background $scrollbarThumbActiveColor
</style>

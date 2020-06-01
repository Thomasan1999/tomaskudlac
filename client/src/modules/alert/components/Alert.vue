<template>
    <transition name="fade">
        <div class="alert" :style="state">
            <p v-html="text[name]"/>
            <div class="alert-remove" @click="deleteClickOn">
                <svg :style="{stroke: state.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                    <title>Zrušiť</title>
                    <line class="cls-1" x1="0.5" y1="14.5" x2="14.5" y2="0.5"/>
                    <line class="cls-1" x1="0.5" y1="0.5" x2="14.5" y2="14.5"/>
                </svg>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import {mixins}          from 'vue-class-component';
    import {Component, Prop} from 'vue-property-decorator';
    import text              from '@/locales';
    import MainMixin         from '@/mixins/Main';

    /** @description A component containing a custom alert. */
    @Component({
        name: `Alert`
    })
    export default class Alert extends mixins(MainMixin)
    {
        /** @description The id of the alert. */
        @Prop(Number) public readonly id!: number;
        /** @description The name of the alert. */
        @Prop(String) public readonly name!: string;
        /** @description Determines whether the alert reports a success or a failure and contains information related to it.  */
        @Prop(Object) public readonly state!: object;

        /** @description Runs on click of a delete button. */
        public deleteClickOn(): void
        {
            this.$emit(`destroy`, this.id);
        }

        /** @description Lifetime of the alert in milliseconds. */
        public readonly lifetime: number = 1e4;

        /** @description Locales of the component. */
        public get text(): typeof text.sk.alert
        {
            return this.texts.alert;
        }

        public mounted()
        {
            /** @description Destroys the alert after the lifetime has passed. */
            setTimeout(() =>
            {
                this.$emit(`destroy`, this.id);
            }, this.lifetime / (1 + Number(this.$store.getters.touchscreen)));
        }
    }
</script>

<style lang="stylus" scoped>
    .alert
        box-shadow 0 5px 18px 0 rgba(0, 0, 0, 0.33)
        margin-right 20px
        margin-top 20px
        padding-vertical 10px
        position relative

        p

            font-weight 500
            height 100%
            margin auto
            text-align left
            width calc(100% - 60px)

            @media (max-width 1023px)
                text-align center

            @media (max-width 767px)
                width calc(100% - 50px)

        @media (max-width 1023px)
            margin-right 0
            margin-top 15px

    .fade-enter-active, .fade-leave-active
        transition .25s

    .fade-enter, .fade-leave-to
        opacity 0

    .alert-remove
        height 30px
        right 0
        position absolute
        top 0
        width 30px

        &:hover
            cursor pointer

        svg
            bottom 0
            height 10px
            left 0
            margin auto
            position absolute
            right 0
            top 0

        .cls-1
            fill false
            transition stroke .25s
            stroke-miterlimit 10
            stroke-width 1.42px

        @media (max-width 767px)
            height 25px
            width 25px
</style>

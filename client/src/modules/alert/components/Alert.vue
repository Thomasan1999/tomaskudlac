<template>
    <transition name="fade">
        <div class="alert" :style="{'--alert-background-color': backgroundColor, '--alert-color': color}">
            <p class="alert-message">{{text.message[type]}}</p>
            <div class="alert-remove" @click="deleteClickOn">
                <svg class="alert-remove-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                    <title>{{text.remove}}</title>
                    <line class="alert-remove-image-line" x1="0.5" y1="14.5" x2="14.5" y2="0.5"/>
                    <line class="alert-remove-image-line" x1="0.5" y1="0.5" x2="14.5" y2="14.5"/>
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
        /** @description The background color of the alert element.  */
        @Prop({required: true, type: String})
        public readonly backgroundColor!: string;

        /** @description The text color of the alert element.  */
        @Prop({required: true, type: String})
        public readonly color!: string;

        /** @description The id of the alert. */
        @Prop({required: true, type: Number})
        public readonly id!: number;

        /** @description The type of the alert. */
        @Prop({required: true, type: String})
        public readonly type!: string;

        /** @description Runs on click of a delete button. */
        public deleteClickOn(): void
        {
            this.destroy();
        }

        /** @description Triggers an operation to destroy the component. */
        public destroy(): void
        {
            this.$emit(`destroy`, this.id);
        }

        /** @description Base lifetime of the alert in milliseconds. */
        public readonly lifetimeBase: number = 1e4;

        /** @description Lifetime of the alert in milliseconds which is actually used in the component. */
        public get lifetime(): number
        {
            const deviceFactor: number = 1 + Number(this.$store.getters.touchscreen);

            return this.lifetimeBase / deviceFactor;
        }

        /** @description Locales of the component. */
        public get text(): typeof text.sk.alert
        {
            return this.texts.alert;
        }

        public mounted()
        {
            /** @description Destroys the alert after the lifetime has passed. */
            setTimeout(this.destroy, this.lifetime);
        }
    }
</script>

<style lang="stylus" scoped>
    .alert
        background-color var(--alert-background-color)
        color var(--alert-color)
        box-shadow 0 5px 18px 0 rgba(0, 0, 0, 0.33)
        margin-right 20px
        margin-top 20px
        padding-vertical 10px
        position relative

        @media (max-width 1023px)
            margin-right 0
            margin-top 15px

    .alert-message
        font-weight 500
        height 100%
        margin auto
        text-align left
        width calc(100% - 60px)

        @media (max-width 1023px)
            text-align center

        @media (max-width 767px)
            width calc(100% - 50px)

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

        @media (max-width 767px)
            height 25px
            width 25px

    .alert-remove-image
        bottom 0
        height 10px
        left 0
        margin auto
        position absolute
        stroke var(--alert-color)
        right 0
        top 0

    .alert-remove-image-line
        fill false
        transition stroke .25s
        stroke-miterlimit 10
        stroke-width 1.42px
</style>

<template>
    <div
        class="navbar-icon"
        :class="[mode]"
        :title="mode === 'bars' ? locales.show : locales.hide"
        @click="onClick"
    >
        <div class="line-container">
            <svg
                v-for="index in 3"
                class="line"
                :class="`line-${index}`"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 3"
            >
                <rect class="line-rect" height="3" width="25"/>
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {computed} from 'vue';
    import useStore from '@/store';

    const props = defineProps<{mode: 'bars' | 'cross'}>();
    const emit = defineEmits<{(event: 'click'): void}>();

    const store = useStore();

    const onClick = () =>
    {
        emit('click');
    };

    const locales = computed(() => store.locales.navbar);
</script>

<style lang="scss" scoped>
    .navbar-icon
    {
        --half-transition: calc(var(--navbar-transition-duration) / 2);

        align-items: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        height: 100%;
        padding-left: 17.5px;
        padding-right: 17.5px;
        position: relative;
        width: 31.25px;
        z-index: 3;

        @media (max-width 1023px)
        {
            display: block;
        }

        &.cross
        {
            .line
            {
                top: 40%;
                transition: top var(--half-transition) 0s, transform var(--half-transition) var(--half-transition);
            }

            .line-1
            {
                transform: rotate(-45deg);
            }

            .line-2
            {
                transform: rotate(-45deg);
            }

            .line-3
            {
                transform: rotate(45deg);
            }
        }

        &.bars
        {
            .line
            {
                transform: rotate(0deg);
                transition: top var(--half-transition) var(--half-transition), transform var(--half-transition) 0s;
            }

            .line-1
            {
                top: 0;
            }

            .line-2
            {
                top: calc(50% - 1.5px);
            }

            .line-3
            {
                top: calc(100% - 3px);
            }
        }
    }

    .line-container
    {
        height: 25px;
        position: relative;
        width: 100%;
    }

    .line
    {
        left: 0;
        position: absolute;
    }

    .line-rect
    {
        fill: #ffffff;
        transform-origin: 50% 50%;
    }
</style>

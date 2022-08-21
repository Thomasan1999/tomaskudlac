<template>
    <MainSection
        class="home has-curtain"
        :class="`image-format-${imageFormat}`"
        name="home"
    >
        <div class="text-content">
            <HomeText/>
        </div>
    </MainSection>
</template>

<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import HomeText from '@/components/main/home/HomeText.vue';
    import {computed} from 'vue';
    import useStore from '@/store';

    const store = useStore();

    const imageFormat = computed(() => store.imageFormat);
</script>

<style lang="scss" scoped>
    .home
    {
        --navbar-height: 60px;

        align-items: center;
        display: flex;
        height: calc(100 * var(--vh) - var(--navbar-height));
        justify-content: center;
        overflow: hidden;
        padding-top: var(--navbar-height);
        position: relative;

        &.image-format-webp
        {
            &:after
            {
                background-image: url('/images/background-home.webp');
            }
        }

        &.image-format-jpg
        {
            &:after
            {
                background-image: url('/images/background-home.jpg');
            }
        }

        &:before
        {
            background-color: rgba(14, 33, 175, .55);
            z-index: 0;
        }

        &:after
        {
            background-attachment: fixed;
            background-position: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            content: '';
            display: block;
            filter: blur(3px);
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: -1;
        }
    }
</style>

<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import HomeText from '@/components/main/home/HomeText.vue';
    import { computed } from 'vue';
    import useStore from '@/store';
    import { ImageFormat } from '@/store/types';

    const store = useStore();

    const imageFormat = computed(() => store.imageFormat);
</script>

<template>
    <MainSection
        data-testid="home"
        class="has-curtain relative flex h-[calc(100*var(--vh)-var(--navbar-height))] items-center justify-center overflow-hidden pt-navbar-height before:z-0 before:bg-blue-curtain after:absolute after:left-0 after:top-0 after:z-[-1] after:block after:size-full after:bg-cover after:bg-fixed after:bg-center after:bg-no-repeat after:blur-[3px] after:content-['']"
        :class="
            imageFormat === ImageFormat.WEBP
                ? 'after:bg-[url(/images/background-home.webp)]'
                : 'after:bg-[url(/images/background-home.jpg)]'
        "
        name="home"
    >
        <div class="text-content">
            <HomeText />
        </div>
    </MainSection>
</template>

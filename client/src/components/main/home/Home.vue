<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import HomeText from '@/components/main/home/HomeText.vue';
</script>

<template>
    <MainSection
        data-testid="home"
        class="has-curtain pt-navbar-height before:bg-blue-curtain relative flex h-[calc(100*var(--vh)-var(--navbar-height))] items-center justify-center overflow-hidden before:z-0 after:absolute after:top-0 after:left-0 after:z-[-1] after:block after:size-full after:bg-[url(/images/background-home.webp)] after:bg-cover after:bg-fixed after:bg-center after:bg-no-repeat after:blur-[3px] after:content-['']"
        name="home"
    >
        <div class="text-content">
            <HomeText />
        </div>
    </MainSection>
</template>

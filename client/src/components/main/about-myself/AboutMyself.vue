<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
    import { computed } from 'vue';
    import useStore from '@/store';
    import AboutMyselfPhotoContainer from '@/components/main/about-myself/AboutMyselfPhotoContainer.vue';

    const store = useStore();

    const locales = computed(() => store.locales.sections.aboutMyself);
</script>

<template>
    <MainSection
        data-testid="about-myself"
        class="py-main-row-gap"
        heading
        name="aboutMyself"
    >
        <div class="text-content">
            <AboutMyselfPhotoContainer
                webpSrc="/images/myself.webp"
                jpgSrc="/images/myself.jpg"
                :alt="locales.photoAlt"
            />
            <div class="flex flex-wrap justify-center gap-x-20 gap-y-main-row-gap">
                <AboutMyselfColumn
                    v-for="column in locales.columns"
                    v-bind="column"
                />
            </div>
        </div>
    </MainSection>
</template>

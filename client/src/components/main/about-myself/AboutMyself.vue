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
            <div class="about-myself-column-container gap-y-main-row-gap">
                <AboutMyselfColumn
                    v-for="column in locales.columns"
                    v-bind="column"
                />
            </div>
        </div>
    </MainSection>
</template>

<style lang="scss" scoped>
    .about-myself-column-container {
        column-gap: 80px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

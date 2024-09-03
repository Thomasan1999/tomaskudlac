<template>
    <MainSection
        class="about-myself"
        heading
        name="aboutMyself"
    >
        <div class="text-content">
            <AboutMyselfPhotoContainer
                webpSrc="/images/myself.webp"
                jpgSrc="/images/myself.jpg"
                :alt="locales.photoAlt"
            />
            <div class="about-myself-column-container">
                <AboutMyselfColumn
                    v-for="column in locales.columns"
                    v-bind="column"
                />
            </div>
        </div>
    </MainSection>
</template>

<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
    import { computed } from 'vue';
    import useStore from '@/store';
    import AboutMyselfPhotoContainer from '@/components/main/about-myself/AboutMyselfPhotoContainer.vue';

    const store = useStore();

    const locales = computed(() => store.locales.sections.aboutMyself);
</script>

<style lang="scss" scoped>
    .about-myself {
        padding-bottom: var(--main-row-gap);
        padding-top: var(--main-row-gap);
    }

    .about-myself-column-container {
        column-gap: 80px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        row-gap: var(--main-row-gap);
    }
</style>

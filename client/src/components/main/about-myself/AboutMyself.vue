<template>
<main-section
    class="about-myself"
    heading
    name="aboutMyself"
>
    <div class="text-content">
        <picture class="about-myself-photo-container">
            <source type="image/webp" srcset="/images/myself.webp"/>
            <source type="image/jpeg" srcset="/images/myself.jpg"/>
            <img class="about-myself-photo" :alt="locales.photoAlt" data-testid="photo" src="/images/myself.jpg">
        </picture>
        <div class="about-myself-column-container">
            <about-myself-column v-for="column in locales.columns" v-bind="column"/>
        </div>
    </div>
</main-section>
</template>

<script lang="ts" setup>
import MainSection from '@/components/main/MainSection.vue';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import {computed} from 'vue';
import useStore from '@/store';

const store = useStore();

const locales = computed(() => store.locales.sections.aboutMyself);
</script>

<style lang="scss" scoped>
.about-myself
{
    padding-bottom: var(--main-row-gap);
    padding-top: var(--main-row-gap);
}

.about-myself-photo-container
{
    display: flex;
    justify-content: center;
}

.about-myself-photo
{
    border-radius: 50%;
    max-width: 100%;
}

.about-myself-column-container
{
    column-gap: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: var(--main-row-gap);
}
</style>

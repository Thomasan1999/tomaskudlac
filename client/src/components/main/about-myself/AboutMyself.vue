<template lang="pug">
main-section.about-myself(
    :heading="true"
    name="aboutMyself"
)
    div.text-content
        picture.about-myself-photo-container
            source(type="image/webp" srcset="/images/myself.webp")
            source(type="image/jpeg" srcset="/images/myself.jpg")
            img.about-myself-photo(:alt="locales.photoAlt" src="/images/myself.jpg")
        div.about-myself-column-container
            about-myself-column(v-for="column in locales.columns" v-bind="column")
</template>

<script lang="ts">
import MainSection from '@/components/main/MainSection.vue';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import {computed} from 'vue';
import store from '@/store';

export default {
    name: 'AboutMyself',
    components: {
        AboutMyselfColumn,
        MainSection
    },
    setup()
    {
        const locales = computed(() =>
        {
            return store.locales.sections.aboutMyself;
        });

        return {
            locales
        };
    }
};
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

<script lang="ts" setup>
    import useStore from '@/store';
    import { AboutMyselfColumnProps } from '@/components/main/about-myself/types';
    import LocalesTextParser from '@/components/locales-text-parser/LocalesTextParser.vue';

    const { text } = defineProps<AboutMyselfColumnProps>();

    const store = useStore();
</script>

<template>
    <div
        data-testid="about-myself-column"
        class="box-border flex max-w-105 flex-col gap-6"
    >
        <h3
            class="text-3xl font-bold"
            data-testid="title"
        >
            {{ title }}
        </h3>
        <LocalesTextParser
            data-testid="text"
            tag="p"
            :text="text"
        >
            <template #age>{{ store.age }}</template>
            <template #programmingLanguages>{{ store.programmingLanguagesString }}</template>
        </LocalesTextParser>
    </div>
</template>

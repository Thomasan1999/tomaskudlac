<script lang="ts" setup>
    import { computed } from 'vue';
    import { HomeTextProgrammingLanguageProps } from '@/components/main/home/types';

    const { programmingLanguage } = defineProps<HomeTextProgrammingLanguageProps>();

    const anPrefix = computed(() => {
        const textHasAnPrefix = programmingLanguage.match(/^n$|^n /);

        return textHasAnPrefix ? programmingLanguage[0] : '';
    });

    const base = computed(() => (anPrefix.value.length ? programmingLanguage.slice(1) : programmingLanguage));
</script>

<template>
    <span>{{ anPrefix }}</span>
    <span class="font-bold">{{ base }}</span>
</template>

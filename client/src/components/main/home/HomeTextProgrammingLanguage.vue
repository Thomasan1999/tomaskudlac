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
    <span class="home-programming-language-an-prefix">{{ anPrefix }}</span>
    <span class="home-programming-language-base">{{ base }}</span>
</template>

<style lang="scss" scoped>
    .home-programming-language-base {
        font-weight: 700;
    }
</style>

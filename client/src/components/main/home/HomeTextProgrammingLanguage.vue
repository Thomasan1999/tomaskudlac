<template>
<span class="home-programming-language-an-prefix">{{ anPrefix }}</span>
<span class="home-programming-language-base">{{ base }}</span>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

const props = defineProps<{programmingLanguage: string}>();

const anPrefix = computed(() =>
{
    const programmingLanguage = props.programmingLanguage;

    const textHasAnPrefix = programmingLanguage.match(/^n$|^n /);

    return textHasAnPrefix ? props.programmingLanguage[0] : '';
});

const base = computed(() => (
    anPrefix.value.length ? props.programmingLanguage.slice(1) : props.programmingLanguage
));
</script>

<style lang="scss" scoped>
.home-programming-language-base
{
    font-weight: 700;
}
</style>

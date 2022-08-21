<template>
<div class="about-myself-column">
    <h3 class="about-myself-column-title" data-testid="title">{{ title }}</h3>
    <p class="about-myself-column-text" data-testid="text" v-html="text"/>
</div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import useStore from '@/store';

const props = defineProps<{title: string, text: string}>();

const store = useStore();

const text = computed(() =>
    props.text
        .replace(/\*[^*]+\*/g, (text) =>
            `<strong>${text.slice(1, -1)}</strong>`)
        .replace(/{{age}}/, store.age.toString())
        .replace(/{{programmingLanguages}}/, store.programmingLanguagesString)
);
</script>

<style lang="scss" scoped>
.about-myself-column
{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 420px;
}

.about-myself-column-title
{
    font-size: 30px;
    font-weight: 700;
}
</style>

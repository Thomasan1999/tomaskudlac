<script lang="ts" setup>
    import { computed } from 'vue';
    import useStore from '@/store';
    import { AboutMyselfColumnProps } from '@/components/main/about-myself/types';

    const { text } = defineProps<AboutMyselfColumnProps>();

    const store = useStore();

    const parsedText = computed(() =>
        text
            .replace(/\*[^*]+\*/g, (textPart) => `<strong>${textPart.slice(1, -1)}</strong>`)
            .replace(/{{age}}/, store.age.toString())
            .replace(/{{programmingLanguages}}/, store.programmingLanguagesString),
    );
</script>

<template>
    <div class="about-myself-column">
        <h3
            class="about-myself-column-title"
            data-testid="title"
        >
            {{ title }}
        </h3>
        <p
            class="about-myself-column-text"
            data-testid="text"
            v-html="parsedText"
        />
    </div>
</template>

<style lang="scss" scoped>
    .about-myself-column {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 25px;
        max-width: 420px;
    }

    .about-myself-column-title {
        font-size: 30px;
        font-weight: 700;
    }
</style>

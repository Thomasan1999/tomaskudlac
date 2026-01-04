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
    <div
        data-testid="about-myself-column"
        class="box-border flex max-w-[26.25rem] flex-col gap-6"
    >
        <h3
            class="text-3xl font-bold"
            data-testid="title"
        >
            {{ title }}
        </h3>
        <p
            data-testid="text"
            v-html="parsedText"
        />
    </div>
</template>

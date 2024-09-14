<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import mainSections from '@/components/main/mainSections';
    import { MainSectionProps } from '@/components/main/types';

    const props = withDefaults(defineProps<MainSectionProps>(), { heading: false });

    const root = ref<HTMLDivElement | null>(null);

    const activeSection = computed(() => mainSections[props.name]);

    const id = computed(() => activeSection.value.id);

    const title = computed(() => activeSection.value.title);
</script>

<template>
    <section
        class="main-section"
        :id="id"
        ref="root"
    >
        <div class="text-content">
            <h2
                class="main-section-name"
                v-if="heading"
            >
                {{ title }}
            </h2>
        </div>
        <slot />
    </section>
</template>

<style lang="scss" scoped>
    .main-section {
        align-items: center;
        display: flex;
        flex-direction: column;
        row-gap: var(--main-row-gap);
        z-index: 1;
    }

    .main-section-name {
        font-size: var(--main-section-name-font-size);
    }
</style>

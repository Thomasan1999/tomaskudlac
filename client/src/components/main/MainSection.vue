<script lang="ts" setup>
    import { computed } from 'vue';
    import mainSections from '@/components/main/mainSections';
    import { MainSectionProps } from '@/components/main/types';

    const props = withDefaults(defineProps<MainSectionProps>(), { heading: false });

    const activeSection = computed(() => mainSections[props.name]);

    const id = computed(() => activeSection.value.id);

    const title = computed(() => activeSection.value.title);
</script>

<template>
    <section
        :id="id"
        class="main-section"
    >
        <div class="text-content">
            <h2
                v-if="heading"
                class="main-section-name"
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

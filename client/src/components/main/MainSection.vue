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

<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import mainSections from '@/components/main/mainSections';

    const props = withDefaults(defineProps<{ heading?: boolean; name: string }>(), { heading: false });

    const root = ref<HTMLDivElement | null>(null);

    const activeSection = computed(() => mainSections[props.name]);

    const id = computed(() => activeSection.value.id);

    const title = computed(() => activeSection.value.title);
</script>

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

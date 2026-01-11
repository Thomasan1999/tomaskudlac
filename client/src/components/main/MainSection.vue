<script lang="ts" setup>
    import { computed } from 'vue';
    import mainSections from '@/components/main/mainSections';
    import { MainSectionProps } from '@/components/main/types';

    const { heading = false, name } = defineProps<MainSectionProps>();

    const activeSection = computed(() => mainSections[name]);

    const id = computed(() => activeSection.value.id);

    const title = computed(() => activeSection.value.title);
</script>

<template>
    <section
        :id="id"
        class="main-section gap-y-main-row-gap z-1 flex flex-col items-center"
    >
        <div class="text-content">
            <h2
                v-if="heading"
                class="max-lg:text-[2.8125rem] lg:text-[3.125rem]"
            >
                {{ title }}
            </h2>
        </div>
        <slot />
    </section>
</template>

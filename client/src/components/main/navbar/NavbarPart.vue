<script setup lang="ts">
    import { VNode } from 'vue';

    const { outer = false } = defineProps<{
        outer?: boolean;
    }>();
    defineSlots<{
        default(): VNode[];
    }>();
</script>

<template>
    <div
        class="flex items-center lg:h-navbar-height"
        :class="outer ? 'absolute top-0 max-lg:relative' : ''"
    >
        <slot />
    </div>
</template>

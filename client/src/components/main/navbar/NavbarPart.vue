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
        class="h-navbar-height flex items-center"
        :class="outer ? 'absolute top-0 max-lg:relative' : ''"
    >
        <slot />
    </div>
</template>

<template>
    <span
        data-testid="cursor"
        class="animate-wiggle inline-flex h-[1.2em] w-0.5 bg-current"
        :class="{ 'animate-blinking': blinking }"
    />
</template>

<script lang="ts" setup>
    defineProps<{
        blinking: boolean;
    }>();
</script>

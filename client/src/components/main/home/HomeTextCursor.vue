<template>
    <span
        data-testid="cursor"
        class="animate-wiggle bg-current h-[1.2em] inline-flex w-0.5"
        :class="{ 'animate-blinking': blinking }"
    />
</template>

<script lang="ts" setup>
    defineProps<{
        blinking: boolean;
    }>();
</script>

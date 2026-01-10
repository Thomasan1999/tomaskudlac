<script setup lang="ts">
    import { NavbarIconLineProps, NavbarIconMode } from '@/components/main/navbar/types';

    defineProps<NavbarIconLineProps>();
</script>

<template>
    <svg
        class="absolute left-0"
        :class="
            mode === NavbarIconMode.CROSS
                ? 'top-[40%] transition-[top_0.4s_0s,transform_0.4s_0.4s]'
                : 'rotate-0 transition-[top_0.4s_,transform_0.4s,0.4s_0s]'
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 3"
    >
        <rect
            class="origin-center fill-white"
            height="3"
            width="24"
        />
    </svg>
</template>

<script setup lang="ts">
    import { AboutMyselfPhotoContainerProps } from '@/components/main/about-myself/types';

    defineProps<AboutMyselfPhotoContainerProps>();
</script>

<template>
    <div
        data-testid="about-myself-photo-container"
        class="flex justify-center"
    >
        <img
            class="max-w-full rounded-full"
            :alt="alt"
            data-testid="photo"
            loading="lazy"
            :src="src"
        />
    </div>
</template>

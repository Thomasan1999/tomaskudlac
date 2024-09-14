<script setup lang="ts">
    import { AboutMyselfPhotoContainerProps } from '@/components/main/about-myself/types';

    defineProps<AboutMyselfPhotoContainerProps>();
</script>

<template>
    <picture
        data-testid="about-myself-photo-container"
        class="flex justify-center"
    >
        <source
            data-testid="webp-src"
            type="image/webp"
            :srcset="webpSrc"
        />
        <source
            data-testid="jpg-src"
            type="image/jpeg"
            :srcset="jpgSrc"
        />
        <img
            class="max-w-full rounded-full"
            :alt="alt"
            data-testid="photo"
            :src="jpgSrc"
        />
    </picture>
</template>

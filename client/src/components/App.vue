<script lang="ts" setup>
    import useStore from '@/store';
    import { computed } from 'vue';
    import ToastContainer from '@/components/toast/ToastContainer.vue';
    import { InitializingState } from '@/store/types';

    const store = useStore();

    const initialized = computed(() => store.initState === InitializingState.INITIALIZED);

    // Nothing renders until the store is ready, so a rejected init would otherwise leave a blank page and no trace.
    store.init().catch((error: unknown) => {
        console.error('Failed to initialize the application.', error);
    });

    const scrollbarWidth = computed(() => store.scrollbarWidth);

    const windowHeight = computed(() => store.windowHeight);
</script>

<template>
    <RouterView
        v-if="initialized"
        :style="`--scrollbar-width: ${scrollbarWidth}px; --vh: ${windowHeight / 100}px`"
    />
    <ToastContainer />
</template>

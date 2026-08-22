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
    <!--
        Teleport target for toasts and modals. It lives here rather than inside Main because ToastContainer mounts
        immediately while Main only renders once the store is ready - a target that appears later is never picked up,
        since Teleport resolves it on mount and does not retry.
    -->
    <div
        id="modal-container"
        class="fixed top-0 left-0 z-100 h-0 w-0"
    />
    <ToastContainer />
</template>

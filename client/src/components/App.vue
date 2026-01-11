<script lang="ts" setup>
    import useStore from '@/store';
    import { computed, ref } from 'vue';
    import ToastContainer from '@/components/toast/ToastContainer.vue';

    const store = useStore();

    const initialized = ref(false);

    store.init().then(() => {
        initialized.value = true;
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

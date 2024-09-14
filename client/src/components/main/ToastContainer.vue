<script setup lang="ts">
    import Toast from '@/components/main/Toast.vue';
    import useStore from '@/store';

    const store = useStore();
</script>

<template>
    <Toast
        v-for="(toast, toastIndex) in store.toasts"
        v-bind="toast"
        @close="store.removeToast(toastIndex)"
    />
</template>

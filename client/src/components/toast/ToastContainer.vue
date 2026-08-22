<script setup lang="ts">
    import Toast from '@/components/toast/Toast.vue';
    import useStore from '@/store';

    const store = useStore();
</script>

<template>
    <Toast
        v-for="toast in store.toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        @close="store.removeToast(toast.id)"
    />
</template>

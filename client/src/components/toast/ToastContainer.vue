<script setup lang="ts">
    import Toast from '@/components/toast/Toast.vue';
    import useStore from '@/store';

    const store = useStore();
</script>

<template>
    <!--
        One live region hosting every toast, rather than each toast announcing itself: a region has to exist before
        content lands in it to be announced reliably, and this element is mounted for the life of the page.
        Not atomic, so adding a toast does not re-read the ones already on screen.
    -->
    <Teleport to="#modal-container">
        <div
            aria-atomic="false"
            aria-live="polite"
            class="contents"
            data-testid="toast-container"
            role="status"
        >
            <Toast
                v-for="toast in store.toasts"
                :key="toast.id"
                :message="toast.message"
                :type="toast.type"
                @close="store.removeToast(toast.id)"
            />
        </div>
    </Teleport>
</template>

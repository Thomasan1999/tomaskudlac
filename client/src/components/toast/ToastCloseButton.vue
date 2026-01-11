<script setup lang="ts">
    import CloseIcon from '@/components/main/CloseIcon.vue';
    import { computed } from 'vue';
    import useStore from '@/store';

    defineEmits<{
        click: [];
    }>();

    const store = useStore();

    const locales = computed(() => store.locales.toasts);
</script>

<template>
    <button
        class="group absolute top-0 right-0 p-2 leading-0"
        data-testid="close-button"
        :title="locales.closeButtonTitle"
        @click="$emit('click')"
    >
        <CloseIcon class="h-3 group-hover:fill-[#dda373]" />
    </button>
</template>

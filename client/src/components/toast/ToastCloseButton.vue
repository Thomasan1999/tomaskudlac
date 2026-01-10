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
        class="leading-0 group absolute right-0 top-0 p-2"
        data-testid="close-button"
        :title="locales.closeButtonTitle"
        @click="$emit('click')"
    >
        <CloseIcon class="h-3 group-hover:fill-[#dda373]" />
    </button>
</template>

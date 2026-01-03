<script lang="ts" setup>
    import { computed } from 'vue';
    import useStore from '@/store';
    import { ContactFormLabelTextProps } from '@/components/main/contact/form/types';

    const store = useStore();

    defineProps<ContactFormLabelTextProps>();

    const locales = computed(() => store.locales.sections.contact.form);
</script>

<template>
    <span
        data-testid="label-text"
        class="w-full text-left leading-10 lg:w-label lg:text-right"
    >
        {{ text }}:
        <span
            data-testid="required"
            class="pr-1"
            :style="{ visibility: fieldRequired ? 'visible' : 'hidden' }"
            :title="locales.required"
            >*</span
        >
    </span>
</template>

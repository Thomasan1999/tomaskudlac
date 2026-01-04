<script lang="ts" setup>
    import { computed } from 'vue';
    import useStore from '@/store';
    import { ContactFormBottomPartProps } from '@/components/main/contact/form/types';

    const store = useStore();

    const props = defineProps<ContactFormBottomPartProps>();

    defineEmits<{
        (e: 'click'): void;
    }>();

    const locales = computed(() => store.locales.sections.contact.form);

    const submitTitle = computed(() =>
        props.formValid ? locales.value.submitTitle : locales.value.submitTitleDisabled,
    );
</script>

<template>
    <div
        data-testid="contact-form-bottom-part"
        class="ml-0 flex flex-col items-center justify-center gap-6 text-xl lg:ml-label"
    >
        <p data-testid="required-legend">
            {{ locales.requiredLegend }}
        </p>
        <button
            data-testid="submit-button"
            class="contact-form-submit h-12 w-full max-w-52 bg-primary transition-colors duration-300 hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-gray-500"
            :disabled="submitDisabled"
            :title="submitTitle"
            @click="$emit('click')"
        >
            {{ locales.submitLabel }}
        </button>
    </div>
</template>

<template>
    <div
        data-testid="contact-form-bottom-part"
        class="flex flex-col gap-6 items-center justify-center lg:ml-label ml-0 text-xl"
    >
        <p data-testid="required-legend">
            {{ locales.requiredLegend }}
        </p>
        <button
            data-testid="submit-button"
            :class="`bg-primary contact-form-submit duration-300 h-12 max-w-52 transition-colors
                w-full disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-primary-light`"
            :disabled="submitDisabled"
            :title="submitTitle"
            @click="$emit('click')"
        >
            {{ locales.submitLabel }}
        </button>
    </div>
</template>

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

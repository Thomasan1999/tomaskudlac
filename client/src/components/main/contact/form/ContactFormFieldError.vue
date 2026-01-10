<script lang="ts" setup>
    import { computed } from 'vue';
    import useStore from '@/store';
    import { ContactFormFieldErrorProps } from '@/components/main/contact/form/types';

    const { error } = defineProps<ContactFormFieldErrorProps>();

    const store = useStore();

    const locales = computed(() => store.locales.sections.contact.form.errors);

    const message = computed(() => locales.value[error!]);
</script>

<template>
    <div
        v-if="error"
        data-testid="contact-form-field-error"
        class="relative left-0 right-auto top-2.5 m-0 flex items-center justify-center whitespace-nowrap bg-primary-red px-4 py-contact-form-data-padding-vertical text-white after:absolute after:-top-5 after:bottom-auto after:left-0 after:right-auto after:m-auto after:block after:h-0 after:w-0 after:border-[.625rem] after:border-transparent after:border-b-primary-red after:content-[''] lg:absolute lg:left-[calc(100%+.625rem)] lg:top-auto lg:m-auto lg:after:bottom-0 lg:after:left-auto lg:after:right-full lg:after:top-0 lg:after:border-b-transparent lg:after:border-r-primary-red"
    >
        <div>{{ message }}</div>
    </div>
</template>

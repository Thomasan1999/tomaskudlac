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
        class="bg-primary-red py-contact-form-data-padding-vertical max-lg:after:border-b-primary-red lg:after:border-r-primary-red flex items-center justify-center px-4 whitespace-nowrap text-white after:absolute after:m-auto after:block after:h-0 after:w-0 after:border-[.625rem] after:border-transparent after:content-[''] max-lg:relative max-lg:top-2.5 max-lg:left-0 max-lg:m-0 max-lg:after:-top-5 max-lg:after:bottom-auto max-lg:after:left-0 lg:absolute lg:top-auto lg:left-[calc(100%+.625rem)] lg:m-auto lg:after:top-0 lg:after:right-full lg:after:bottom-0 lg:after:left-auto lg:after:border-b-transparent"
    >
        <div>{{ message }}</div>
    </div>
</template>

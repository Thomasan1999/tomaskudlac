<script lang="ts" setup>
    import { computed, useTemplateRef } from 'vue';
    import useStore from '@/store';
    import ContactFormField from '@/components/main/contact/form/ContactFormField.vue';
    import contactFormFields from '@/components/main/contact/form/contactFormFields';
    import type { ContactFormFieldData } from '@/components/main/contact/form/types';
    import { ToastType } from '@/store/types';
    import ContactFormBottomPart from '@/components/main/contact/form/ContactFormBottomPart.vue';

    const store = useStore();

    const onSubmit = async (): Promise<void> => {
        const form = root.value!;

        touch();

        if (!valid.value) {
            return;
        }

        const { apiMessages } = locales.value;

        return fetch(form.action, { body: new FormData(form), method: form.method })
            .then(async (res) => {
                if (res.status >= 400) {
                    throw new Error(await res.text());
                }

                store.addToast({
                    message: apiMessages.success,
                    type: ToastType.SUCCESS,
                });
                form.reset();
            })
            .catch((err: Error) => {
                store.addToast({
                    message: apiMessages[err.message] ?? apiMessages['Unable to send the email'],
                    type: ToastType.FAIL,
                });
            });
    };

    const onValidSet = (field: ContactFormFieldData, newValue): void => {
        field.touched = true;
        field.valid = newValue;
    };

    const touch = (): void => {
        fields.forEach((field) => {
            field.touched = true;
        });
    };

    const fields = contactFormFields;

    const root = useTemplateRef('root');

    const submitDisabled = computed(() => touched.value && !valid.value);

    const language = computed(() => store.language);

    const locales = computed(() => store.locales.sections.contact.form);

    const touched = computed(() => fields.some((field) => field.touched));

    const valid = computed(() => fields.every((field) => field.valid));
</script>

<template>
    <form
        ref="root"
        data-testid="contact-form"
        class="flex w-full max-w-none flex-col gap-5 font-contact lg:-ml-label lg:max-w-[43.75rem]"
        action="/contact-form/send-mail"
        method="post"
        @submit.prevent="onSubmit"
    >
        <ContactFormField
            v-for="field in fields"
            v-bind="field"
            v-model="field.value"
            :label="locales[field.name]"
            @blur="field.touched = true"
            @validSet="(newValue) => onValidSet(field, newValue)"
        />
        <input
            hidden
            name="lang"
            :value="language"
        />
        <ContactFormBottomPart
            :formValid="valid"
            :submitDisabled="submitDisabled"
        />
    </form>
</template>

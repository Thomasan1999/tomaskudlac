<template>
    <form
        class="contact-form -ml-label"
        action="/contact-form/send-mail"
        method="post"
        ref="root"
        @submit.prevent="onSubmit"
    >
        <ContactFormField
            v-for="field in fields"
            :label="locales[field.name]"
            v-bind="field"
            v-model="field.value"
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

<script lang="ts" setup>
    import { computed, ref } from 'vue';
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

    const root = ref<HTMLFormElement>();

    const submitDisabled = computed(() => touched.value && !valid.value);

    const language = computed(() => store.language);

    const locales = computed(() => store.locales.sections.contact.form);

    const touched = computed(() => fields.some((field) => field.touched));

    const valid = computed(() => fields.every((field) => field.valid));
</script>

<style lang="scss" scoped>
    .contact-form {
        --contact-form-font-family: Montserrat, sans-serif;
        --contact-form-input-height: 2.5em;
        --contact-form-line-height: 1.5em;
        --contact-form-label-width: 100px;
        --contact-form-max-width: 700px;

        display: flex;
        font-family: var(--contact-form-font-family);
        flex-direction: column;
        gap: 20px;
        max-width: var(--contact-form-max-width);
        width: 100%;

        @media (max-width: 1023px) {
            margin-left: 0;
            max-width: none;
        }
    }
</style>

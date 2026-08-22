<script lang="ts" setup>
    import { computed, ref, watch } from 'vue';
    import { Merge } from 'ts-essentials';
    import ContactFormFieldError from '@/components/main/contact/form/ContactFormFieldError.vue';
    import {
        ContactFormFieldElement,
        ContactFormFieldErrorKey,
        ContactFormFieldProps,
        ContactFormFieldType,
    } from '@/components/main/contact/form/types';
    import ContactFormLabelText from '@/components/main/contact/form/ContactFormLabelText.vue';

    const {
        element = ContactFormFieldElement.INPUT,
        maxlength,
        minlength = 0,
        name,
        pattern,
        required = false,
        touched,
        type = ContactFormFieldType.TEXT,
        valid,
    } = defineProps<ContactFormFieldProps>();
    const emit = defineEmits<{
        (event: 'blur'): void;
        (event: 'validSet', value: boolean): void;
    }>();
    const model = defineModel<string>({
        required: true,
    });

    const onBlur = (): void => {
        inputting.value = false;
        emit('blur');
    };

    const onInput = ($event: Merge<KeyboardEvent, { target: HTMLInputElement | HTMLTextAreaElement }>): void => {
        inputting.value = true;
        model.value = $event.target.value;
    };

    const inputting = ref(false);

    const dynamicProps = computed(() => (element === ContactFormFieldElement.INPUT ? { type } : undefined));

    /** Ties the label and the error message to the control, which a wrapping label alone does not do. */
    const fieldId = computed(() => `contact-form-${name}`);

    const errorId = computed(() => `${fieldId.value}-error`);

    /** Key into the error locales, or undefined while there is nothing to report. */
    const error = computed<ContactFormFieldErrorKey | undefined>(() => {
        if (valid || !touched || inputting.value) {
            return undefined;
        }

        if (missingValue.value) {
            return 'empty';
        }

        return validFormat.value ? undefined : 'invalidFormat';
    });

    const missingValue = computed(() => required && !model.value);

    const validFormat = computed(() => (!required && !model.value) || !pattern || Boolean(model.value.match(pattern)));

    watch(model, () => {
        const newValidValue = validFormat.value && !missingValue.value;

        emit('validSet', newValidValue);
    });

    watch(
        () => maxlength,
        (value) => {
            if (typeof value !== 'number' || value <= 0) {
                throw new Error('Max length must be larger than 0');
            }
        },
    );

    watch(
        () => minlength,
        (value) => {
            if (value < 0) {
                throw new Error('Min length must be larger or equal to 0');
            }
        },
    );
</script>

<template>
    <label
        :data-testid="`field-${name}`"
        class="relative flex flex-wrap"
        :class="error ? 'text-error-text' : ''"
        :for="fieldId"
    >
        <ContactFormLabelText
            :fieldRequired="required"
            :text="label"
        />
        <Component
            :is="element"
            :id="fieldId"
            :aria-describedby="error ? errorId : undefined"
            :aria-invalid="Boolean(error)"
            class="font-inherit bg-contact-form-data-bg py-contact-form-data-padding-vertical box-border flex grow resize-none appearance-none overflow-auto border border-solid! border-[#cccccc] pl-4 leading-normal text-current outline-none max-lg:w-full"
            :class="[element === 'input' ? 'h-[2.5em]' : 'h-[8lh]', error ? 'border-error-text bg-error-bg' : '']"
            :minlength="minlength"
            :maxlength="maxlength"
            :name="name"
            :required="required"
            :value="model"
            v-bind="dynamicProps"
            @blur="onBlur"
            @input="onInput"
        />
        <ContactFormFieldError
            :id="errorId"
            :error="error"
        />
    </label>
</template>

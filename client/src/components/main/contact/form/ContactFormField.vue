<template>
    <label
        :data-testid="`field-${name}`"
        class="contact-form-field"
        :class="{ 'has-error': error }"
    >
        <ContactFormLabelText
            :fieldRequired="required"
            :text="label"
        />
        <Component
            :is="element"
            class="contact-form-data flex-grow"
            :class="[`contact-form-${element}`]"
            :minlength="minlength"
            :maxlength="maxlength"
            :name="name"
            :required="required"
            :value="model"
            v-bind="dynamicProps"
            @blur="onBlur"
            @input="onInput"
        />
        <ContactFormFieldError :error="error" />
    </label>
</template>

<script lang="ts" setup>
    import { computed, ref, watch } from 'vue';
    import useStore from '@/store';
    import { Merge } from 'ts-essentials';
    import ContactFormFieldError from '@/components/main/contact/form/ContactFormFieldError.vue';
    import { ContactFormFieldElement, ContactFormFieldType } from '@/components/main/contact/form/types';
    import ContactFormLabelText from '@/components/main/contact/form/ContactFormLabelText.vue';

    const props = withDefaults(
        defineProps<{
            element?: ContactFormFieldElement;
            label: string;
            maxlength?: number;
            minlength?: number;
            name: string;
            pattern?: RegExp;
            required?: boolean;
            touched: boolean;
            type?: ContactFormFieldType;
            valid: boolean;
        }>(),
        { element: ContactFormFieldElement.INPUT, minlength: 0, required: false, type: ContactFormFieldType.TEXT },
    );
    const emit = defineEmits<{
        (event: 'blur'): void;
        (event: 'validSet', value: boolean): void;
    }>();
    const model = defineModel<string>({
        required: true,
    });

    const store = useStore();

    const onBlur = () => {
        inputting.value = false;
        emit('blur');
    };

    const onInput = (e: any) => {
        const $event: Merge<KeyboardEvent, { target: HTMLInputElement | HTMLTextAreaElement }> = e;

        inputting.value = true;
        model.value = $event.target.value;
    };

    const inputting = ref(false);

    const dynamicProps = computed(() =>
        props.element === ContactFormFieldElement.INPUT ? { type: props.type } : undefined,
    );

    const error = computed(() => {
        if (props.valid || !props.touched || inputting.value) {
            return;
        }

        if (missingValue.value) {
            return 'empty';
        }

        if (!validFormat.value) {
            return 'invalidFormat';
        }
    });

    const locales = computed(() => store.locales.sections.contact.form);

    const missingValue = computed(() => props.required && !model.value);

    const validFormat = computed(() => Boolean(model.value.match(props.pattern)));

    watch(model, () => {
        const newValidValue = validFormat.value && !missingValue.value;

        emit('validSet', newValidValue);
    });

    watch(
        () => props.maxlength,
        (value) => {
            if (value <= 0) {
                throw new Error('Max length must be larger than 0');
            }
        },
    );

    watch(
        () => props.minlength,
        (value) => {
            if (value < 0) {
                throw new Error('Min length must be larger or equal to 0');
            }
        },
    );
</script>

<style lang="scss" scoped>
    .contact-form-field {
        --contact-form-data-background-color: #2d2d2d;
        --contact-form-data-padding-vertical: 8px;

        display: flex;
        flex-wrap: wrap;
        position: relative;

        &.has-error {
            color: #cc0000;

            .contact-form-data {
                background-color: #3e2d2d;
                border-color: #cc0000;
            }
        }
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px var(--contact-form-data-background-color) inset !important;
        -webkit-text-fill-color: #ffffff;
    }

    .contact-form-data {
        appearance: none;
        background-color: var(--contact-form-data-background-color);
        border: 1px solid #cccccc;
        box-sizing: border-box;
        color: currentColor;
        display: flex;
        font: inherit;
        line-height: var(--contact-form-line-height);
        outline: none;
        overflow: auto;
        padding-bottom: var(--contact-form-data-padding-vertical);
        padding-left: 15px;
        padding-top: var(--contact-form-data-padding-vertical);
        resize: none;

        @media (max-width: 1023px) {
            max-width: 100%;
            width: 100%;
        }
    }

    .contact-form-input {
        height: var(--contact-form-input-height);
    }

    .contact-form-textarea {
        height: calc(var(--contact-form-line-height) * 8);
    }
</style>

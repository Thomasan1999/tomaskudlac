<template>
<label class="contact-form-field" :class="{'has-error': error}">
    <span class="contact-form-label" data-testid="label">
        {{ label }}:
        <span
            class="contact-form-required"
            data-testid="required"
            :style="{visibility: required ? 'visible' : 'hidden'}"
            :title="locales.required"
        >*</span>
    </span>
    <component
        :is="element"
        class="contact-form-data"
        :class="[`contact-form-${element}`]"
        :minlength="minlength"
        :maxlength="maxlength"
        :name="name"
        :required="required"
        :value="modelValue"
        v-bind="dynamicProps"
        @blur="onBlur"
        @input="onInput"
    />
    <contact-form-field-error :error="error"/>
</label>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import useStore from '@/store';
import {Merge} from 'ts-essentials';
import ContactFormFieldError from '@/components/main/contact/ContactFormFieldError.vue';

const props = withDefaults(
    defineProps<{
        element?: string,
        label: string,
        maxlength?: number,
        minlength?: number,
        modelValue: string,
        name: string,
        pattern?: RegExp,
        required?: boolean,
        touched: boolean,
        type?: string,
        valid: boolean
    }>(),
    {element: 'input', minlength: 0, required: false, type: 'text'}
);
const emit = defineEmits<{
    (event: 'blur'): void,
    (event: 'update:modelValue', value: string): void,
    (event: 'validSet', value: boolean): void
}>();

const store = useStore();

const convertRegexToValidHtml = (regex: RegExp) => regex.toString().replace(/^\/|\/[^/]*$/g, '');

const onBlur = () =>
{
    inputting.value = false;
    emit('blur');
};

const onInput = (e: any) =>
{
    const $event: Merge<KeyboardEvent, {target: HTMLInputElement | HTMLTextAreaElement}> = e;

    inputting.value = true;
    emit('update:modelValue', $event.target.value);
};

const inputting = ref(false);

const dynamicProps = computed(() =>
    props.element === 'input'
        ? {
            ...(props.pattern && {pattern: convertRegexToValidHtml(props.pattern)}),
            type: props.type
        }
        : undefined
);

const error = computed(() =>
{
    if (props.valid || !props.touched || inputting.value)
    {
        return;
    }

    if (missingValue.value)
    {
        return 'empty';
    }

    if (!validFormat.value)
    {
        return 'invalidFormat';
    }
});

const locales = computed(() => store.locales.sections.contact.form);

const missingValue = computed(() => props.required && !props.modelValue);

const validFormat = computed(() => Boolean(props.modelValue.match(props.pattern)));

watch(() => props.modelValue, () =>
{
    const newValidValue = validFormat.value && !missingValue.value;

    emit('validSet', newValidValue);
});

watch(() => props.maxlength, (value) =>
{
    if (value <= 0)
    {
        throw new Error('Max length must be larger than 0');
    }
});

watch(() => props.minlength, (value) =>
{
    if (value < 0)
    {
        throw new Error('Min length must be larger or equal to 0');
    }
});
</script>

<style lang="scss" scoped>
.contact-form-field
{
    --contact-form-data-background-color: #2d2d2d;
    --contact-form-data-padding-vertical: 8px;

    display: flex;
    flex-wrap: wrap;
    position: relative;

    &.has-error
    {
        color: #cc0000;

        .contact-form-data
        {
            background-color: #3e2d2d;
            border-color: #cc0000;
        }
    }
}

.contact-form-label
{
    line-height: var(--contact-form-input-height);
    text-align: right;
    width: var(--contact-form-label-width);

    @media (max-width: 1023px)
    {
        text-align: left;
        width: 100%;
    }
}

.contact-form-required
{
    padding-right: 5px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
{
    -webkit-box-shadow: 0 0 0 30px var(--contact-form-data-background-color) inset !important;
    -webkit-text-fill-color: #ffffff;
}

.contact-form-data
{
    appearance: none;
    background-color: var(--contact-form-data-background-color);
    border: 1px solid #cccccc;
    box-sizing: border-box;
    color: currentColor;
    display: flex;
    flex-grow: 1;
    font: inherit;
    line-height: var(--contact-form-line-height);
    max-width: calc(var(--contact-form-max-width) - var(--contact-form-label-width));
    outline: none;
    overflow: auto;
    padding-bottom: var(--contact-form-data-padding-vertical);
    padding-left: 15px;
    padding-top: var(--contact-form-data-padding-vertical);
    resize: none;
    width: calc(100% - var(--contact-form-label-width));

    @media (max-width: 1023px)
    {
        max-width: 100%;
        width: 100%;
    }
}

.contact-form-input
{
    height: var(--contact-form-input-height);
}

.contact-form-textarea
{
    height: calc(var(--contact-form-line-height) * 8);
}
</style>

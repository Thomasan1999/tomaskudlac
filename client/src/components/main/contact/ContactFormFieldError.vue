<template lang="pug">
div.contact-form-field-error(v-if="error")
    div.contact-form-field-error-message {{message}}
</template>

<script lang="ts">
import {computed} from 'vue';
import useStore from '@/store';

export default {
    name: 'ContactFormFieldError',
    props: {
        error: {
            type: String
        }
    },
    setup(props)
    {
        const store = useStore();

        const locales = computed(() => store.locales.sections.contact.form.errors);

        const message = computed(() => locales.value[props.error]);

        return {
            message
        };
    }
};
</script>

<style lang="scss" scoped>
.contact-form-field-error
{
    --contact-form-field-error-arrow-width: 10px;

    align-items: center;
    background-color: var(--primary-red);
    color: #ffffff;
    display: flex;
    justify-content: center;
    left: calc(100% + var(--contact-form-field-error-arrow-width));
    margin: auto;
    padding-bottom: var(--contact-form-data-padding-vertical);
    padding-left: 16px;
    padding-right: 16px;
    padding-top: var(--contact-form-data-padding-vertical);
    position: absolute;
    white-space: nowrap;

    @media (max-width: 1023px)
    {
        left: 0;
        margin: 0;
        position: relative;
        right: auto;
        top: var(--contact-form-field-error-arrow-width);
    }

    &:after
    {
        border-color: transparent;
        border-style: solid;
        border-width: var(--contact-form-field-error-arrow-width);
        border-right-color: var(--primary-red);
        bottom: 0;
        content: '';
        display: block;
        height: 0;
        margin: auto;
        position: absolute;
        right: 100%;
        top: 0;
        width: 0;

        @media (max-width: 1023px)
        {
            border-bottom-color: var(--primary-red);
            border-right-color: transparent;
            bottom: auto;
            left: 0;
            right: auto;
            top: calc(var(--contact-form-field-error-arrow-width) * -2);
        }
    }
}
</style>

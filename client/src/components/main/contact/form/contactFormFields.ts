import { reactive } from 'vue';
import {
    ContactFormFieldData,
    ContactFormFieldElement,
    ContactFormFieldType,
} from '@/components/main/contact/form/types';

const contactFormFields = reactive<ContactFormFieldData[]>([
    {
        maxlength: 64,
        minlength: 0,
        name: 'name',
        pattern: /^(\d|[a-zA-Z]|[\u00c0-\u024f]| )+$/i,
        touched: false,
        valid: true,
        value: '',
    },
    {
        maxlength: 64,
        minlength: 0,
        name: 'email',
        pattern:
            /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        touched: false,
        type: ContactFormFieldType.EMAIL,
        valid: false,
        value: '',
    },
    {
        maxlength: 64,
        minlength: 0,
        name: 'phone',
        pattern: /^(?:[+\d].*\d|\d)$/,
        touched: false,
        type: ContactFormFieldType.TEL,
        valid: true,
        value: '',
    },
    {
        element: ContactFormFieldElement.TEXTAREA,
        name: 'message',
        required: true,
        touched: false,
        valid: false,
        value: '',
    },
]);

export default contactFormFields;

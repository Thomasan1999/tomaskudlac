import { reactive } from 'vue';
import {
    ContactFormFieldData,
    ContactFormFieldElement,
    ContactFormFieldType,
} from '@/components/main/contact/form/types';

/** The parts of a field that never change - everything except `touched`, `valid` and `value`. */
type ContactFormFieldConfig = Omit<ContactFormFieldData, 'touched' | 'valid' | 'value'>;

const contactFormFieldConfigs: ContactFormFieldConfig[] = [
    {
        maxlength: 64,
        minlength: 0,
        name: 'name',
        pattern: /^(\d|[a-zA-Z]|[\u00c0-\u024f]| )+$/i,
    },
    {
        maxlength: 64,
        minlength: 0,
        name: 'email',
        pattern:
            /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        type: ContactFormFieldType.EMAIL,
    },
    {
        maxlength: 64,
        minlength: 0,
        name: 'phone',
        pattern: /^(?:[+\d].*\d|\d)$/,
        type: ContactFormFieldType.TEL,
    },
    {
        element: ContactFormFieldElement.TEXTAREA,
        name: 'message',
        required: true,
    },
];

/** The state a field starts in, and returns to after the form is submitted. An empty optional field is valid. */
function buildInitialState(config: ContactFormFieldConfig): Pick<ContactFormFieldData, 'touched' | 'valid' | 'value'> {
    return { touched: false, valid: !config.required, value: '' };
}

/**
 * Builds a fresh set of form fields.
 *
 * Called per component instance rather than shared as a module singleton, so that values, `touched` and `valid` do
 * not outlive the form they belong to.
 */
export function createContactFormFields(): ContactFormFieldData[] {
    return reactive(contactFormFieldConfigs.map((config) => ({ ...config, ...buildInitialState(config) })));
}

/** Returns the fields to their initial state in place, keeping the array the template is iterating. */
export function resetContactFormFields(fields: ContactFormFieldData[]): void {
    fields.forEach((field) => {
        Object.assign(field, buildInitialState(field));
    });
}

export enum ContactFormFieldElement {
    INPUT = 'input',
    TEXTAREA = 'textarea',
}

export enum ContactFormFieldType {
    EMAIL = 'email',
    TEL = 'tel',
    TEXT = 'text',
}

export type ContactFormFieldData = {
    element?: ContactFormFieldElement;
    maxlength?: number;
    minlength?: number;
    name: ContactFormFieldName;
    pattern?: RegExp;
    required?: boolean;
    touched: boolean;
    type?: ContactFormFieldType;
    valid: boolean;
    value: string;
};

export interface ContactFormBottomPartProps {
    formValid: boolean;
    submitDisabled: boolean;
}

export interface ContactFormFieldProps {
    element?: ContactFormFieldElement;
    label: string;
    maxlength?: number;
    minlength?: number;
    name: ContactFormFieldName;
    pattern?: RegExp;
    required?: boolean;
    touched: boolean;
    type?: ContactFormFieldType;
    valid: boolean;
}

/** Names of the contact form fields. They double as keys into the form locales. */
export type ContactFormFieldName = 'email' | 'message' | 'name' | 'phone';

/** Keys of the field error messages in the locales. */
export type ContactFormFieldErrorKey = 'empty' | 'invalidFormat';

export interface ContactFormFieldErrorProps {
    error?: ContactFormFieldErrorKey;
    /** Id the input points at through aria-describedby. */
    id: string;
}

export interface ContactFormLabelTextProps {
    fieldRequired: boolean;
    text: string;
}

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
    name: string;
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

export interface ContactFormLabelTextProps {
    fieldRequired: boolean;
    text: string;
}

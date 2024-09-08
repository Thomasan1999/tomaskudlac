export enum ContactFormFieldElement {
    INPUT = 'input',
    TEXTAREA = 'textarea',
}

export type ContactFormFieldData = {
    element?: ContactFormFieldElement;
    maxlength?: number;
    minlength?: number;
    name: string;
    pattern?: RegExp;
    required?: boolean;
    touched: boolean;
    type?: 'email' | 'tel' | 'text';
    valid: boolean;
    value: string;
};

export interface ContactFormBottomPartProps {
    formValid: boolean;
    submitDisabled: boolean;
}

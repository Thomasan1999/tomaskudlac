export type ContactFormFieldData = {
    element?: 'input' | 'textarea'
    maxlength?: number,
    minlength?: number,
    name: string,
    pattern?: RegExp,
    required?: boolean
    touched: boolean,
    type?: 'email' | 'tel' | 'text',
    valid: boolean,
    value: string
}

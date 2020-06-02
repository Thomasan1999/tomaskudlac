/** @description Types of a form element error type. */
export type FormElementErrorType = 'empty' | 'invalid' | '';

/** @description Type of a form element. */
export type FormElement = {
    /** @description Color of a form element input text. */
    color: string,
    /** @description Determines whether an error message is shown. */
    errorShow: boolean,
    /** @description Determines the type of an error message. */
    errorType: FormElementErrorType,
    /** @description Snake case name of the element, used as an id in HTML. */
    readonly htmlName: string,
    /** @description Determines whether the user is inputting something in the form element. */
    inputting: boolean,
    /** @description Determines the minimal and maximal length of a form element input. */
    readonly length: { min: number, max: number },
    /** @description The name of the form element by which the element will be accessed (identical to the key of the form element in the containing object). */
    readonly name: string,
    /** @description Determines whether the form element needs to have a value to be able to send the form in which the element is placed in. */
    readonly required: boolean,
    /** @description HTML tag of the form element. */
    readonly tag: 'input' | 'textarea' | 'span',
    /** @description Type of the form element value. it is used to determine the validity of the input, or parse the input itself before submitting the form. */
    readonly type: string,
    /** @description Determines whether the form element value is valid. */
    valid: boolean,
    /** @description Regex used to determine the validity of the form element value. */
    readonly validateRegex: RegExp,
    /** @description Determines whether the length of the form element value is valid. */
    validLength: boolean,
    /** @description The value of the form element, in case of a basic form element, it corresponds to the inputted value by the user. */
    value: string
}

/** @description Types of form elements. */
export type FormElements = 'email' | 'message' | 'name' | 'tel';
/** @description Default types of form elements. */
export type FormDefaults = 'default' | FormElements;

/** @description Type containing all possible default values of a form element property. */
export type FormDefaultsType<T> = { [s in FormDefaults]?: T } | T;

declare let __VLS_typeProps: {
    element?: string;
    label: string;
    maxlength?: number;
    minlength?: number;
    name: string;
    pattern?: RegExp;
    required?: boolean;
    touched: boolean;
    type?: string;
    valid: boolean;
};
type __VLS_PublicProps = {
    modelValue: string;
} & typeof __VLS_typeProps;
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<__VLS_PublicProps>, {
    element: string;
    minlength: number;
    required: boolean;
    type: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    blur: () => void;
    validSet: (value: boolean) => void;
    "update:modelValue": (modelValue: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<__VLS_PublicProps>, {
    element: string;
    minlength: number;
    required: boolean;
    type: string;
}>>> & {
    onBlur?: (() => any) | undefined;
    onValidSet?: ((value: boolean) => any) | undefined;
    "onUpdate:modelValue"?: ((modelValue: string) => any) | undefined;
}, {
    type: string;
    required: boolean;
    element: string;
    minlength: number;
}, {}>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};

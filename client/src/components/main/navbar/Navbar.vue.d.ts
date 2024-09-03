import MainSectionObject from '@/components/main/MainSectionObject';
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToOption<{
    activeSection: string;
    sections: [string, MainSectionObject][];
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    languageToggle: () => void;
    linkClick: (sectionName: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<{
    activeSection: string;
    sections: [string, MainSectionObject][];
}>>> & {
    onLanguageToggle?: (() => any) | undefined;
    onLinkClick?: ((sectionName: string) => any) | undefined;
}, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};

declare global
{
    /** @description Makes recursively all properties of a variable readonly, native readonly is for the direct properties of a variable only. */
    type DeepReadonly<T> =
        T extends (infer R)[] ? DeepReadonlyArray<R> :
            T extends Function ? T :
                T extends object ? DeepReadonlyObject<T> :
                    T;

    /** @description Makes recursively all properties of an array readonly, native readonly is for the direct properties of an array only. */
    interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

    /** @description Makes recursively all properties of an object readonly, native readonly is for the direct properties of an object only. */
    type DeepReadonlyObject<T> = {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
    };
    /** @description All image formats supported by the website. */
    type ImageFormat = 'jpg' | 'webp';
    /** @description All languages supported by the website. */
    type Lang = 'sk' | 'en';
    /** @description Merges two types. */
    type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
    /**
     * @description Type of a main section.
     * @property $el The HTML Section Element containing the section HTML.
     * @property href The href string of the section displayed next to the hash in the URL.
     * */
    type MainSection = {
        $el: HTMLElement,
        href: string
    };
    /** @description Names of all sections. */
    type MainSectionName = 'home' | 'aboutMyself' | 'portfolio' | 'contact';
    /**
     * @description Type of a section.
     * @property href The href string of the section displayed next to the hash in the URL.
     * @property name Name of the section.
     * */
    type Section = {href: string, name: string};

    /** @description Locales of a section. */
    type TextSection = {title: string};
    /**
     * @description Data related to a programming language.
     * */
    type ProgrammingLanguage = {
        /** @description Determines whether the programming language is preceded by an 'an' article in English. */
        an?: boolean,
        /** @description Children of the programming language. */
        children?: {[s: string]: ProgrammingLanguage},
        /** @description Determines whether the programming language appears in the Home section. */
        home?: boolean,
        /** @description Determines the order of the programming language in the text in the About myself section. */
        order: number
    };
}

export {};

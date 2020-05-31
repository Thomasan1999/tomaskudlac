declare global
{
    type DeepReadonly<T> =
        T extends (infer R)[] ? DeepReadonlyArray<R> :
            T extends Function ? T :
                T extends object ? DeepReadonlyObject<T> :
                    T;

    interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

    type DeepReadonlyObject<T> = {
        readonly [P in keyof T]: DeepReadonly<T[P]>;
    };
    type ImageFormat = 'jpg' | 'webp';
    type Lang = 'sk' | 'en';
    type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
    type SectionMain = {
        $el: HTMLElement,
        href: string
    };
    type SectionMainName = 'home' | 'aboutMyself' | 'portfolio' | 'contact';
    type Section = {href: string, name: string};

    type TextSection = {title: string};
    type ProgrammingLanguage = {
        an?: boolean,
        children?: {[s: string]: ProgrammingLanguage},
        home?: boolean,
        order: number
    };
}

export {};

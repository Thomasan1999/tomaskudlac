import {DeepReadonly} from 'ts-essentials';

export type ImageFormat = 'jpg' | 'webp';

export type ProgrammingLanguage = DeepReadonly<{
    an?: boolean,
    children?: DeepReadonly<ProgrammingLanguage[]>,
    home?: boolean,
    name: string,
    title: string
}>

export type SiteLanguage = 'en' | 'sk';

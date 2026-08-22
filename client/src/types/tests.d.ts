import { DOMWrapper } from '@vue/test-utils';

export type ExistingDomWrapper<ElementType = typeof Element> = Omit<DOMWrapper<ElementType>, 'exists'>;

declare module 'vitest' {
    interface ProvidedContext {
        /** Address of the dev server the end-to-end tests drive, provided by their global setup. */
        baseUrl: string;
    }
}

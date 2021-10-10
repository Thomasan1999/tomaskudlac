import {DOMWrapper} from '@vue/test-utils';

export type ExistingDomWrapper<ElementType = typeof Element> = Omit<DOMWrapper<ElementType>, 'exists'>

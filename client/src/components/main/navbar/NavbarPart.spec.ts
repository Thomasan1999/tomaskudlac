import { buildCreateWrapper } from '@/utils/test';
import NavbarPart from '@/components/main/navbar/NavbarPart.vue';

const createWrapper = buildCreateWrapper(NavbarPart, undefined, {
    global: {
        renderStubDefaultSlot: true,
    },
});

describe('NavbarPart', () => {
    it('renders default slot', () => {
        const text = 'Text';

        const className = 'slot-content';

        const link = createWrapper(undefined, { slots: { default: `<span class="${className}">${text}</span>` } });

        expect(link.find(`.${className}`).exists()).toBe(true);
        expect(link.find(`.${className}`).text()).toBe(text);
    });

    it('uses different classes for "outer" variant', () => {
        const innerPart = createWrapper({ outer: false });
        const outerPart = createWrapper({ outer: true });

        expect(innerPart.classes()).not.toBe(outerPart.classes());
    });
});

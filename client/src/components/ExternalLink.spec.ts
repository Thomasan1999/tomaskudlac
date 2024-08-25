import { shallowMount } from '@vue/test-utils';
import ExternalLink from '@/components/ExternalLink.vue';

describe('ExternalLink', () => {
    it('renders default slot', () => {
        const text = 'Text';

        const className = 'slot-content';

        const link = shallowMount(ExternalLink, { slots: { default: `<span class="${className}">${text}</span>` } });

        expect(link.find(`.${className}`).exists()).toBe(true);
        expect(link.find(`.${className}`).text()).toBe(text);
    });

    it('includes anchor tag', () => {
        const link = shallowMount(ExternalLink);

        expect(link.find<HTMLAnchorElement>('a').exists()).toBe(true);
    });

    it('includes href attribute', () => {
        const href = 'https://tomaskudlac.sk';

        const link = shallowMount(ExternalLink, { attrs: { href } });

        expect(link.find<HTMLAnchorElement>('a').attributes().href).toBe(href);
    });
});
